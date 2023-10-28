"use client";
import {
  useUpdateUserImageMutation,
  useUpdateUserMutation,
} from "@/redux/api/authApi";
import { Tab } from "@headlessui/react";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import { ArrowBack, FourGMobiledataSharp } from "@mui/icons-material";
import { ChangeEvent, FormEventHandler, useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, updateUserSchema } from "@/src/validations";
import { disableLoading, enableLoading } from "@/redux/slices/settingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { MainContext } from "@/layouts/MainContentLayout";
import { Auth, Category, Country, User } from "@/types/queries";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "@/redux/slices/toastMessageSlice";
import { get, map, omit, toString } from "lodash";
import InputError from "@/components/InputError";
import { TextEditor } from "@/components/TextEditor";
import InputLabel from "@/components/InputLabel";
import TextInput from "@/components/TextInput";
import LoadingSpinner from "../LoadingSpinner";
import Image from "next/image";
import { useLazyUploadImageQuery } from "@/redux/api";
import Select from "react-select";

type Inputs = {
  username: string;
  email: string;
  image: string;
  country_id: string;
  role: string;
  name: any;
  description: any;
  caption: any;
  categories: [] | undefined;
  tags: [] | undefined;
};
type Props = {
  user: User;
  countries: Country[];
  categories: Category[];
};
export default function ({ user, countries, categories }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const trans: { [key: string]: string } = useContext(MainContext);
  const {
    appSetting: { isLoading },
  } = useAppSelector((state) => state);
  const [triggerUpdateUser, { data, error, isSuccess }] =
    useUpdateUserMutation();
  const [triggerUpdateUserImage] = useUpdateUserImageMutation();
  const [triggerUploadImages] = useLazyUploadImageQuery();
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    reset,
    getValues,
    setValue,
    formState: { errors },
  }: any = useForm<User>({
    // resolver: yupResolver(updateUserSchema),
    defaultValues: {
      ...(isSuccess
        ? omit(data, [
            "image",
            "images",
            "country",
            "tags",
            "categories",
            "roles",
            "orders",
            "id",
          ])
        : omit(user, [
            "image",
            "images",
            "country",
            "tags",
            "categories",
            "role",
            "orders",
            "id",
          ])),
      categories: map(user.categories, "id"),
      tags: map(user.tags, "id"),
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (body: any) => {
    dispatch(enableLoading());
    await triggerUpdateUser({ body, id: user.id })
      .then((r: any) => {
        if (r && r.data) {
          dispatch(showSuccessToastMessage({ content: trans.process_success }));
          dispatch(disableLoading());
        } else if (r && r.error && r.error.data) {
          dispatch(
            showErrorToastMessage({
              content: `${r.error.data.message}`,
            })
          );
          dispatch(disableLoading());
        }
      })
      .then(() => {
        if (body.image[0]) {
          const formData = new FormData();
          formData.append("image", body.image[0]);
          formData.append("_method", "put");
          triggerUpdateUserImage({ formData, id: user.id });
        }
      });
  };

  const handleImages = async (imagesGroup: any) => {
    if (imagesGroup.length > 1 && imagesGroup.length <= 10 && user) {
      let formData = new FormData();
      const images: any = [];
      for (let i = 0; i < imagesGroup.length; i++) {
        formData.append(`images[${i}]`, imagesGroup[i]);
        images[`images[${i}]`] = imagesGroup[i];
      }
      formData.append("model", "user");
      formData.append("id", toString(user.id));
      await triggerUploadImages(formData);
      setValue("images", images);
    }
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setValue((values: any) => ({
      ...values,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <Tab.Group
      vertical={true}
      as={`div`}
      className={`flex flex-col md:flex-row p-3 md:p-0`}
      selectedIndex={selectedIndex}
      onChange={setSelectedIndex}>
      <Tab.List
        className={`flex flex-col justify-start items-center w-full md:w-1/3 p-6 bg-expo-light gap-y-6 `}
        as={"div"}>
        <Tab className={`flex w-full  justify-start items-center`}>
          <div className='flex flex-row justify-start items-center gap-x-4'>
            <div className='p-4 bg-white rounded-md shadow-md ring ring-gray-200'>
              <ArrowsPointingOutIcon className='w-8 h-8 text-gray-800' />
            </div>
            <div
              className={`flex flex-col justify-start items-start ${
                selectedIndex === 0 ? "text-expo-dark" : "text-gray-400"
              } `}>
              <div>Tab Title 1</div>
              <div>Tab Description 1</div>
            </div>
          </div>
        </Tab>
        <Tab className={`flex w-full  justify-start items-center`}>
          <div className='flex flex-row justify-start items-center gap-x-4'>
            <div className='p-4 bg-white rounded-md shadow-lg'>
              <ArrowsPointingOutIcon className='w-8 h-8 ' />
            </div>
            <div
              className={`flex flex-col justify-start items-start ${
                selectedIndex === 1 ? "text-expo-dark" : "text-gray-400"
              } `}>
              <div>Tab Title 1</div>
              <div>Tab Description 1</div>
            </div>
          </div>
        </Tab>
      </Tab.List>
      <Tab.Panels as={"div"} className={`flex w-full md:w-2/3 p-4 flex-col`}>
        <Tab.Panel>
          <LoadingSpinner isLoading={isLoading} />
          {/* // @eren i made most of items for you plz continue design and re-organize the file  */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`space-y-4 ${isLoading && "hidden"}`}>
            <div className='mt-6 flex items-center justify-end gap-x-6'>
              <button
                type='button'
                className='text-sm font-semibold leading-6 text-gray-900'>
                Cancel
              </button>
              <button type='submit' className='btn-default '>
                {trans.submit}
              </button>
            </div>
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
                {errors?.username?.message && (
                  <span className={`text-red-700 text-xs capitalize`}>
                    {errors?.username?.message}
                  </span>
                )}
              </div>
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
                  id='email'
                  {...register("email")}
                  type='email'
                  autoComplete='email'
                  className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6'
                />
                {errors?.email?.message && (
                  <span className={`text-red-700 text-xs capitalize`}>
                    {errors?.email?.message}
                  </span>
                )}
              </div>
            </div>
            {/* mobile */}
            <div>
              <InputLabel
                htmlFor='mobile'
                value={trans["mobile"]}
                aria-required
              />
              <TextInput
                defaultValue={user.mobile}
                id='mobile'
                {...register("mobile")}
                aria-required
                onChange={(e) => setValue("mobile", e.target.value)}
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'
              />
              <InputError message={get(errors, "mobile")} className='mt-2' />
            </div>
            {/* country_id */}
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-gray-900 capitalize'>
                {trans.email}
              </label>
              <div className='mt-2'>
                <select
                  onChange={(e) => handleChange(e)}
                  id='country_id'
                  name='country_id'
                  defaultValue={user.country_id}
                  required
                  className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'>
                  {map(countries, (c: any, i) => (
                    <option value={c.id} key={i}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {errors?.email?.message && (
                  <span className={`text-red-700 text-xs capitalize`}>
                    {errors?.email?.message}
                  </span>
                )}
              </div>
            </div>
            {/* image */}
            <div className='col-span-full grid grid-cols-1 lg:grid-cols-2'>
              <div className='col-span-1 flex-row'>
                <InputLabel htmlFor='image' value={trans.logo} aria-required />
                <div className='flex flex-row gap-x-4 my-4'>
                  <div>
                    <Image
                      src={user.thumb}
                      className='w-20 h-auto rounded-md'
                      alt={user.username}
                      width={100}
                      height={100}
                    />
                  </div>
                  <input
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setValue("image", e.target.files)
                    }
                    type='file'
                    {...register("image")}
                    id='image'
                    accept='image/jpg, image/jpeg , image/png'
                    className={`focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                  />
                </div>
              </div>

              {/* more images */}
              <div className='col-span-1'>
                <InputLabel
                  htmlFor='more_images'
                  value={trans.more_images}
                  aria-required
                />
                <input
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleImages(e.target.files)
                  }
                  type='file'
                  multiple
                  {...register("images")}
                  id='more_images'
                  // accept='image/jpg, image/jpeg , image/png'
                  autoComplete='more_images'
                  className={`pt-3.5 focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                />
              </div>
            </div>

            {categories ? (
              <div className='col-span-2 pt-4'>
                <InputLabel
                  htmlFor='categories'
                  value={trans.categories}
                  aria-required
                />
                <Select
                  defaultValue={map(user.categories, (c) => {
                    return {
                      label: c.name.en,
                      value: c.id,
                    };
                  })}
                  isMulti
                  required
                  name='categories'
                  options={map(categories, (c: any, i) => {
                    return {
                      label: c.name,
                      value: c.id,
                    };
                  })}
                  onChange={(e: any) => setValue("categories", map(e, "value"))}
                  className='basic-multi-select'
                  classNamePrefix='select'
                />
                <InputError
                  message={get(errors, "categories")}
                  className='mt-2'
                />
              </div>
            ) : null}

            {/* fields  */}
            <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {/*  name  */}
              <div className='col-span-full grid grid-cols-1 lg:grid-cols-3 gap-4'>
                <div>
                  <InputLabel
                    htmlFor='name[en]'
                    value={trans["name.en"]}
                    aria-required
                  />
                  <TextInput
                    defaultValue={user.name?.en}
                    id='name[en]'
                    name='name[en]'
                    required
                    aria-required
                    onChange={(e) =>
                      setValue("name", {
                        ...getValues("name"),
                        en: e.target.value,
                      })
                    }
                    className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'
                  />
                  <InputError
                    message={get(errors, "name.en")}
                    className='mt-2'
                  />
                </div>
                <div>
                  <InputLabel
                    htmlFor='name[ar]'
                    value={trans["name.ar"]}
                    aria-required
                  />
                  <TextInput
                    defaultValue={user.name?.ar}
                    id='name[ar]'
                    name='name[ar]'
                    required
                    aria-required
                    onChange={(e) =>
                      setValue("name", {
                        ...getValues("name"),
                        ar: e.target.value,
                      })
                    }
                    className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'
                  />
                  <InputError
                    message={get(errors, "name.ar")}
                    className='mt-2'
                  />
                </div>

                <div>
                  <InputLabel
                    htmlFor='name[ru]'
                    value={trans["name.ru"]}
                    aria-required
                  />
                  <TextInput
                    defaultValue={user.name?.ru}
                    id='name[ru]'
                    name='name[ru]'
                    required
                    aria-required
                    onChange={(e) =>
                      setValue("name", {
                        ...getValues("name"),
                        ru: e.target.value,
                      })
                    }
                    className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'
                  />
                  <InputError
                    message={get(errors, "name.ru")}
                    className='mt-2'
                  />
                </div>
              </div>
              {/* caption */}
              <div className='col-span-full grid grid-cols-1 lg:grid-cols-3 gap-4'>
                <div>
                  <InputLabel
                    htmlFor='caption[en]'
                    value={trans.aption_en}
                    aria-required
                  />
                  <TextInput
                    defaultValue={user.caption?.en}
                    id='caption[en]'
                    name='caption[en]'
                    required
                    aria-required
                    onChange={(e) =>
                      setValue("caption", {
                        ...getValues("name"),
                        en: e.target.value,
                      })
                    }
                    className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'
                  />
                  <InputError
                    message={get(errors, "caption.en")}
                    className='mt-2'
                  />
                </div>

                <div>
                  <InputLabel
                    htmlFor='name'
                    value={trans.aption_ar}
                    aria-required
                  />
                  <TextInput
                    defaultValue={user.caption?.ar}
                    id='caption[ar]'
                    name='caption[ar]'
                    required
                    aria-required
                    onChange={(e) =>
                      setValue("caption", {
                        ...getValues("name"),
                        ar: e.target.value,
                      })
                    }
                    className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'
                  />
                  <InputError
                    message={get(errors, "caption.ar")}
                    className='mt-2'
                  />
                </div>

                <div>
                  <InputLabel
                    htmlFor='name'
                    value={trans.caption_ru}
                    aria-required
                  />
                  <TextInput
                    defaultValue={user.caption?.ru}
                    id='caption[ru]'
                    name='caption[ru]'
                    required
                    aria-required
                    onChange={(e) =>
                      setValue("caption", {
                        ...getValues("name"),
                        ru: e.target.value,
                      })
                    }
                    className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'
                  />
                  <InputError
                    message={get(errors, "caption.ru")}
                    className='mt-2'
                  />
                </div>
              </div>
              {/* description[ar] */}
              <div className='col-span-full'>
                <InputLabel
                  htmlFor='description[ar]'
                  value={trans["description.ar"]}
                />
                <TextEditor
                  language='ar'
                  name='description'
                  setValue={setValue}
                  values={getValues()}
                  defaultValue={user.description?.ar}
                />
                <InputError
                  message={get(errors, "description.ar")}
                  className='mt-2'
                />
              </div>
              {/* descirption[en] */}
              <div className='col-span-full'>
                <InputLabel
                  htmlFor='description[en]'
                  value={trans["description.en"]}
                />
                <TextEditor
                  defaultValue={user.description?.en}
                  language='en'
                  name='description'
                  setValue={setValue}
                  values={getValues()}
                />
                <InputError
                  message={get(errors, "description.en")}
                  className='mt-2'
                />
              </div>
              {/* descrption[ru] */}
              <div className='col-span-full'>
                <InputLabel
                  htmlFor='description[ru]'
                  value={trans["description.ru"]}
                />
                <TextEditor
                  defaultValue={user.description?.ru}
                  language='ru'
                  name='description'
                  setValue={setValue}
                  values={getValues()}
                />
                <InputError
                  message={get(errors, "description.ru")}
                  className='mt-2'
                />
              </div>
            </div>
          </form>
        </Tab.Panel>
        <Tab.Panel>Content 2</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
