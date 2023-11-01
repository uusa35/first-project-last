import { MainContextLayout } from "@/layouts/MainContentLayout";
import { Locale, TranslationType } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { getSetting } from "@/utils/setting";
import Image from "next/image";
import RegisterImage from "@/appImages/register/sponsors-company-signup.jpg";
import LoginImage from "@/appImages/register/visitors-signup.jpg";
import Link from "next/link";
import { appLinks } from "@/src/links";
import { RegisterContent } from "@/components/register/RegisterContent";
import { Country, Role, Setting } from "@/types/queries";
import { getCountries } from "@/utils/country";

type Props = {
  params: { lang: Locale["lang"]; role: Role["name"] };
};

export async function generateMetadata({ params }: Props) {
  const { trans } = await getDictionary(params.lang);
  return {
    title: `${trans.registeration} ${
      params.role === "visitor" ? trans.visitors : trans.subscriptions
    }`,
  };
}

export default async function ({ params: { lang, role } }: Props) {
  const [{ trans }, setting, country]: [any, Setting, Country] =
    await Promise.all([
      getDictionary(lang),
      getSetting(lang),
      getCountries(`lang=${lang}&limit=1`, lang),
    ]);

  return (
    <MainContextLayout
      trans={trans}
      lang={lang}
      searchParams={``}
      setting={setting}>
      <div className='flex flex-1 mx-auto max-w-7xl min-h-screen'>
        <div className='flex flex-1 flex-col justify-start px-4 py-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
          <div className='mx-auto w-full  max-w-sm  lg:w-96  '>
            <div className='flex flex-col justify-center'>
              <Image
                width={200}
                height={200}
                className=' w-auto object-contain'
                src={setting.image}
                alt={setting.name}
              />
              <h2 className='mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                {trans.welcome}
              </h2>
              <p className='mt-2 text-sm leading-6 text-gray-700'>
                {trans.Welcome_Register_now_and_join_us}
              </p>
            </div>
            <RegisterContent role={role} country={country[0]} />
          </div>
        </div>
        <div className='relative hidden w-0 flex-1 lg:block'>
          <Image
            className='absolute inset-0 h-full w-full object-cover'
            width={600}
            height={1000}
            src={role === "company" ? RegisterImage.src : LoginImage.src}
            alt={setting.name}
          />
        </div>
      </div>
    </MainContextLayout>
  );
}
