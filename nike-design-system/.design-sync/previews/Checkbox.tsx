import * as React from "react";
import { Checkbox } from "@swoosh/ui";

export const Default = () => <Checkbox label="I agree to the Terms & Conditions" />;

export const Checked = () => <Checkbox label="Sign me up for Nike emails" defaultChecked />;

export const Group = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
    <Checkbox label="Remember my size" defaultChecked />
    <Checkbox label="Save payment details" />
    <Checkbox label="Subscribe to drops & restocks" defaultChecked />
  </div>
);
