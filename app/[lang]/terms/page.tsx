import { MainContextLayout } from "@/layouts/MainContentLayout";
import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { getSetting } from "@/utils/setting";
import LoginImage from "@/appImages/order/banner.jpeg";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import { Setting } from "@/types/queries";

type Props = {
  params: { lang: Locale["lang"] };
};

export async function generateMetadata({ params }: Props) {
  const { trans } = await getDictionary(params.lang);
  return {
    title: trans.aboutus,
  };
}

export default async function ({ params: { lang } }: Props) {
  const [{ trans }, setting]: [{ trans: any }, Setting] = await Promise.all([
    getDictionary(lang),
    getSetting(lang),
  ]);

  return (
    <MainContextLayout trans={trans} lang={lang} setting={setting}>
      <main className='relative isolate mx-auto max-w-7xl min-h-screen'>
        {/* Image section */}
        <div className='mt-8 sm:mt-8 xl:mx-auto xl:max-w-7xl'>
          <Image
            className='aspect-[9/3] w-full object-cover xl:rounded-lg'
            width={600}
            height={1000}
            src={LoginImage}
            alt={setting.name}
          />
        </div>
        {/* Header section */}
        <div className='px-6 pt-12 lg:px-8'>
          <div className='mx-auto max-w-7xl text-center py-10'>
            <h2 className='text-4xl font-bold tracking-tight text-black sm:text-4xl'>
              {setting.name}
            </h2>
            <p className='mt-6 text-lg leading-8 text-gray-800'>
              {setting.caption}
            </p>
          </div>
        </div>
        {/* Content section */}
        <div className='mx-auto mt-8 max-w-7xl px-6 lg:px-8 pb-16'>
          <div className='mx-auto  lg:mx-0 lg:max-w-none'>
            <div className='grid grid-cols-1 gap-8 text-base leading-7 text-gray-800 max-w-xs md:max-w-md lg:max-w-7xl capitalize'>
              <h3 className='text-xl lg:text-2xl text-center'>{trans.terms}</h3>
              <div
                className='max-w-xs sm:max-w-xl md:max-w-full  whitespace-pre-line text-ellipsis overflow-hidden'
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(setting.terms),
                }}></div>
            </div>
          </div>
        </div>
      </main>
    </MainContextLayout>
  );
}
