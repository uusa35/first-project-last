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
export default function HomeContent({
  categories,
  slides,
  lang,
  country,
  vendors,
  products,
  featuredVendors,
}: Props) {
  const dispatch = useAppDispatch();

  const handleOrderType = async (orderType: "pickup" | "delivery") => {
    await setOrderType(orderType).then(() =>
      dispatch(changeOrderType(orderType))
    );
  };

  return (
    <div>
      <CategoriesSlider lang={lang} country={country} categories={categories} />

      {/* filters and   items*/}
      <div className="page-padding">
        {/* filters */}
        <div></div>

        {/* slider  */}
        <AdsSlider slides={slides} lang={lang} />

        {/* new to picks */}
        <VendorsSlider
          vendors={vendors}
          lang={lang}
          country={country}
          title="New Picks"
        />

        {/* flash offers */}
        <FlashOffers products={products} />

        {/* new to picks */}
        <VendorsSlider
          vendors={featuredVendors}
          lang={lang}
          country={country}
          title="Featured Stores"
        />
      </div>
    </div>
  );
}
