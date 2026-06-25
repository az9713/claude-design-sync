import * as React from "react";
import { cx } from "../../utils/cx";
import "./Checkbox.css";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Visible label rendered beside the checkbox. */
  label: string;
}

/**
 * Custom-styled checkbox with an inline label.
 *
 * @example
 * <Checkbox label="I agree to the Terms & Conditions" />
 * @example
 * <Checkbox label="Sign me up for Nike emails" defaultChecked />
 * @example
 * <Checkbox label="Remember my size" checked={saved} onChange={e => setSaved(e.target.checked)} />
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ label, className, id: idProp, ...rest }, ref) {
    const generatedId = React.useId();
    const id = idProp ?? generatedId;

    return (
      <label
        htmlFor={id}
        className={cx("swoosh-root", "swoosh-checkbox", className)}
      >
        <span className="swoosh-checkbox__control">
          <input
            ref={ref}
            id={id}
            type="checkbox"
            className="swoosh-checkbox__input"
            {...rest}
          />
          <span className="swoosh-checkbox__box" aria-hidden="true">
            {/* checkmark via CSS */}
          </span>
        </span>
        <span className="swoosh-checkbox__label">{label}</span>
      </label>
    );
  }
);
