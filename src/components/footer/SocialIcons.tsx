"use client";
import { whatsappUrl } from "@/src/constants";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  WhatsApp,
  YouTube,
} from "@mui/icons-material";
import Link from "next/link";

export default function ({ setting, color = "text-gray-400" }: any) {
  return (
    <div className='mt-10 flex justify-center gap-x-10'>
      {setting.facebook && (
        <Link
          href={setting.facebook}
          className={`${color} hover:text-gray-500`}>
          <span className='sr-only'>facebook</span>
          <Facebook className='w-6 h-auto' />
        </Link>
      )}
      {setting.twitter && (
        <Link href={setting.twitter} className={`${color} hover:text-gray-500`}>
          <span className='sr-only'>twitter</span>
          <Twitter className='w-6 h-auto' />
        </Link>
      )}
      {setting.youtube && (
        <Link href={setting.youtube} className={`${color} hover:text-gray-500`}>
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
        <Link href={setting.linked} className={`${color} hover:text-gray-500`}>
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
  );
}
