import * as React from "react";
import { Badge } from "@swoosh/ui";

export const Tones = () => (
  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
    <Badge tone="new">Just In</Badge>
    <Badge tone="sale">Sale</Badge>
    <Badge tone="neutral">Members Only</Badge>
  </div>
);

export const New = () => <Badge tone="new">Just In</Badge>;

export const Sale = () => <Badge tone="sale">30% Off</Badge>;
