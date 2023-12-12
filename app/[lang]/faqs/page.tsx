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

type Props = {
  params: { lang: Locale["lang"] };
};

export default async function ({ params: { lang } }: Props) {
  const country: any = await getCountryNameCookie();
  const [{ trans }, faqs]: [{ trans: any }, AppQueryResult<Faq[]>] =
    await Promise.all([getDictionary(lang), getFaqs()]);

  return (
    <MainContextLayout trans={trans} lang={lang} country={country ?? "kw"}>
      <div className='bg-white'>
        <div className='mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40'>
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
