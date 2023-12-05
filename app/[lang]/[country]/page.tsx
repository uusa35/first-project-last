import { Locale, countriesList } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { MainContextLayout } from "@/layouts/MainContentLayout";
import { AppQueryResult, Category, ElementPagination, Product, Slide } from "@/types/queries";
import { getCategories } from "@/utils/category";
import { getSlides } from "@/utils/slide";
import Image from "next/image";
import { getProducts } from "@/utils/product";

type Props = {
  params: { lang: Locale["lang"]; country: countriesList };
};

export default async function ({ params: { lang, country } }: Props) {
  const [{ trans }, categories, sliders, products]: [
    { trans: any },
    AppQueryResult<Category[]>,
    AppQueryResult<Slide[]>,
    ElementPagination<Product[]>
  ] = await Promise.all([
    getDictionary(lang),
    getCategories(),
    getSlides(`screen_type=home`),
    getProducts(`limit=10`),
  ]);

  return (
    <MainContextLayout trans={trans} lang={lang} country={country}>
      <h1 className='text-7xl'>HomePage Page {country}</h1>
      <div className='flex w-full justify-between items-center'>
        {categories.data.map((c: Category, i) => (
          <div>{c.name}</div>
        ))}
      </div>
      <div className='flex w-full justify-between items-center'>
        {sliders.data.map((s: Slide, i) => (
          <Image alt={s.type} key={i} src={s.image} width='100' height='100' />
        ))}
      </div>
      <div className='flex w-full justify-between items-center'>
        {products.data.map((s: Product, i) => (
          <Image alt={s.name} key={i} src={s.image} width='100' height='100' />
        ))}
      </div>
    </MainContextLayout>
  );
}
