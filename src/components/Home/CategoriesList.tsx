import Link from "next/link";
import * as React from "react";
import CategoryCard from "../category/CategoryCard";
import { AppQueryResult, Category } from "@/types/queries";
import { Locale } from "@/types/index";
import ShowMore from "@/appIcons/green_left_arrow.svg";
import { appLinks } from "@/src/links";
import Pagination from "@/components/Pagination";

type Props = {
  trans: { [key: string]: string };
  categories: AppQueryResult<Category[]>;
  lang: Locale["lang"];
  showMore?: boolean;
};

export function CategoriesList({
  trans,
  categories,
  lang,
  showMore = true,
}: Props) {
  return (
    <div className='bg-white py-12 sm:py-12 capitalize'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:max-w-none'>
          <h2 className='text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-4xl capitalize'>
            {trans.categories}
          </h2>
          <p className='mt-6 text-lg text-center break-words leading-8 text-gray-600'>
            {
              trans.through_this_section_find_out_all_companies_related_to_your_interested_field
            }
          </p>
        </div>

        <ul
          role='list'
          className='mx-auto mt-10 grid  grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-5'>
          {categories.data.map((c: Category, i: number) => (
            <CategoryCard element={c} key={c.name} lang={lang} />
          ))}
        </ul>

        {showMore ? (
          <div className='pt-12 pb-2 w-full text-center text-expo-dark'>
            <Link
              className='flex gap-x-2 items-center justify-center'
              href={appLinks.categoryIndex(lang)}>
              {trans.navigate_to_more}
              <ShowMore
                className={`w-6 h-6 ${lang !== "ar" && "rotate-180"}`}
              />
            </Link>
          </div>
        ) : (
          <Pagination links={categories.meta.links} />
        )}
      </div>
    </div>
  );
}
