import { MainContextLayout } from "@/components/MainContentLayout";
import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { convertSearchParamsToString } from "@/utils/helpers";
import { getUsers } from "@/utils/user";
import { getSetting } from "@/utils/setting";
import { map } from "lodash";
import Link from "next/link";
import Image from "next/image";
import { Category, User } from "@/types/queries";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import LoginImage from "@/appImages/login/section.jpg";
import SearchBar from "@/components/user/SearchBar";

type Props = {
  params: { lang: Locale["lang"] };
  searchParams: { [key: string]: string } | string;
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

  return (
    <MainContextLayout trans={trans} lang={lang} searchParams={searchParams}>
      <div className='container   mx-auto max-w-7xl'>
        <Image
          className='h-80 w-full object-cover'
          width={600}
          height={1000}
          src={LoginImage.src}
          alt={setting.name}
        />
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
            <li
              key={i}
              className='col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow'>
              <Link
                href={`/${lang}/user/${u.id}?slug=${u.name}`}
                className='flex flex-1 flex-col p-8'>
                <Image
                  className='mx-auto h-32 w-32 flex-shrink-0 rounded-full'
                  src={u.image}
                  alt={u.name}
                  width={100}
                  height={100}
                />
                <h3 className='mt-6 text-sm font-medium text-gray-900'>
                  {u.name}
                </h3>
                <dl className='mt-1 flex flex-grow flex-col justify-between'>
                  <dt className='sr-only'>Title</dt>
                  <dd className='text-sm text-gray-500'>{u.caption}</dd>
                  <dt className='sr-only'>Role</dt>
                  <dd className='mt-3 text-center grid grid-cols-3 justify-center items-center gap-1'>
                    {u.categories.map((u: Category, i: number) => (
                      <span
                        key={u.id}
                        className='truncate col-span-1 text-[8px] xl:text-[12px] inline-flex items-center rounded-full bg-expo-light hover:bg-expo-dark hover:text-white px-2 py-1 font-medium text-green-700 ring-1 ring-inset ring-green-600/20'>
                        {u.name.slice(0, 12)}..
                      </span>
                    ))}
                  </dd>
                </dl>
              </Link>
              <div>
                <div className='-mt-px flex divide-x divide-gray-200'>
                  <div className='flex w-0 flex-1'>
                    <Link
                      href={`/${lang}/user/${u.id}?slug=${u.name}`}
                      className='relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900'>
                      {trans.view_company_details}
                      {lang !== "ar" ? (
                        <ArrowRightIcon
                          className='h-5 w-5 text-gray-400'
                          aria-hidden='true'
                        />
                      ) : (
                        <ArrowLeftIcon
                          className='h-5 w-5 text-gray-400'
                          aria-hidden='true'
                        />
                      )}
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </MainContextLayout>
  );
}
