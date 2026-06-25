import * as React from "react";
import { Card, Price, Button } from "@swoosh/ui";

export const Padded = () => (
  <Card padded style={{ width: 260 }}>
    <h3 style={{ margin: "0 0 8px" }}>Nike Air Max 270</h3>
    <p style={{ margin: 0, color: "#757575" }}>Men's Shoes</p>
  </Card>
);

export const Elevated = () => (
  <Card padded elevated style={{ width: 260 }}>
    <h3 style={{ margin: "0 0 4px" }}>Membership perks</h3>
    <p style={{ margin: "0 0 16px", color: "#757575" }}>
      Free shipping, exclusive drops, and birthday rewards.
    </p>
    <Price amount={0} />
    <div style={{ marginTop: 16 }}>
      <Button size="sm">Join free</Button>
    </div>
  </Card>
);
