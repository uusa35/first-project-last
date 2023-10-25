import { Locale } from "@/types/index";
import { Category } from "@/types/queries";
import Image from "next/image";
import Link from "next/link";

type Props = {
  element: Category;
  lang: Locale["lang"];
};
export default async function ({ element, lang }: Props) {
  return (
    <li>
      <Link
        href={`/${lang}/user?category_id=${element.id}&membership=subscription`}
      >
        <Image
          className="aspect-[3/2] w-full rounded-2xl object-cover hover:scale-105 duration-200 shadow-lg"
          src={element.imageLarge}
          width={100}
          height={100}
          alt=""
        />
        <h3 className="truncate mt-6 text-lg text-center font-semibold leading-8 tracking-tight text-gray-900">
          {element.name}
        </h3>
        <p className=" text-base leading-7 text-gray-600 hidden">
          {element.caption}
        </p>
      </Link>
    </li>
  );
}
