import * as React from "react";
import { ProductCard } from "@swoosh/ui";

// Inline SVG data-URI so previews render without network access.
const img = (label: string, bg = "#f5f5f5") =>
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'>` +
      `<rect width='100%' height='100%' fill='${bg}'/>` +
      `<text x='50%' y='52%' font-family='Helvetica,Arial' font-size='22' font-weight='700' ` +
      `fill='#b0b0b0' text-anchor='middle' dominant-baseline='middle'>${label}</text></svg>`
  );

export const Default = () => (
  <div style={{ width: 280 }}>
    <ProductCard
      image={img("Air Max 270")}
      name="Nike Air Max 270"
      category="Men's Shoes"
      price={150}
    />
  </div>
);

export const OnSale = () => (
  <div style={{ width: 280 }}>
    <ProductCard
      image={img("Free Run", "#ececec")}
      name="Nike Free Run"
      category="Women's Running"
      price={89.99}
      originalPrice={120}
      badge="Sale"
    />
  </div>
);

export const JustIn = () => (
  <div style={{ width: 280 }}>
    <ProductCard
      image={img("Dunk Low", "#efeae0")}
      name="Nike Dunk Low"
      category="Lifestyle"
      price={110}
      badge="Just In"
    />
  </div>
);
