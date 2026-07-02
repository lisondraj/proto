#!/usr/bin/env python3
"""Generate proto grain PNG tiles — run after changing GRAIN_* constants."""
from __future__ import annotations

import random
import struct
import zlib
from pathlib import Path

GRAIN_SEED = 0x50726F746F
GRAIN_DISPLAY_PX = 256
# 2× displays (MacBook, etc.) — 512px tile @ 256px = 1:1 device pixels.
GRAIN_2X_PX = 512
# 3× displays (iPhone) — 768px tile @ 256px = 1:1 device pixels.
GRAIN_3X_PX = 768


def png_chunk(tag: bytes, data: bytes) -> bytes:
    return (
        struct.pack(">I", len(data))
        + tag
        + data
        + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)
    )


def lerp(a: float, b: float, t: float) -> float:
    return a + (b - a) * t


def sample_lattice(lattice: list[list[float]], x: float, y: float, n: int) -> float:
    x0 = int(x) % n
    y0 = int(y) % n
    x1 = (x0 + 1) % n
    y1 = (y0 + 1) % n
    fx = x - int(x)
    fy = y - int(y)
    return lerp(
        lerp(lattice[y0][x0], lattice[y0][x1], fx),
        lerp(lattice[y1][x0], lattice[y1][x1], fx),
        fy,
    )


def make_lattice(n: int, rng: random.Random, spread: float) -> list[list[float]]:
    return [[rng.gauss(0, spread) for _ in range(n)] for _ in range(n)]


def film_grain_pixel(
    x: int,
    y: int,
    size: int,
    lattices: list[tuple[list[list[float]], int, float]],
    fine_rng: random.Random,
) -> int:
    value = 128.0
    for lattice, cells, weight in lattices:
        lx = (x / size) * cells
        ly = (y / size) * cells
        value += sample_lattice(lattice, lx, ly, cells) * weight
    value += fine_rng.gauss(0, 11)
    return int(max(0, min(255, value)))


def write_grain_png(path: Path, size: int, seed: int = GRAIN_SEED) -> None:
    rng = random.Random(seed)
    fine_rng = random.Random(seed ^ 0x9E3779B9)

    # Toroidal value-noise octaves — tiles seamlessly, reads as film grain not digital noise.
    lattices: list[tuple[list[list[float]], int, float]] = [
        (make_lattice(16, rng, 1.0), 16, 34.0),
        (make_lattice(32, rng, 1.0), 32, 20.0),
        (make_lattice(64, rng, 1.0), 64, 9.5),
    ]

    rows: list[bytes] = []
    for y in range(size):
        row = b"\x00"
        for x in range(size):
            v = film_grain_pixel(x, y, size, lattices, fine_rng)
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
