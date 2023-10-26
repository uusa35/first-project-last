import { MainContextLayout } from "@/layouts/MainContentLayout";
import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/types/index";
import { getSetting } from "@/utils/setting";
import Link from "next/link";
import { Setting } from "@/types/queries";
import { cookies } from "next/headers";
import NoResultImage from "@/appImages/errors/no_result.svg";
import ErrorImage from "@/appImages/errors/404.svg";
import Image from "next/image";

export default async function () {
  const cookieStore = cookies();
  const lang: any = cookieStore.get("NEXT_LOCALE")?.value ?? "en";
  // const headersList = headers();
  // const prepareLang: any = headers().get("referer")?.split("//");
  // const lang: any = prepareLang ? prepareLang[1]?.split("/")[1] : "en";
  const [{ trans }, setting]: [{ trans: any }, Setting] = await Promise.all([
    getDictionary(lang ?? "en"),
    getSetting(lang ?? "en"),
  ]);
  return (
    <MainContextLayout
      trans={trans}
      lang={lang ?? "en"}
      searchParams={``}
      setting={setting}>
      <main className='relative isolate mx-auto flex flex-col gap-y-6 justify-center items-center max-w-7xl min-h-screen capitalize'>
        <Image
          src={ErrorImage}
          className={`w-80 h-auto rounded-md`}
          alt={"error"}
          width={100}
          height={100}
        />
        <div>
          <h2 className='text-2xl'>{trans.not_found}</h2>
        </div>
        <div>
          <p className='text-xl'>
            {trans.element_u_looking_for_does_not_exist}
          </p>
        </div>
        <div>
          <Link href={`/${lang ?? "en"}`} className='text-xl'>
            {trans.return_home}
          </Link>
        </div>
      </main>
    </MainContextLayout>
  );
}
