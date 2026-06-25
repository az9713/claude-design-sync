import * as React from "react";
import { cx } from "../../utils/cx";
import "./IconButton.css";

export type IconButtonVariant = "solid" | "outline" | "ghost";
export type IconButtonSize = "sm" | "md" | "lg";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style of the button. */
  variant?: IconButtonVariant;
  /** Size of the button square/circle. */
  size?: IconButtonSize;
  /** Required accessible name for screen readers. */
  "aria-label": string;
}

/**
 * Icon-only circular action button. Always provide an `aria-label` for accessibility.
 *
 * @example
 * <IconButton aria-label="Add to wishlist"><HeartIcon /></IconButton>
 * @example
 * <IconButton variant="outline" size="lg" aria-label="Search"><SearchIcon /></IconButton>
 * @example
 * <IconButton variant="ghost" size="sm" aria-label="Close"><XIcon /></IconButton>
 */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { variant = "solid", size = "md", className, type = "button", ...rest },
    ref
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={cx(
          "swoosh-root",
          "swoosh-icon-btn",
          `swoosh-icon-btn--${variant}`,
          `swoosh-icon-btn--${size}`,
          className
        )}
        {...rest}
      />
    );
  }
);
