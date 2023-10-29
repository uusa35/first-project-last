import * as React from "react";
import NewsletterBg from "@/appImages/home/newsletter_bg.jpg";

type Props = {
  trans: { [key: string]: string };
};

export function RegisterToJoin({ trans }: Props) {
  return (
    <div className=' py-12 sm:py-12 capitalize '>
      <div className='mx-auto max-w-7xl sm:px-6 lg:px-8 bg-local'>
        <div
          className='bg-local  relative isolate overflow-hidden  px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32'
          style={{
            backgroundImage: `url(${NewsletterBg.src})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}>
          <h2 className='mx-auto max-w-3xl line-clamp-2 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl pb-4'>
            {trans.register_to_receive_latest_expo_news}
          </h2>
          <p className='mx-auto mt-2 max-w-xl  line-clamp-2 text-center text-lg leading-8 text-gray-300'>
            {
              trans.through_this_section_u_can_follow_up_all_news_related_to_this_expo_and_even_more
            }
          </p>
          <form className='mx-auto mt-10 flex max-w-md gap-x-4'>
            <label htmlFor='email-address' className='sr-only'>
              {trans.enter_ur_email}
            </label>
            <input
              id='email-address'
              name='email'
              type='email'
              autoComplete='email'
              required
              className='min-w-0 flex-auto rounded-md border-0 bg-white/80 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6'
              placeholder={trans.enter_ur_email}
            />
            <button
              type='submit'
              className='flex-none rounded-md bg-expo-medium hover:bg-expo-dark px-3.5 py-2.5 text-sm font-semibold text-white capitalize shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'>
              {trans.notify_me}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
