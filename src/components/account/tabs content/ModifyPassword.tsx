import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import { MainContext } from "@/layouts/MainContentLayout";
import { useAppSelector } from "@/redux/hooks";
import { updateUserSchema } from "@/src/validations";
import { Role } from "@/types/queries";
import { Tab } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { get } from "lodash";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type InputsData = {
  username: string;
  email: string;
  role: Role["name"];
  phone: string;
};

type Props = {
  default_data: InputsData;
  onSubmit: SubmitHandler<InputsData>;
};

export function ModifyPassword({ default_data, onSubmit }: Props) {
  const trans: { [key: string]: string } = React.useContext(MainContext);
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
      updateUserSchema.pick(["username", "email", "phone", "role"])
    ),
    defaultValues: default_data,
  });

  return (
    <Tab.Panel>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`space-y-8 ${isLoading && "hidden"}`}
      >
        <h1 className="text-2xl mb-10 mt-5">{trans.modify_password}</h1>

        {/*  current_password  */}
        <div>
          {/* <label
            htmlFor="current_password"
            className="block text-sm font-medium leading-6 text-gray-900 capitalize"
          >
            {trans.current_password}
          </label> */}
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
        </div>

        {/*  new_password  */}
        <div>
          {/* <label
            htmlFor="new_password"
            className="block text-sm font-medium leading-6 text-gray-900 capitalize"
          >
            {trans.current_password}
          </label> */}
          <InputLabel
            htmlFor="new_password"
            value={trans["new_password"]}
            aria-required
          />
          <div className="mt-2">
            <input
              id="new_password"
              {...register("new_password")}
              type="text"
              autoComplete="password"
              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
            />
            <InputError
              message={get(errors, "new_password.message")}
              className="mt-2"
            />
          </div>
        </div>

        {/*  new_password_comfirmation  */}
        <div>
          {/* <label
            htmlFor="new_password_comfirmation"
            className="block text-sm font-medium leading-6 text-gray-900 capitalize"
          >
            {trans.current_password}
          </label> */}
          <InputLabel
            htmlFor="new_password_comfirmation"
            value={trans["new_password_comfirmation"]}
            aria-required
          />
          <div className="mt-2">
            <input
              id="new_password_comfirmation"
              {...register("new_password_comfirmation")}
              type="text"
              autoComplete="password"
              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
            />
            <InputError
              message={get(errors, "new_password_comfirmation.message")}
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
