import { MainContextLayout } from "@/components/MainContentLayout";
import TextTrans from "@/components/TextTrans";
import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { appLinks } from "@/src/constants";
import { convertSearchParamsToString } from "@/utils/helpers";
import { getUsers } from "@/utils/user";
import { getSetting } from "@/utils/setting";
import { map } from "lodash";
import Link from "next/link";
import Image from "next/image";

type Props = {
  params: { lang: Locale["lang"] };
  searchParams: { [key: string]: string } | string;
};

export default async function UserIndex({
  params: { lang },
  searchParams,
}: Props) {
  const [{ trans }, users] = await Promise.all([
    getDictionary(lang),
    getUsers(convertSearchParamsToString(searchParams) ?? ``, lang),
  ]);

  return (
    <MainContextLayout trans={trans} lang={lang} searchParams={searchParams}>
      <div className='container py-24 mx-auto max-w-7xl'>
        <h1 className='text-3xl font-bold'>
          {trans.translation} : {trans.users}
        </h1>
        <div className='w-full p-8 rounded-md'>
          <div className='flex flex-1 flex-col space-y-6'>
            {users &&
              map(users.data, (u, i) => (
                <Link
                  key={i}
                  href={`/${lang}/user/${u.id}`}
                  className='border-b p-3 flex flex-row items-center'>
                  <Image
                    alt={u.name}
                    src={u.image}
                    width={100}
                    height={100}
                    className='w-20 h-auto p-4'
                  />
                  <span>{u.id} - </span>
                  <TextTrans ar={u.name} en={u.name} />
                </Link>
              ))}
          </div>
        </div>
      </div>
    </MainContextLayout>
  );
}
