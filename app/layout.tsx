import "@/styles/globals.css";
import { Locale } from "@/types/index";
import Providers from "@/src/redux/provider";
import MainLayout from "@/src/components/layouts/MainLayout";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/slick.css"

type Props = {
   lang: Locale["lang"];
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Props;
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
