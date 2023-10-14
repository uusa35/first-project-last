import { Carousel, Typography, Button } from "@/components/MainContentLayout";
import { tajawal } from "@/utils/helpers";
import Image from "next/image";
import { Locale } from "@/types/index";
import { Slide } from "@/types/queries";

type Props = {
  slides: Slide[];
  lang: Locale["lang"];
};
export default async function ({ slides, lang }: Props) {
  return (
    <Carousel
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={`border-4 max-h-[500px] xl:max-h-[750px]  overflow-hidden`}>
      {slides.map((s: Slide, i: number) => (
        <div className='relative h-full w-full' key={i}>
          <Image
            width='1000'
            height='500'
            src={s.image}
            alt={`${process.env.NEXT_PUBLIC_BASE_URL}`}
            className='h-full w-full object-contain'
          />
          <div className='absolute -bottom-20  lg:-bottom-40 lg:rtl:right-20 lg:ltr:left-20  grid h-full w-full items-center'>
            <div className='w-3/4 ps-12 md:w-2/4 md:ps-20 lg:ps-32'>
              <Typography
                color='white'
                className={`mb-4 text-3xl md:text-4xl lg:text-5xl text-md ${tajawal.className}`}>
                {s.name}
              </Typography>
              <Typography
                variant='lead'
                color='white'
                className={`mb-12 opacity-80 hidden lg:block text-sm ${tajawal.className}`}>
                {s.description}
              </Typography>
              <div className='flex gap-2 hidden'>
                <Button size='lg' color='white'>
                  Explore
                </Button>
                <Button size='lg' color='white' variant='text'>
                  Gallery
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
}
