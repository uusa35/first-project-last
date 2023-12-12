"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { toggleForgetPasswordModal } from "@/src/redux/slices/settingSlice";

export default function () {
  const {
    appSetting: { showForgetPasswordModal },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  return (
    <>
      <Transition appear show={showForgetPasswordModal} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-10'
          onClose={() => dispatch(toggleForgetPasswordModal())}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <div className='fixed inset-0 bg-black/25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'>
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'>
                    Forget password
                  </Dialog.Title>
                  <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
                    <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                      <img
                        className='mx-auto h-10 w-auto'
                        src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
                        alt='Your Company'
                      />
                      <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                        Forget password
                      </h2>
                    </div>
                    <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                      <form className='space-y-6' action='#' method='POST'>
                        <div>
                          <label
                            htmlFor='email'
                            className='block text-sm font-medium leading-6 text-gray-900'>
                            Email address
                          </label>
                          <div className='mt-2'>
                            <input
                              id='email'
                              name='email'
                              type='email'
                              autoComplete='email'
                              required
                              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-picks-dark sm:text-sm sm:leading-6'
                            />
                          </div>
                        </div>

                        <div>
                          <div className='flex items-center justify-between'>
                            <label
                              htmlFor='password'
                              className='block text-sm font-medium leading-6 text-gray-900'>
                              Password
                            </label>
                            <div className='text-sm'>
                              <a
                                href='#'
                                className='font-semibold text-picks-dark hover:text-indigo-500'>
                                Forgot password?
                              </a>
                            </div>
                          </div>
                          <div className='mt-2'>
                            <input
                              id='password'
                              name='password'
                              type='password'
                              autoComplete='current-password'
                              required
                              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-picks-dark sm:text-sm sm:leading-6'
                            />
                          </div>
                        </div>

                        <div>
                          <button
                            type='submit'
                            className='flex w-full justify-center rounded-md bg-picks-dark px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-picks-dark'>
                            Sign in
                          </button>
                        </div>
                      </form>

                      <p className='mt-10 text-center text-sm text-gray-500'>
                        Not a member?{" "}
                        <a
                          href='#'
                          className='font-semibold leading-6 text-picks-dark hover:text-indigo-500'>
                          Start a 14 day free trial
                        </a>
                      </p>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
