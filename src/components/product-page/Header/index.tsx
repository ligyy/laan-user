"use client";

import React, { useState, useMemo } from "react";
import PhotoSection from "./PhotoSection";
import { Product, ProductVariant, SizeOption } from "@/types/product.types";
import { integralCF } from "@/styles/fonts";
import { cn } from "@/lib/utils";
import AddToCardSection from "./AddToCardSection";

const Header = ({ data }: { data: Product }) => {
  const variants = data.variants ?? [];
  const defaultVariant = variants.find((v) => v.isDefault) || variants[0] || null;

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(defaultVariant);
  const [selectedSize, setSelectedSize] = useState<SizeOption | null>(
    defaultVariant?.sizesArray?.[0] || null
  );

  // Price: size-specific price > variant price > product price
  const displayPrice = useMemo(() => {
    if (selectedSize?.price && selectedSize.price > 0) return selectedSize.price;
    if (selectedVariant?.price && selectedVariant.price > 0) return selectedVariant.price;
    return data.price;
  }, [selectedSize, selectedVariant, data.price]);
  const displayImages = selectedVariant?.images?.length
    ? selectedVariant.images
    : data.gallery ?? [];
  const displaySrc = displayImages[0] || data.srcUrl;
  const sizes = selectedVariant?.sizesArray ?? [];

  const handleVariantSelect = (v: ProductVariant) => {
    setSelectedVariant(v);
    const firstSize = v.sizesArray?.[0] || null;
    setSelectedSize(firstSize);
  };

  const displayProduct: Product = {
    ...data,
    srcUrl: displaySrc,
    gallery: displayImages,
    price: displayPrice,
  };

  // attributes passed to cart: [color, size]
  const cartAttributes = [
    selectedVariant?.color || "",
    selectedSize?.size || "",
  ].filter(Boolean);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div>
        <PhotoSection data={displayProduct} />
      </div>
      <div>
        {/* Title */}
        <h1
          className={cn([
            integralCF.className,
            "text-2xl md:text-[40px] md:leading-[40px] mb-3 md:mb-3.5 capitalize",
          ])}
        >
          {data.title}
        </h1>

        {/* Price */}
        <div className="flex items-center space-x-2.5 sm:space-x-3 mb-5">
          <span className="font-bold text-brand text-2xl sm:text-[32px]">
            ₹{displayPrice}
          </span>
          {selectedSize?.price && selectedSize.price > 0 && (
            <span className="text-sm text-brand/50">
              ({selectedSize.size})
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-brand/60 mb-5">
          {data.description ||
            "This product is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style."}
        </p>

        <hr className="h-[1px] border-t-brand/10 mb-5" />

        {/* Flavour / Variant selection */}
        {variants.length > 0 && (
          <>
            <div className="flex flex-col mb-5">
              <span className="text-sm sm:text-base text-brand/60 mb-3">
                Select Flavour
              </span>
              <div className="flex items-center flex-wrap gap-3">
                {variants.map((v) => (
                  <button
                    key={v._id}
                    type="button"
                    onClick={() => handleVariantSelect(v)}
                    className={cn(
                      "bg-[#f8f5f0] px-6 py-3 text-sm rounded-full font-medium transition-all",
                      selectedVariant?._id === v._id
                        ? "bg-brand text-white"
                        : "text-brand hover:bg-brand/10"
                    )}
                  >
                    {v.color}
                  </button>
                ))}
              </div>
            </div>
            <hr className="h-[1px] border-t-brand/10 mb-5" />
          </>
        )}

        {/* Size selection */}
        {sizes.length > 0 && (
          <>  
            <div className="flex flex-col mb-5">
              <span className="text-sm sm:text-base text-brand/60 mb-4">
                Choose Quantity
              </span>
              <div className="flex items-center flex-wrap gap-3">
                {sizes.map((s) => {
                  const sizePrice = s.price && s.price > 0 ? s.price : null;
                  return (
                    <button
                      key={s._id}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={cn(
                        "bg-[#f8f5f0] px-5 py-2.5 text-sm rounded-full font-medium transition-all flex flex-col items-center",
                        selectedSize?._id === s._id
                          ? "bg-brand text-white"
                          : "text-brand hover:bg-brand/10"
                      )}
                    >
                      <span>{s.size.toUpperCase()}</span>
                      {sizePrice && (
                        <span className={cn(
                          "text-xs font-semibold",
                          selectedSize?._id === s._id ? "text-white/80" : "text-brand/70"
                        )}>
                          ₹{sizePrice}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            <hr className="hidden md:block h-[1px] border-t-brand/10 mb-5" />
          </>
        )}

        <AddToCardSection data={displayProduct} attributes={cartAttributes} />
      </div>
    </div>
  );
};

export default Header;
