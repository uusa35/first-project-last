import Link from "next/link";
import Image from "next/image";
import { Locale } from "@/types/index";

type Props = {
  logo: string;
  name: string;
  lang: Locale["lang"];
};

export default function ({ logo, name, lang }: Props) {
  return (
    <Link href={`/${lang}`} className='-m-1.5 p-1.5'>
      <span className='sr-only'>{name}</span>
      <Image
        width={100}
        height={100}
        alt={name}
        className='h-8 w-auto'
        src={logo}
        onError={() => console.log('error image logo')}
      />
    </Link>
  );
}