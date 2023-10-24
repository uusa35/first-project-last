import { MainContextLayout } from "@/layouts/MainContentLayout";
import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { convertSearchParamsToString } from "@/utils/helpers";
import { getUsers } from "@/utils/user";
import { getSetting } from "@/utils/setting";
import { map } from "lodash";
import Link from "next/link";
import Image from "next/image";
import { User } from "@/types/queries";
import LoginImage from "@/appImages/login/section.jpg";
import SearchBar from "@/components/user/SearchBar";
import Pagination from "@/components/Pagination";
import UserCard from "@/components/user/UserCard";
import NoResults from "@/components/NoResults";
import { notFound } from "next/navigation";
import UserIndexBanner from "@/appImages/user/banner.jpg";

type Props = {
  params: { lang: Locale["lang"] };
  searchParams: { [key: string]: string };
};

export default async function UserIndex({
  params: { lang },
  searchParams,
}: Props) {
  const [{ trans }, users, setting] = await Promise.all([
    getDictionary(lang),
    getUsers(convertSearchParamsToString(searchParams) ?? ``, lang),
    getSetting(lang),
  ]);

  if ("status" in users && (users.status === 404 || users.status === 500))
    notFound();

  if (users.data && users.data.length === 0)
    return (
      <NoResults
        setting={setting}
        lang={lang}
        trans={trans}
        showSearchBar={false}
        currentModule={`post`}
      />
    );

  return (
    <MainContextLayout
      trans={trans}
      lang={lang}
      searchParams={searchParams}
      setting={setting}>
      <main className='relative isolate mx-auto max-w-7xl min-h-screen'>
        {/* Image section */}
        <div className='mt-8 sm:mt-8 xl:mx-auto xl:max-w-7xl xl:px-8'>
          <div className='absolute left-10 top-10'></div>
          <div className='absolute w-full lg:max-w-4xl flex flex-col lg:flex-row  justify-center lg:justify-start items-center top-0 lg:top-32 bg-stone/60 lg:rtl:right-10 lg:ltr:left-10 p-8 text-white  gap-4  rounded-md'>
            <div className='flex flex-col justify-center lg:justify-start items-center lg:items-start gap-4 text-center rtl:text-right ltr:text-left'>
              <div className='text-2xl lg:text-6xl '>
                {searchParams &&
                searchParams.membership &&
                searchParams.membership === "sponsorship"
                  ? trans.sponsorships
                  : trans.subscriptions}
              </div>
              <div className='text-lg lg:text-xl'>
                {searchParams &&
                searchParams.membership &&
                searchParams.membership === "sponsorship"
                  ? trans.sponsors_description
                  : trans.subscribers_description}
              </div>
            </div>
          </div>
          <Image
            width={1000}
            height={500}
            src={UserIndexBanner}
            alt={setting.name}
            className='aspect-[9/3] w-full object-cover xl:rounded-xl'
          />
        </div>
        {users.data.length > 0 ? (
          <SearchBar trans={trans} />
        ) : (
          <div className='text-center text-2xl py-20'>
            No Result Component here
          </div>
        )}

        <ul
          role='list'
          className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-12 after:px-8 px-4 xl:px-0'>
          {users.data.map((u: User, i: number) => (
            <UserCard element={u} lang={lang} key={u.name} trans={trans} />
          ))}
        </ul>
        {users.data.length > 0 && <Pagination links={users.meta.links} />}
      </main>
    </MainContextLayout>
  );
}
