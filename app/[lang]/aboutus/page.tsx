import { MainContextLayout } from "@/components/MainContentLayout";
import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { getSetting } from "@/utils/setting";
import LoginImage from "@/appImages/login/section.jpg";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";

export default async function Aboutus({
  params: { lang },
}: {
  params: { lang: Locale["lang"] };
}) {
  const [{ trans }, setting] = await Promise.all([
    getDictionary(lang),
    getSetting(lang),
  ]);

  return (
    <MainContextLayout trans={trans} lang={lang} searchParams={``}>
      <main className='relative isolate mx-auto max-w-7xl min-h-screen'>
        {/* Image section */}
        <div className='mt-8 sm:mt-8 xl:mx-auto xl:max-w-7xl xl:px-8'>
          <Image
            className='aspect-[9/4] w-full object-cover xl:rounded-3xl'
            width={600}
            height={1000}
            src={LoginImage.src}
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
            <div className='grid grid-cols-1 gap-8 text-base leading-7 text-gray-800 lg:max-w-7xl capitalize'>
              <h3>{trans.description}</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(setting.description),
                }}></div>
              <h3>{trans.aboutus}</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(setting.aboutus),
                }}></div>
              <h3>{trans.services}</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(setting.services),
                }}></div>
              <h3>{trans.address}</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(setting.address),
                }}></div>
              <div></div>
            </div>
          </div>
        </div>
      </main>
    </MainContextLayout>
  );
}
