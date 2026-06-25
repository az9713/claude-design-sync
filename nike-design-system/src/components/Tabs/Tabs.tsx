import * as React from "react";
import { cx } from "../../utils/cx";
import "./Tabs.css";

export interface TabItem {
  id: string;
  label: string;
}

export interface TabsProps {
  /** Array of tab definitions. */
  tabs: TabItem[];
  /** ID of the currently active tab. */
  value: string;
  /** Called with the tab `id` when a tab is clicked. */
  onChange: (id: string) => void;
  className?: string;
}

/**
 * Underline-style tab bar for switching between content panels.
 *
 * @example
 * <Tabs tabs={[{id:"all",label:"All"},{id:"men",label:"Men"},{id:"women",label:"Women"}]} value="all" onChange={setTab} />
 * @example
 * <Tabs tabs={[{id:"desc",label:"Description"},{id:"specs",label:"Specs"}]} value={activeTab} onChange={setActiveTab} />
 * @example
 * <Tabs tabs={[{id:"new",label:"New Arrivals"},{id:"sale",label:"Sale"}]} value="new" onChange={setTab} />
 */
export function Tabs({ tabs, value, onChange, className }: TabsProps) {
  return (
    <div
      role="tablist"
      className={cx("swoosh-root", "swoosh-tabs", className)}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === value;
        return (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cx(
              "swoosh-tabs__tab",
              isActive && "swoosh-tabs__tab--active"
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
