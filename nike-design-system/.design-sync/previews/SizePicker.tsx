import * as React from "react";
import { SizePicker } from "@swoosh/ui";

export const Footwear = () => {
  const [size, setSize] = React.useState("9");
  return (
    <div style={{ width: 320 }}>
      <SizePicker
        sizes={["7", "7.5", "8", "8.5", "9", "9.5", "10", "11"]}
        value={size}
        onChange={setSize}
        unavailable={["7.5", "10"]}
      />
    </div>
  );
};

export const Apparel = () => {
  const [size, setSize] = React.useState("M");
  return (
    <div style={{ width: 320 }}>
      <SizePicker
        sizes={["XS", "S", "M", "L", "XL"]}
        value={size}
        onChange={setSize}
        unavailable={["XL"]}
      />
    </div>
  );
};
