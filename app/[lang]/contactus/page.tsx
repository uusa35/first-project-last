import { MainContextLayout } from "@/components/MainContentLayout";
import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { getSetting } from "@/utils/setting";
import Image from "next/image";
import { FormEvent } from "react";
import type { Metadata } from "next";

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
          <Image
            width={1000}
            height={1000}
            className='h-64 w-full bg-gray-50 object-cover sm:h-80 lg:absolute lg:h-full'
            src='https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=2560&h=3413&&q=80'
            alt={setting.name}
          />
        </div>
        <div className='pb-24 pt-16 sm:pb-32 sm:pt-24 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:pt-32'>
          <div className='px-6 lg:px-8'>
            <div className='mx-auto max-w-xl lg:mx-0 lg:max-w-lg'>
              <h2 className='text-3xl font-bold tracking-tight text-gray-900'>
                {trans.contactus}
              </h2>
              <p className='mt-2 text-lg leading-8 text-gray-600'>
                Proin volutpat consequat porttitor cras nullam gravida at orci
                molestie a eu arcu sed ut tincidunt magna.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainContextLayout>
  );
}
