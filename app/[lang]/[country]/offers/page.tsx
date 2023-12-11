import { Locale, countriesList } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { MainContextLayout } from "@/layouts/MainContentLayout";
import { cookies } from "next/headers";
import { getProducts } from "@/utils/product";
import { ElementPagination, Product } from "@/src/types/queries";
import { convertSearchParamsToString } from "@/utils/helpers";
import { appLinks } from "@/src/links";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/src/components/Pagination";

type Props = {
  params: { lang: Locale["lang"]; country: countriesList; search: string };
  searchParams: { [key: string]: string } | string;
};

export default async function (props: Props) {
  const cookieStore = cookies();
  const {
    params: { lang, country },
    searchParams,
  } = props;
  const token: any = cookieStore.get("token");
  const [{ trans }, offers]: [{ trans: any }, ElementPagination<Product[]>] =
    await Promise.all([
      getDictionary(lang),
      getProducts(convertSearchParamsToString(searchParams ?? undefined)),
    ]);

  return (
    <MainContextLayout trans={trans} lang={lang} country={country}>
      <h1 className='text-7xl'>Offers {country}</h1>
      <div className='flex w-full flex-col flex-wrap justify-between items-center'>
        <h1>Vendors</h1>
        {offers.data?.map((p: Product, i) => (
          <Link href={appLinks.offer(lang, country, s.id.toString(), s.name)}>
            <div>{p.name}</div>
            <Image
              alt={p.description}
              key={i}
              src={p.logo}
              width='100'
              height='100'
            />
          </Link>
        ))}
      </div>
      <Pagination links={offers.pagination?.links} />
    </MainContextLayout>
  );
}
