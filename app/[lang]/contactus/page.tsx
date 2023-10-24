import { MainContextLayout } from "@/layouts/MainContentLayout";
import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { getSetting } from "@/utils/setting";
import Image from "next/image";
import { FormEvent } from "react";
import type { Metadata } from "next";
import ContactusContent from "@/components/contactus/ContactusContent";
import ContactusImage from "@/appImages/contactus/contactus_bg.jpg";

type Props = {
  params: { lang: Locale["lang"] };
};
export async function generateMetadata({ params }: Props) {
  const { trans } = await getDictionary(params.lang);
  return {
    title: trans.contactus,
  };
}
export default async function ({ params: { lang } }: Props) {
  const [{ trans }, setting] = await Promise.all([
    getDictionary(lang),
    getSetting(lang),
  ]);

  return (
    <MainContextLayout
      trans={trans}
      lang={lang}
      searchParams={``}
      setting={setting}>
      <div className='relative bg-white mx-auto max-w-7xl min-h-screen'>
        <div className='lg:absolute lg:inset-0 lg:ltr:left-1/2 lg:rtl:right-1/2'>
          <div className='absolute top-0 p-10 lg:p-24 text-white z-40'>
            <div className='flex flex-col gap-y-4'>
              <h4>{setting.name}</h4>
              <h4>{setting.caption}test</h4>
            </div>
          </div>
          <Image
            width={1000}
            height={1000}
            className='h-64 w-full bg-gray-50 object-cover sm:h-80 lg:absolute lg:h-full'
            src={ContactusImage}
            alt={setting.name}
          />
        </div>
        <div className='pb-24 pt-16 sm:pb-32 sm:pt-24 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:pt-32'>
          <div className='px-6 lg:px-8'>
            <div className='mx-auto max-w-xl lg:mx-0 lg:max-w-lg'>
              <h2 className='text-3xl font-bold tracking-tight text-gray-900'>
                {trans.contactus}
              </h2>
              <p className='mt-2 text-lg leading-extra-loose text-gray-600'>
                {trans.contactus_message}
              </p>
            </div>
            <ContactusContent lang={lang} />
          </div>
        </div>
      </div>
    </MainContextLayout>
  );
}
