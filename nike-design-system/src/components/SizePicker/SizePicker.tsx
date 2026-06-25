import * as React from "react";
import { cx } from "../../utils/cx";
import "./SizePicker.css";

export interface SizePickerProps {
  /** All available sizes to display (e.g. ["6","7","8","8.5","9","10"]). */
  sizes: string[];
  /** Currently selected size. */
  value?: string;
  /** Called with the size string when a size tile is clicked. */
  onChange: (size: string) => void;
  /** Sizes that are out of stock — rendered struck-through and non-interactive. */
  unavailable?: string[];
  className?: string;
}

/**
 * Grid of selectable size tiles for footwear or apparel sizing.
 *
 * @example
 * <SizePicker sizes={["7","8","9","10","11"]} value={size} onChange={setSize} />
 * @example
 * <SizePicker sizes={["S","M","L","XL"]} value="M" onChange={setSize} unavailable={["XL"]} />
 * @example
 * <SizePicker sizes={["6","6.5","7","7.5","8","8.5","9"]} value={size} onChange={setSize} unavailable={["6.5","7.5"]} />
 */
export function SizePicker({
  sizes,
  value,
  onChange,
  unavailable = [],
  className,
}: SizePickerProps) {
  return (
    <div
      className={cx("swoosh-root", "swoosh-size-picker", className)}
      role="group"
      aria-label="Select size"
    >
      {sizes.map((size) => {
        const isSelected = size === value;
        const isUnavailable = unavailable.includes(size);
        return (
          <button
            key={size}
            type="button"
            aria-pressed={isSelected}
            aria-label={`Size ${size}${isUnavailable ? ", unavailable" : ""}`}
            disabled={isUnavailable}
            onClick={() => !isUnavailable && onChange(size)}
            className={cx(
              "swoosh-size-picker__tile",
              isSelected && "swoosh-size-picker__tile--selected",
              isUnavailable && "swoosh-size-picker__tile--unavailable"
            )}
          >
            <span
              className={cx(
                "swoosh-size-picker__label",
                isUnavailable && "swoosh-size-picker__label--unavailable"
              )}
            >
              {size}
            </span>
          </button>
        );
      })}
    </div>
  );
}
