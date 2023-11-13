import InputLabel from "@/components/InputLabel";
import { MainContext } from "@/layouts/MainContentLayout";
import { useAppSelector } from "@/redux/hooks";
import { ImageType } from "@/types/queries";
import { Tab } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { isEmpty, map } from "lodash";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import Upload from "@/appIcons/account/upload_img.svg";
import { FileUploader } from "react-drag-drop-files";

type Props = {
  hadleImage: (e: File | undefined) => void;
  default_data: {
    image: File | string;
    images: ImageType[];
  };
  submitImages: (e: string[]) => void;
};

export default function UploadPhotos({
  default_data,
  submitImages,
  hadleImage,
}: Props) {
  const trans: { [key: string]: string } = React.useContext(MainContext);
  const [images, setImages] = useState([]);
  const {
    appSetting: { isLoading },
  } = useAppSelector((state) => state);

  // console.log({ default_data });

  return (
    <Tab.Panel>
      <form className={`space-y-8 ${isLoading && "hidden"}`}>
        <h1 className="text-2xl mb-10 mt-5">
          {trans.register_to_participate_in_the_exhibition}
        </h1>

        <div>
          {/* image */}
          <div className="flex flex-col items-center gap-x-4 my-4 mx-auto">
            <Image
              src={default_data.image as string}
              className="w-16 h-auto rounded-full"
              alt={""}
              width={100}
              height={100}
            />
            <h1 className="mt-1">{trans.logo}</h1>
            <InputLabel
              htmlFor="image"
              value={trans.download_logo}
              className=" rounded-md mt-3 border border-gray-300 py-1 px-2"
            />
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                hadleImage(e.target.files ? e.target.files[0] : undefined)
              }
              type="file"
              id="image"
              accept="image/jpg, image/jpeg , image/png"
              className={`hidden`}
            />
          </div>
          {/* images */}
          <div>
            <h1>{trans.exhibition_photos}</h1>
            <FileUploader
              handleChange={(e: any) => {
                setImages(e);
                console.log(e);
              }}
              name="file"
              multiple
              types={["JPG", "PNG", "JPEG"]}
              children={
                <div className="w-full rounded-sm border-2 border-gray-300 border-dashed py-5 flex flex-col items-center gap-y-1 text-gray-300 cursor-pointer">
                  <Upload className="w-7 h-7" />
                  <p>
                    <span className="text-expo-dark">{trans.upload_file}</span>
                    {trans.or_drag_and_drop}
                  </p>
                  <p className="text-sm">PNG, JPG, GIF up to 10MB</p>
                  {!isEmpty(images) && (
                    <div>
                      {}
                    </div>
                  )}
                </div>
              }
            />

            {/* images */}
            <div className="flex flex-wrap gap-3">
              {default_data.images.map((itm) => {
                return (
                  <div>
                    <Image src={itm.image} alt={itm.name} key={itm.id} />
                  </div>
                );
              })}
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
