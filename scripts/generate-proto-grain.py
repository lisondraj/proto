#!/usr/bin/env python3
"""Generate proto-grain-tile.png — run after changing GRAIN_* constants."""
from __future__ import annotations

import random
import struct
import zlib
from pathlib import Path

GRAIN_ASSET_PX = 768
GRAIN_SEED = 0x50726F746F


def png_chunk(tag: bytes, data: bytes) -> bytes:
    return (
        struct.pack(">I", len(data))
        + tag
        + data
        + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)
    )


def film_grain_value(rng: random.Random) -> int:
    """Two-octave monochrome noise — visible contrast, smooth when downscaled."""
    fine = rng.gauss(0, 19)
    coarse = rng.gauss(0, 38)
    return int(max(0, min(255, 128 + fine + coarse * 0.58)))


def write_grain_png(path: Path, size: int = GRAIN_ASSET_PX) -> None:
    rng = random.Random(GRAIN_SEED)
    rows: list[bytes] = []
    for _ in range(size):
        row = b"\x00"
        for _ in range(size):
            v = film_grain_value(rng)
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
    print(f"wrote {path} ({size}x{size}, {len(png)} bytes)")


if __name__ == "__main__":
    root = Path(__file__).resolve().parents[1]
    write_grain_png(root / "public" / "proto-grain-tile.png")
