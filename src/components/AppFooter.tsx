import Link from "next/link";

type Props = {
  mainPages: { href: string; name: string }[];
};

export default function ({ mainPages }: Props) {
  return (
    <footer className='bg-white'>
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
        <div className='mt-10 flex justify-center gap-x-10'>
          {/* <Link
              
              href={item.href}
              className='text-gray-400 hover:text-gray-500'>
              <span className='sr-only'>{item.name}</span>
              <item.icon className='h-6 w-6' aria-hidden='true' />
            </Link> */}
        </div>
        <p className='mt-10 text-center text-xs leading-5 text-gray-500'>
          &copy; 2020 Your Company, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
