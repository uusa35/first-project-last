"use client";
import React from "react";
import Slider from "react-slick";
import CategoryWidget from "@/components/widgets/CategoryWidget";
import { Category } from "@/types/queries";
import { Locale, countriesList } from "@/types/index";
import { categoriesSliderSettings } from "@/src/constants";

type Props = {
  categories: Category[];
  lang: Locale["lang"];
  country: countriesList;
};

export default function CategoriesSlider({ country, lang, categories }: Props) {
  return (
    <div className='py-3 relative mt-14 page-padding bg-picks-gray border-b border-picks-border'>
      <Slider {...categoriesSliderSettings}>
        {categories &&
          categories.map((itm: Category) => (
            <CategoryWidget
              category={itm}
              key={itm.id}
              lang={lang}
              country={country}
            />
          ))}
      </Slider>
    </div>
  );
}
