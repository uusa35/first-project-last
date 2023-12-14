"use client";
import { Slide } from "@/src/types/queries";
import { adsSliderSettings } from "@/src/constants";
import { Locale, countriesList } from "@/src/types";
import Slider from "react-slick";
import Image from "next/image";
import { isEmpty } from "lodash";

type Props = {
  lang: Locale["lang"];
  slides: Slide[];
};
export default function ({ lang, slides }: Props) {
  const renderArrows = () => {
    return (
      <div className="slider-arrow">
        {/* <ButtonBase
            className="arrow-btn prev"
            onClick={() => this.slider.slickPrev()}
          >
            <ArrowLeft />
          </ButtonBase>
          <ButtonBase
            className="arrow-btn next"
            onClick={() => this.slider.slickNext()}
          >
            <ArrowRight />
          </ButtonBase> */}
      </div>
    );
  };

  return (
    <div className="my-10">
      {!isEmpty(slides) && (
        <Slider {...adsSliderSettings} rtl={lang === "ar"}>
          {slides.map((s) => (
            <Image
              key={s.id}
              alt={"slider"}
              src={s.image}
              width={1000}
              height={1000}
              className="w-full h-auto aspect-[2/1] object-fill object-bottom"
            />
          ))}
        </Slider>
      )}
    </div>
  );
}
