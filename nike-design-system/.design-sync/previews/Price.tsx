import * as React from "react";
import { Price } from "@swoosh/ui";

export const Regular = () => <Price amount={120} />;

export const OnSale = () => <Price amount={89.99} originalAmount={120} />;

export const Euro = () => <Price amount={89.99} originalAmount={120} currency="€" />;

export const Range = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
    <Price amount={150} />
    <Price amount={104.97} originalAmount={150} />
    <Price amount={59.97} originalAmount={110} />
  </div>
);
