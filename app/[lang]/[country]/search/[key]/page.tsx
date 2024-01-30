import { Locale, countriesList } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import ContentLayout from "@/layouts/MainContentLayout";
import { cookies } from "next/headers";
import { getSearchItems } from "@/utils/product";
import { ElementPagination } from "@/src/types/queries";
import { throttleLimit } from "@/utils/helpers";
import { notFound } from "next/navigation";
import ProductsList from "@/src/components/lists/ProductsList";
import VendorsList from "@/src/components/lists/VendorsList";

type Props = {
  params: { lang: Locale["lang"]; country: countriesList; key: string };
  searchParams: { [key: string]: string } | string;
};

export default async function (props: Props) {
  const cookieStore = cookies();
  const {
    params: { lang, country, key },
    searchParams,
  }: any = props;
  const transFn = throttleLimit(() => getDictionary(lang));
  const itemsFn = throttleLimit(() => getSearchItems(key));
  const [{ trans }, items]: [{ trans: any }, ElementPagination<any>] =
    await Promise.all([transFn(), itemsFn()]);

  if (
    items?.data?.offer?.count === 0 &&
    items?.data?.store?.count === 0 &&
    !key
  )
    return notFound();
  return (
    <ContentLayout showMiddleNav={true}>
      <div className='px-2 md:px-8'>
        {items?.data?.offer?.data.length > 0 && (
          <ProductsList
            elements={items?.data?.offer?.data}
            title={trans.offers}
          />
        )}
        {items?.data?.store?.data.length > 0 && (
          <VendorsList
            elements={items?.data?.store?.data}
            title={trans.vendors}
          />
        )}
      </div>
    </ContentLayout>
  );
}
