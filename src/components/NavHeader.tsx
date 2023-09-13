import Link from "next/link";
import type { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { appLinks } from "../constants";

type Props = {
  lang: Locale;
};
export default async function NavHeader({ lang }: Props) {
  const { trans } = await getDictionary(lang);

  return (
    <header className='py-6'>
      <nav className='container flex items-center justify-between'>
        <ul className='flex gap-x-8 capitalize'>
          <li>
            <Link href={appLinks.home(lang)}>{trans.home}</Link>
          </li>
          <li>
            <Link href={appLinks.about(lang)}>{trans.about}</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
