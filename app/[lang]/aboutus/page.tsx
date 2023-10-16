import { MainContextLayout } from "@/components/MainContentLayout";
import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { getSetting } from "@/utils/setting";

export default async function Aboutus({
  params: { lang },
}: {
  params: { lang: Locale["lang"] };
}) {
  const [{ trans }, setting] = await Promise.all([
    getDictionary(lang),
    getSetting(lang),
  ]);

  return (
    <MainContextLayout trans={trans} lang={lang} searchParams={``}>
      <main className='relative isolate mx-auto max-w-7xl'>
        {/* Image section */}
        <div className='mt-8 sm:mt-8 xl:mx-auto xl:max-w-7xl xl:px-8'>
          <img
            src='https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2894&q=80'
            alt=''
            className='aspect-[9/4] w-full object-cover xl:rounded-3xl'
          />
        </div>
        {/* Header section */}
        <div className='px-6 pt-12 lg:px-8'>
          <div className='mx-auto max-w-2xl text-center '>
            <h2 className='text-4xl font-bold tracking-tight text-black sm:text-6xl'>
              We love creators
            </h2>
            <p className='mt-6 text-lg leading-8 text-gray-800'>
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
              fugiat aliqua.
            </p>
          </div>
        </div>

        {/* Content section */}
        <div className='mx-auto mt-8 max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl lg:mx-0 lg:max-w-none'>
            <div className='grid max-w-xl grid-cols-1 gap-8 text-base leading-7 text-gray-800 lg:max-w-none lg:grid-cols-2'>
              <div>
                <p>
                  Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget
                  risus enim. Mattis mauris semper sed amet vitae sed turpis id.
                  Id dolor praesent donec est. Odio penatibus risus viverra
                  tellus varius sit neque erat velit. Faucibus commodo massa
                  rhoncus, volutpat. Dignissim sed eget risus enim. Mattis
                  mauris semper sed amet vitae sed turpis id.
                </p>
                <p className='mt-8'>
                  Et vitae blandit facilisi magna lacus commodo. Vitae sapien
                  duis odio id et. Id blandit molestie auctor fermentum
                  dignissim. Lacus diam tincidunt ac cursus in vel. Mauris
                  varius vulputate et ultrices hac adipiscing egestas.
                </p>
              </div>
              <div>
                <p>
                  Erat pellentesque dictumst ligula porttitor risus eget et
                  eget. Ultricies tellus felis id dignissim eget. Est augue
                  maecenas risus nulla ultrices congue nunc tortor. Enim et
                  nesciunt doloremque nesciunt voluptate.
                </p>
                <p className='mt-8'>
                  Et vitae blandit facilisi magna lacus commodo. Vitae sapien
                  duis odio id et. Id blandit molestie auctor fermentum
                  dignissim. Lacus diam tincidunt ac cursus in vel. Mauris
                  varius vulputate et ultrices hac adipiscing egestas. Iaculis
                  convallis ac tempor et ut. Ac lorem vel integer orci.
                </p>
              </div>
            </div>
            <dl className='mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mt-28 lg:grid-cols-4'>
              <div
                // key={statIdx}
                className='flex flex-col-reverse gap-y-3 border-l border-white/20 pl-6'>
                <dt className='text-base leading-7 text-gray-800'>test</dt>
                <dd className='text-3xl font-semibold tracking-tight text-black'>
                  test
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </main>
    </MainContextLayout>
  );
}
