import * as React from "react";
import { Button } from "@swoosh/ui";

export const Primary = () => <Button>Shop now</Button>;

export const Volt = () => (
  <Button variant="volt" size="lg">
    Join us
  </Button>
);

export const Variants = () => (
  <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="volt">Volt</Button>
  </div>
);

export const Sizes = () => (
  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
  </div>
);

export const Disabled = () => <Button disabled>Out of stock</Button>;
