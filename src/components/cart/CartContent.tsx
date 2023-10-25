"use client";
import { useCreateOrUpdateOrderMutation } from "@/redux/api/orderApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { resetMembership, setMembership } from "@/redux/slices/cartSlice";
import { showErrorToastMessage } from "@/redux/slices/toastMessageSlice";
import { Locale } from "@/types/index";
import { Auth, Country, Membership } from "@/types/queries";
import { first, isNull } from "lodash";
import Image from "next/image";
import { useContext, useEffect, useRef } from "react";
import OrderDetails from "@/components/order/OrderDetails";
import { MainContext } from "@/layouts/MainContentLayout";

type Props = {
  membership: Membership;
  country: Country;
  dollarCountry: Country;
  user: Auth;
};
export default function ({
  membership,
  country,
  dollarCountry,
  
  user,
}: Props) {
  
  const trans: { [key: string]: string } = useContext(MainContext);
  const {
    locale : { lang }
    cart: {
      payment: { queryString, paymentUrl },
      order,
    },
    auth: { isAuth },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const fromRef = useRef<any>();
  const [triggerCreateOrUpdateOrderQuery, { data, isSuccess, error }] =
    useCreateOrUpdateOrderMutation();

  useEffect(() => {
    dispatch(setMembership({ membership, country, lang }));
  }, []);

  const createOrder = async () =>
    await triggerCreateOrUpdateOrderQuery({ ...order }).then((r: any) => {
      if (r.error) {
        dispatch(
          showErrorToastMessage({
            content: `${first(r.error.data.message)}`,
          })
        );
      } else {
        dispatch(resetMembership());
        fromRef.current && fromRef.current.submit();
      }
    });

  return (
    <main className='relative bg-white mx-auto max-w-7xl min-h-screen'>
      <div className='h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:px-4 xl:px-8'>
        <Image
          width={200}
          height={200}
          src='https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=2560&h=3413&&q=80'
          alt={membership.name}
          className='h-full w-full object-cover object-center'
        />
      </div>
      <div>
        <div className='mx-auto max-w-2xl px-4 py-8 sm:px-6  lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8  xl:gap-x-24'>
          <div className='lg:col-start-2 space-y-3'>
            <p
              className={`mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl`}>
              {trans.payment_confirmation}
            </p>
            <p
              className={`mt-2 text-base text-${
                order.paid ? `green` : `red`
              }-500 leading-loose line-clamp-2`}>
              {trans.plz_confirm_membership_selected_and_ur_company_information}
            </p>

            {/* company name */}
            <dl className='mt-16 grid grid-cols-1  gap-x-4 text-sm text-gray-600'>
              {user && (
                <div className=''>
                  <dt className='font-medium text-gray-900'>
                    {trans.beneficiary_name}
                  </dt>
                  <dd className='mt-2'>
                    <address className='not-italic gap-3 flex flex-row justify-start items-center'>
                      <div>
                        <Image
                          alt={user.name}
                          src={user.image}
                          width={60}
                          height={60}
                          className='object-contain rounded-lg shadow-sm w-20'
                        />
                      </div>
                      <div className='space-y-1'>
                        <span className='block'>{user.name}</span>
                        <span className='block'>{user.email}</span>
                        <span className='block'>
                          {user.area} {user.country?.name}
                        </span>
                      </div>
                    </address>
                  </dd>
                </div>
              )}
              <div>
                <dt className='font-medium text-gray-900 hidden'>
                  Payment Information
                </dt>
                <dd className='mt-2 space-y-2 sm:flex sm:space-x-4 sm:space-y-0 hidden'>
                  <div className='flex-none hidden'>
                    <svg
                      aria-hidden='true'
                      width={36}
                      height={24}
                      viewBox='0 0 36 24'
                      className='h-6 w-auto'>
                      <rect width={36} height={24} rx={4} fill='#224DBA' />
                      <path
                        d='M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z'
                        fill='#fff'
                      />
                    </svg>
                    <p className='sr-only'>Visa</p>
                  </div>
                  <div className='flex-auto hidden'>
                    <p className='text-gray-900'>Ending with 4242</p>
                    <p>Expires 12 / 21</p>
                  </div>
                </dd>
              </div>
            </dl>
            <h3 className='capitalize text-lg border-b border-gray-100'>
              {trans.membership_selected}
            </h3>
            <ul
              role='list'
              className='mt-2 divide-y divide-gray-200  text-sm font-medium text-gray-500'>
              <li className='flex justify-start items-center gap-6'>
                <Image
                  width={50}
                  height={50}
                  src={membership.image}
                  alt={membership.name}
                  className='h-full w-40 object-cover object-center rounded-lg'
                />
                <div className='flex-auto space-y-2'>
                  <h3 className='text-gray-900'>
                    <div>{membership.name}</div>
                  </h3>
                  <div className='flex w-full flex-row justify-between items-center capitalize'>
                    <div>
                      <p>
                        {trans.membership_type}{" "}
                        {membership.sort === "subscription"
                          ? trans.subscription
                          : trans.sponsorships}
                      </p>
                    </div>
                    <div
                      className={`w-8 h-8 p-2 rounded-md justify-center items-center text-center text-white`}
                      style={{
                        backgroundColor: `${membership.color}`,
                      }}>
                      {membership.zone}
                    </div>
                  </div>

                  <p>{membership.caption}</p>
                </div>
                {/* <p className='flex-none font-medium text-gray-900'>
                    {getPrice(membership.price, country[0])}
                  </p> */}
              </li>
            </ul>

            <OrderDetails
              order={order}
              country={country}
              lang={lang}
              dollarCountry={dollarCountry}
            />

            {!isNull(queryString) && (
              <form
                action={`${paymentUrl}${queryString}`}
                className={
                  " border-t border-gray-100 flex justify-end items-center w-full "
                }
                method='post'
                ref={fromRef}>
                <button
                  className={` line-clamp-2 ltr:text-right rtl:text-left capitalize bg-gray-200 p-3 py-4 my-2 rounded-md mt-8 hover:bg-gray-300`}
                  type='submit'
                  onClick={() => createOrder()}>
                  {trans.go_to_payment_page}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
