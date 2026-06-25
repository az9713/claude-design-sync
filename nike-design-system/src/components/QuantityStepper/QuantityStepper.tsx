import * as React from "react";
import { cx } from "../../utils/cx";
import "./QuantityStepper.css";

export interface QuantityStepperProps {
  /** Current quantity value. */
  value: number;
  /** Minimum allowed value. Defaults to 1. */
  min?: number;
  /** Maximum allowed value. */
  max?: number;
  /** Called with the new quantity when the user steps up or down. */
  onChange: (n: number) => void;
  className?: string;
}

/**
 * Compact quantity selector with minus and plus circular buttons.
 *
 * @example
 * <QuantityStepper value={qty} min={1} max={10} onChange={setQty} />
 * @example
 * <QuantityStepper value={1} min={1} onChange={setQty} />
 * @example
 * <QuantityStepper value={3} min={0} max={5} onChange={n => updateCart(n)} />
 */
export function QuantityStepper({
  value,
  min = 1,
  max,
  onChange,
  className,
}: QuantityStepperProps) {
  const canDecrement = value > min;
  const canIncrement = max === undefined || value < max;

  return (
    <div className={cx("swoosh-root", "swoosh-qty-stepper", className)}>
      <button
        type="button"
        aria-label="Decrease quantity"
        className="swoosh-qty-stepper__btn"
        disabled={!canDecrement}
        onClick={() => canDecrement && onChange(value - 1)}
      >
        <span aria-hidden="true">&#8722;</span>
      </button>
      <output className="swoosh-qty-stepper__value" aria-live="polite">
        {value}
      </output>
      <button
        type="button"
        aria-label="Increase quantity"
        className="swoosh-qty-stepper__btn"
        disabled={!canIncrement}
        onClick={() => canIncrement && onChange(value + 1)}
      >
        <span aria-hidden="true">&#43;</span>
      </button>
    </div>
  );
}
