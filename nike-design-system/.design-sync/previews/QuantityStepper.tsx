import * as React from "react";
import { QuantityStepper } from "@swoosh/ui";

export const Default = () => {
  const [qty, setQty] = React.useState(1);
  return <QuantityStepper value={qty} min={1} max={10} onChange={setQty} />;
};

export const MidRange = () => {
  const [qty, setQty] = React.useState(3);
  return <QuantityStepper value={qty} min={0} max={5} onChange={setQty} />;
};
