"use client";
import { useGetSettingQuery } from "@/redux/api";
import { Setting } from "@/types/queries";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

import Link from "next/link";

export default function () {
  const { data: setting, isSuccess } = useGetSettingQuery<{
    data: Setting;
    isSuccess: boolean;
  }>({});
  if (!isSuccess) return null;

  return (
    <div className='mt-10 flex justify-center gap-x-10'>
      {setting.facebook && (
        <Link
          href={setting.facebook}
          className='text-gray-400 hover:text-gray-500'>
          <span className='sr-only'>facebook</span>
          <Facebook className='w-10 h-auto' />
        </Link>
      )}
      {setting.twitter && (
        <Link
          href={setting.twitter}
          className='text-gray-400 hover:text-gray-500'>
          <span className='sr-only'>twitter</span>
          <Twitter className='w-10 h-auto' />
        </Link>
      )}
      {setting.linked && (
        <Link
          href={setting.linked}
          className='text-gray-400 hover:text-gray-500'>
          <span className='sr-only'>linked</span>
          <Twitter className='w-10 h-auto' />
        </Link>
      )}
    </div>
  );
}
