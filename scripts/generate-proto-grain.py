#!/usr/bin/env python3
"""Generate proto-grain-tile.png — run after changing GRAIN_* constants."""
from __future__ import annotations

import random
import struct
import zlib
from pathlib import Path

GRAIN_ASSET_PX = 1024
GRAIN_DISPLAY_PX = 288
GRAIN_SEED = 0x50726F746F
GRAIN_BLUR_RADIUS = 0.85


def png_chunk(tag: bytes, data: bytes) -> bytes:
    return (
        struct.pack(">I", len(data))
        + tag
        + data
        + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)
    )


def film_grain_value(rng: random.Random) -> int:
    """Two-octave monochrome noise — visible contrast, smooth when downscaled."""
    fine = rng.gauss(0, 17)
    coarse = rng.gauss(0, 40)
    return int(max(0, min(255, 128 + fine + coarse * 0.55)))


def build_noise_grid(size: int, rng: random.Random) -> list[int]:
    return [film_grain_value(rng) for _ in range(size * size)]


def soften_grid(grid: list[int], size: int) -> list[int]:
    """Light gaussian blur removes pixel speckle while keeping film grain."""
    try:
        from PIL import Image, ImageFilter
    except ImportError:
        return grid

    image = Image.new("L", (size, size))
    image.putdata(grid)
    softened = image.filter(ImageFilter.GaussianBlur(radius=GRAIN_BLUR_RADIUS))
    return list(softened.getdata())


def write_grain_png(path: Path, size: int = GRAIN_ASSET_PX) -> None:
    rng = random.Random(GRAIN_SEED)
    grid = soften_grid(build_noise_grid(size, rng), size)

    rows: list[bytes] = []
    for y in range(size):
        row = b"\x00"
        offset = y * size
        for x in range(size):
            v = grid[offset + x]
            row += bytes((v, v, v, 255))
        rows.append(row)

    raw = b"".join(rows)
    compressed = zlib.compress(raw, 9)
    ihdr = struct.pack(">IIBBBBB", size, size, 8, 6, 0, 0, 0)
    png = b"\x89PNG\r\n\x1a\n"
    png += png_chunk(b"IHDR", ihdr)
    png += png_chunk(b"IDAT", compressed)
    png += png_chunk(b"IEND", b"")

    path.write_bytes(png)
    print(f"wrote {path} ({size}x{size} -> {GRAIN_DISPLAY_PX}px, {len(png)} bytes)")


if __name__ == "__main__":
    root = Path(__file__).resolve().parents[1]
    write_grain_png(root / "public" / "proto-grain-tile.png")
