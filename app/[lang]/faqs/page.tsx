import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { MainContextLayout } from "@/layouts/MainContentLayout";
import { cookies } from "next/headers";
import { getCountryNameCookie } from "@/app/actions";
import { AppQueryResult, Faq } from "@/src/types/queries";
import { getFaqs } from "@/utils/faq";
import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import FaqWidget from "@/src/components/faq/FaqWidget";
import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";

type Props = {
  params: { lang: Locale["lang"] };
};

const features = [
  {
    name: "Push to deploy.",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "SSL certificates.",
    description:
      "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.",
    icon: LockClosedIcon,
  },
  {
    name: "Database backups.",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: ServerIcon,
  },
];
export default async function ({ params: { lang } }: Props) {
  const country: any = await getCountryNameCookie();
  const [{ trans }, faqs]: [{ trans: any }, AppQueryResult<Faq[]>] =
    await Promise.all([getDictionary(lang), getFaqs()]);

  return (
    <MainContextLayout trans={trans} lang={lang} country={country ?? "kw"}>
      <div className='overflow-hidden bg-white py-14 sm:py-22'>
        <div className='mx-auto max-w-7xl md:px-6 lg:px-8'>
          <div className='grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start'>
            <div className='px-6 lg:px-0 lg:pr-4 lg:pt-4'>
              <div className='mx-auto max-w-2xl lg:mx-0 lg:max-w-lg'>
                <h2 className='text-base font-semibold leading-7 text-indigo-600'>
                  Deploy faster
                </h2>
                <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                  A better workflow
                </p>
                <p className='mt-6 text-lg leading-8 text-gray-600'>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Maiores impedit perferendis suscipit eaque, iste dolor
                  cupiditate blanditiis ratione.
                </p>
                <dl className='mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none'>
                  {features.map((feature) => (
                    <div key={feature.name} className='relative pl-9'>
                      <dt className='inline font-semibold text-gray-900'>
                        <feature.icon
                          className='absolute left-1 top-1 h-5 w-5 text-indigo-600'
                          aria-hidden='true'
                        />
                        {feature.name}
                      </dt>{" "}
                      <dd className='inline'>{feature.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <div className='sm:px-6 lg:px-0'>
              <div className='relative isolate overflow-hidden bg-indigo-500 px-6 pt-8 sm:mx-auto sm:max-w-2xl sm:rounded-3xl sm:pl-16 sm:pr-0 sm:pt-16 lg:mx-0 lg:max-w-none'>
                <div
                  className='absolute -inset-y-px -left-3 -z-10 w-full origin-bottom-left skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white'
                  aria-hidden='true'
                />
                <div className='mx-auto max-w-2xl sm:mx-0 sm:max-w-none'>
                  <img
                    src='https://tailwindui.com/img/component-images/project-app-screenshot.png'
                    alt='Product screenshot'
                    width={2432}
                    height={1442}
                    className='-mb-12 w-[57rem] max-w-none rounded-tl-xl bg-gray-800 ring-1 ring-white/10'
                  />
                </div>
                <div
                  className='pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 sm:rounded-3xl'
                  aria-hidden='true'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-white'>
        <div className='mx-auto max-w-7xl px-6 py-14 sm:py-22 lg:px-8 lg:py-40'>
          <div className='mx-auto max-w-4xl divide-y divide-gray-900/10'>
            <h2 className='text-2xl font-bold leading-10 tracking-tight text-gray-900'>
              Frequently asked questions
            </h2>
            <dl className='mt-10 space-y-6 divide-y divide-gray-900/10'>
              {faqs.data.map((faq, i) => (
                <FaqWidget faq={faq} />
              ))}
            </dl>
          </div>
        </div>
      </div>
    </MainContextLayout>
  );
}
