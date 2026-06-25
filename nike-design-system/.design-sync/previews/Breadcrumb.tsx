import * as React from "react";
import { Breadcrumb } from "@swoosh/ui";

export const Default = () => (
  <Breadcrumb
    items={[
      { label: "Home", href: "/" },
      { label: "Men", href: "/men" },
      { label: "Shoes" },
    ]}
  />
);

export const Deep = () => (
  <Breadcrumb
    items={[
      { label: "Home", href: "/" },
      { label: "Men", href: "/men" },
      { label: "Shoes", href: "/men/shoes" },
      { label: "Air Max 270" },
    ]}
  />
);
