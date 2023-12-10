"use client";
import { Category, Product, Slide } from "@/src/types/queries";
import Image from "next/image";
import React, {
  LegacyRef,
  ReactElement,
  ReactHTMLElement,
  useRef,
} from "react";
import Slider from "react-slick";
import CustomSlider from "../CustomSlider";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import ProductWidget from "../widgets/ProductWidget";

type Props = {
  categories: Category[];
  slides: Slide[];
  products: Product[];
};
export default function HomeContent({ categories, slides, products }: Props) {
  const refSlider2 = useRef<Slider | null>(null);
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

  const settings2 = {
    dots: false,
    speed: 500,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    // className: "center",
    // centerMode: true,
    // infinite: true,
    // centerPadding: "60px",
  };

  const RenderArrows = () => {
    return (
      <div className="slider-arrow flex gap-x-2">
        <button
          className="arrow-btn prev w-8 h-8 rounded-full bg-[#EEE]"
          onClick={() => refSlider2?.current?.slickPrev()}
        >
          <KeyboardArrowLeft />
        </button>
        <button
          className="arrow-btn next w-8 h-8 rounded-full bg-[#EEE]"
          onClick={() => refSlider2?.current?.slickNext()}
        >
          <KeyboardArrowRight />
        </button>
      </div>
    );
  };

  const CategoryComponent = ({
    category,
  }: {
    category: Category;
  }): React.ReactNode => {
    return (
      <div className="px-5">
        <div className="flex items-center gap-x-2 bg-white rounded-full py-2 px-3 w-fit">
          <Image
            alt={category.name}
            src={category.image}
            width={1000}
            height={1000}
            className="w-5 h-5"
          />
          <p className="text-black">{category.name}</p>
        </div>
      </div>
    );
  };
  return (
    <div>
      <div className="py-5 relative mt-24 page-padding bg-picks-gray border-b border-picks-border">
        <Slider {...settings}>
          {categories.map((itm) => (
            <CategoryComponent category={itm} key={itm.id} />
          ))}
        </Slider>
      </div>

      {/* filters and   items*/}
      <div className="page-padding">
        {/* filters */}
        <div></div>
        {/* slider  */}
        <div className="my-10">
          <CustomSlider slides={slides} />
        </div>

        {/* new to picks */}
        <div className="my-5">
          <div className="flex justify-between mb-3">
            <p>New Picks</p>
            <div className="flex gap-x-3">
              <p>See all</p>
              <RenderArrows />
            </div>
          </div>
          <div>
            <Slider {...settings2} ref={(c) => (refSlider2.current = c)}>
              {products.map((itm) => (
                <ProductWidget product={itm} key={itm.id} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}
