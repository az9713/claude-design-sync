import * as React from "react";
import { cx } from "../../utils/cx";
import "./Breadcrumb.css";

export interface BreadcrumbItem {
  label: string;
  /** When provided, renders the item as an anchor tag. Omit for the current page. */
  href?: string;
}

export interface BreadcrumbProps {
  /** Ordered list of breadcrumb items; last item is the current page. */
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Horizontal navigation trail showing the user's location in the site hierarchy.
 *
 * @example
 * <Breadcrumb items={[{label:"Home",href:"/"},{label:"Men",href:"/men"},{label:"Shoes"}]} />
 * @example
 * <Breadcrumb items={[{label:"Home",href:"/"},{label:"Sale",href:"/sale"},{label:"Nike Air Max"}]} />
 * @example
 * <Breadcrumb items={[{label:"Home",href:"/"},{label:"New Arrivals"}]} />
 */
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cx("swoosh-root", "swoosh-breadcrumb", className)}>
      <ol className="swoosh-breadcrumb__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="swoosh-breadcrumb__item">
              {isLast ? (
                <span
                  className="swoosh-breadcrumb__current"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : item.href ? (
                <a href={item.href} className="swoosh-breadcrumb__link">
                  {item.label}
                </a>
              ) : (
                <span className="swoosh-breadcrumb__link">{item.label}</span>
              )}
              {!isLast && (
                <span className="swoosh-breadcrumb__sep" aria-hidden="true">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
