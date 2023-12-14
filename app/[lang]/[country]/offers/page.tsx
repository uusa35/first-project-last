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
import { Slider } from "@/src/constants";
import { notFound } from "next/navigation";
import CategoriesSlider from "@/src/components/sliders/CategoriesSlider";
import AdsSlider from "@/src/components/sliders/AdsSlider";
import CustomSlider from "@/src/components/sliders/VendorsSlider";
import ProductsSlider from "@/src/components/sliders/ProductsSlider";

type Props = {
  params: { lang: Locale["lang"]; country: countriesList; search: string };
  searchParams: { [key: string]: string } | string;
};

export default async function (props: Props) {
  const cookieStore = cookies();
  const {
    params: { lang, country },
    searchParams,
  }: any = props;
  if (!searchParams && !searchParams?.category_id) return notFound();
  const token: any = cookieStore.get("token");
  const [{ trans }, categories, slides, products, vendors]: [
    { trans: any },
    AppQueryResult<Category[]>,
    AppQueryResult<Slide[]>,
    ElementPagination<Product[]>,
    ElementPagination<User[]>
  ] = await Promise.all([
    getDictionary(lang),
    getCategories(),
    getSlides(`category_id=${searchParams?.category_id}&screen_type=category`),
    getProducts(convertSearchParamsToString(searchParams)),
    getVendors(convertSearchParamsToString(searchParams)),
  ]);

  return (
    <MainContextLayout
      trans={trans}
      lang={lang}
      country={country}
      showMiddleNav={true}>
      {categories.data.length > 0 && (
        <CategoriesSlider
          lang={lang}
          country={country}
          categories={categories.data}
        />
      )}
      <div className='px-2 md:px-8'>
        {slides.data.length > 0 && (
          <AdsSlider lang={lang} country={country} slides={slides.data} />
        )}
        {products?.data?.length > 0 && (
          <ProductsSlider
            lang={lang}
            country={country}
            products={products.data}
            title={"Top "}
          />
        )}
        {vendors.data.length > 0 && (
          <CustomSlider
            lang={lang}
            country={country}
            vendors={vendors.data}
            title={"vendors"}
          />
        )}

        <Pagination links={products.pagination?.links} />
      </div>
    </MainContextLayout>
  );
}
