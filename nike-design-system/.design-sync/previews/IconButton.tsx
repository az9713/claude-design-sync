import * as React from "react";
import { IconButton } from "@swoosh/ui";

const Heart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
  </svg>
);
const Search = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);
const Close = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export const Solid = () => (
  <IconButton aria-label="Add to wishlist">
    <Heart />
  </IconButton>
);

export const Variants = () => (
  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
    <IconButton variant="solid" aria-label="Wishlist"><Heart /></IconButton>
    <IconButton variant="outline" aria-label="Search"><Search /></IconButton>
    <IconButton variant="ghost" aria-label="Close"><Close /></IconButton>
  </div>
);

export const Sizes = () => (
  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
    <IconButton size="sm" aria-label="Search small"><Search /></IconButton>
    <IconButton size="md" aria-label="Search medium"><Search /></IconButton>
    <IconButton size="lg" aria-label="Search large"><Search /></IconButton>
  </div>
);
