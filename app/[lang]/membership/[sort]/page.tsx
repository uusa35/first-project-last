import { MainContextLayout } from "@/layouts/MainContentLayout";
import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { getSetting } from "@/utils/setting";
import AboutusImage from "@/appImages/aboutus/banner.jpg";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import { Country, Membership, Setting } from "@/types/queries";

import { getMemberships } from "@/utils/membership";
import MembershipCard from "@/components/membership/MembershipCard";
import { getCountries } from "@/utils/country";
import Link from "next/link";
import { cookies } from "next/headers";

type Props = {
  params: { lang: Locale["lang"]; sort: Membership["sort"] };
};

export async function generateMetadata({ params }: Props) {
  const { trans } = await getDictionary(params.lang);
  return {
    title: trans[params.sort],
  };
}

export default async function ({ params: { lang, sort } }: Props) {
  const cookieStore = cookies();
  const token: any = cookieStore.get("token");

  const [{ trans }, setting, country, memberships]: [
    { trans: any },
    Setting,
    Country[],
    Membership[]
  ] = await Promise.all([
    getDictionary(lang),
    getSetting(lang),
    getCountries(`lang=${lang}&limit=1`, lang),
    getMemberships(`sort=${sort}`, lang),
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
          <div className='my-8'>
            <div className='mx-auto max-w-4xl text-center'>
              <p className='mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl capitalize'>
                {sort === "subscription"
                  ? trans.subscriptions
                  : trans.sponsorships}
              </p>
            </div>

            {token && token.value && (
              <>
                <p className='mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600'>
                  {
                    trans.register_now_and_learn_about_the_partner_and_sponsor_packages
                  }
                </p>
                <div className='flex justify-center mt-5'>
                  <Link
                    className='btn-dark-hover capitalize'
                    href={`/${lang}/register/company`}>
                    {trans.register_as_a_subscriper}
                  </Link>
                </div>
              </>
            )}
          </div>

          <div className='mx-auto  lg:mx-0 lg:max-w-none'>
            <div className='isolate mx-auto grid max-w-md grid-cols-1 gap-6 lg:mx-0 lg:max-w-none lg:grid-cols-3  '>
              {memberships.map((s: Membership, i: number) => (
                <MembershipCard
                  element={s}
                  country={country[0]}
                  lang={lang}
                  showMore={true}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </MainContextLayout>
  );
}
