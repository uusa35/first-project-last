import { MainContextLayout } from "@/layouts/MainContentLayout";
import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import Link from "next/link";
import { getUser } from "@/utils/user";
import { getSetting } from "@/utils/setting";
import Image from "next/image";
import LoginImage from "@/appImages/login/section.jpg";
import DOMPurify from "isomorphic-dompurify";

type Props = {
  params: { lang: Locale["lang"]; id: string };
  searchParams: { [key: string]: string };
};
export default async function UserShow({
  params: { lang, id },
  searchParams,
}: Props) {
  const [{ trans }, setting, user] = await Promise.all([
    getDictionary(lang),
    getSetting(lang),
    getUser(id, lang),
  ]);

  return (
    <MainContextLayout
      trans={trans}
      lang={lang}
      searchParams={``}
      setting={setting}>
      <main className='relative isolate mx-auto max-w-7xl min-h-screen'>
        {/* Image section */}
        <div className='mt-8 sm:mt-8 xl:mx-auto xl:max-w-7xl xl:px-8'>
          <div className='absolute left-10 top-10'>
            <span className={` text-gray-800 bg-white/50 p-4 rounded-md`}>
              {user.deals.membership.sort}
            </span>
          </div>
          
          <div className='absolute max-w-4xl flex flex-row  justify-center items-center top-52 lg:top-70 bg-stone/60 right-10 p-8 text-white  gap-4  rounded-md'>
            <div>
              <Image
                width={100}
                height={100}
                src={user.image}
                alt={user.name}
                className='w-20 h-20 object-cover rounded-full border border-gray-200'
              />
            </div>
            <div className='flex flex-col gap-4'>
              <div className='text-6xl '>{user.name}</div>
              <div className='text-2xl'>{user.caption}</div>
            </div>
          </div>
          <Image
            width={1000}
            height={500}
            src={user.image}
            alt={user.name}
            className='aspect-[9/4] w-full object-cover xl:rounded-xl'
          />
        </div>
        {/* aboutus section */}
        {user.aboutus && (
          <div className='px-6 pt-12 lg:px-8'>
            <div className='mx-auto max-w-2xl text-center '>
              <h2 className='text-xl font-bold tracking-tight text-black sm:text-6xl'>
                {trans.aboutus}
              </h2>
              <p className='mt-6 text-lg leading-8 text-gray-800'>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(user.aboutus),
                  }}></div>
              </p>
            </div>
          </div>
        )}

        {user.description && (
          <div className='px-6 pt-12 lg:px-8'>
            <div className='mx-auto max-w-2xl text-center '>
              <h2 className='text-xl font-bold tracking-tight text-black sm:text-6xl'>
                {trans.description}
              </h2>
              <p className='mt-6 text-lg leading-8 text-gray-800'>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(user.description),
                  }}></div>
              </p>
            </div>
          </div>
        )}

        {/* Content section */}
        <div className='mx-auto mt-8 max-w-7xl px-6 lg:px-8 pb-16'>
          <div className='flex flex-row mx-auto max-w-7xl lg:mx-0 lg:max-w-none'>
            <div className='grid max-w-7xl grid-cols-1 text-justified gap-8 text-base leading-8 text-gray-800'>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(user.description),
                }}></div>
            </div>
          </div>
        </div>
      </main>
    </MainContextLayout>
  );
}
