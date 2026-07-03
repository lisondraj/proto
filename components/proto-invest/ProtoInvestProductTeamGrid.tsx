"use client";

import { PROTO_INVEST_STARTUP_TEAMS } from "@/lib/proto-invest/proto-invest-content";
import {
  PROTO_INVEST_PRODUCT_TEAM_GRID_TW,
  PROTO_INVEST_PRODUCT_TEAM_GRID_WRAP_TW,
  PROTO_INVEST_PRODUCT_TEAM_PILL_TW,
} from "@/lib/proto-invest/proto-invest-layout-styles";

/** iPhone /about — 2×3 startup team pills above the tall Meet Proto shader panel. */
export function ProtoInvestProductTeamGrid() {
  return (
    <div className={PROTO_INVEST_PRODUCT_TEAM_GRID_WRAP_TW}>
      <div className={PROTO_INVEST_PRODUCT_TEAM_GRID_TW}>
        {PROTO_INVEST_STARTUP_TEAMS.map((team) => (
          <div key={team} className={PROTO_INVEST_PRODUCT_TEAM_PILL_TW}>
            {team}
          </div>
        ))}
      </div>
    </div>
  );
}
