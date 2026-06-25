import * as React from "react";
import { Hero } from "@swoosh/ui";

export const Default = () => (
  <div style={{ width: 520 }}>
    <Hero title="Just Do It." ctaLabel="Shop Now" onCtaClick={() => {}} />
  </div>
);

export const Centered = () => (
  <div style={{ width: 520 }}>
    <Hero
      title="New Season. New Energy."
      subtitle="The latest Nike running collection is here."
      ctaLabel="Explore"
      align="center"
      onCtaClick={() => {}}
    />
  </div>
);
