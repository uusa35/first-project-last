"use client";
import React from "react";
import Slider, { Settings } from "react-slick";
import CategoryWidget from "../widgets/CategoryWidget";
import { Category } from "../../types/queries";
import { Locale, countriesList } from "../../types";

type Props = {
  categories: Category[];
  lang: Locale["lang"];
  country: countriesList;
};

export default function CategoriesSlider({ country, lang, categories }: Props) {
  const settings: any = {
    dots: false,
    speed: 500,
    infinite: false,

    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 7,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };
  return (
    <div className='py-3 relative mt-24 page-padding bg-picks-gray border-b border-picks-border'>
      <Slider {...settings}>
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
