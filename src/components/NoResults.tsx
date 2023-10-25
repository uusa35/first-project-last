import { Setting } from "@/types/queries";
import { Locale } from "@/types/index";
import LoginImage from "@/appImages/login/section.jpg";
import { MainContextLayout } from "./layouts/MainContentLayout";
import Link from "next/link";

type Props = {
  lang: Locale["lang"];
  setting: Setting;
  trans: { [key: string]: string } | any;
  currentModule: string;
  showSearchBar?: boolean;
};
export default function ({
  lang,
  setting,
  trans,
  currentModule,
  showSearchBar = false,
}: Props) {
  return (
    <MainContextLayout
      trans={trans}
      lang={lang}
      searchParams={``}
      setting={setting}>
      <main className='relative isolate mx-auto flex flex-col gap-y-6 justify-center items-center max-w-7xl min-h-screen capitalize'>
        <div>
          <h2 className='text-2xl'>{trans.empty_results}</h2>
        </div>
        <div>
          <p className='text-xl'>
            {trans.empty_results_messsage}
          </p>
        </div>
        <div>
          {currentModule && (
            <Link href={`/${lang}/${currentModule}`} className='text-xl'>
              {trans.reset}
            </Link>
          )}
        </div>
      </main>
    </MainContextLayout>
  );
}
