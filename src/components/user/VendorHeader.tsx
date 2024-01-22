"use client";
import { useLazyAddToWishListQuery } from "@/src/redux/api";
import { HeartIcon, ShareIcon } from "@heroicons/react/24/outline";
import { capitalize } from "lodash";
import Image from "next/image";
import { useParams } from "next/navigation";
import { RWebShare } from "react-web-share";
import { useAppDispatch } from "@/src/redux/hooks";
import { showSuccessToastMessage } from "@/src/redux/slices/toastMessageSlice";
import { useTranslation } from "react-i18next";
import { appLinks } from "@/src/links";

export default function ({
  title,
  logo,
  bg,
  id,
  favorite,
}: {
  title: string;
  logo: string;
  bg: string;
  id: string;
  favorite: boolean;
}) {
  const params = useParams()!;
  const dispatch = useAppDispatch();
  const { t } = useTranslation("trans");
  const [triggerAddToWishList] = useLazyAddToWishListQuery();

  const handleAddToWishList = async (body: {
    action: "active" | "inactive";
    type: "offer" | "vendor";
    item_id: string;
  }) => {
    await triggerAddToWishList(body).then((r: any) => {
      if (r.data?.success) {
        // refetch();
        dispatch(showSuccessToastMessage({ content: t("process_success") }));
      }
    });
  };

  return (
    <div className=''>
      <div className='relative bg-white'>
        <div className=''>
          <Image
            src={bg}
            alt={title}
            className='h-60 w-full rounded-xl object-cover object-center'
            width={1000}
            height={1000}
          />
          <div
            className={`absolute top-10  flex  w-20 flex-row justify-between items-center gap-x-4  ltr:right-4 rtl:left-4`}>
            <div>
              <HeartIcon
                onClick={() =>
                  handleAddToWishList({
                    action: favorite ? "inactive" : "active",
                    type: "offer",
                    item_id: id.toString(),
                  })
                }
                className={`w-6 h-6  ${
                  favorite
                    ? `text-red-600 fill-red-600 hover:fill-white hover:text-black`
                    : `text-black  hover:text-red-600 hover:fill-red-600`
                }`}
              />
            </div>
            <div>
              <RWebShare
                data={{
                  text: title,
                  url: `https://${window?.location?.hostname}${appLinks.vendor(
                    params?.lang,
                    params?.country,
                    id?.toString(),
                    title
                  )}`,
                  title: capitalize(`${t("picks")}`),
                }}>
                <ShareIcon className='w-6 h-6 text-black' />
              </RWebShare>
            </div>
          </div>
          <div className='absolute -bottom-6 ltr:left-14 rtl:right-14  '>
            <Image
              src={logo}
              alt={title}
              className='h-16 w-16 rounded-full object-cover object-center ring-1 ring-gray-100 shadow-xl'
              width={1000}
              height={1000}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
