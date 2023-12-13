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
import {
  adsSliderSettings,
  categoriesSliderSettings,
  convertSearchParamsToString,
  vendorSliderSettings,
} from "@/utils/helpers";
import { appLinks } from "@/src/links";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/src/components/Pagination";
import { getCategories } from "@/utils/category";
import { getVendors } from "@/utils/user";
import { getSlides } from "@/utils/slide";
import CategoryCard from "@/components/category/CategoryCard";
import { Slider } from "@/src/constants";
import { notFound } from "next/navigation";
import ProductWidget from "@/src/components/widgets/ProductWidget";
import RenderArrows from "@/src/components/SliderArrow";

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

  console.log("slider", slides);
  return (
    <MainContextLayout
      trans={trans}
      lang={lang}
      country={country}
      showMiddleNav={true}>
      {/* categories slider */}
      {categories.data && (
        <div className='py-5 relative mt-24 page-padding bg-picks-gray border-b border-picks-border border-8'>
          <Slider {...categoriesSliderSettings} rtl={lang === "ar"}>
            {categories.data.map((itm: Category, i: number) => (
              <CategoryCard
                category={itm}
                key={i}
                lang={lang}
                country={country}
              />
            ))}
          </Slider>
        </div>
      )}

      {slides.data && (
        <div className='my-10'>
          <Slider {...adsSliderSettings} rtl={lang === "ar"}>
            {slides.data.map((s, i: number) => (
              <Image
                key={i}
                alt={"slider"}
                src={s.image}
                width={1000}
                height={1000}
                className='w-full h-auto aspect-[2/1] object-fill object-bottom'
              />
            ))}
          </Slider>
        </div>
      )}

      {/* products */}
      <div className='my-5'>
        {/* <div className='flex justify-between mb-3'>
          <p>New Picks</p>
          <div className='flex gap-x-3'>
            <p>See all</p>
            <RenderArrows />
          </div>
        </div> */}
        <div>
          <Slider {...vendorSliderSettings}>
            {products.data.map((itm: Product, i: number) => (
              <ProductWidget
                product={itm}
                key={i}
                lang={lang}
                country={country}
              />
            ))}
          </Slider>
        </div>
      </div>

      {/* vendors */}
      <div className='my-5'>
        {/* <div className='flex justify-between mb-3'>
          <p>New Picks</p>
          <div className='flex gap-x-3'>
            <p>See all</p>
            <RenderArrows />
          </div>
        </div> */}
        <div>
          <Slider {...vendorSliderSettings}>
            {vendors.data.map((u: User, i: number) => (
              <Image
                key={i}
                alt={"vendor"}
                src={u.image}
                width={1000}
                height={1000}
                className='w-full h-auto aspect-[2/1] object-fill object-bottom'
              />
            ))}
          </Slider>
        </div>
      </div>

      <Pagination links={products.pagination?.links} />
    </MainContextLayout>
  );
}
