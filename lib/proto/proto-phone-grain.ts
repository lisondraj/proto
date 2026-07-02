/** Proto grain — 1024px PNG tile displayed at 256px (4× downscale, soft gaussian specks). */
export const PROTO_GRAIN_TILE_PX = 256;

export const PROTO_GRAIN_BG = 'url("/proto-grain-tile.png")';

export const PROTO_GRAIN_SIZE = `${PROTO_GRAIN_TILE_PX}px ${PROTO_GRAIN_TILE_PX}px`;

/** Layer opacity — tuned with overlay blend in proto.css */
export const PROTO_GRAIN_OPACITY = 0.11;

export const PROTO_PHONE_GRAIN_BG = PROTO_GRAIN_BG;
