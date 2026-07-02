/** Proto grain — 512px PNG displayed at 256px (2× retina, smooth downscale). */
export const PROTO_GRAIN_ASSET_PX = 512;

/** CSS background-size — one tile in layout pixels. */
export const PROTO_GRAIN_TILE_PX = 256;

export const PROTO_GRAIN_BG = 'url("/proto-grain-tile.png")';

export const PROTO_GRAIN_SIZE = `${PROTO_GRAIN_TILE_PX}px ${PROTO_GRAIN_TILE_PX}px`;

/** Layer opacity — paired with overlay blend in proto.css */
export const PROTO_GRAIN_OPACITY = 0.24;

export const PROTO_PHONE_GRAIN_BG = PROTO_GRAIN_BG;
