import { MainContextLayout } from "@/components/MainContentLayout";
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
      setting={setting}
    >
      <div className="flex flex-1 mx-auto max-w-7xl min-h-screen">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full  max-w-sm lg:w-96 ">
            <div>
              <Image
                width={200}
                height={200}
                className=" w-auto object-contain"
                src={setting.image}
                alt={setting.name}
              />
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                {trans.welcome_back}
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                {trans.welcome_back_Please_enter_the_following_information}
              </p>
            </div>

            <div className="mt-10">
              <div>
                {/* <form
                  action={createAccount}
                  method="POST"
                  className="space-y-6"
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      {trans.email_address}
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      {trans.password}
                    </label>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-x-3 items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 checked:!bg-expo-dark focus:ring-0"
                      />
                      <label
                        htmlFor="remember-me"
                        className="block text-sm leading-6 text-gray-700"
                      >
                        {trans.remember_me_for_days}
                      </label>
                    </div>

                    <div className="text-sm leading-6">
                      <a
                        href="#"
                        className="font-semibold text-gray-600 hover:text-gray-500"
                      >
                        {trans.forgot_password}
                      </a>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center btn-color-default"
                    >
                      {trans.sign_in}
                    </button>
                  </div>
                </form> */}
                {/* <Test lang={lang} trans={trans} createAccount={createAccount} /> */}
                <LoginContent lang={lang} trans={trans} />
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <Image
            className="absolute inset-0 h-full w-full object-cover"
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
