import * as React from "react";
import { cx } from "../../utils/cx";
import "./Price.css";

export interface PriceProps {
  /** Current selling price. */
  amount: number;
  /** Original price before discount. When provided, renders struck-through. */
  originalAmount?: number;
  /** ISO 4217 currency symbol prefix. Defaults to "$". */
  currency?: string;
  className?: string;
}

/**
 * Displays a product price, optionally with a struck-through original price for
 * sale items. Discounted amount renders in the sale colour.
 *
 * @example
 * <Price amount={120} />
 * @example
 * <Price amount={89.99} originalAmount={120} />
 * @example
 * <Price amount={89.99} originalAmount={120} currency="€" />
 */
export function Price({ amount, originalAmount, currency = "$", className }: PriceProps) {
  const isOnSale = originalAmount !== undefined && originalAmount > amount;

  const format = (n: number) =>
    `${currency}${n.toFixed(2).replace(/\.00$/, "")}`;

  return (
    <span
      className={cx("swoosh-root", "swoosh-price", className)}
    >
      <span className={cx("swoosh-price__current", isOnSale && "swoosh-price__current--sale")}>
        {format(amount)}
      </span>
      {isOnSale && (
        <span className="swoosh-price__original">{format(originalAmount!)}</span>
      )}
    </span>
  );
}
