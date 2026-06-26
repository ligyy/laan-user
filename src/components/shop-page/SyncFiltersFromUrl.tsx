"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCategories, setSubcategories, setPriceRange } from "@/lib/features/filters/filtersSlice";

export default function SyncFiltersFromUrl() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const cats = searchParams.get("categories");
    if (cats) {
      dispatch(setCategories(cats.split(",").map(c => c.trim()).filter(Boolean)));
    } else {
      dispatch(setCategories([]));
    }

    const subs = searchParams.get("subcategories");
    if (subs) {
      dispatch(setSubcategories(subs.split(",").map(s => s.trim()).filter(Boolean)));
    } else {
      dispatch(setSubcategories([]));
    }

    const min = searchParams.get("minPrice");
    const max = searchParams.get("maxPrice");
    if (min || max) {
      const minVal = min ? Number(min) : 0;
      const maxVal = max ? Number(max) : 100000;
      dispatch(setPriceRange([minVal, maxVal]));
    } else {
      dispatch(setPriceRange([0, 100000]));
    }
  }, [searchParams, dispatch]);

  return null;
}
