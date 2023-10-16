import Link from "next/link";
import SocialIcons from "./SocialIcons";

type Props = {
  mainPages: { href: string; name: string }[];
};

export default function ({ mainPages }: Props) {
  return (
    <footer className='bg-stone-950 text-white'>
      <div className='mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-12 lg:px-8'>
        <nav
          className='-mb-6 columns-2 sm:flex sm:justify-center sm:gap-x-12'
          aria-label='Footer'>
          {mainPages.map((item) => (
            <div key={item.name} className='pb-6'>
              <Link
                href={item.href}
                className='text-sm leading-6 text-gray-600 hover:text-gray-900'>
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
        <SocialIcons />
        <p className='mt-10 text-center text-xs leading-5 text-gray-500'>
          &copy; 2020 Your Company, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
