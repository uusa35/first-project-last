import { MainContextLayout } from "@/layouts/MainContentLayout";
import { getDictionary } from "@/lib/dictionary";
import { getSetting } from "@/utils/setting";
import Link from "next/link";
import { Setting } from "@/types/queries";
import { cookies } from "next/headers";
import ErrorImage from "@/appImages/errors/404.svg";
import Image from "next/image";

export default async function NotFound() {
  const cookieStore = cookies();
  const lang: any = cookieStore.get("NEXT_LOCALE")?.value ?? "en";
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
      <main className='relative isolate mx-auto flex flex-col gap-y-6 justify-start items-center max-w-7xl min-h-screen capitalize'>
        <Image
          src={ErrorImage}
          className={`w-80 lg:w-1/3 h-auto rounded-md`}
          alt={setting.name}
          width={300}
          height={300}
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
          <Link href={`/${lang}`} className='text-xl'>
            {trans.return_home}
          </Link>
        </div>
      </main>
    </MainContextLayout>
  );
}
