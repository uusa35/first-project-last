"use client";
import { Category, Product, Slide } from "@/src/types/queries";
import Image from "next/image";
import React, {
  LegacyRef,
  ReactElement,
  ReactHTMLElement,
  useEffect,
  useRef,
} from "react";
import Slider from "react-slick";
import CustomSlider from "@/components/CustomSlider";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import ProductWidget from "@/components/widgets/ProductWidget";
import { setOrderType } from "@/app/actions";
import { changeOrderType } from "@/src/redux/slices/settingSlice";
import { useAppDispatch } from "@/src/redux/hooks";
import { Locale, countriesList } from "@/src/types";
import Link from "next/link";
import { appLinks } from "@/src/links";
import CategoryCard from "@/components/category/CategoryCard";
import { categoriesSliderSettings } from "@/utils/helpers";
import { slidesToShow } from "@/src/constants";
import { CategoriesSlider } from "../sliders/CategoriesSlider";

type Props = {
  categories: Category[];
  slides: Slide[];
  products: Product[];
  lang: Locale["lang"];
  country: countriesList;
};
export default function HomeContent({
  categories,
  slides,
  products,
  lang,
  country,
}: Props) {
  const dispatch = useAppDispatch();
  const refSlider2 = useRef<Slider | null>(null);

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

  const handleOrderType = async (orderType: "pickup" | "delivery") => {
    await setOrderType(orderType).then(() =>
      dispatch(changeOrderType(orderType))
    );
  };

  const RenderArrows = () => {
    return (
      <div className='slider-arrow flex gap-x-2'>
        <button
          className='arrow-btn prev w-8 h-8 rounded-full bg-[#EEE]'
          onClick={() => refSlider2?.current?.slickPrev()}>
          <KeyboardArrowLeft />
        </button>
        <button
          className='arrow-btn next w-8 h-8 rounded-full bg-[#EEE]'
          onClick={() => refSlider2?.current?.slickNext()}>
          <KeyboardArrowRight />
        </button>
      </div>
    );
  };

  return (
    <div>
      <CategoriesSlider lang={lang} country={country} categories={categories} />

      {/* filters and   items*/}
      <div className='page-padding'>
        {/* filters */}
        <div></div>
        {/* slider  */}
        <div className='my-10'>
          <CustomSlider slides={slides} />
        </div>

        {/* new to picks */}
        <div className='my-5'>
          <div className='flex justify-between mb-3'>
            <p>New Picks</p>
            <div className='flex gap-x-3'>
              <p>See all</p>
              <RenderArrows />
            </div>
          </div>
          <div>
            <Slider {...settings2} ref={(c) => (refSlider2.current = c)}>
              {products &&
                products.map((itm) => (
                  <ProductWidget
                    product={itm}
                    key={itm.id}
                    lang={lang}
                    country={country}
                  />
                ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}
