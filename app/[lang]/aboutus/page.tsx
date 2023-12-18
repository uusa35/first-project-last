import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { MainContextLayout } from "@/layouts/MainContentLayout";
import { cookies } from "next/headers";
import { getCountryNameCookie } from "@/app/actions";
import Image from "next/image";
import PageHeader from "@/src/components/PageHeader";
import DownloadAppSection from "@/src/components/home/DownloadAppSection";
import AboutusImg from "@/appImages/about_us.png";

type Props = {
  params: { lang: Locale["lang"] };
};

const incentives = [
  {
    name: "Free shipping",
    imageSrc:
      "https://tailwindui.com/img/ecommerce/icons/icon-shipping-simple.svg",
    description:
      "It's not actually free we just price it into the products. Someone's paying for it, and it's not us.",
  },
  {
    name: "10-year warranty",
    imageSrc:
      "https://tailwindui.com/img/ecommerce/icons/icon-warranty-simple.svg",
    description:
      "If it breaks in the first 10 years we'll replace it. After that you're on your own though.",
  },
  {
    name: "Exchanges",
    imageSrc:
      "https://tailwindui.com/img/ecommerce/icons/icon-exchange-simple.svg",
    description:
      "If you don't like it, trade it to one of your friends for something of theirs. Don't send it here though.",
  },
  {
    name: "Free shipping",
    imageSrc:
      "https://tailwindui.com/img/ecommerce/icons/icon-shipping-simple.svg",
    description:
      "It's not actually free we just price it into the products. Someone's paying for it, and it's not us.",
  },
  {
    name: "10-year warranty",
    imageSrc:
      "https://tailwindui.com/img/ecommerce/icons/icon-warranty-simple.svg",
    description:
      "If it breaks in the first 10 years we'll replace it. After that you're on your own though.",
  },
  {
    name: "Exchanges",
    imageSrc:
      "https://tailwindui.com/img/ecommerce/icons/icon-exchange-simple.svg",
    description:
      "If you don't like it, trade it to one of your friends for something of theirs. Don't send it here though.",
  },
];

export async function generateMetadata({ params }: Props) {
  const { trans } = await getDictionary(params.lang);
  return {
    title: trans.aboutus,
    description: trans.aboutus,
    openGraph: {
      title: trans.aboutus,
      description: trans.aboutus,
      locale: params.lang,
      type: "website",
    },
  };
}

export default async function ({ params: { lang } }: Props) {
  const country: any = await getCountryNameCookie();
  const [{ trans }]: [{ trans: any }] = await Promise.all([
    getDictionary(lang),
  ]);

  return (
    <MainContextLayout trans={trans}>
      <PageHeader img={AboutusImg.src} title={trans.aboutus} />
      <div className='mt-20 text-black px-4 md:px-8 min-h-screen'>
        <h1 className='capitalize text-2xl'>
          what is <span className='text-picks-dark'>pick</span> App ?
        </h1>
        <p className='py-4 text-gray-500 leading-loose text-justify'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas
          delectus molestias impedit facere, nesciunt esse earum aspernatur
          ipsam tempora dignissimos excepturi laboriosam odit alias sed
          reprehenderit minima fuga quas aliquid?
        </p>
        <p className='py-4 text-gray-500 leading-loose text-justify'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas
          delectus molestias impedit facere, nesciunt esse earum aspernatur
          ipsam tempora dignissimos excepturi laboriosam odit alias sed
          reprehenderit minima fuga quas aliquid?
        </p>
        <p className='py-4 text-gray-500 leading-loose text-justify'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas
          delectus molestias impedit facere, nesciunt esse earum aspernatur
          ipsam tempora dignissimos excepturi laboriosam odit alias sed
          reprehenderit minima fuga quas aliquid?
        </p>

        <div className='bg-white'>
          <div className='mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8'>
            <div className='rounded-2xl px-6 py-6 sm:p-16'>
              <div className='mx-auto max-w-xl lg:max-w-none'>
                <div className='text-center'>
                  <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
                    We built our business on customer service
                  </h2>
                </div>
                <div className='mx-auto mt-12 grid max-w-sm grid-cols-1 gap-x-8 gap-y-10 sm:max-w-none lg:grid-cols-3'>
                  {incentives.map((incentive) => (
                    <div
                      key={incentive.name}
                      className='text-center sm:flex sm:text-left lg:block lg:text-center'>
                      <div className='sm:flex-shrink-0'>
                        <div className='flow-root'>
                          <img
                            className='mx-auto h-16 w-16'
                            src={incentive.imageSrc}
                            alt=''
                          />
                        </div>
                      </div>
                      <div className='mt-3 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-6'>
                        <h3 className='text-sm font-medium text-gray-900'>
                          {incentive.name}
                        </h3>
                        <p className='mt-2 text-sm text-gray-500'>
                          {incentive.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* customers */}
        <div className='bg-gray-50'>
          <div className='mx-auto max-w-7xl py-24 sm:px-2 sm:py-32 lg:px-4'>
            <div className='mx-auto max-w-2xl px-4 lg:max-w-none'>
              <div className='grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2'>
                <div>
                  <h2 className='text-4xl font-bold tracking-tight text-gray-900'>
                    We built our business on great customer service
                  </h2>
                  <p className='mt-4 text-gray-500'>
                    At the beginning at least, but then we realized we could
                    make a lot more money if we kinda stopped caring about that.
                    Our new strategy is to write a bunch of things that look
                    really good in the headlines, then clarify in the small
                    print but hope people don't actually read it.
                  </p>
                </div>
                <div className='aspect-h-2 aspect-w-3 overflow-hidden rounded-lg bg-gray-100'>
                  <img
                    src='https://tailwindui.com/img/ecommerce-images/incentives-07-hero.jpg'
                    alt=''
                    className='object-cover object-center'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <DownloadAppSection />
      </div>
    </MainContextLayout>
  );
}
