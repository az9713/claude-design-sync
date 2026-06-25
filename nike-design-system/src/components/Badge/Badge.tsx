import * as React from "react";
import { cx } from "../../utils/cx";
import "./Badge.css";

export type BadgeTone = "new" | "sale" | "neutral";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Color scheme of the badge. `new` uses volt accent; `sale` uses red; `neutral` is grey. */
  tone?: BadgeTone;
}

/**
 * Compact status pill for labeling products or promotions.
 *
 * @example
 * <Badge tone="new">Just In</Badge>
 * @example
 * <Badge tone="sale">Sale</Badge>
 * @example
 * <Badge tone="neutral">Members Only</Badge>
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  function Badge({ tone = "neutral", className, children, ...rest }, ref) {
    return (
      <span
        ref={ref}
        className={cx(
          "swoosh-root",
          "swoosh-badge",
          `swoosh-badge--${tone}`,
          className
        )}
        {...rest}
      >
        {children}
      </span>
    );
  }
);
