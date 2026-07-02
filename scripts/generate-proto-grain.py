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


def film_grain_value(rng: random.Random) -> int:
    """Per-pixel film grain — high-frequency only; no spatial blur or upsampling."""
    v = 128.0 + rng.gauss(0, 24.0)
    roll = rng.random()
    if roll < 0.055:
        v += rng.choice([-1.0, 1.0]) * rng.uniform(34.0, 56.0)
    elif roll < 0.105:
        v += rng.choice([-1.0, 1.0]) * rng.uniform(14.0, 26.0)
    v = 128.0 + (v - 128.0) * 1.1
    return int(max(0, min(255, v)))


def write_grain_png(path: Path, size: int, seed: int = GRAIN_SEED) -> None:
    rng = random.Random(seed)
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
    public = Path(__file__).resolve().parents[1] / "public"
    write_grain_png(public / "proto-grain-tile.png", GRAIN_2X_PX)
    write_grain_png(public / "proto-grain-tile-3x.png", GRAIN_3X_PX, seed=GRAIN_SEED + 1)
    print(f"display size: {GRAIN_DISPLAY_PX}px")
