"use client";
import { MainContext } from "@/layouts/MainContentLayout";
import { Locale } from "@/types/index";
import { useState, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { searchSchema } from "@/src/validations";
type Props = {
  lang: Locale["lang"];
};
type InputFields = {
  search: string;
};

export function SearchBar({ lang }: Props) {
  const [searchKey, setSearchKey] = useState<string>("");
  const router = useRouter();
  const trans: { [key: string]: string } = useContext(MainContext);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<InputFields>({
    resolver: yupResolver(searchSchema),
  });
  const onSubmit: SubmitHandler<InputFields> = async ({ search }) => {
    router.push(`/${lang}/user?search=${search}`);
  };

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-7xl px-6 sm:rounded-3xl sm:px-14 py-12 xl:py-14'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='relative isolate overflow-hidden  '>
          <h2 className='text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-4xl capitalize'>
            {trans.search}
          </h2>
          <div className='mx-auto mt-10 flex flex-row h-14 max-w-2xl gap-x-4'>
            <div className='flex flex-col w-full'>
              <input
                // minLength={3}
                type='text'
                {...register("search")}
                className='min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 h-14 text-black bg-gray-100 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 capitalize'
                placeholder={trans.search}
                onChange={(e) => setValue("search", e.target.value)}
              />
            </div>

            <button
              className='btn-default flex items-center capitalize'
              type='submit'>
              {trans.search}
            </button>
          </div>
        </form>
        <div className='flex flex-1 justify-center items-center max-w-lg'>
          {errors?.search?.message && (
            <p className='text-sm pt-4 text-red-600'>{`${errors?.search?.message}`}</p>
          )}
        </div>
      </div>
    </div>
  );
}
