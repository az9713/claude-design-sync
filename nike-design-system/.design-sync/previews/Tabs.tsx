import * as React from "react";
import { Tabs } from "@swoosh/ui";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "reviews", label: "Reviews" },
  { id: "shipping", label: "Shipping" },
];

export const Default = () => {
  const [value, setValue] = React.useState("overview");
  return (
    <div style={{ width: 360 }}>
      <Tabs tabs={TABS} value={value} onChange={setValue} />
    </div>
  );
};

export const SecondActive = () => {
  const [value, setValue] = React.useState("reviews");
  return (
    <div style={{ width: 360 }}>
      <Tabs tabs={TABS} value={value} onChange={setValue} />
    </div>
  );
};
