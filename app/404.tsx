import { MainContextLayout } from "@/layouts/MainContentLayout";
import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/types/index";
import { getSetting } from "@/utils/setting";
import Link from "next/link";
import { headers } from "next/headers";

export default async function () {
  const lang: any = headers().get("Accept-Lang");
  const [{ trans }, setting] = await Promise.all([
    getDictionary(lang),
    getSetting(lang),
  ]);
  return (
    <MainContextLayout
      trans={trans}
      lang={lang}
      searchParams={``}
      setting={setting}>
      <main className='relative isolate mx-auto max-w-7xl min-h-screen'>
        <h2>Post Not Found</h2>
        <p>Could not find requested resource</p>
        <Link href='/'>Return Home</Link>
      </main>
    </MainContextLayout>
  );
}