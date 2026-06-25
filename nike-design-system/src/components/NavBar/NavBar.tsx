import * as React from "react";
import { cx } from "../../utils/cx";
import "./NavBar.css";

export interface NavLink {
  label: string;
  href?: string;
}

export interface NavBarProps {
  /** Brand element in the left slot. Defaults to a "SWOOSH" wordmark. */
  brand?: React.ReactNode;
  /** Navigation links rendered in the centre/right of the bar. */
  links: NavLink[];
  /** If provided, renders a search icon button that calls this handler. */
  onSearch?: () => void;
  className?: string;
}

/** Default wordmark shown when no brand prop is supplied. */
function DefaultBrand() {
  return <span className="swoosh-navbar__wordmark">SWOOSH</span>;
}

/**
 * Top navigation bar with brand, links, and optional search action.
 *
 * @example
 * <NavBar links={[{label:"Men",href:"/men"},{label:"Women",href:"/women"},{label:"Kids",href:"/kids"},{label:"Sale",href:"/sale"}]} onSearch={() => {}} />
 * @example
 * <NavBar brand={<img src="/logo.svg" alt="Nike" height={24} />} links={[{label:"Running"},{label:"Training"},{label:"Jordan"}]} />
 * @example
 * <NavBar links={[{label:"New Arrivals"},{label:"Men"},{label:"Women"},{label:"Sale"}]} onSearch={() => {}} />
 */
export function NavBar({ brand, links, onSearch, className }: NavBarProps) {
  return (
    <header className={cx("swoosh-root", "swoosh-navbar", className)}>
      <div className="swoosh-navbar__inner">
        {/* Brand */}
        <div className="swoosh-navbar__brand">
          {brand ?? <DefaultBrand />}
        </div>

        {/* Links */}
        <nav className="swoosh-navbar__nav" aria-label="Main navigation">
          <ul className="swoosh-navbar__links">
            {links.map((link, i) => (
              <li key={i} className="swoosh-navbar__link-item">
                {link.href ? (
                  <a href={link.href} className="swoosh-navbar__link">
                    {link.label}
                  </a>
                ) : (
                  <span className="swoosh-navbar__link swoosh-navbar__link--button" role="button" tabIndex={0}>
                    {link.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions */}
        {onSearch && (
          <div className="swoosh-navbar__actions">
            <button
              type="button"
              aria-label="Search"
              className="swoosh-navbar__search-btn"
              onClick={onSearch}
            >
              {/* Search icon via SVG */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
