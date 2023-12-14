import { Locale, countriesList } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { MainContextLayout } from "@/layouts/MainContentLayout";
import {
  AppQueryResult,
  Category,
  ElementPagination,
  Product,
  Slide,
  User,
} from "@/types/queries";
import { getCategories } from "@/utils/category";
import { getSlides } from "@/utils/slide";
import { getProducts } from "@/utils/product";
import { getVendorFeatured, getVendors } from "@/utils/user";
import HomeContent from "@/src/components/home/HomeContent";

type Props = {
  params: { lang: Locale["lang"]; country: countriesList };
};

export default async function ({ params: { lang, country } }: Props) {
  const [{ trans }, categories, sliders, products, vendors, featuredVendors]: [
    { trans: any },
    AppQueryResult<Category[]>,
    AppQueryResult<Slide[]>,
    ElementPagination<Product[]>,
    AppQueryResult<User[]>,
    AppQueryResult<User[]>
  ] = await Promise.all([
    getDictionary(lang),
    getCategories(),
    getSlides(`screen_type=home&limit=10`),
    getProducts(`limit=10`),
    getVendors(`limit=10`),
    getVendorFeatured(`limit=10`),
  ]);

  return (
    <MainContextLayout
      trans={trans}
      lang={lang}
      country={country}
      showMiddleNav={true}>
      <HomeContent
        lang={lang}
        country={country}
        categories={categories.data}
        slides={sliders.data}
        products={products.data}
        vendors={vendors.data}
      />
    </MainContextLayout>
  );
}
