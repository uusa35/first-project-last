import { MainContextLayout } from "@/layouts/MainContentLayout";
import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { getSetting } from "@/utils/setting";
import Image from "next/image";
import LoginImage from "@/appImages/login/section.jpg";
import Link from "next/link";
import { appLinks, setToken } from "@/src/constants";
import { login } from "@/utils/auth";
import { LoginContent } from "@/components/login/LoginContent";

export default async function Aboutus({
  params: { lang },
}: {
  params: { lang: Locale["lang"] };
}) {
  const [{ trans }, setting] = await Promise.all([
    getDictionary(lang),
    getSetting(lang),
  ]);

  // const createAccount = async (formData: FormData) => {
  //   "use server";
  //   const email = formData.get("email")?.toString();
  //   const password = formData.get("password")?.toString();

  //   // console.log({ email, password });
  //   if (email && password) {
  //     const userData = await login("company3@example.com", "password", lang);
  //     // setToken(userData.token);
  //     return userData;
  //     console.log({ userData });
  //   }
  // };

  return (
    <MainContextLayout
      trans={trans}
      lang={lang}
      searchParams={``}
      setting={setting}>
      <div className='flex flex-1 mx-auto max-w-7xl min-h-screen'>
        <div className='flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
          <div className='mx-auto w-full  max-w-sm lg:w-96 '>
            <div>
              <Image
                width={200}
                height={200}
                className=' w-auto object-contain'
                src={setting.image}
                alt={setting.name}
              />
              <h2 className='mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                {trans.welcome_back}
              </h2>
              <p className='mt-2 text-sm leading-6 text-gray-500'>
                {trans.welcome_back_Please_enter_the_following_information}
              </p>
            </div>

            <div className='mt-10'>
              <div>
                <LoginContent lang={lang} />
              </div>
            </div>
          </div>
        </div>
        <div className='relative hidden w-0 flex-1 lg:block'>
          <Image
            className='absolute inset-0 h-full w-full object-cover'
            width={600}
            height={1000}
            src={LoginImage.src}
            alt={setting.name}
          />
        </div>
      </div>
    </MainContextLayout>
  );
}
