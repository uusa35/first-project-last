import { MainContextLayout } from "@/layouts/MainContentLayout";
import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { getUser } from "@/utils/user";
import { getSetting } from "@/utils/setting";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import { notFound } from "next/navigation";
import UserIndexBanner from "@/appImages/user/user_show_banner.jpg";
import SocialIcons from "@/components/footer/SocialIcons";
import { EmailOutlined, InsertLink } from "@mui/icons-material";
import { ImageType, Setting, User } from "@/types/queries";
import { MainGallery } from "@/components/Home/MainGallery";
import { removeTags } from "@/utils/helpers";

type Props = {
  params: { lang: Locale["lang"]; id: string };
  searchParams: { [key: string]: string };
};

export async function generateMetadata({ params }: Props) {
  const [user, setting]: [User, Setting] = await Promise.all([
    getUser(params.id, params.lang),
    getSetting(params.lang),
  ]);
  if (!user || !user.id) {
    return undefined;
  }
  return {
    title: user.name,
    description: removeTags(user.description ?? setting.description),
    openGraph: {
      title: user.name,
      description: removeTags(user.description ?? setting.description),
      url: user.instagram ?? user.website ?? setting.website,
      siteName: user.name,
      images: [
        {
          url: user.image ?? setting.image,
          width: 800,
          height: 600,
        },
        {
          url: user.image ?? setting.image,
          width: 1800,
          height: 1600,
          alt: user.name,
        },
      ],
      locale: params.lang,
      type: "website",
    },
    twitter: {
      card: user.name,
      title: user.name,
      description: removeTags(user.description ?? setting.description),
      // siteId: "1467726470533754880",
      creator: setting.name,
      // creatorId: "1467726470533754880",
      images: [user.image ?? setting.image],
    },
  };
}

