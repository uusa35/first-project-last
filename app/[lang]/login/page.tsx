import { MainContextLayout } from "@/layouts/MainContentLayout";
import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { getSetting } from "@/utils/setting";
import Image from "next/image";
import LoginImage from "@/appImages/order/banner.jpeg";
import LoginContent from "@/components/login/LoginContent";
import { Setting } from "@/types/queries";

type Props = {
  params: { lang: Locale["lang"] };
};

export async function generateMetadata({ params }: Props) {
  const { trans } = await getDictionary(params.lang);
  return {
    title: trans.login,
  };
}

export default async function ({ params: { lang } }: Props) {
  const [{ trans }, setting]: [any, Setting] = await Promise.all([
    getDictionary(lang),
    getSetting(lang),
  ]);

  return (
    <MainContextLayout
      trans={trans}
      lang={lang}
      setting={setting}>
      <div className='flex flex-1 mx-auto max-w-7xl min-h-screen'>
        <div className='flex flex-1 flex-col justify-start px-4 py-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
          <div className='mx-auto w-full  max-w-sm  lg:w-96  space-y-6 '>
            <div className='flex flex-col justify-center'>
              <Image
                width={200}
                height={200}
                className=' w-auto object-contain'
                src={setting.image}
                alt={setting.name}
              />
              <h2 className='mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900 capitalize'>
                {trans.welcome_back}
              </h2>
              <p className='mt-2 text-sm leading-6 text-gray-500 capitalize'>
                {trans.welcome_back_Please_enter_the_following_information}
              </p>
            </div>
            <LoginContent lang={lang} />
          </div>
        </div>
        <div className='relative hidden w-0 flex-1 lg:block'>
          <Image
            className='absolute inset-0 h-full w-full object-cover'
            width={600}
            height={1000}
            src={LoginImage}
            alt={setting.name}
          />
        </div>
      </div>
    </MainContextLayout>
  );
}
