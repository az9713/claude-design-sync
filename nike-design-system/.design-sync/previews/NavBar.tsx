import * as React from "react";
import { NavBar } from "@swoosh/ui";

export const Default = () => (
  <div style={{ width: 640 }}>
    <NavBar
      links={[
        { label: "Men", href: "/men" },
        { label: "Women", href: "/women" },
        { label: "Kids", href: "/kids" },
        { label: "Sale", href: "/sale" },
      ]}
      onSearch={() => {}}
    />
  </div>
);

export const Categories = () => (
  <div style={{ width: 640 }}>
    <NavBar
      links={[
        { label: "New Arrivals" },
        { label: "Running" },
        { label: "Training" },
        { label: "Jordan" },
        { label: "Sale" },
      ]}
      onSearch={() => {}}
    />
  </div>
);
