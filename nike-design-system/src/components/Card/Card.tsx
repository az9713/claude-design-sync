import * as React from "react";
import { cx } from "../../utils/cx";
import "./Card.css";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Adds internal padding using the standard spacing token. */
  padded?: boolean;
  /** Applies a drop shadow to lift the card off the surface. */
  elevated?: boolean;
}

/**
 * Generic surface container for grouping related content.
 *
 * @example
 * <Card padded><p>Nike Air Max 270</p></Card>
 * @example
 * <Card padded elevated><ProductDetails /></Card>
 * @example
 * <Card elevated><img src={shoe} alt="Nike shoe" /></Card>
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  function Card({ padded, elevated, className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cx(
          "swoosh-root",
          "swoosh-card",
          padded && "swoosh-card--padded",
          elevated && "swoosh-card--elevated",
          className
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
);
