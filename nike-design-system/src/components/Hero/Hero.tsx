import * as React from "react";
import { cx } from "../../utils/cx";
import "./Hero.css";

export type HeroAlign = "left" | "center";

export interface HeroProps {
  /** Primary display headline. Rendered at --swoosh-font-size-display. */
  title: string;
  /** Supporting text below the title. */
  subtitle?: string;
  /** Label for the call-to-action button. */
  ctaLabel?: string;
  /** Handler for the CTA button click. */
  onCtaClick?: () => void;
  /** Text alignment of the content block. */
  align?: HeroAlign;
  className?: string;
}

/**
 * Full-width hero banner with bold display type and an optional CTA. No external
 * image required — renders as a dark branded block.
 *
 * @example
 * <Hero title="Just Do It." ctaLabel="Shop Now" onCtaClick={() => {}} />
 * @example
 * <Hero title="New Season. New Energy." subtitle="The latest Nike running collection is here." ctaLabel="Explore" align="center" onCtaClick={() => {}} />
 * @example
 * <Hero title="Members Get More." subtitle="Join Nike Membership for free — and unlock exclusive access." ctaLabel="Join Free" align="left" onCtaClick={() => {}} />
 */
export function Hero({
  title,
  subtitle,
  ctaLabel,
  onCtaClick,
  align = "left",
  className,
}: HeroProps) {
  return (
    <section
      className={cx(
        "swoosh-root",
        "swoosh-hero",
        `swoosh-hero--${align}`,
        className
      )}
    >
      <div className="swoosh-hero__content">
        <h1 className="swoosh-hero__title">{title}</h1>
        {subtitle && <p className="swoosh-hero__subtitle">{subtitle}</p>}
        {ctaLabel && (
          <button
            type="button"
            className="swoosh-hero__cta"
            onClick={onCtaClick}
          >
            {ctaLabel}
          </button>
        )}
      </div>
    </section>
  );
}
