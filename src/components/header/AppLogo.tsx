"use client";
import { useGetSettingQuery } from "@/redux/api";
import Link from "next/link";
import { Setting } from "@/types/queries";
import Image from "next/image";

export default function () {
  const { data: setting, isSuccess } = useGetSettingQuery<{
    data: Setting;
    isSuccess: boolean;
  }>({});
  if (!isSuccess) return null;
  return (
    <Link href='/' className='-m-1.5 p-1.5'>
      <span className='sr-only'>{setting.name}</span>
      <Image
        width={100}
        height={100}
        alt={setting.name}
        className='h-8 w-auto'
        src={setting.image}
      />
    </Link>
  );
}
