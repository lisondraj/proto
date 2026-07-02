#!/usr/bin/env python3
"""Generate proto grain PNG tiles — run after changing GRAIN_* constants."""
from __future__ import annotations

import random
import struct
import zlib
from pathlib import Path

GRAIN_SEED = 0x50726F746F
GRAIN_DISPLAY_PX = 192
# 2× displays — 384px tile @ 192px = 1:1 device pixels.
GRAIN_2X_PX = 384
# 3× displays — 576px tile @ 192px = 1:1 device pixels.
GRAIN_3X_PX = 576


def png_chunk(tag: bytes, data: bytes) -> bytes:
    return (
        struct.pack(">I", len(data))
        + tag
        + data
        + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)
    )


def film_grain_value(rng: random.Random) -> int:
    """Per-pixel grain biased light so soft-light darkens the gradient less."""
    v = 136.0 + rng.gauss(0, 17.0)
    if rng.random() < 0.04:
        v += rng.uniform(10.0, 28.0)
    return int(max(108, min(255, v)))


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
