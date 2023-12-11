import { Locale, countriesList } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { MainContextLayout } from "@/layouts/MainContentLayout";
import { cookies } from "next/headers";
import { getVendors } from "@/utils/user";
import { AppQueryResult, ElementPagination, User } from "@/src/types/queries";
import Image from "next/image";
import Link from "next/link";
import { appLinks } from "@/src/links";
import Pagination from "@/src/components/Pagination";

type Props = {
  params: { lang: Locale["lang"]; country: countriesList; search: string };
};

export default async function ({ params }: Props) {
  const cookieStore = cookies();
  const token: any = cookieStore.get("token");
  const [{ trans }, vendors]: [{ trans: any }, ElementPagination<User[]>] =
    await Promise.all([getDictionary(params.lang), getVendors(params.search)]);

  console.log("params =====>", params);

  return (
    <MainContextLayout
      trans={trans}
      lang={params.lang}
      country={params.country}>
      <h1 className='text-7xl'>Vendors {params.country}</h1>
      {/* vendors */}
      <div className='flex w-full flex-col flex-wrap justify-between items-center'>
        <h1>Vendors</h1>
        {vendors.data?.map((s: User, i) => (
          <Link
            href={appLinks.vendor(
              params.lang,
              params.country,
              s.id.toString(),
              s.store_name ?? s.name
            )}>
            <div>{s.store_name ?? s.name}</div>
            <Image
              alt={s.description}
              key={i}
              src={s.logo}
              width='100'
              height='100'
            />
          </Link>
        ))}
      </div>
      <Pagination links={vendors.pagination?.links} />
    </MainContextLayout>
  );
}
