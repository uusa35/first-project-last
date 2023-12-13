"use client";
import { Category } from "@/src/types/queries";
import { categoriesSliderSettings } from "@/utils/helpers";
import CategoryCard from "@/components/category/CategoryCard";
import { Locale, countriesList } from "@/src/types";
import Slider from "react-slick";
import { getSlidesToShow } from "@/src/constants";
import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";

type Props = {
  lang: Locale["lang"];
  country: countriesList;
  categories: Category[];
};
export const CategoriesSlider = ({ lang, country, categories }: Props) => {
  const [slidesToShow, setSlidesToShow] = useState<number>(10);
  const { width } = useWindowSize();
  useEffect(() => {
    setSlidesToShow(getSlidesToShow(width, 2, 3, 4, 5, 7));
  }, [width]);

  console.log("slides to show", slidesToShow);
  return (
    <div className='py-5 relative mt-24 page-padding bg-picks-gray border-b border-picks-border'>
      <Slider
        {...categoriesSliderSettings}
        rlt={lang === "ar"}
        slidesToShow={slidesToShow}>
        {categories &&
          categories.map((itm: Category) => (
            <CategoryCard
              category={itm}
              key={itm.id}
              lang={lang}
              country={country}
            />
          ))}
      </Slider>
    </div>
  );
};
