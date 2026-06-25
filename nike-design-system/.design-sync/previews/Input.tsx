import * as React from "react";
import { Input } from "@swoosh/ui";

export const Default = () => (
  <div style={{ width: 280 }}>
    <Input label="Email" type="email" placeholder="you@example.com" />
  </div>
);

export const WithHint = () => (
  <div style={{ width: 280 }}>
    <Input label="Promo code" hint="Enter your member discount code" size="lg" />
  </div>
);

export const WithError = () => (
  <div style={{ width: 280 }}>
    <Input label="Full name" error="Name is required" defaultValue="" />
  </div>
);

export const Sizes = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 280 }}>
    <Input label="Medium" size="md" placeholder="Default height" />
    <Input label="Large" size="lg" placeholder="Taller field" />
  </div>
);
