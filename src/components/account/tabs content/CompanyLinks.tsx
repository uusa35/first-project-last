import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import TextInput from "@/components/TextInput";
import { MainContext } from "@/layouts/MainContentLayout";
import { useAppSelector } from "@/redux/hooks";
import { updateUserSchema } from "@/src/validations";
import { Tab } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { get, pick } from "lodash";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type InputsData = {
  website: string;
  twitter: string;
  facebook: string;
  instagram: string;
  snap: string;
  tiktok: string;
  linked: string;
  iphone: string;
  android: string;
};
type Props = {
  default_data: InputsData;
  onSubmit: SubmitHandler<InputsData>;
};

export default function CompanyLinks({ default_data, onSubmit }: Props) {
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
      updateUserSchema.pick([
        "website",
        "twitter",
        "tiktok",
        "facebook",
        "instagram",
        "linked",
        "iphone",
        "android",
        "snap",
      ])
    ),
    defaultValues: default_data,
  });
  console.log(getValues());
  return (
    <Tab.Panel>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`space-y-8 ${isLoading && "hidden"}`}
      >
        <h1 className="text-2xl mb-10 mt-5">
          {trans.register_to_participate_in_the_exhibition}
        </h1>

        <div>
          <div className="mb-5">
            <InputLabel
              htmlFor="website"
              value={trans["company_website_link"]}
            />
            <TextInput
              defaultValue={getValues("website")}
              id="website"
              // type="url"
              {...register("website")}
              onChange={(e) => setValue("website", e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500  focus:outline-none focus:ring"
            />
            <InputError
              message={get(errors, "website.message")}
              className="mt-2"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <h1 className="text-lg my-2 col-span-2">
              {trans.social_media_links}
            </h1>
            {/* twitter */}
            <div>
              <InputLabel htmlFor="twitter" value={trans["twitter"]} />
              <TextInput
                defaultValue={getValues("twitter")}
                id="twitter"
                type="text"
                {...register("twitter")}
                onChange={(e) => setValue("twitter", e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500  focus:outline-none focus:ring"
              />
              <InputError
                message={get(errors, "twitter.message")}
                className="mt-2"
              />
            </div>

            {/* facebook */}
            <div>
              <InputLabel htmlFor="facebook" value={trans["facebook"]} />
              <TextInput
                defaultValue={getValues("facebook")}
                id="facebook"
                type="text"
                {...register("facebook")}
                onChange={(e) => setValue("facebook", e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500  focus:outline-none focus:ring"
              />
              <InputError
                message={get(errors, "facebook.message")}
                className="mt-2"
              />
            </div>

            {/* linked */}
            <div>
              <InputLabel htmlFor="linked" value={trans["linked"]} />
              <TextInput
                defaultValue={getValues("linked")}
                id="linked"
                type="text"
                {...register("linked")}
                onChange={(e) => setValue("linked", e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500  focus:outline-none focus:ring"
              />
              <InputError
                message={get(errors, "linked.message")}
                className="mt-2"
              />
            </div>

            {/* instagram */}
            <div>
              <InputLabel htmlFor="instagram" value={trans["instagram"]} />
              <TextInput
                defaultValue={getValues("instagram")}
                id="instagram"
                type="text"
                {...register("instagram")}
                onChange={(e) => setValue("instagram", e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500  focus:outline-none focus:ring"
              />
              <InputError
                message={get(errors, "instagram.message")}
                className="mt-2"
              />
            </div>

            {/* tiktok */}
            <div>
              <InputLabel htmlFor="tiktok" value={trans["tiktok"]} />
              <TextInput
                defaultValue={getValues("tiktok")}
                id="tiktok"
                type="text"
                {...register("tiktok")}
                onChange={(e) => setValue("tiktok", e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500  focus:outline-none focus:ring"
              />
              <InputError
                message={get(errors, "tiktok.message")}
                className="mt-2"
              />
            </div>

            {/* snap */}
            <div>
              <InputLabel htmlFor="snap" value={trans["snap"]} />
              <TextInput
                defaultValue={getValues("snap")}
                id="snap"
                type="text"
                {...register("snap")}
                onChange={(e) => setValue("snap", e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500  focus:outline-none focus:ring"
              />
              <InputError
                message={get(errors, "snap.message")}
                className="mt-2"
              />
            </div>

            {/* android */}
            <div>
              <InputLabel htmlFor="android" value={trans["android"]} />
              <TextInput
                defaultValue={getValues("android")}
                id="android"
                type="text"
                {...register("android")}
                onChange={(e) => setValue("android", e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500  focus:outline-none focus:ring"
              />
              <InputError
                message={get(errors, "android.message")}
                className="mt-2"
              />
            </div>

            {/* iphone */}
            <div>
              <InputLabel htmlFor="iphone" value={trans["iphone"]} />
              <TextInput
                defaultValue={getValues("iphone")}
                id="iphone"
                type="text"
                {...register("iphone")}
                onChange={(e) => setValue("iphone", e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500  focus:outline-none focus:ring"
              />
              <InputError
                message={get(errors, "iphone.message")}
                className="mt-2"
              />
            </div>
          </div>
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
