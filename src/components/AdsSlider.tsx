import React from "react";
import { Slide } from "@/types/queries";
import { isEmpty } from "lodash";
import Slider from "react-slick";
import Image from "next/image";

type Props = {
  slides: Slide[];
};

export default function AdsSlider({ slides }: Props) {
  const settings = {
    dots: false,
    speed: 500,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    
    // className: "center",
    // centerMode: true,
    // infinite: true,
    // centerPadding: "60px",
  };
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
    <>
      {!isEmpty(slides) && (
        <Slider {...settings}>
          {slides.map((s) => (
            <Image
              alt={"slider"}
              src={s.image}
              width={1000}
              height={1000}
              className="w-full h-auto aspect-[2/1] object-fill object-bottom"
            />
          ))}
        </Slider>
      )}
    </>
  );
}
