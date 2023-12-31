"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import {
  enableLoading,
  toggleForgetPasswordModal,
} from "@/src/redux/slices/settingSlice";
import { MainContext } from "../layouts/MainContentLayout";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ForgetPass from "@/appIcons/auth/forget_pass.svg";
import { useGetCountriesQuery } from "@/src/redux/api/countryApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { pick } from "lodash";
import { registerSchema } from "@/src/validations";
import { Country } from "@/src/types/queries";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "@/src/redux/slices/toastMessageSlice";
import { useLazyVerifyQuery } from "@/src/redux/api/authApi";
type Inputs = {
  phone: string;
  phone_country_code: string;
};
export default function () {
  const trans: { [key: string]: string } = useContext(MainContext);
  const {
    appSetting: { showForgetPasswordModal },
    locale: { lang },
    country: { code },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const { data: countries, isSuccess: countriesSuccess } =
    useGetCountriesQuery();
  const [triggerVerifiy] = useLazyVerifyQuery();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    getValues,
  } = useForm<Inputs>({
    resolver: yupResolver(registerSchema.pick(["phone", "phone_country_code"])),
    defaultValues: {
      phone_country_code: code,
      phone: ``,
    },
  });

  console.log({ countries });

  const onSubmit: SubmitHandler<Inputs> = async (body) => {
    // reset pass
    // send otp

    dispatch(enableLoading());

    // await triggerVerifiy(
    //   {
    //     ...body,
    //     type: "reset",
    //   },
    //   false
    // ).then((r: any) => {
    //   if (r && r.error?.data) {
    //     dispatch(
    //       showErrorToastMessage({
    //         content: `${r.error?.data?.message}`,
    //       })
    //     );
    //   } else {
    //     // console.log({ r });
    //     dispatch(showSuccessToastMessage({ content: r.data?.message }));
    //     closeModal();
    //   }
    // });
  };

  const closeModal = () => {
    dispatch(toggleForgetPasswordModal());
    reset();
  };
  return (
    <>
      <Transition appear show={true} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => dispatch(toggleForgetPasswordModal())}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <div className=" capitalize flex flex-row justify-center items-center border-b border-gray-200 pb-4 text-xl">
                      {trans.forget_password}
                      <XMarkIcon
                        className="absolute ltr:left-4 rtl:right-4 w-6 h-6 text-gray-600 cursor-pointer"
                        onClick={closeModal}
                      />
                    </div>
                  </Dialog.Title>
                  <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 max-h-[70vh] overflow-y-auto scrollbar-hide">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                      <div className="flex justify-center mt-3">
                        <ForgetPass width={100} height={100} />
                      </div>
                      <div className="text-center mt-2">
                        <p className="font-semibold text-xl">
                          {trans.enter_account_phone_number}
                        </p>
                        <p className="text-picks-text-gray text-sm mt-1">
                          {
                            trans.enter_the_mobile_number_of_your_account_to_send_a_password_change_OTP_messsage
                          }
                        </p>
                      </div>
                    </div>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                      <form className="space-y-6" action="#" method="POST">
                        <div>
                          <label
                            htmlFor="phone_country_code"
                            className="ltr:text-left rtl:text-right lable-default"
                          >
                            {trans.phone_number}
                          </label>
                          <div className="mt-2">
                            <div className="flex flex-row gap-x-3">
                              <select
                                id="phone_country_code"
                                defaultValue={code}
                                {...register("phone_country_code")}
                                autoComplete="country-name"
                                className="block w-1/3 rounded-md py-1.5 input-default text-sm"
                              >
                                {countriesSuccess &&
                                  countries.data?.map(
                                    (c: Country, i: number) => (
                                      <option value={c.code} key={i}>
                                        {`${c.code} (${c.country_code})`}
                                      </option>
                                    )
                                  )}
                              </select>
                              <input
                                id="phone"
                                {...register("phone")}
                                // type="number"
                                name="phone"
                                className="input-default"
                              />
                            </div>
                            {errors?.phone?.message && (
                              <span
                                className={`text-red-700 text-xs capitalize`}
                              >
                                {trans[errors?.phone?.message]}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="mt-5">
                          <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-picks-dark px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-picks-dark"
                          >
                            {trans.send_otp}
                          </button>
                        </div>
                      </form>
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
