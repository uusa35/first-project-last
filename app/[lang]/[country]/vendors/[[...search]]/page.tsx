import { Locale, countriesList } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { MainContextLayout } from "@/layouts/MainContentLayout";
import { cookies } from "next/headers";
import { getVendors } from "@/utils/user";
import { AppQueryResult, User } from "@/src/types/queries";
import Image from "next/image";

type Props = {
  params: { lang: Locale["lang"]; country: countriesList; search: string };
};

export default async function ({ params: { lang, country, search } }: Props) {
  const cookieStore = cookies();
  const token: any = cookieStore.get("token");
  const [{ trans }, vendors]: [{ trans: any }, AppQueryResult<User[]>] =
    await Promise.all([getDictionary(lang), getVendors(search)]);

  return (
    <MainContextLayout trans={trans} lang={lang} country={country}>
      <h1 className='text-7xl'>Vendors {country}</h1>
      {/* vendors */}
      <div className='flex w-full flex-col flex-wrap justify-between items-center'>
        <h1>Vendors</h1>
        {vendors.data.map((s: User, i) => (
          <div>
            <div>{s.name}</div>
            <Image
              alt={s.name ?? s.store_name}
              key={i}
              src={s.logo}
              width='100'
              height='100'
            />
          </div>
        ))}
      </div>
    </MainContextLayout>
  );
}
