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
import { adsSliderSettings, vendorSliderSettings } from "@/src/constants";
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
import ProductWidget from "@/src/components/widgets/ProductWidget";
import CategoriesSlider from "@/src/components/sliders/CategoriesSlider";
import AdsSlider from "@/src/components/sliders/AdsSlider";
import ProductsSlider from "@/src/components/sliders/ProductsSlider";
import VendorsSlider from "@/src/components/sliders/VendorsSlider";

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
      {categories.data && (
        <CategoriesSlider
          lang={lang}
          country={country}
          categories={categories.data}
        />
      )}

      {slides.data && (
        <AdsSlider lang={lang} country={country} slides={slides.data} />
      )}

      {products.data && (
        <ProductsSlider
          lang={lang}
          country={country}
          products={products.data}
        />
      )}

      {vendors.data && (
        <VendorsSlider lang={lang} country={country} vendors={vendors.data} />
      )}
      

      <Pagination links={products.pagination?.links} />
    </MainContextLayout>
  );
}
