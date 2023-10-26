import { MainContextLayout } from "@/layouts/MainContentLayout";
import { getDictionary } from "@/lib/dictionary";
import { getSetting } from "@/utils/setting";
import Link from "next/link";
import { headers } from "next/headers";
import { Setting } from "@/types/queries";
import ErrorImage from "@/appImages/errors/404.svg";
import Image from "next/image";

export default async function () {
  const lang: any = headers().get("Accept-Language");
  const [{ trans }, setting]: [{ trans: any }, Setting] = await Promise.all([
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
        <Image
          src={ErrorImage}
          className={`w-80 h-auto rounded-md`}
          alt={"error"}
          width={100}
          height={100}
        />
        <p>Could not find requested resource</p>
        <Link href='/'>Return Home</Link>
      </main>
    </MainContextLayout>
  );
}
