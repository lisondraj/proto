/** Proto grain — 128×128 tile, single-octave noise at 1:1 (no upscale blur). */
export const PROTO_GRAIN_TILE_PX = 128;

export const PROTO_GRAIN_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 128 128' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.08' numOctaves='1' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 1'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.78'/%3E%3C/svg%3E")`;

export const PROTO_GRAIN_SIZE = `${PROTO_GRAIN_TILE_PX}px ${PROTO_GRAIN_TILE_PX}px`;

export const PROTO_PHONE_GRAIN_BG = PROTO_GRAIN_BG;
