import * as React from "react";
import { cx } from "../../utils/cx";
import "./Button.css";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "volt";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis. `primary` is the black pill; `volt` is the accent pill. */
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Stretch to fill the container width. */
  fullWidth?: boolean;
}

/**
 * Primary action control. Fully-rounded pill, bold uppercase label — the Nike
 * button signature.
 *
 * @example
 * <Button>Shop now</Button>
 * @example
 * <Button variant="volt" size="lg">Join us</Button>
 * @example
 * <Button variant="secondary" fullWidth>Add to bag</Button>
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant = "primary", size = "md", fullWidth, className, type = "button", ...rest },
    ref
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={cx(
          "swoosh-root",
          "swoosh-btn",
          `swoosh-btn--${variant}`,
          `swoosh-btn--${size}`,
          fullWidth && "swoosh-btn--block",
          className
        )}
        {...rest}
      />
    );
  }
);
