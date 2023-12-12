import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { MainContextLayout } from "@/layouts/MainContentLayout";
import { cookies } from "next/headers";
import { getCountryNameCookie } from "@/app/actions";
import Image from "next/image";

type Props = {
  params: { lang: Locale["lang"] };
};

export default async function ({ params: { lang } }: Props) {
  const country: any = await getCountryNameCookie();
  const [{ trans }]: [{ trans: any }] = await Promise.all([
    getDictionary(lang),
  ]);

  return (
    <MainContextLayout trans={trans} lang={lang} country={country ?? "kw"}>
      <Image
        src='https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2830&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply'
        alt='testing'
        width={1000}
        height={1000}
        className='absolute inset-0 -z-10 h-full w-full object-cover'
      />
      <div className='mx-auto max-w-2xl w-full lg:w-3/4  text-white flex flex-col  justify-center items-center h-[40vh]'>
        <h1 className='mb-5 text-3xl font-semibold text-center px-5 capitalize'>
          about us
        </h1>
      </div>
    </MainContextLayout>
  );
}
