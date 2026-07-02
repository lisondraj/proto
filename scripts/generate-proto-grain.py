#!/usr/bin/env python3
"""Generate proto grain PNG tiles — run after changing GRAIN_* constants."""
from __future__ import annotations

import random
import struct
import zlib
from pathlib import Path

GRAIN_SEED = 0x50726F746F
GRAIN_DISPLAY_PX = 200
# 2× displays — 1:1 device pixels at GRAIN_DISPLAY_PX.
GRAIN_2X_PX = 400
# 3× displays (iPhone) — 1:1 device pixels at GRAIN_DISPLAY_PX.
GRAIN_3X_PX = 600


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


def film_grain_tile(size: int, seed: int) -> list[list[tuple[int, int, int, int]]]:
    """RGBA film grain — light/dark specks via alpha (visible with overlay blend)."""
    rng = random.Random(seed)
    ss = size * 2

    noise = [[rng.gauss(0.0, 1.0) for _ in range(ss)] for _ in range(ss)]
    noise = box_blur_2d(noise, 1)
    coarse = box_blur_2d(noise, 3)
    merged = [[0.0] * ss for _ in range(ss)]
    for y in range(ss):
        for x in range(ss):
            merged[y][x] = noise[y][x] * 0.78 + coarse[y][x] * 0.22

    merged = box_blur_2d(merged, 1)
    merged = downsample_2x(merged)

    out: list[list[tuple[int, int, int, int]]] = []
    for y in range(size):
        row: list[tuple[int, int, int, int]] = []
        for x in range(size):
            n = merged[y][x]
            alpha = int(min(215, max(28, abs(n) * 52.0 + 34.0)))
            if n >= 0.0:
                row.append((255, 255, 255, alpha))
            else:
                row.append((0, 0, 0, alpha))
        out.append(row)
    return out


def write_grain_png(path: Path, size: int, seed: int = GRAIN_SEED) -> None:
    tile = film_grain_tile(size, seed)
    rows: list[bytes] = []
    for y in range(size):
        row = b"\x00"
        for r, g, b, a in tile[y]:
            row += bytes((r, g, b, a))
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
