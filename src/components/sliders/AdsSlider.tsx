import React from "react";
import { Slide } from "@/types/queries";
import { isEmpty } from "lodash";
import Slider from "react-slick";
import Image from "next/image";

type Props = {
  slides: Slide[];
};

export default function AdsSlider({ slides }: Props) {
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
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  const renderArrows = () => {
    return (
      <div className='slider-arrow'>
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
              className='w-full h-auto aspect-[2/1] object-fill object-bottom'
            />
          ))}
        </Slider>
      )}
    </>
  );
}
