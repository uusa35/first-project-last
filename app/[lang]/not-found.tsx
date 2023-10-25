import { MainContextLayout } from "@/layouts/MainContentLayout";
import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/types/index";
import { getSetting } from "@/utils/setting";
import Link from "next/link";
import { headers } from "next/headers";
import { Setting } from "@/types/queries";
import { cookies } from "next/headers";

export default async function () {
  const cookieStore = cookies();
  const lang: any = cookieStore.get("NEXT_LOCALE");
  // const headersList = headers();
  // const prepareLang: any = headers().get("referer")?.split("//");
  // const lang: any = prepareLang ? prepareLang[1]?.split("/")[1] : "en";
  const [{ trans }, setting]: [{ trans: any }, Setting] = await Promise.all([
    getDictionary(lang.value),
    getSetting(lang.value),
  ]);
  return (
    <MainContextLayout
      trans={trans}
      lang={lang}
      searchParams={``}
      setting={setting}>
      <main className='relative isolate mx-auto flex flex-col gap-y-6 justify-center items-center max-w-7xl min-h-screen capitalize'>
        <div>
          <h2 className='text-2xl'>{trans.not_found}</h2>
        </div>
        <div>
          <p className='text-xl'>
            {trans.element_u_looking_for_does_not_exist}
          </p>
        </div>
        <div>
          <Link href={`/${lang}`} className='text-xl'>
            {trans.return_home}
          </Link>
        </div>
      </main>
    </MainContextLayout>
  );
}
