"use client";
import { MainContext } from "@/layouts/MainContentLayout";
import { Locale } from "@/types/index";
import { useState, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { searchSchema } from "@/src/validations";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
type Props = {
  lang: Locale["lang"];
};
type InputFields = {
  search: string;
};

export default function ({ lang }: Props) {
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
          <h2 className='text-3xl text-center leading-loose line-clamp-2 break-words font-bold tracking-tight text-gray-900 sm:text-4xl capitalize'>
            {trans.search_all_companies}
          </h2>
          <div className='mx-auto mt-10 flex flex-row h-14 max-w-2xl gap-x-4'>
            <div className='relative flex flex-col w-full'>
              <input
                // minLength={3}
                type='text'
                {...register("search")}
                className='min-w-0 ps-10 flex-auto rounded-md border-0 px-3.5 py-2 h-14 text-black bg-gray-100 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 capitalize'
                placeholder={
                  trans.enter_company_name_or_the_word_u_willing_to_search
                }
                onChange={(e) => setValue("search", e.target.value)}
              />
              <MagnifyingGlassIcon className='w-6 h-6 absolute top-4 rtl:right-2 ltr:left-2 text-gray-600' />
            </div>

            <button
              className='btn-default flex items-center justify-center w-1/5 capitalize'
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
