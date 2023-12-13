import React from "react";
import Slider from "react-slick";
import CategoryWidget from "./widgets/CategoryWidget";
import { Category } from "../types/queries";
import { Locale, countriesList } from "../types";

type Props = {
  categories: Category[];
  lang: Locale["lang"];
  country: countriesList;
};

export default function CategoriesSlider({ country, lang, categories }: Props) {
  const settings = {
    dots: false,
    speed: 500,
    infinite: false,
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows: true,
    // className: "center",
    // centerMode: true,
    // infinite: true,
    // centerPadding: "60px",
  };
  return (
    <div className="py-3 relative mt-24 page-padding bg-picks-gray border-b border-picks-border">
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
