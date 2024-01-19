import { Locale, countriesList } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import ContentLayout from "@/layouts/MainContentLayout";
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
import Pagination from "@/src/components/Pagination";
import { getCategories } from "@/utils/category";
import { getVendors } from "@/utils/user";
import { getSlides } from "@/utils/slide";
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
    <ContentLayout showMiddleNav={true}>
      {categories?.data?.length > 0 && (
        <CategoriesSlider categories={categories.data} />
      )}
      <div className='px-2 md:px-8'>
        {slides?.data?.length > 0 && <AdsSlider slides={slides.data} />}
        {products?.data?.length > 0 && (
          <ProductsSlider products={products.data} title={"Top "} />
        )}
        {vendors?.data?.length > 0 && (
          <CustomSlider vendors={vendors.data} title={"vendors"} />
        )}
        <Pagination links={products.pagination?.links} />
      </div>
    </ContentLayout>
  );
}
