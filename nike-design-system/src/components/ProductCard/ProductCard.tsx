import * as React from "react";
import { cx } from "../../utils/cx";
import { Badge } from "../Badge";
import { Price } from "../Price";
import "./ProductCard.css";

export interface ProductCardProps {
  /** URL of the product image. */
  image: string;
  /** Product name (e.g. "Nike Air Max 270"). */
  name: string;
  /** Subcategory or sport label (e.g. "Men's Running Shoes"). */
  category?: string;
  /** Current selling price. */
  price: number;
  /** Original price before discount; triggers sale display. */
  originalPrice?: number;
  /** Badge label shown over the image (e.g. "Just In", "Sale"). */
  badge?: string;
  className?: string;
}

/**
 * Composed product tile with image, optional badge, name, category, and pricing.
 *
 * @example
 * <ProductCard image="/shoes/am270.jpg" name="Nike Air Max 270" category="Men's Shoes" price={150} />
 * @example
 * <ProductCard image="/shoes/free.jpg" name="Nike Free Run" price={89.99} originalPrice={120} badge="Sale" category="Women's Running" />
 * @example
 * <ProductCard image="/shoes/dunk.jpg" name="Nike Dunk Low" badge="Just In" category="Lifestyle" price={110} />
 */
export function ProductCard({
  image,
  name,
  category,
  price,
  originalPrice,
  badge,
  className,
}: ProductCardProps) {
  const isOnSale = originalPrice !== undefined && originalPrice > price;

  return (
    <article className={cx("swoosh-root", "swoosh-product-card", className)}>
      <div className="swoosh-product-card__media">
        <img
          src={image}
          alt={name}
          className="swoosh-product-card__img"
          loading="lazy"
        />
        {badge && (
          <span className="swoosh-product-card__badge-wrap">
            <Badge tone={isOnSale ? "sale" : "new"}>{badge}</Badge>
          </span>
        )}
      </div>
      <div className="swoosh-product-card__body">
        <p className="swoosh-product-card__name">{name}</p>
        {category && (
          <p className="swoosh-product-card__category">{category}</p>
        )}
        <Price
          amount={price}
          originalAmount={originalPrice}
          className="swoosh-product-card__price"
        />
      </div>
    </article>
  );
}
