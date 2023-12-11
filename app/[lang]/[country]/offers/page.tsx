import { Locale, countriesList } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { MainContextLayout } from "@/layouts/MainContentLayout";
import { cookies } from "next/headers";
import { getProducts } from "@/utils/product";
import {
  AppQueryResult,
  Category,
  ElementPagination,
  Product,
  Slide,
  User,
} from "@/src/types/queries";
import { convertSearchParamsToString } from "@/utils/helpers";
import { appLinks } from "@/src/links";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/src/components/Pagination";
import { getCategories } from "@/utils/category";
import { getVendors } from "@/utils/user";
import { getSlides } from "@/utils/slide";

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
  const [{ trans }, slides, categories, offers, vendors]: [
    { trans: any },
    AppQueryResult<Slide[]>,
    AppQueryResult<Category[]>,
    ElementPagination<Product[]>,
    ElementPagination<User[]>
  ] = await Promise.all([
    getDictionary(lang),
    getSlides(`screen_type=home&limit=10`),
    getCategories(),
    getProducts(convertSearchParamsToString(searchParams ?? undefined)),
    getVendors(convertSearchParamsToString(searchParams ?? undefined)),
  ]);

  console.log("searchParams", searchParams);
  return (
    <MainContextLayout trans={trans} lang={lang} country={country}>
      <h1 className='text-7xl'>Offers {country}</h1>
      <div className='flex w-full flex-col flex-wrap justify-between items-center'>
        <h1>Vendors</h1>
        {offers.data?.map((p: Product, i) => (
          <Link href={appLinks.offer(lang, country, p.id.toString(), p.name)}>
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
