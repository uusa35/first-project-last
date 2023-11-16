"use client";
import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import { MainContext } from "@/layouts/MainContentLayout";
import { useChangePasswordMutation } from "@/redux/api/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { disableLoading, enableLoading } from "@/redux/slices/settingSlice";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "@/redux/slices/toastMessageSlice";
import { registerSchema, updateUserSchema } from "@/src/validations";
import { AppQueryResult, Role, User } from "@/types/queries";
import { Tab } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { get } from "lodash";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type InputsData = {
  password: string;
  password_confirmation: string;
};

type Props = {};

export function ModifyPassword({}: Props) {
  const dispatch = useAppDispatch();
  const trans: { [key: string]: string } = React.useContext(MainContext);
  const [triggerChangePassword, { data: user, error, isSuccess }] =
    useChangePasswordMutation();
  const {
    appSetting: { isLoading },
  } = useAppSelector((state) => state);
  const {
    handleSubmit,
    register,
    reset,
    getValues,
    setValue,
    formState: { errors },
  }: any = useForm({
    resolver: yupResolver(
      registerSchema.pick(["password", "password_confirmation"])
    ),
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit: SubmitHandler<InputsData> = (data) => {
    // console.log({ data });
    dispatch(enableLoading());
    triggerChangePassword({ params: { ...data } }).then((r: any) => {
      // console.log({ r });
      if (r && r.data) {
        dispatch(showSuccessToastMessage({ content: trans.process_success }));
      } else if (r && r.error && r.error.data) {
        dispatch(
          showErrorToastMessage({
            content: `${r.error.data.message}`,
          })
        );
      }
      dispatch(disableLoading());
    });
  };
  // console.log(getValues());

  return (
    <Tab.Panel>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`space-y-8 ${isLoading && "hidden"}`}
      >
        <h1 className="text-2xl mb-10 mt-5">{trans.modify_password}</h1>

        {/*  current_password  */}
        {/* <div>
          <InputLabel
            htmlFor="current_password"
            value={trans["current_password"]}
            aria-required
          />
          <div className="mt-2">
            <input
              id="current_password"
              {...register("current_password")}
              type="text"
              autoComplete="password"
              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
            />
            <InputError
              message={get(errors, "current_password.message")}
              className="mt-2"
            />
          </div>
        </div> */}

        {/*  new_password  */}
        <div>
          <InputLabel
            htmlFor="password"
            value={trans["password"]}
            aria-required
          />
          <div className="mt-2">
            <input
              id="new_password"
              {...register("password")}
              type="text"
              autoComplete="password"
              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
            />
            <InputError
              message={get(errors, "password.message")}
              className="mt-2"
            />
          </div>
        </div>

        {/*  new_password_comfirmation  */}
        <div>
          <InputLabel
            htmlFor="password_confirmation"
            value={trans["password_confirmation"]}
            aria-required
          />
          <div className="mt-2">
            <input
              id="password_confirmation"
              {...register("password_confirmation")}
              type="text"
              autoComplete="password"
              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
            />
            <InputError
              message={get(errors, "password_confirmation.message")}
              className="mt-2"
            />
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button type="submit" className="btn-default">
            {trans.saving_information}
          </button>
        </div>
      </form>
    </Tab.Panel>
  );
}
