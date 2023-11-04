import { Setting } from "@/types/queries";
import { Locale } from "@/types/index";
import { MainContextLayout } from "./layouts/MainContentLayout";
import Link from "next/link";
import NoResultImage from "@/appImages/errors/no_result.svg";

type Props = {
  lang: Locale["lang"];
  setting: Setting;
  trans: { [key: string]: string } | any;
  currentModule?: string;
  showSearchBar?: boolean;
  message?: string | null;
  searchParams?: { [key: string]: string };
};
export default function ({
  lang,
  setting,
  trans,
  currentModule = "home",
  showSearchBar = false,
  message = null,
  searchParams,
}: Props) {
  const membership =
    searchParams && searchParams.membership && currentModule === "user"
      ? `membership=${searchParams.membership}`
      : ``;
  return (
    <MainContextLayout trans={trans} lang={lang} setting={setting}>
      <main className='relative isolate mx-auto flex flex-col gap-y-6 justify-start items-center max-w-7xl min-h-screen capitalize'>
        <Link
          href={`/${lang}/${currentModule}`}
          className='flex w-full justify-center items-center'>
          <NoResultImage className={`w-80 lg:w-1/3 h-auto rounded-md`} />
        </Link>
        {message !== null ? (
          <div className='text-center w-1/2 leading-8 mb-4'>
            <p className='text-2xl line-clamp-2 leading-loose text-center'>
              {message}
            </p>
          </div>
        ) : (
          <div className='text-center'>
            <div>
              <h2 className='text-2xl'>{trans.empty_results}</h2>
            </div>
            <div>
              <p className='text-xl my-2'>{trans.empty_results_messsage}</p>
            </div>
          </div>
        )}
        <div>
          {currentModule && (
            <Link
              href={`/${lang}/${currentModule}${membership}`}
              className='btn-default'>
              {trans.reset}
            </Link>
          )}
        </div>
      </main>
    </MainContextLayout>
  );
}
