import { MainContextLayout } from "@/layouts/MainContentLayout";
import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { getSetting } from "@/utils/setting";
import Image from "next/image";
import { Country, Membership, Setting } from "@/types/queries";
import { getMembership } from "@/utils/membership";
import { getCountries } from "@/utils/country";
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { removeTags } from "@/utils/helpers";
import { MainGallery } from "@/components/home/MainGallery";
import { appLinks } from "@/src/links";
import DOMPurify from "isomorphic-dompurify";
import { getPrice } from "@/src/constants";
import BackBtn from "@/components/BackBtn";

type Props = {
  params: { lang: Locale["lang"]; id: string };
};

export async function generateMetadata({ params }: Props) {
  const [membership, setting]: [Membership, Setting] = await Promise.all([
    getMembership(params.id, params.lang),
    getSetting(),
  ]);
  if (!membership || !membership.id) {
    throw notFound();
  }
  return {
    title: membership.name,
    description: removeTags(
      membership.description ?? setting.caption ?? setting.description
    ),
    openGraph: {
      title: membership.name,
      description: removeTags(
        membership.description ?? setting.caption ?? setting.description
      ),
      url: membership.instagram ?? membership.website ?? setting.website,
      siteName: membership.name,
      images: [
        {
          url: membership.image ?? setting.image,
          width: 800,
          height: 600,
        },
        {
          url: membership.image ?? setting.image,
          width: 1800,
          height: 1600,
          alt: membership.name,
        },
      ],
      locale: params.lang,
      type: "website",
    },
    twitter: {
      card: membership.name,
      title: membership.name,
      description: removeTags(
        membership.description ?? setting.caption ?? setting.description
      ),
      // siteId: "1467726470533754880",
      creator: setting.name,
      // creatorId: "1467726470533754880",
      images: [membership.image ?? setting.image],
    },
  };
}

export default async function ({ params: { lang, id } }: Props) {
  const cookieStore = cookies();
  const token: any = cookieStore.get("token");
  const [{ trans }, setting, country, membership]: [
    { trans: any },
    Setting,
    Country[],
    Membership
  ] = await Promise.all([
    getDictionary(lang),
    getSetting(),
    getCountries(`lang=${lang}&limit=1`, lang),
    getMembership(id, lang),
  ]);

  return (
    <MainContextLayout trans={trans} lang={lang} setting={setting}>
      <main className='relative isolate mx-auto max-w-7xl min-h-screen'>
        <BackBtn />
        <div className='bg-white py-12 sm:py-22'>
          <div className='mx-auto max-w-7xl px-6 lg:px-8'>
            <div className='mx-auto max-w-2xl sm:text-center'>
              <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl capitalize'>
                {membership.name}
              </h2>
              <p className='mt-6 text-lg leading-8 text-gray-600 capitalize'>
                {membership.caption}
              </p>
            </div>
            <div className='mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex flex-col lg:max-w-none'>
              <div>
                <div className='rounded-lg'>
                  <Image
                    src={membership.large}
                    alt={membership.name}
                    width={1000}
                    height={500}
                    className='aspect-[9/5] sm:aspect-[9/3] w-full  object-cover rounded-t-3xl'
                  />
                </div>
              </div>
              <div className='flex flex-col md:flex-row mt-6'>
                <div className='p-8 sm:p-10 lg:flex-auto'>
                  <h3
                    className='text-2xl font-bold tracking-tight text-gray-900'
                    style={{ color: `${membership.color}` }}>
                    {membership.name}
                  </h3>

                  <div className='mt-10 flex items-center gap-x-4'>
                    <h4 className='flex-none text-sm font-semibold leading-6 text-expo-dark capitalize'>
                      {trans.membership_features}
                    </h4>
                    <div className='h-px flex-auto bg-gray-100' />
                  </div>
                  <div
                    className='my-4  leading-loose whitespace-pre-line text-ellipsis overflow-hidden'
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(membership.description),
                    }}
                  />
                  {/* content */}
                </div>
                <div className='-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0'>
                  <div className='rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16'>
                    <div className='mx-auto max-w-xs px-8'>
                      <p className='text-base font-semibold text-gray-600 capitalize'>
                        {trans.subscribe_now_to_book_ur_place}
                      </p>
                      {membership.on_sale && (
                        <p className='mt-6  flex items-baseline gap-x-1'>
                          <span
                            className={
                              "text-red-800 text-4xl font-bold tracking-tight"
                            }>
                            {getPrice(
                              membership.sale_price,
                              country[0]
                            ).toFixed(2)}
                          </span>
                          <span
                            className={
                              "text-red-900 text-lg font-semibold leading-6"
                            }>
                            {country[0].currency_symbol}
                          </span>
                        </p>
                      )}
                      <p className='mt-6  flex items-baseline gap-x-1'>
                        <span
                          className={`text-gray-900 ${
                            membership.on_sale
                              ? `text-xl line-through`
                              : `text-4xl`
                          }  font-bold tracking-tight`}>
                          {getPrice(membership.price, country[0]).toFixed(2)}
                        </span>
                        <span
                          className={
                            "text-gray-600 text-lg font-semibold leading-6 uppercase"
                          }>
                          {country[0].currency_symbol}
                        </span>
                      </p>
                      {token && token.value ? (
                        <Link
                          href={appLinks.cartIndex(lang, membership.id)}
                          className={`mt-10 block w-full rounded-md btn-default capitalize hover:opacity-80`}
                          style={{
                            backgroundColor: `${membership.color}`,
                          }}>
                          {trans.subscribe_now}
                        </Link>
                      ) : (
                        <Link
                          href={appLinks.login(lang)}
                          className={`mt-10 block w-full rounded-md btn-default capitalize hover:opacity-80`}
                          style={{
                            backgroundColor: `${membership.color}`,
                          }}>
                          {trans.subscribe_now}
                        </Link>
                      )}
                      {membership.on_sale && (
                        <p className='mt-6 text-xs leading-5 text-gray-600 capitalize'>
                          {trans.get_access_now_there_is_offer}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {membership.images && membership.images.length > 0 && (
              <MainGallery
                images={membership.images}
                setting={setting}
                message={membership.name}
              />
            )}
          </div>
        </div>
      </main>
    </MainContextLayout>
  );
}
