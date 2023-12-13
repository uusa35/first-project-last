"use client";
import { Category, Product, Slide, User } from "@/src/types/queries";
import React, { useRef } from "react";
import Slider from "react-slick";
import { setOrderType } from "@/app/actions";
import { changeOrderType } from "@/src/redux/slices/settingSlice";
import { useAppDispatch } from "@/src/redux/hooks";
import { Locale, countriesList } from "@/src/types";
import VendorWidget from "../widgets/VendorWidget";
import CategoriesSlider from "../CategoriesSlider";
import AdsSlider from "@/src/components/AdsSlider";
import CustomSlider from "../CustomSlider";
import FlashOffers from "./FlashOffers";

type Props = {
  categories: Category[];
  slides: Slide[];
  products: Product[];
  vendors: User[];
  lang: Locale["lang"];
  country: countriesList;
};
export default function HomeContent({
  categories,
  slides,
  lang,
  country,
  vendors,
  products,
}: Props) {
  const dispatch = useAppDispatch();

  const handleOrderType = async (orderType: "pickup" | "delivery") => {
    await setOrderType(orderType).then(() =>
      dispatch(changeOrderType(orderType))
    );
  };

  return (
    <div>
      <CategoriesSlider lang={lang} categories={categories} country={country} />

      {/* filters and   items*/}
      <div className="page-padding">
        {/* filters */}
        <div></div>

        {/* slider  */}
        <div className="my-10">
          <AdsSlider slides={slides} />
        </div>

        {/* new to picks */}
        <CustomSlider
          vendors={vendors}
          lang={lang}
          country={country}
          title="New Picks"
        />

        {/* flash offers */}
        <FlashOffers products={products}  />
      </div>
    </div>
  );
}
