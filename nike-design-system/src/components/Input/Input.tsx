import * as React from "react";
import { cx } from "../../utils/cx";
import "./Input.css";

export type InputSize = "md" | "lg";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Visible label rendered above the input. */
  label?: string;
  /** Helper text displayed below the input. Hidden when `error` is present. */
  hint?: string;
  /** Validation error message. Renders in sale (red) colour and replaces hint. */
  error?: string;
  /** Controls input height and font size. */
  size?: InputSize;
}

/**
 * Labelled text field with optional hint and error messaging.
 *
 * @example
 * <Input label="Email" type="email" placeholder="you@example.com" />
 * @example
 * <Input label="Promo code" hint="Enter your member discount code" size="lg" />
 * @example
 * <Input label="Name" error="Name is required" value="" />
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(
    { label, hint, error, size = "md", className, id: idProp, ...rest },
    ref
  ) {
    const generatedId = React.useId();
    const id = idProp ?? generatedId;
    const hintId = `${id}-hint`;
    const hasBelow = error ?? hint;

    return (
      <div
        className={cx(
          "swoosh-root",
          "swoosh-input-wrap",
          `swoosh-input-wrap--${size}`,
          className
        )}
      >
        {label && (
          <label htmlFor={id} className="swoosh-input__label">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          aria-describedby={hasBelow ? hintId : undefined}
          aria-invalid={error ? true : undefined}
          className={cx(
            "swoosh-input__field",
            error && "swoosh-input__field--error"
          )}
          {...rest}
        />
        {hasBelow && (
          <span
            id={hintId}
            className={cx(
              "swoosh-input__below",
              error ? "swoosh-input__below--error" : "swoosh-input__below--hint"
            )}
          >
            {error ?? hint}
          </span>
        )}
      </div>
    );
  }
);
