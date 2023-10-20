import Link from "next/link";
import SocialIcons from "./SocialIcons";
import { getDictionary } from "@/lib/dictionary";
import { getSetting } from "@/utils/setting";
import { Locale } from "@/types/index";
import moment from "moment";
import { Setting } from "@/types/queries";

type Props = {
  mainPages: { href: string; name: string }[];
  lang: Locale["lang"];
  trans: { [key: string]: string };
  setting: Setting;
};

export default async function ({ mainPages, lang, trans, setting }: Props) {
  return (
    <footer className='bg-white'>
      <div className='mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-12 lg:px-8'>
        <nav
          className='-mb-6 columns-2 sm:flex sm:justify-center sm:gap-x-12'
          aria-label='Footer'>
          {mainPages.map((item, i: number) => (
            <div key={i} className='pb-6'>
              <Link
                href={item.href}
                className='text-sm leading-6 text-gray-600 hover:text-gray-900'>
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
        <SocialIcons setting={setting} />
        <p className='mt-10 text-center text-xs leading-5 text-gray-500'>
          {`${moment().format("y")} -  ${setting.name}, ${
            trans.all_rights_reserved
          }.`}
        </p>
      </div>
    </footer>
  );
}
