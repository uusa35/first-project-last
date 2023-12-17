"use client";
import { Category, Product, Slide, User } from "@/src/types/queries";
import React from "react";
import { setOrderType } from "@/app/actions";
import { changeOrderType } from "@/src/redux/slices/settingSlice";
import { useAppDispatch } from "@/src/redux/hooks";
import { Locale, countriesList } from "@/src/types";
import CategoriesSlider from "@/components/sliders/CategoriesSlider";
import AdsSlider from "@/components/sliders/AdsSlider";
import FlashOffers from "./FlashOffers";
import VendorsSlider from "../sliders/VendorsSlider";

type Props = {
  categories: Category[];
  slides: Slide[];
  products: Product[];
  vendors: User[];
  lang: Locale["lang"];
  country: countriesList;
  featuredVendors: User[];
};
export default function ({
  categories,
  slides,
  lang,
  country,
  vendors,
  products,
  featuredVendors,
}: Props) {
  return (
    <div className=''>
      <CategoriesSlider lang={lang} categories={categories} country={country} />
      {/* filters and   items*/}
      <div className='page-padding'>
        {/* filters */}
        <div></div>
        {/* slider  */}
        <div className='my-10'>
          <AdsSlider lang={lang} country={country} slides={slides} />
        </div>
        {/* new to picks */}
        <VendorsSlider
          vendors={vendors}
          lang={lang}
          country={country}
          title='new_picks'
        />
        {/* flash offers */}
        <FlashOffers products={products} lang={lang} country={country} />

        {/* new to picks */}
        <VendorsSlider
          vendors={featuredVendors}
          lang={lang}
          country={country}
          title='featured_stores'
        />
      </div>
    </div>
  );
}
