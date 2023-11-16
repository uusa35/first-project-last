import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import TextInput from "@/components/TextInput";
import { MainContext } from "@/layouts/MainContentLayout";
import { useAppSelector } from "@/redux/hooks";
import { updateUserSchema } from "@/src/validations";
import { Role } from "@/types/queries";
import { Tab } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { get, pick } from "lodash";
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

export function AccountInfo({ default_data, onSubmit }: Props) {
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

  //   console.log({ errors }, getValues());
  return (
    <Tab.Panel>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`space-y-8 ${isLoading && "hidden"}`}>
        <h1 className='text-2xl mb-10 mt-5'>{trans.update_information}</h1>
        {/*  username  */}
        <div>
          <label
            htmlFor='username'
            className='block text-sm font-medium leading-6 text-gray-900 capitalize'>
            {trans.username}
          </label>
          <div className='mt-2'>
            <input
              id='username'
              {...register("username")}
              type='text'
              autoComplete='email'
              className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6'
            />
            <InputError
              message={get(errors, "username.message")}
              className='mt-2'
            />
          </div>
        </div>
        {/* phone */}
        <div>
          <InputLabel htmlFor='phone' value={trans["phone"]} aria-required />
          {/* <TextInput
            // defaultValue={getValues("phone")}
            id="phone"
            type="text"
            {...register("phone")}
            aria-required
            // onChange={(e) => setValue("phone", e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
          /> */}
          <input
            id='phone'
            type='text'
            {...register("phone")}
            className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6'
          />
          <InputError message={get(errors, "phone.message")} className='mt-2' />
        </div>
        {/* email */}
        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium leading-6 text-gray-900 capitalize'>
            {trans.email}
          </label>
          <div className='mt-2'>
            <input
              disabled
              id='email'
              {...register("email")}
              type='email'
              autoComplete='email'
              className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6'
            />
            <InputError
              message={get(errors, "email.message")}
              className='mt-2'
            />
          </div>
        </div>
        {/* role */}
        <div>
          <InputLabel htmlFor='role' value={trans.role} aria-required />
          <select
            onChange={(e) =>
              setValue("role", e.target.value, { shouldValidate: true })
            }
            id='role'
            name='role'
            defaultValue={getValues("role")}
            className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'>
            <option value='company'>{trans.company}</option>
            <option value='visitor'>{trans.visitor}</option>
          </select>
          {/* <InputError message={errors.role} className="mt-2" /> */}
          <div className='p-3 bg-red-300 text-black my-3 rounded-md'>
            <h3>Declaration</h3>
            <p className=''>
              panel to inform user by switching to visitor role even if u have
              subscription deal paid your company profile wont be public anymore
            </p>
          </div>
        </div>
        <div className='mt-10 flex items-center justify-center gap-x-6'>
          <button type='submit' className='btn-default'>
            {trans.saving_information}
          </button>
        </div>
      </form>
    </Tab.Panel>
  );
}
