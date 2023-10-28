import { Setting } from "@/types/queries";
import { Locale } from "@/types/index";
import { MainContextLayout } from "./layouts/MainContentLayout";
import Link from "next/link";
import NoResultImage from "@/appImages/errors/no_result.svg";
import ErrorImage from "@/appImages/errors/404.svg";
import Image from "next/image";

type Props = {
  lang: Locale["lang"];
  setting: Setting;
  trans: { [key: string]: string } | any;
  currentModule: string;
  showSearchBar?: boolean;
  message?: string | null;
};
export default function ({
  lang,
  setting,
  trans,
  currentModule,
  showSearchBar = false,
  message = null,
}: Props) {
  return (
    <MainContextLayout
      trans={trans}
      lang={lang}
      searchParams={``}
      setting={setting}
    >
      <main className="relative isolate mx-auto flex flex-col gap-y-6 justify-center items-center max-w-7xl min-h-screen capitalize">
        <NoResultImage className={`w-80 lg:w-1/4 h-auto rounded-md`} />
        {message !== null ? (
          <div className="text-center w-1/2 leading-8 mb-4">
            <p className="text-2xl line-clamp-2 leading-loose text-center">
              {message}
            </p>
          </div>
        ) : (
          <div className="text-center">
            <div>
              <h2 className="text-2xl">{trans.empty_results}</h2>
            </div>
            <div>
              <p className="text-xl my-2">{trans.empty_results_messsage}</p>
            </div>
          </div>
        )}
        <div>
          {currentModule && (
            <Link href={`/${lang}/${currentModule}`} className="btn-default">
              {trans.reset}
            </Link>
          )}
        </div>
      </main>
    </MainContextLayout>
  );
}
