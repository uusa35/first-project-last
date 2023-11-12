import InputLabel from "@/components/InputLabel";
import { MainContext } from "@/layouts/MainContentLayout";
import { useAppSelector } from "@/redux/hooks";
import { ImageType } from "@/types/queries";
import { Tab } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { map } from "lodash";
import Image from "next/image";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
  default_data: {
    image: File | string;
    images: ImageType[];
  };
  submitImages: (e: string[]) => void;
  onSubmit: SubmitHandler<{ thumb: File | string }>;
};

export default function UploadPhotos({
  default_data,
  submitImages,
  onSubmit,
}: Props) {
  const trans: { [key: string]: string } = useContext(MainContext);
  const [images, setImages] = useState(default_data.images);
  const {
    appSetting: { isLoading },
  } = useAppSelector((state) => state);

  console.log({ default_data });
  return (
    <Tab.Panel>
      <form
        // onSubmit={() => {
        //   submitImages(images);
        // }}
        className={`space-y-8 ${isLoading && "hidden"}`}>
        <h1 className='text-2xl mb-10 mt-5'>
          {trans.register_to_participate_in_the_exhibition}
        </h1>

        <div>
          {/* image */}
          <div className='flex flex-col items-center gap-x-4 my-4 mx-auto'>
            <Image
              src={default_data.image as string}
              className='w-16 h-auto rounded-full'
              alt={""}
              width={100}
              height={100}
            />
            <h1 className='mt-1'>{trans.logo}</h1>
            <InputLabel
              htmlFor='image'
              value={trans.download_logo}
              className=' rounded-md mt-3 border border-gray-300 py-1 px-2'
            />
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onSubmit({ thumb: e.target.files ? e.target.files[0] : "" })
              }
              type='file'
              id='image'
              accept='image/jpg, image/jpeg , image/png'
              className={`hidden`}
            />
          </div>
          {/* images */}
          <div>
            <h1>{trans.exhibition_photos}</h1>
            <InputLabel
              htmlFor='image'
              value={trans.download_logo}
              className=' rounded-md mt-3 border border-gray-300 py-1 px-2'
            />
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onSubmit({ thumb: e.target.files ? e.target.files[0] : "" })
              }
              type='file'
              id='image'
              accept='image/jpg, image/jpeg , image/png'
              className={`hidden`}
            />
            <div>
              <Image
                src={default_data.image as string}
                className='w-16 h-auto rounded-full'
                alt={""}
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>

        <div className='mt-10 flex items-center justify-center gap-x-6'>
          <button type='submit' className='btn-default'>
            {trans.continue}
          </button>
        </div>
      </form>
    </Tab.Panel>
  );
}
