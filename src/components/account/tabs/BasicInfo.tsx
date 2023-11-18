import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import TextInput from "@/components/TextInput";
import { MainContext } from "@/layouts/MainContentLayout";
import { useAppSelector } from "@/redux/hooks";
import { updateUserSchema } from "@/src/validations";
import { Category, Country } from "@/types/queries";
import { Tab } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import { get, map } from "lodash";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { Locale } from "@/types/index";

type InputsData = {
  name: {
    ar: string;
    en: string;
    ru: string;
  };
  caption: {
    ar: string;
    en: string;
    ru: string;
  };
  categories: [];
  country_id: string;
  address: string;
  keywords: string;
  //   search words
};

type Props = {
  default_data: InputsData;
  onSubmit: SubmitHandler<InputsData>;
  categories: Category[];
  countries: Country[];
};

export default function ({
  default_data,
  onSubmit,
  categories,
  countries,
}: Props) {
  const trans: { [key: string]: string } = React.useContext(MainContext);
  const {
    appSetting: { isLoading },
  } = useAppSelector((state) => state);
  const { lang }: any = useParams();
  const {
    handleSubmit,
    register,
    reset,
    getValues,
    setValue,
    formState: { errors },
  }: any = useForm({
    resolver: yupResolver(
      updateUserSchema.pick([
        "country_id",
        "name",
        "caption",
        "categories",
        "keywords",
        "address",
      ])
    ),
    defaultValues: default_data,
  });

  return (
    <Tab.Panel className={`h-full`}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`space-y-8 ${isLoading && "hidden"}`}
      >
        <h1 className="text-2xl mb-10 mt-5">{trans.basic_information}</h1>

        {/*  company name  */}
        <div className="col-span-full grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <InputLabel
              aria-required
              htmlFor="name.en"
              value={trans["name.en"]}
            />
            <TextInput
              defaultValue={getValues("name.en")}
              id="name.en"
              name="name.en"
              {...register("name.en")}
              onChange={(e) =>
                setValue("name", {
                  ...getValues("name"),
                  en: e.target.value,
                })
              }
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
            <InputError
              message={get(errors, "name.en.message")}
              className="mt-2"
            />
          </div>
          <div>
            <InputLabel
              aria-required
              htmlFor="name.ar"
              value={trans["name.ar"]}
            />
            <TextInput
              defaultValue={getValues("name.ar")}
              id="name.ar"
              name="name.ar"
              {...register("name.ar")}
              onChange={(e) =>
                setValue("name", {
                  ...getValues("name"),
                  ar: e.target.value,
                })
              }
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
            <InputError
              message={get(errors, "name.ar.message")}
              className="mt-2"
            />
          </div>

          <div className="lg:col-span-2">
            <InputLabel
              aria-required
              htmlFor="name.ru"
              value={trans["name.ru"]}
            />
            <TextInput
              defaultValue={getValues("name.ru")}
              id="name.ru"
              name="name russian"
              {...register("name.ru")}
              onChange={(e) =>
                setValue("name", {
                  ...getValues("name"),
                  ru: e.target.value,
                })
              }
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
            <InputError
              message={get(errors, "name.ru.message")}
              className="mt-2"
            />
          </div>
        </div>

        {/*  caption*/}
        <div className="col-span-full grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <InputLabel
              aria-required
              htmlFor="caption.en"
              value={trans["caption.en"]}
            />
            <TextInput
              defaultValue={getValues("caption.en")}
              id="caption.en"
              name="caption.en"
              {...register("caption.en")}
              onChange={(e) =>
                setValue("caption", {
                  ...getValues("caption"),
                  en: e.target.value,
                })
              }
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
            <InputError
              message={get(errors, "caption.en.message")}
              className="mt-2"
            />
          </div>

          <div>
            <InputLabel
              aria-required
              htmlFor="caption.ar"
              value={trans["caption.ar"]}
            />
            <TextInput
              defaultValue={getValues("caption.ar")}
              id="caption.ar"
              name="caption.ar"
              {...register("caption.ar")}
              onChange={(e) =>
                setValue("caption", {
                  ...getValues("caption"),
                  ar: e.target.value,
                })
              }
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
            <InputError
              message={get(errors, "caption.ar.message")}
              className="mt-2"
            />
          </div>

          <div className="lg:col-span-2">
            <InputLabel
              aria-required
              htmlFor="caption.ru"
              value={trans["caption.ru"]}
            />
            <TextInput
              defaultValue={getValues("caption.ru")}
              id="caption.ru"
              name="caption.ru"
              {...register("caption.ru")}
              onChange={(e) =>
                setValue("caption", {
                  ...getValues("caption"),
                  ru: e.target.value,
                })
              }
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
            <InputError
              message={get(errors, "caption.ru.message")}
              className="mt-2"
            />
          </div>
        </div>

        {/* categories */}
        <div>
          {categories ? (
            <div className="col-span-2 pt-4">
              <InputLabel
                htmlFor="categories"
                value={trans.categories}
                // aria-required
              />
              <Select
                defaultValue={map(default_data.categories, (c: any) => {
                  return {
                    label: c?.name[lang],
                    value: c?.id,
                  };
                })}
                isMulti
                // required
                name="categories"
                options={map(categories, (c: Category, i) => {
                  return {
                    label: c.name,
                    value: c.id,
                  };
                })}
                {...register("categories")}
                onChange={(e: any) => setValue("categories", map(e, "value"))}
                className="basic-multi-select"
                classNamePrefix="select"
              />
              <InputError
                message={get(errors, "categories.message")}
                className="mt-2"
              />
            </div>
          ) : null}
        </div>

        {/* search flags */}
        <div>
          <InputLabel htmlFor="keywords" value={trans["keywords"]} />
          <TextInput
            defaultValue={getValues("keywords")}
            id="keywords"
            name="keywords"
            onChange={(e) => setValue("keywords", e.target.value)}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          />
          <InputError
            message={get(errors, "keywords.message")}
            className="mt-2"
          />
        </div>

        {/* country */}
        <div>
          <InputLabel
            aria-required
            htmlFor="country_id"
            value={trans["country"]}
          />
          <div className="mt-2">
            <select
              onChange={(e) => setValue("country_id", e.target.value)}
              id="country_id"
              name="country_id"
              defaultValue={getValues("country_id")}
              required
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            >
              {map(countries, (c: any, i) => (
                <option value={c.id} key={i}>
                  {c.name}
                </option>
              ))}
            </select>
            <InputError
              message={get(errors, "country_id.message")}
              className="mt-2"
            />
          </div>
        </div>

        {/* company address */}
        <div>
          <InputLabel
            htmlFor="address"
            value={trans["address"]}
            aria-required
          />
          <TextInput
            defaultValue={getValues("address")}
            id="address"
            name="address"
            onChange={(e) => setValue("address", e.target.value)}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          />
          <InputError
            message={get(errors, "address.message")}
            className="mt-2"
          />
        </div>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button type="submit" className="btn-default">
            {trans.continue}
          </button>
        </div>
      </form>
    </Tab.Panel>
  );
}
