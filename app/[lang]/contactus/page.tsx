import { MainContextLayout } from "@/layouts/MainContentLayout";
import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { getSetting } from "@/utils/setting";
import Image from "next/image";
import { FormEvent } from "react";
import type { Metadata } from "next";
import ContactusContent from "@/components/contactus/ContactusContent";
import ContactusImage from "@/appImages/contactus/contactus_bg.jpg";
import { DevicePhoneMobileIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { whatsappUrl } from "@/src/constants";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  WhatsApp,
  YouTube,
  Email,
  Android,
  Apple,
} from "@mui/icons-material";
import SocialIcons from "@/components/footer/SocialIcons";

type Props = {
  params: { lang: Locale["lang"] };
};
export async function generateMetadata({ params }: Props) {
  const { trans } = await getDictionary(params.lang);
  return {
    title: trans.contactus,
  };
}
export default async function ({ params: { lang } }: Props) {
  const [{ trans }, setting] = await Promise.all([
    getDictionary(lang),
    getSetting(lang),
  ]);

  return (
    <MainContextLayout
      trans={trans}
      lang={lang}
      searchParams={``}
      setting={setting}>
      <div className='relative bg-white mx-auto max-w-7xl min-h-screen capitalize'>
        <div className='lg:absolute lg:inset-0 lg:ltr:left-1/2 lg:rtl:right-1/2'>
          <div className='absolute top-0 p-10 lg:p-16 text-white z-40 w-full'>
            <div className='flex flex-col justify-between items-center w-full h-full gap-y-4 lg:gap-y-48'>
              <div className='flex flex-col gap-y-6  w-full h-full'>
                <div className='flex flex-row justify-between items-center'>
                  <div className='space-y-4'>
                    <p>{setting.name}</p>
                    {setting.caption && <p>{setting.caption}</p>}
                  </div>
                  <div>
                    <Image
                      src={setting.image}
                      alt={setting.name}
                      width={100}
                      height={100}
                      className='w-12 h-auto'
                    />
                  </div>
                </div>
                {setting.address && (
                  <p>
                    {trans.address} : {setting.address} - {setting.country}
                  </p>
                )}
                {setting.longitude && setting.latitude && (
                  <iframe
                    src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6743.434929230318!2d46.682385832908714!3d24.711382293458314!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03280e046f99%3A0x37737eab160a212!2sKingdom%20Centre!5e0!3m2!1sen!2skw!4v1698144416000!5m2!1sen!2skw'
                    width='600'
                    height='450'
                    className='border-none w-full h-60 rounded-md'
                    loading='lazy'></iframe>
                )}
              </div>

              <div className='flex flex-col gap-y-6  w-full h-full'>
                <p className=''>{trans.contactus_information}</p>
                {/* phone */}
                {setting.phone && (
                  <div className='flex flex-row justify-start gap-x-4 items-center'>
                    <div>
                      <PhoneIcon className='w-6 h-auto text-white' />
                    </div>
                    <a target='_blank' href={`tel:${setting.phone}`}>
                      {setting.phone}
                    </a>
                  </div>
                )}
                {/* mobile */}
                {setting.mobile && (
                  <div className='flex flex-row justify-start gap-x-4 items-center'>
                    <div>
                      <DevicePhoneMobileIcon className='w-6 h-auto text-white' />
                    </div>
                    <a target='_blank' href={`tel:${setting.mobile}`}>
                      {setting.mobile}
                    </a>
                  </div>
                )}
                {/* whatsapp */}
                {setting.whatsapp && (
                  <div className='flex flex-row justify-start gap-x-4 items-center'>
                    <div>
                      <WhatsApp className='w-6 h-auto text-white' />
                    </div>

                    <a
                      target='_blank'
                      href={`https://api.whatsapp.com/send?phone=${setting.whatsapp}`}>
                      {setting.whatsapp}
                    </a>
                  </div>
                )}
                {/* email */}
                {setting.email && (
                  <div className='flex flex-row justify-start gap-x-4 items-center'>
                    <div>
                      <Email className='w-6 h-auto text-white' />
                    </div>
                    <a target='_blank' href={`mailto: ${setting.email}`}>
                      {setting.email}
                    </a>
                  </div>
                )}
                <div className='flex flex-row justify-evenly items-center gap-x-4'>
                  {/* android */}
                  {setting.android && (
                    <div className='flex flex-row justify-start gap-x-4 items-center'>
                      <a target='_blank' href={`${setting.android}`}>
                        <Android className='w-6 h-auto text-white' />
                      </a>
                    </div>
                  )}
                  {/* apple */}
                  {setting.apple && (
                    <div className='flex flex-row justify-start gap-x-4 items-center'>
                      <a target='_blank' href={`${setting.apple}`}>
                        <Apple className='w-6 h-auto text-white' />
                      </a>
                    </div>
                  )}
                </div>

                <SocialIcons setting={setting} color={`white`} />
              </div>
            </div>
          </div>
          <Image
            width={1000}
            height={1000}
            className='h-64 w-full bg-gray-50 object-cover sm:h-80 lg:absolute lg:h-full'
            src={ContactusImage}
            alt={setting.name}
          />
        </div>
        <div className='pb-24 pt-16 sm:pb-32 sm:pt-24 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:pt-32 '>
          <div className='px-6 lg:px-8'>
            <div className='mx-auto max-w-xl lg:mx-0 lg:max-w-lg capitalize'>
              <h2 className='text-3xl font-bold tracking-tight text-gray-900'>
                {trans.contactus}
              </h2>
              <p className='mt-2 text-lg leading-extra-loose text-gray-600'>
                {trans.contactus_message}
              </p>
            </div>
            <ContactusContent lang={lang} />
          </div>
        </div>
      </div>
    </MainContextLayout>
  );
}
