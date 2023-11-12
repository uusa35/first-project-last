"use client";
import { whatsappUrl } from "@/src/constants";
import Facebook from "@mui/icons-material/Facebook";
import Twitter from "@mui/icons-material/Twitter";
import Instagram from "@mui/icons-material/Instagram";
import LinkedIn from "@mui/icons-material/LinkedIn";
import WhatsApp from "@mui/icons-material/WhatsApp";
import YouTube from "@mui/icons-material/YouTube";
import Link from "next/link";
import { Suspense } from "react";

export default function ({ setting, color = "text-gray-400" }: any) {
  return (
    <Suspense>
      <div className='flex flex-wrap justify-center gap-6'>
        {setting.facebook && (
          <Link
            href={setting.facebook}
            className={`${color} hover:text-gray-500`}>
            <span className='sr-only'>facebook</span>
            <Facebook className='w-6 h-auto' />
          </Link>
        )}
        {setting.twitter && (
          <Link
            href={setting.twitter}
            className={`${color} hover:text-gray-500`}>
            <span className='sr-only'>twitter</span>
            <Twitter className='w-6 h-auto' />
          </Link>
        )}
        {setting.youtube && (
          <Link
            href={setting.youtube}
            className={`${color} hover:text-gray-500`}>
            <span className='sr-only'>linked</span>
            <YouTube className='w-6 h-auto' />
          </Link>
        )}
        {setting.instagram && (
          <Link
            href={setting.instagram}
            className={`${color} hover:text-gray-500`}>
            <span className='sr-only'>linked</span>
            <Instagram className='w-6 h-auto' />
          </Link>
        )}
        {setting.linked && (
          <Link
            href={setting.linked}
            className={`${color} hover:text-gray-500`}>
            <span className='sr-only'>linked</span>
            <LinkedIn className='w-6 h-auto' />
          </Link>
        )}
        {setting.whatsapp && (
          <Link
            href={`${whatsappUrl(setting.whatsapp)}`}
            className={`${color} hover:text-gray-500`}>
            <span className='sr-only'>whatsapp</span>
            <WhatsApp className='w-6 h-auto' />
          </Link>
        )}
      </div>
    </Suspense>
  );
}