export default async function ({ params: { lang, id }, searchParams }: Props) {
  const [{ trans }, setting, user]: [{ trans: any }, Setting, User] =
    await Promise.all([
      getDictionary(lang),
      getSetting(lang),
      getUser(id, lang),
    ]);

  if ("status" in user && (user.status === 404 || user.status === 500 || !user))
    notFound();

  if (user.images.length > 0) {
    var imagesGroup = user.images.map((img: ImageType) => {
      return { thumbnail: img.image, original: img.image };
    });
  }

  return (
    <MainContextLayout
      trans={trans}
      lang={lang}
      searchParams={``}
      setting={setting}>
      <main className='relative isolate mx-auto max-w-7xl min-h-screen '>
        {/* Image section */}
        <div className='mt-8 sm:mt-8 xl:mx-auto xl:max-w-7xl '>
          <div className='absolute left-5 sm:left-10 top-10  z-10 '>
            <span
              className={` text-gray-800 bg-white/50 p-1 sm:p-4 rounded-md`}>
              {user.deals.membership.sort}
            </span>
          </div>
          <div className='absolute w-full  lg:max-w-4xl flex flex-col lg:flex-row  justify-center lg:justify-start items-center top-0 lg:top-32 bg-stone/60 lg:rtl:right-10 lg:ltr:left-10 p-8 text-white  gap-4  rounded-md'>
            <div>
              <Image
                width={100}
                height={100}
                src={user.image}
                alt={user.name}
                className='w-20 h-20 object-cover rounded-full border border-gray-400 shadow-lg'
              />
            </div>
            <div className='flex flex-col justify-center lg:justify-start items-center lg:items-start gap-4 text-center rtl:text-right ltr:text-left capitalize'>
              <div className='text-2xl lg:text-6xl '>{user.name}</div>
              <div className='text-lg lg:text-xl'>{user.caption}</div>
            </div>
          </div>
          {user.banner ? (
            <Image
              width={1000}
              height={500}
              src={user.banner}
              alt={user.name}
              className='aspect-[9/5] sm:aspect-[9/3] w-full  object-cover xl:rounded-xl'
            />
          ) : (
            <Image
              width={1000}
              height={500}
              src={UserIndexBanner}
              alt={user.name}
              className='aspect-[9/5] sm:aspect-[9/3] w-full  object-cover xl:rounded-xl'
            />
          )}
        </div>

        <div className='flex flex-col w-full min-h-screen justify-start items-center gap-y-12 '>
          {/* aboutus section */}
          {user.aboutus && (
            <div className='px-2 pt-12 lg:px-8'>
              <div className='mx-auto text-center'>
                <h2 className='text-2xl font-bold tracking-tight text-black sm:text-4xl capitalize'>
                  {trans.aboutus}
                </h2>
                <div className='mt-6 text-lg leading-8 text-gray-800 '>
                  <div
                    className='max-w-xs sm:max-w-xl md:max-w-full  whitespace-pre-line text-ellipsis overflow-hidden'
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
                <h1 className={`text-2xl capitalize`}>
                  {trans.contactus_information}
                </h1>
                <p className='text-clamp-2 text-clip'>
                  {user.address} - {user.country.name}
                </p>
              </div>
              {user.email && (
                <div className='flex flex-col gap-y-4 leading-8'>
                  <div className='flex flex-row justify-start items-center gap-x-3'>
                    <div>
                      <EmailOutlined />
                    </div>
                    <div>
                      <h1 className='capitalize'>{trans.email}</h1>
                    </div>
                  </div>
                  <div className='ltr:text-left rtl:text-right'>
                    <a target='_blank' href={`mailto: ${user.email}`}>
                      {user.email}
                    </a>
                  </div>
                </div>
              )}
              <div className='flex flex-col gap-y-4 leading-8 '>
                <div className='flex flex-col justify-between items-start gap-y-4'>
                  {/* website */}
                  {user.website && (
                    <div className='flex flex-col gap-y-4'>
                      <div className='flex flex-row justify-start items-center gap-x-3'>
                        <div>
                          <InsertLink />
                        </div>
                        <div>
                          <h1>{trans.website}</h1>
                        </div>
                      </div>
                      <div className='flex flex-wrap justify-center items-center lg:justify-start'>
                        {user.website}
                      </div>
                    </div>
                  )}
                  {/* social */}
                  <div className='flex flex-col gap-y-4'>
                    <div className='flex flex-row justify-start items-center gap-x-3'>
                      <div>
                        <InsertLink />
                      </div>
                      <div>
                        <h1>{trans.social_media_links}</h1>
                      </div>
                    </div>
                    <div className='flex flex-wrap justify-center items-center lg:justify-start'>
                      <SocialIcons setting={user} color='green' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {user.description && (
            <div className='px-6 pt-12 lg:px-8'>
              <div className='mx-auto  text-center '>
                <h2 className=' capitalize text-xl font-bold tracking-tight text-black sm:text-4xl'>
                  {trans.description}
                </h2>
                <div className='mt-6 text-lg leading-8 text-gray-800'>
                  <div
                    className='max-w-xs sm:max-w-xl md:max-w-full  whitespace-pre-line text-ellipsis overflow-hidden'
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(user.description),
                    }}></div>
                </div>
              </div>
            </div>
          )}

          {user.services && (
            <div className='px-6 pt-12 lg:px-8'>
              <div className='mx-auto  text-center '>
                <h2 className=' capitalize text-xl font-bold tracking-tight text-black sm:text-4xl'>
                  {trans.services}
                </h2>
                <div className='mt-6 text-lg leading-8 text-gray-800'>
                  <div
                    className='max-w-xs sm:max-w-xl md:max-w-full  whitespace-pre-line text-ellipsis overflow-hidden'
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(user.services),
                    }}></div>
                </div>
              </div>
            </div>
          )}

          <MainGallery
            trans={trans as { [key: string]: string }}
            images={user.images}
            setting={setting}
            message={trans.home}
          />
        </div>
      </main>
    </MainContextLayout>
  );
}
