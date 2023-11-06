import Person from "@/appIcons/home/person.svg";
import OfficeBag from "@/appIcons/home/bag.svg";
import Qupe from "@/appIcons/home/qupe.svg";
import Group from "@/appIcons/home/group.svg";

type Props = {
  trans: { [key: string]: string };
};

export default function ({ trans }: Props) {
  return (
    <div className='bg-white py-12 sm:py-12 capitalize'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:max-w-none'>
          <dl className='mt-16 grid grid-cols-2 p-2 md:p-8 bg-expo-green  overflow-hidden rounded-2xl text-center lg:grid-cols-4 gap-2 divide-x rtl:divide-x-reverse divide-stone-300'>
            <div className='col-span-1 flex flex-1 flex-row  justify-evenly items-center h-40 px-4 md:px-8    hover:shadow-sm'>
              <Person className='w-16 h-16' />
              <div className='flex flex-col  p-2 border-gray-400  text-center'>
                <dt className='text-sm font-semibold break-words  leading-6 text-gray-600 line-clamp-2'>
                  {trans.a_key_partner_and_sponsor}
                </dt>
                <dd className='order-first text-3xl font-semibold tracking-tight text-gray-900'>
                  {52}
                </dd>
              </div>
            </div>

            <div className='col-span-1 flex flex-1 flex-row  justify-evenly items-center h-40 px-4 md:px-8    hover:shadow-sm'>
              <OfficeBag className='w-16 h-16' />
              <div className='flex flex-col  p-2   text-center'>
                <dt className='text-sm font-semibold break-words  leading-6 text-gray-600 line-clamp-2'>
                  {trans.investment_opportunities}
                </dt>
                <dd className='order-first text-3xl font-semibold tracking-tight text-gray-900'>
                  {45}
                </dd>
              </div>
            </div>

            <div className='col-span-1 flex flex-1 flex-row  justify-evenly items-center h-40 px-4 md:px-8    hover:shadow-sm'>
              <Qupe className='w-16 h-16' />
              <div className='flex flex-col  p-2 border-gray-400  text-center'>
                <dt className='text-sm font-semibold break-words  leading-6 text-gray-600 line-clamp-2'>
                  {trans.participant_in_events}
                </dt>
                <dd className='order-first text-3xl font-semibold tracking-tight text-gray-900'>
                  {`2345+`}
                </dd>
              </div>
            </div>

            <div className='col-span-1 flex flex-1 flex-row  justify-evenly items-center h-40 px-4 md:px-8   '>
              <Group className='w-16 h-16' />
              <div className='flex flex-col  p-2 border-gray-400  text-center'>
                <dt className='text-sm font-semibold break-words  leading-6 text-gray-600 line-clamp-2'>
                  {trans.seminar_during_the_exhibition}
                </dt>
                <dd className='order-first text-3xl font-semibold tracking-tight text-gray-900'>
                  {`36+`}
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
