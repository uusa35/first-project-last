import { Locale, countriesList } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { MainContextLayout } from "@/layouts/MainContentLayout";
import { cookies } from "next/headers";
import { getProducts } from "@/utils/product";
import { ElementPagination, Product } from "@/src/types/queries";
import { convertSearchParamsToString } from "@/utils/helpers";

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
  const [{ trans }, products]: [{ trans: any }, ElementPagination<Product[]>] =
    await Promise.all([
      getDictionary(lang),
      getProducts(convertSearchParamsToString(searchParams ?? undefined)),
    ]);

  return (
    <MainContextLayout trans={trans} lang={lang} country={country}>
      <h1 className='text-7xl'>Offers {country}</h1>
    </MainContextLayout>
  );
}
