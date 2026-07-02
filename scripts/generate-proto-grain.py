#!/usr/bin/env python3
"""Generate proto grain PNG tiles — run after changing GRAIN_* constants."""
from __future__ import annotations

import random
import struct
import zlib
from pathlib import Path

GRAIN_SEED = 0x50726F746F
GRAIN_DISPLAY_PX = 192
# 2× displays — 1:1 device pixels at GRAIN_DISPLAY_PX.
GRAIN_2X_PX = 384
# 3× displays (iPhone) — 1:1 device pixels at GRAIN_DISPLAY_PX.
GRAIN_3X_PX = 576


def png_chunk(tag: bytes, data: bytes) -> bytes:
    return (
        struct.pack(">I", len(data))
        + tag
        + data
        + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)
    )


def box_blur_2d(grid: list[list[float]], radius: int) -> list[list[float]]:
    size = len(grid)
    temp = [[0.0] * size for _ in range(size)]
    out = [[0.0] * size for _ in range(size)]
    diam = radius * 2 + 1

    for y in range(size):
        for x in range(size):
            total = 0.0
            for k in range(-radius, radius + 1):
                total += grid[y][max(0, min(size - 1, x + k))]
            temp[y][x] = total / diam

    for x in range(size):
        for y in range(size):
            total = 0.0
            for k in range(-radius, radius + 1):
                total += temp[max(0, min(size - 1, y + k))][x]
            out[y][x] = total / diam

    return out


def downsample_2x(grid: list[list[float]]) -> list[list[float]]:
    size = len(grid) // 2
    out = [[0.0] * size for _ in range(size)]
    for y in range(size):
        for x in range(size):
            acc = 0.0
            for dy in range(2):
                for dx in range(2):
                    acc += grid[y * 2 + dy][x * 2 + dx]
            out[y][x] = acc / 4.0
    return out


def film_grain_tile(size: int, seed: int) -> list[list[int]]:
    """Supersampled film grain — smooth specks with enough contrast for overlay blend."""
    rng = random.Random(seed)
    ss = size * 2

    fine = [[rng.gauss(0.0, 1.0) for _ in range(ss)] for _ in range(ss)]
    fine = box_blur_2d(fine, 1)
    coarse = box_blur_2d(fine, 4)

    merged = [[0.0] * ss for _ in range(ss)]
    for y in range(ss):
        for x in range(ss):
            merged[y][x] = fine[y][x] * 0.68 + coarse[y][x] * 0.32

    merged = box_blur_2d(merged, 1)
    merged = downsample_2x(merged)

    out = [[0] * size for _ in range(size)]
    for y in range(size):
        for x in range(size):
            v = 128.0 + merged[y][x] * 17.5
            if v < 128.0:
                v = 128.0 - (128.0 - v) * 0.72
            else:
                v = 128.0 + (v - 128.0) * 0.9
            out[y][x] = int(max(110, min(246, v)))
    return out


def write_grain_png(path: Path, size: int, seed: int = GRAIN_SEED) -> None:
    tile = film_grain_tile(size, seed)
    rows: list[bytes] = []
    for y in range(size):
        row = b"\x00"
        for x in range(size):
            v = tile[y][x]
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
    public = Path(__file__).resolve().parents[1] / "public"
    write_grain_png(public / "proto-grain-tile.png", GRAIN_2X_PX)
    write_grain_png(public / "proto-grain-tile-3x.png", GRAIN_3X_PX, seed=GRAIN_SEED + 1)
    print(f"display size: {GRAIN_DISPLAY_PX}px")
