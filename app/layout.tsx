import "@/styles/globals.css";
import { Locale } from "@/types/index";
import { removeTags } from "@/utils/helpers";
import Providers from "@/src/redux/provider";
import MainLayout from "@/src/components/layouts/MainLayout";

type Props = {
  params: { lang: Locale["lang"] };
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale["lang"] };
}) {
  return (
    <html
      className='min-h-screen max-w-8xl mx-auto '
      lang={params.lang}
      dir={params.lang === "ar" ? "rtl" : "ltr"}>
      <body
        className={`font-expo-medium`}
        dir={params.lang === "ar" ? "rtl" : "ltr"}>
        <Providers>
          <MainLayout lang={params.lang}>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
