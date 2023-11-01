import { MainContextLayout } from "@/layouts/MainContentLayout";
import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { getSetting } from "@/utils/setting";
import AboutusImage from "@/appImages/aboutus/banner.jpg";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import { AppQueryResult, Category, Setting } from "@/types/queries";
import { getCategories } from "@/utils/category";
import { Categories } from "@/components/Home/Categories";

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
  const [{ trans }, setting, categories]: [
    { trans: any },
    Setting,
    AppQueryResult<Category[]>
  ] = await Promise.all([
    getDictionary(lang),
    getSetting(lang),
    getCategories("", lang),
  ]);

  return (
    <MainContextLayout
      trans={trans}
      lang={lang}
      searchParams={``}
      setting={setting}>
      <main className='relative isolate mx-auto max-w-7xl min-h-screen'>
        {/* Image section */}
        <div className='mt-8 sm:mt-8 xl:mx-auto xl:max-w-7xl'>
          <div className='absolute left-10 top-10'></div>
          <div className='absolute w-full lg:max-w-6xl flex flex-col lg:flex-row  justify-center lg:justify-start items-center top-0 lg:top-32 bg-stone/60 lg:rtl:right-10 lg:ltr:left-10 p-8 text-white  gap-4  rounded-md'>
            <div className='flex flex-col justify-center lg:justify-start items-center lg:items-start gap-4 text-center rtl:text-right ltr:text-left'>
              <div className='text-2xl lg:text-4xl capitalize drop-shadow-4xl'>
                {setting.name}
              </div>
              <div className='text-lg lg:text-xl capitalize drop-shadow-4xl'>
                {setting.caption}
              </div>
            </div>
          </div>

          <Image
            fill={false}
            src={AboutusImage}
            alt={setting.name}
            className='aspect-[9/3] w-full object-cover xl:rounded-lg'
          />
        </div>

        {/* Content section */}
        <div className='mx-auto mt-8 max-w-7xl px-6 lg:px-8 pb-16'>
          <div className='mx-auto  lg:mx-0 lg:max-w-none'>
            <Categories
              showMore={false}
              lang={lang}
              categories={categories}
              trans={trans as { [key: string]: string }}
            />
          </div>
        </div>
      </main>
    </MainContextLayout>
  );
}
