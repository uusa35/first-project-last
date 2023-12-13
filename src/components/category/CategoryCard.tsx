import { appLinks } from "@/src/links";
import { Locale, countriesList } from "@/src/types";
import { Category } from "@/src/types/queries";
import Image from "next/image";
import Link from "next/link";
import React from "react";
type Props = {
  category: Category;
  lang: Locale["lang"];
  country: countriesList;
};
const CategoryCard = ({ category, lang, country }: Props): React.ReactNode => {
  return (
    <Link
      href={appLinks.offers(lang, country, `category_id=${category.id}`)}
      className='px-5'>
      <div className='flex items-center gap-x-2 bg-white rounded-full py-2 px-3 w-fit'>
        <Image
          alt={category.name}
          src={category.image}
          width={1000}
          height={1000}
          className='w-5 h-5'
        />
        <h1>test</h1>
        <p className='text-black'>{category.name}</p>
      </div>
    </Link>
  );
};

export default CategoryCard;
