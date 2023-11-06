"use client";
import { ChangeEvent, useContext, useState } from "react";
import {
  useLazyUploadImageQuery,
  useUpdateUserMutation,
} from "@/redux/api/authApi";
import { Tab } from "@headlessui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, updateUserSchema } from "@/src/validations";
import { disableLoading, enableLoading } from "@/redux/slices/settingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { MainContext } from "@/layouts/MainContentLayout";
import {
  AppQueryResult,
  Auth,
  Category,
  Country,
  ImageType,
  Role,
  User,
} from "@/types/queries";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "@/redux/slices/toastMessageSlice";
import { get, map, omit, pick, toNumber, toString } from "lodash";
import InputError from "@/components/InputError";
import { TextEditor } from "@/components/TextEditor";
import InputLabel from "@/components/InputLabel";
import TextInput from "@/components/TextInput";
import LoadingSpinner from "../LoadingSpinner";
import Image from "next/image";
import { useLazyUploadImagesQuery } from "@/redux/api";
import Select from "react-select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AccountInfo } from "./tabs content/AccountInfo";
import { TabList } from "./TabList";
import { ModifyPassword } from "./tabs content/ModifyPassword";
import BasicInfo from "./tabs content/BasicInfo";

type Inputs = {
  username?: string;
  email?: string;
  image?: string;
  country_id?: string;
  role?: Role["name"];
  name?: any;
  description?: any;
  caption?: any;
  categories?: [] | undefined;
  tags?: [] | undefined;
  mobile?: string;
  phone?: string;
  whatsapp?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  snap?: string;
  tiktok?: string;
  linked?: string;
  iphone?: string;
  android?: string;
  longitude?: string;
  latitude?: string;
  keywords?: string;
  website?: string;
  images?: [];
  address?: string;
};
type Props = {
  element: User;
  countries: Country[];
  categories: AppQueryResult<Category[]>;
};
export default function ({ element, countries, categories }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams?.get("active_tab") ?? "0";
  // const [selectedIndex, setSelectedIndex] = useState(0);
  const trans: { [key: string]: string } = useContext(MainContext);
  const {
    appSetting: { isLoading },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [triggerUpdateUser, { data: user, error, isSuccess }] =
    useUpdateUserMutation();
  const [triggerUploadImage] = useLazyUploadImageQuery();
  const [triggerUploadImages] = useLazyUploadImagesQuery();
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
      ...(isSuccess && user
        ? omit(user, [
            "image",
            "images",
            "country",
            "tags",
            "categories",
            "roles",
            "orders",
            "id",
            "name",
            "description",
            "aboutus",
            "services",
            "address",
          ])
        : omit(element, [
            "image",
            "images",
            "country",
            "tags",
            "categories",
            "role",
            "orders",
            "id",
            "name",
            "description",
            "aboutus",
            "services",
            "address",
          ])),
      categories:
        isSuccess && user
          ? map(user.categories, "id")
          : map(element.categories, "id"),
      tags: isSuccess && user ? map(user.tags, "id") : map(element.tags, "id"),
      role: isSuccess && user ? user.roles[0].name : element.roles[0].name,
      name: {
        ar: user?.name?.ar ?? element?.name?.ar ?? "",
        en: user?.name?.en ?? element?.name?.en ?? "",
        ru: user?.name?.ru ?? element?.name?.ru ?? "",
      },
      description: {
        ar: user?.description?.ar ?? element?.description?.ar ?? "",
        en: user?.description?.en ?? element?.description?.en ?? "",
        ru: user?.description?.ru ?? element?.description?.ru ?? "",
      },
      caption: {
        ar: user?.caption?.ar ?? element?.caption?.ar ?? "",
        en: user?.caption?.en ?? element?.caption?.en ?? "",
        ru: user?.caption?.ru ?? element?.caption?.ru ?? "",
      },
      services: {
        ar: user?.services?.ar ?? element?.services?.ar ?? "",
        en: user?.services?.en ?? element?.services?.en ?? "",
        ru: user?.services?.ru ?? element?.services?.ru ?? "",
      },
      aboutus: {
        ar: user?.aboutus?.ar ?? element?.aboutus?.ar ?? "",
        en: user?.aboutus?.en ?? element?.aboutus?.en ?? "",
        ru: user?.aboutus?.ru ?? element?.aboutus?.ru ?? "",
      },
      address: "",
      image: ``,
      images: [],
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (body: any) => {
    dispatch(enableLoading());
    await triggerUpdateUser({ body, id: element.id })
      .then((r: any) => {
        if (r && r.data) {
          dispatch(showSuccessToastMessage({ content: trans.process_success }));
          // navigate
          router.push(
            `${
              pathname + "?active_tab=" + (parseInt(activeTab) + 1).toString()
            }`
          );
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
          formData.append("name", "image");
          formData.append("model", "user");
          formData.append("id", toString(element.id));
          triggerUploadImage(formData);
        }
      });
  };

  const handleImages = async (imagesGroup: any) => {
    if (imagesGroup.length > 1 && imagesGroup.length <= 10) {
      let formData = new FormData();
      for (let i = 0; i < imagesGroup.length; i++) {
        formData.append(`images[${i}]`, imagesGroup[i]);
      }
      formData.append("model", "user");
      formData.append("id", toString(element.id));
      await triggerUploadImages(formData).then((r: any) => {
        if (r.data && r.data.message) {
          dispatch(showSuccessToastMessage({ content: r.data.message }));
        } else if (r.error && r.error.data?.message) {
          dispatch(showErrorToastMessage({ content: r.error.data.message }));
        }
      });
    }
  };

  console.log({ element, user });
  return (
    <Tab.Group
      vertical={true}
      as={`div`}
      className={`flex flex-col md:flex-row p-3 md:p-0`}
      selectedIndex={toNumber(activeTab)}
    >
      <TabList activeTab={activeTab} />
      <Tab.Panels as={"div"} className={`flex w-full md:w-2/3 p-4 flex-col`}>
        <LoadingSpinner isLoading={isLoading} />
        <AccountInfo
          onSubmit={onSubmit}
          default_data={{
            ...pick(isSuccess && user ? user : element, [
              "id",
              "username",
              "phone",
              "email",
            ]),
            role: isSuccess && user ? user.role?.name : element.roles[0]?.name,
          }}
        />
        <ModifyPassword
          onSubmit={onSubmit}
          default_data={{
            ...pick(isSuccess && user ? user : element, [
              "id",
              "username",
              "phone",
              "email",
            ]),
            role: isSuccess && user ? user.role?.name : element.roles[0]?.name,
          }}
        />

        <BasicInfo
          categories={categories.data}
          onSubmit={onSubmit}
          countries={countries}
          default_data={{
            ...pick(isSuccess && user ? user : element, [
              "name",
              "caption",
              "categories",
              "country_id",
              "address",
              "keywords",
            ]),
          }}
        />

        <Tab.Panel>
          <LoadingSpinner isLoading={isLoading} />
          {/* // @eren i made most of items for you plz continue design and re-organize the file  */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`space-y-4 ${isLoading && "hidden"}`}
          >
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              <button type="submit" className="btn-default ">
                {trans.submit}
              </button>
            </div>
            {/* role */}
            <div>
              <InputLabel htmlFor="role" value={trans.role} aria-required />
              <select
                onChange={(e) => setValue("role", e.target.value)}
                id="role"
                name="role"
                defaultValue={getValues("role")}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              >
                <option value="company">{trans.company}</option>
                <option value="visitor">{trans.visitor}</option>
              </select>
              <InputError message={errors.role} className="mt-2" />
              <div className="p-3 bg-red-300 text-black my-3 rounded-md">
                <h3>Declaration</h3>
                <p className="">
                  panel to inform user by switching to visitor role even if u
                  have subscription deal paid your company profile wont be
                  public anymore
                </p>
              </div>
            </div>

            {/*  username  */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900 capitalize"
              >
                {trans.username}
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  {...register("username")}
                  type="text"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
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
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900 capitalize"
              >
                {trans.email}
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email")}
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                />
                {errors?.email?.message && (
                  <span className={`text-red-700 text-xs capitalize`}>
                    {errors?.email?.message}
                  </span>
                )}
              </div>
            </div>

            {/* country_id */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900 capitalize"
              >
                {trans.country}
              </label>
              <div className="mt-2">
                <select
                  onChange={(e) => setValue("country_id", e.target.value)}
                  id="country_id"
                  name="country_id"
                  defaultValue={getValues("country_id")}
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                >
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

            {/*  address  */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-6 text-gray-900 capitalize"
              >
                {trans.address}
              </label>
              <div className="mt-2">
                <input
                  id="address"
                  {...register("address")}
                  onChange={(e) => setValue("address[0]", e.target.value)}
                  type="text"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                />
                {errors?.address?.message && (
                  <span className={`text-red-700 text-xs capitalize`}>
                    {errors?.address?.message}
                  </span>
                )}
              </div>
            </div>

            <div className="col-span-full grid grid-cols-1 lg:grid-cols-2">
              {/* image */}
              <div className="col-span-1 flex-row">
                <InputLabel htmlFor="image" value={trans.logo} aria-required />
                <div className="flex flex-row gap-x-4 my-4">
                  {isSuccess && user ? (
                    <div>
                      <Image
                        src={user.thumb}
                        className="w-20 h-auto rounded-md"
                        alt={user.username}
                        width={100}
                        height={100}
                      />
                    </div>
                  ) : (
                    <div>
                      <Image
                        src={element.thumb}
                        className="w-20 h-auto rounded-md"
                        alt={element.username}
                        width={100}
                        height={100}
                      />
                    </div>
                  )}

                  <input
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setValue("image", e.target.files)
                    }
                    type="file"
                    {...register("image")}
                    id="image"
                    accept="image/jpg, image/jpeg , image/png"
                    className={`focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                  />
                </div>
              </div>

              {/* banner */}
              <div className="col-span-1 flex-row">
                <InputLabel
                  htmlFor="banner"
                  value={trans.banner}
                  aria-required
                />
                <div className="flex flex-row gap-x-4 my-4">
                  {/* {user.banner && (
                    <div>
                      <Image
                        src={user.banner}
                        className='w-20 h-auto rounded-md'
                        alt={user.username}
                        width={100}
                        height={100}
                      />
                    </div>
                  )} */}

                  <input
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setValue("banner", e.target.files)
                    }
                    type="file"
                    {...register("banner")}
                    id="banner"
                    accept="image/jpg, image/jpeg , image/png"
                    className={`focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                  />
                </div>
              </div>

              {/* more images */}
              <div className="col-span-1">
                <InputLabel
                  htmlFor="more_images"
                  value={trans.gallery}
                  aria-required
                />
                <input
                  onChange={(e: any) => handleImages(e.target.files)}
                  type="file"
                  multiple
                  name="images"
                  id="more_images"
                  accept="image/jpg, image/jpeg , image/png"
                  autoComplete="more_images"
                  className={`pt-3.5 focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                />
              </div>
            </div>
            <div className="col-span-full flex flex-row justify-start items-center gap-x-3 my-4">
              {isSuccess && user
                ? map(user.images, (img: ImageType, i: number) => (
                    <Image
                      className="w-20 h-auto border border-gray-200 rounded-sm"
                      src={img.thumb}
                      width={100}
                      height={100}
                      alt={element.username}
                    />
                  ))
                : map(element.images, (img) => (
                    <Image
                      className="w-20 h-auto border border-gray-200 rounded-sm"
                      src={img.thumb}
                      width={100}
                      height={100}
                      alt={element.username}
                    />
                  ))}
            </div>

            {categories && categories.data ? (
              <div className="col-span-2 pt-4">
                <InputLabel
                  htmlFor="categories"
                  value={trans.categories}
                  aria-required
                />
                <Select
                  defaultValue={map(
                    (user && user.categories) ?? element.categories,
                    (c) => {
                      return {
                        label: c.name.en,
                        value: c.id,
                      };
                    }
                  )}
                  isMulti
                  required
                  name="categories"
                  options={map(categories.data, (c: any, i) => {
                    return {
                      label: c.name,
                      value: c.id,
                    };
                  })}
                  onChange={(e: any) => setValue("categories", map(e, "value"))}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
                <InputError
                  message={get(errors, "categories")}
                  className="mt-2"
                />
              </div>
            ) : null}

            {/* fields  */}
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {/*  name  */}
              <div className="col-span-full grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div>
                  <InputLabel
                    htmlFor="name[en]"
                    value={trans["name.en"]}
                    aria-required
                  />
                  <TextInput
                    defaultValue={getValues("name.en")}
                    id="name[en]"
                    name="name[en]"
                    required
                    aria-required
                    onChange={(e) =>
                      setValue("name", {
                        ...getValues("name"),
                        en: e.target.value,
                      })
                    }
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  />
                  <InputError
                    message={get(errors, "name.en")}
                    className="mt-2"
                  />
                </div>
                <div>
                  <InputLabel
                    htmlFor="name[ar]"
                    value={trans["name.ar"]}
                    aria-required
                  />
                  <TextInput
                    defaultValue={getValues("name.ar")}
                    id="name[ar]"
                    name="name[ar]"
                    required
                    aria-required
                    onChange={(e) =>
                      setValue("name", {
                        ...getValues("name"),
                        ar: e.target.value,
                      })
                    }
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  />
                  <InputError
                    message={get(errors, "name.ar")}
                    className="mt-2"
                  />
                </div>

                <div>
                  <InputLabel
                    htmlFor="name[ru]"
                    value={trans["name.ru"]}
                    aria-required
                  />
                  <TextInput
                    defaultValue={getValues("name.ru")}
                    id="name[ru]"
                    name="name[ru]"
                    required
                    aria-required
                    onChange={(e) =>
                      setValue("name", {
                        ...getValues("name"),
                        ru: e.target.value,
                      })
                    }
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  />
                  <InputError
                    message={get(errors, "name.ru")}
                    className="mt-2"
                  />
                </div>
              </div>
              {/* caption */}
              <div className="col-span-full grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div>
                  <InputLabel
                    htmlFor="caption[en]"
                    value={trans["caption.en"]}
                    aria-required
                  />
                  <TextInput
                    defaultValue={getValues("caption.en")}
                    id="caption[en]"
                    name="caption[en]"
                    required
                    aria-required
                    onChange={(e) =>
                      setValue("caption", {
                        ...getValues("caption"),
                        en: e.target.value,
                      })
                    }
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  />
                  <InputError
                    message={get(errors, "caption.en")}
                    className="mt-2"
                  />
                </div>

                <div>
                  <InputLabel
                    htmlFor="name"
                    value={trans["name.ar"]}
                    aria-required
                  />
                  <TextInput
                    defaultValue={getValues("caption.ar")}
                    id="caption[ar]"
                    name="caption[ar]"
                    required
                    aria-required
                    onChange={(e) =>
                      setValue("caption", {
                        ...getValues("caption"),
                        ar: e.target.value,
                      })
                    }
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  />
                  <InputError
                    message={get(errors, "caption.ar")}
                    className="mt-2"
                  />
                </div>

                <div>
                  <InputLabel
                    htmlFor="name"
                    value={trans["name.ar"]}
                    aria-required
                  />
                  <TextInput
                    defaultValue={getValues("caption.ru")}
                    id="caption[ru]"
                    name="caption[ru]"
                    required
                    aria-required
                    onChange={(e) =>
                      setValue("caption", {
                        ...getValues("caption"),
                        ru: e.target.value,
                      })
                    }
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  />
                  <InputError
                    message={get(errors, "caption.ru")}
                    className="mt-2"
                  />
                </div>
              </div>
              {/* description[ar] */}
              <div className="col-span-full">
                <InputLabel
                  htmlFor="description[ar]"
                  value={trans["description.ar"]}
                />
                <TextEditor
                  language="ar"
                  name="description"
                  setValue={setValue}
                  defaultValue={getValues("description.ar")}
                />
                <InputError
                  message={get(errors, "description.ar")}
                  className="mt-2"
                />
              </div>
              {/* descirption[en] */}
              <div className="col-span-full">
                <InputLabel
                  htmlFor="description[en]"
                  value={trans["description.en"]}
                />
                <TextEditor
                  defaultValue={getValues("description.en")}
                  language="en"
                  name="description"
                  setValue={setValue}
                />
                <InputError
                  message={get(errors, "description.en")}
                  className="mt-2"
                />
              </div>
              {/* descrption[ru] */}
              <div className="col-span-full">
                <InputLabel
                  htmlFor="description[ru]"
                  value={trans["description.ru"]}
                />
                <TextEditor
                  defaultValue={getValues("description.ru")}
                  language="ru"
                  name="description"
                  setValue={setValue}
                />
                <InputError
                  message={get(errors, "description.ru")}
                  className="mt-2"
                />
              </div>
            </div>

            {/* mobile */}
            <div>
              <InputLabel
                htmlFor="mobile"
                value={trans["mobile"]}
                aria-required
              />
              <TextInput
                defaultValue={getValues("mobile")}
                id="mobile"
                type="text"
                {...register("mobile")}
                aria-required
                onChange={(e) => setValue("mobile", e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
              <InputError message={get(errors, "mobile")} className="mt-2" />
            </div>
            {/* phone */}
            <div>
              <InputLabel
                htmlFor="phone"
                value={trans["phone"]}
                aria-required
              />
              <TextInput
                defaultValue={getValues("phone")}
                id="phone"
                type="text"
                {...register("phone")}
                aria-required
                onChange={(e) => setValue("phone", e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
              <InputError message={get(errors, "phone")} className="mt-2" />
            </div>

            {/* whatsapp */}
            <div>
              <InputLabel
                htmlFor="whatsapp"
                value={trans["whatsapp"]}
                aria-required
              />
              <TextInput
                defaultValue={getValues("whatsapp")}
                id="whatsapp"
                type="text"
                {...register("whatsapp")}
                aria-required
                onChange={(e) => setValue("whatsapp", e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
              <InputError message={get(errors, "whatsapp")} className="mt-2" />
            </div>

            {/* twitter */}
            <div>
              <InputLabel
                htmlFor="twitter"
                value={trans["twitter"]}
                aria-required
              />
              <TextInput
                defaultValue={getValues("twitter")}
                id="twitter"
                type="text"
                {...register("twitter")}
                aria-required
                onChange={(e) => setValue("twitter", e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
              <InputError message={get(errors, "twitter")} className="mt-2" />
            </div>

            {/* facebook */}
            <div>
              <InputLabel
                htmlFor="facebook"
                value={trans["facebook"]}
                aria-required
              />
              <TextInput
                defaultValue={getValues("facebook")}
                id="facebook"
                type="text"
                {...register("facebook")}
                aria-required
                onChange={(e) => setValue("facebook", e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
              <InputError message={get(errors, "facebook")} className="mt-2" />
            </div>

            {/* instagram */}
            <div>
              <InputLabel
                htmlFor="instagram"
                value={trans["instagram"]}
                aria-required
              />
              <TextInput
                defaultValue={getValues("instagram")}
                id="instagram"
                type="text"
                {...register("instagram")}
                aria-required
                onChange={(e) => setValue("instagram", e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
              <InputError message={get(errors, "instagram")} className="mt-2" />
            </div>

            {/* linked */}
            <div>
              <InputLabel
                htmlFor="linked"
                value={trans["linked"]}
                aria-required
              />
              <TextInput
                defaultValue={getValues("linked")}
                id="linked"
                type="text"
                {...register("linked")}
                aria-required
                onChange={(e) => setValue("linked", e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
              <InputError message={get(errors, "linked")} className="mt-2" />
            </div>

            {/* iphone */}
            <div>
              <InputLabel
                htmlFor="iphone"
                value={trans["iphone"]}
                aria-required
              />
              <TextInput
                defaultValue={getValues("iphone")}
                id="iphone"
                type="text"
                {...register("iphone")}
                aria-required
                onChange={(e) => setValue("iphone", e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
              <InputError message={get(errors, "iphone")} className="mt-2" />
            </div>

            {/* android */}
            <div>
              <InputLabel
                htmlFor="android"
                value={trans["android"]}
                aria-required
              />
              <TextInput
                defaultValue={getValues("android")}
                id="android"
                type="text"
                {...register("android")}
                aria-required
                onChange={(e) => setValue("android", e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
              <InputError message={get(errors, "android")} className="mt-2" />
            </div>

            {/* keywords */}
            <div>
              <InputLabel
                htmlFor="keywords"
                value={trans["keywords"]}
                aria-required
              />
              <TextInput
                defaultValue={getValues("keywords")}
                id="keywords"
                type="text"
                {...register("keywords")}
                aria-required
                onChange={(e) => setValue("keywords", e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
              <InputError message={get(errors, "keywords")} className="mt-2" />
            </div>

            {/* snap */}
            <div>
              <InputLabel htmlFor="snap" value={trans["snap"]} aria-required />
              <TextInput
                defaultValue={getValues("snap")}
                id="snap"
                type="text"
                {...register("snap")}
                aria-required
                onChange={(e) => setValue("snap", e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
              <InputError message={get(errors, "snap")} className="mt-2" />
            </div>

            {/* tiktok */}
            <div>
              <InputLabel
                htmlFor="tiktok"
                value={trans["tiktok"]}
                aria-required
              />
              <TextInput
                defaultValue={getValues("tiktok")}
                id="tiktok"
                type="text"
                {...register("tiktok")}
                aria-required
                onChange={(e) => setValue("tiktok", e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
              <InputError message={get(errors, "tiktok")} className="mt-2" />
            </div>
          </form>
        </Tab.Panel>
        <Tab.Panel>Content 2</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
