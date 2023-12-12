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
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  ArrowPathIcon,
  ChevronRightIcon,
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";
import PageHeader from "@/src/components/PageHeader";

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

const people = [
  {
    name: "Michael Foster",
    role: "Co-Founder / CTO",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
  },
  {
    name: "Michael Foster",
    role: "Co-Founder / CTO",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
  },
];

const secondaryFeatures = [
  {
    name: "Push to deploy",
    description:
      "Commodo nec sagittis tortor mauris sed. Turpis tortor quis scelerisque diam id accumsan nullam tempus. Pulvinar etiam lacus volutpat eu. Phasellus praesent ligula sit faucibus.",
    href: "#",
    icon: CloudArrowUpIcon,
  },
  {
    name: "SSL certificates",
    description:
      "Pellentesque enim a commodo malesuada turpis eleifend risus. Facilisis donec placerat sapien consequat tempor fermentum nibh.",
    href: "#",
    icon: LockClosedIcon,
  },
  {
    name: "Simple queues",
    description:
      "Pellentesque sit elit congue ante nec amet. Dolor aenean curabitur viverra suspendisse iaculis eget. Nec mollis placerat ultricies euismod ut condimentum.",
    href: "#",
    icon: ArrowPathIcon,
  },
];

export default async function ({ params: { lang } }: Props) {
  const country: any = await getCountryNameCookie();
  const [{ trans }, faqs]: [{ trans: any }, AppQueryResult<Faq[]>] =
    await Promise.all([getDictionary(lang), getFaqs()]);

  return (
    <MainContextLayout trans={trans} lang={lang} country={country ?? "kw"}>
      <PageHeader img={``} title={`faqs`} />

      <div className='bg-white py-14 sm:py-22'>
        <div className='mx-auto  max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl lg:text-center'>
            <h2 className='text-base font-semibold leading-7 text-indigo-600'>
              Deploy faster
            </h2>
            <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              Everything you need to deploy your app
            </p>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              Quis tellus eget adipiscing convallis sit sit eget aliquet quis.
              Suspendisse eget egestas a elementum pulvinar et feugiat blandit
              at. In mi viverra elit nunc.
            </p>
          </div>
          <div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none'>
            <dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3'>
              {secondaryFeatures.map((feature) => (
                <div key={feature.name} className='flex flex-col'>
                  <dt className='flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900'>
                    <feature.icon
                      className='h-5 w-5 flex-none text-indigo-600'
                      aria-hidden='true'
                    />
                    {feature.name}
                  </dt>
                  <dd className='mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600'>
                    <p className='flex-auto'>{feature.description}</p>
                    <p className='mt-6'>
                      <a
                        href={feature.href}
                        className='text-sm font-semibold leading-6 text-indigo-600'>
                        Learn more <span aria-hidden='true'>→</span>
                      </a>
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div className='bg-white py-14 sm:py-22'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl lg:mx-0'>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              Our team
            </h2>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              We’re a dynamic group of individuals who are passionate about what
              we do and dedicated to delivering the best results for our
              clients.
            </p>
          </div>
          <ul
            role='list'
            className='mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6'>
            {people.map((person) => (
              <li key={person.name}>
                <img
                  className='mx-auto h-24 w-24 rounded-full'
                  src={person.imageUrl}
                  alt=''
                />
                <h3 className='mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900'>
                  {person.name}
                </h3>
                <p className='text-sm leading-6 text-gray-600'>{person.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
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
