import { MainContextLayout } from "@/layouts/MainContentLayout";
import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import Link from "next/link";
import { getUser } from "@/utils/user";
import { getSetting } from "@/utils/setting";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import { notFound } from "next/navigation";
import UserIndexBanner from "@/appImages/user/banner.jpg";
import SocialIcons from "@/components/footer/SocialIcons";

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

  if ("status" in user && (user.status === 404 || user.status === 500))
    notFound();

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
          <div className='absolute w-full lg:max-w-4xl flex flex-col lg:flex-row  justify-center lg:justify-start items-center top-0 lg:top-32 bg-stone/60 lg:rtl:right-10 lg:ltr:left-10 p-8 text-white  gap-4  rounded-md'>
            <div>
              <Image
                width={100}
                height={100}
                src={user.image}
                alt={user.name}
                className='w-20 h-20 object-cover rounded-full border border-gray-400 shadow-lg'
              />
            </div>
            <div className='flex flex-col justify-center lg:justify-start items-center lg:items-start gap-4 text-center rtl:text-right ltr:text-left'>
              <div className='text-2xl lg:text-6xl '>{user.name}</div>
              <div className='text-lg lg:text-xl'>{user.caption}</div>
            </div>
          </div>
          <Image
            width={1000}
            height={500}
            src={UserIndexBanner}
            alt={user.name}
            className='aspect-[9/3] w-full object-cover xl:rounded-xl'
          />
        </div>

        <div className='flex flex-col w-full min-h-screen justify-start items-center gap-y-12 '>
          {/* aboutus section */}
          {user.aboutus && (
            <div className='px-2 pt-12 lg:px-8'>
              <div className='mx-auto text-center'>
                <h2 className='text-2xl font-bold tracking-tight text-black sm:text-4xl'>
                  {trans.aboutus}
                </h2>
                <div className='mt-6 text-lg leading-8 text-gray-800 '>
                  <div
                    className='max-w-md sm:max-w-xl md:max-w-full whitespace-pre-line text-ellipsis overflow-hidden'
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(user.aboutus),
                    }}></div>
                </div>
              </div>
            </div>
          )}

          {/* contactus section */}
          <div className='px-6 py-12 lg:px-8 bg-gray-100 w-full h-auto'>
            <div className='grid grid-cols-1 gap-y-10 text-center ltr:lg:text-left rtl:lg:text-right lg:gap-y-0 lg:grid-cols-3'>
              <div className='flex flex-col gap-y-4 leading-8'>
                <h1>{trans.contactus_information}</h1>
                <p>
                  {user.address} - {user.country.name}
                </p>
              </div>
              <div className='flex flex-col gap-y-4 leading-8'>
                <h1>{trans.email}</h1>
                <div>
                  <a target='_blank' href={`mailto: ${user.email}`}>
                    {user.email}
                  </a>
                </div>
              </div>
              <div className='flex flex-col gap-y-4 leading-8'>
                <h1>{trans.contactus_information}</h1>
                <div className='flex flex-wrap justify-center items-center lg:justify-start'>
                  <SocialIcons setting={user} />
                </div>
              </div>
            </div>
          </div>

          {user.description && (
            <div className='px-6 pt-12 lg:px-8'>
              <div className='mx-auto max-w-2xl text-center '>
                <h2 className=' capitalize text-xl font-bold tracking-tight text-black sm:text-4xl'>
                  {trans.description}
                </h2>
                <div className='mt-6 text-lg leading-8 text-gray-800'>
                  <div
                    className='max-w-md sm:max-w-xl md:max-w-full whitespace-pre-line text-ellipsis overflow-hidden'
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(user.description),
                    }}></div>
                </div>
              </div>
            </div>
          )}

          {user.services && (
            <div className='px-6 pt-12 lg:px-8'>
              <div className='mx-auto max-w-2xl text-center '>
                <h2 className=' capitalize text-xl font-bold tracking-tight text-black sm:text-4xl'>
                  {trans.services}
                </h2>
                <div className='mt-6 text-lg leading-8 text-gray-800'>
                  <div
                    className='max-w-md sm:max-w-xl md:max-w-full whitespace-pre-line text-ellipsis overflow-hidden'
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(user.services),
                    }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </MainContextLayout>
  );
}
