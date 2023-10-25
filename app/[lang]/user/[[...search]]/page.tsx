import { MainContextLayout } from "@/components/MainContentLayout";
import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { convertSearchParamsToString } from "@/utils/helpers";
import { getUsers } from "@/utils/user";
import { getSetting } from "@/utils/setting";
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
import Pagination from "@/components/Pagination";
import UserCard from "@/components/user/UserCard";
import { getCategories } from "@/utils/category";
import { CustomSearch } from "@/components/user/CustomSearch";


type Props = {
  params: { lang: Locale["lang"] };
  searchParams: { [key: string]: string } | string;
};

export default async function UserIndex({
  params: { lang },
  searchParams,
}: Props) {
  const [{ trans }, setting, users, categories] = await Promise.all([
    getDictionary(lang),
    getSetting(lang),
    getUsers(convertSearchParamsToString(searchParams) ?? ``, lang),
    getCategories(`on_home=0`, lang),
  ]);

  const test = [9, 4];

  console.log({ categories, searchParams });

  return (
    <MainContextLayout
      trans={trans}
      lang={lang}
      searchParams={searchParams}
      setting={setting}
    >
      <div className="container mx-auto max-w-7xl min-h-screen">
        <Image
          className="h-80 w-full object-cover"
          width={600}
          height={1000}
          src={LoginImage.src}
          alt={setting.name}
        />

        <div className="px-5">
          <CustomSearch
            trans={trans}
            lang={lang}
            searchParams={searchParams}
            categories={categories}
          />
          {/* {users.data.length > 0 ? (
            <SearchBar
              trans={trans}
              cats={categories}
            />
          ) : (
            <div className="text-center text-2xl py-20">
              No Result Component here
            </div>
          )} */}

          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-12 after:px-8 px-4 xl:px-0"
          >
            {users.data.map((u: User, i: number) => (
              <UserCard element={u} lang={lang} trans={trans} key={u.name} />
            ))}
          </ul>
          {users.data.length > 0 && <Pagination links={users.meta.links} />}
        </div>
      </div>
    </MainContextLayout>
  );
}
