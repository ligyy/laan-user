import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Link from "next/link";
import React, { Suspense } from "react";
import CartBtn from "./CartBtn";
import SearchInput from "../SearchInput";
import Image from "next/image";

const TopNavbar = () => {
  return (
    <nav className="sticky top-0 bg-white z-20">
      <div className="flex relative max-w-[1150px] mx-auto items-center justify-between md:justify-start py-2 md:py-3 px-4 xl:px-0">
        <div className="flex items-center">
          <Link
            href="/"
            className={cn([
              integralCF.className,
              "text-2xl lg:text-[32px] mb-2 mr-3 lg:mr-10 md:-ml-14",
            ])}
          >
            <Image
              src="/images/uploaded-logo.png"
              alt="Logo"
              width={140}
              height={100}
              className="w-auto h-auto max-h-[75px] object-contain object-left"
            />
          </Link>
        </div>
        <Suspense fallback={<div className="w-full md:mr-3 lg:mr-10 h-10 bg-[#f8f5f0] rounded-full animate-pulse" />}>
          <SearchInput />
        </Suspense>
        <div className="flex items-center">
          <Suspense fallback={<div className="w-6 h-6 mr-[14px]" />}>
            <CartBtn />
          </Suspense>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
