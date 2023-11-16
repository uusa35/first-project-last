import InputLabel from "@/components/InputLabel";
import { MainContext } from "@/layouts/MainContentLayout";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ImageType } from "@/types/queries";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import { useContext, ChangeEvent, useState } from "react";
import Upload from "@/appIcons/account/upload_img.svg";
import DeleteIcon from "@/appIcons/account/delete.svg";
import { FileUploader } from "react-drag-drop-files";
import { useLazyDeleteImageQuery } from "@/redux/api";
import { useRouter } from "next/navigation";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "@/redux/slices/toastMessageSlice";

type Props = {
  handleImage: (e: File | undefined) => void;
  default_data: {
    image: File | string;
    images: ImageType[];
  };
  submitImages: (e: any) => void;
};

export default function UploadPhotos({
  default_data,
  submitImages,
  handleImage,
}: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const trans: { [key: string]: string } = useContext(MainContext);
  const [images, setImages] = useState<
    { [key: string]: File | number } | undefined
  >(undefined);
  const {
    appSetting: { isLoading },
  } = useAppSelector((state) => state);
  const [triggerDelteImage] = useLazyDeleteImageQuery();

  const displayImages = () => {
    if (images)
      return Object.keys(images).map((obj, i) => {
        if (obj !== "length") {
          return <p>{(images[obj] as File).name}</p>;
        }
      });
  };
  const deleteImage = async (id: number) => {
    await triggerDelteImage(id).then((r: any) => {
      if (r.data && r.data.message) {
        router.refresh();
        dispatch(showSuccessToastMessage({ content: r.data.message }));
      } else if (r.error && r.error.data?.message) {
        dispatch(showErrorToastMessage({ content: r.error.data.message }));
      }
    });
  };
  // console.log({ default_data });

  return (
    <Tab.Panel>
      <div className={`space-y-8 ${isLoading && "hidden"}`}>
        <h1 className='text-2xl mb-10 mt-5'>
          {trans.register_to_participate_in_the_exhibition}
        </h1>

        <div>
          {/* image */}
          <div className='flex flex-col items-center gap-x-4 my-4 mx-auto'>
            <Image
              src={default_data.image as string}
              className='w-16 h-16 rounded-full object-cover'
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
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                handleImage(e.target.files ? e.target.files[0] : undefined);
              }}
              type='file'
              id='image'
              accept='image/jpg, image/jpeg , image/png'
              className={`hidden`}
            />
          </div>
          {/* images */}
          <div>
            <h1 className='mb-5'>{trans.exhibition_photos}</h1>
            <FileUploader
              handleChange={(e: any) => {
                setImages(e);
              }}
              name='file'
              multiple
              types={["JPG", "PNG", "JPEG"]}
              children={
                <div className='w-full rounded-sm border-2 border-gray-300 border-dashed py-5 flex flex-col items-center gap-y-1 text-gray-300 cursor-pointer'>
                  <Upload className='w-7 h-7' />
                  <p>
                    <span className='text-expo-dark'>{trans.upload_file}</span>
                    {trans.or_drag_and_drop}
                  </p>
                  <p className='text-sm'>PNG, JPG, GIF up to 10MB</p>

                  <div className='text-black mt-5'>{displayImages()}</div>
                </div>
              }
            />

            {/* images */}
            <div className='flex flex-wrap gap-2 py-5'>
              {default_data.images.map((itm) => {
                return (
                  <div className='w-1/6 h-auto aspect-2'>
                    <Image
                      width={100}
                      height={100}
                      src={itm.thumb}
                      alt={itm.name}
                      key={itm.id}
                      className='w-full h-auto aspect-2 rounded-md mb-1'
                    />
                    <DeleteIcon
                      classNmae='cursor-pointer'
                      onClick={() => {
                        deleteImage(itm.id);
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className='mt-10 flex items-center justify-center gap-x-6'>
          <button
            onClick={() => {
              submitImages(images);
            }}
            className='btn-default'>
            {trans.continue}
          </button>
        </div>
      </div>
    </Tab.Panel>
  );
}
