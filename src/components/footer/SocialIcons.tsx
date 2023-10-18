"use client";
import { whatsappUrl } from "@/src/constants";
import { Setting } from "@/types/queries";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  WhatsApp,
  YouTube,
} from "@mui/icons-material";
import Link from "next/link";

export default function ({ setting }: Setting) {
  return (
    <div className='mt-10 flex justify-center gap-x-10'>
      {setting.facebook && (
        <Link
          href={setting.facebook}
          className='text-gray-400 hover:text-gray-500'>
          <span className='sr-only'>facebook</span>
          <Facebook className='w-6 h-auto' />
        </Link>
      )}
      {setting.twitter && (
        <Link
          href={setting.twitter}
          className='text-gray-400 hover:text-gray-500'>
          <span className='sr-only'>twitter</span>
          <Twitter className='w-6 h-auto' />
        </Link>
      )}
      {setting.youtube && (
        <Link
          href={setting.youtube}
          className='text-gray-400 hover:text-gray-500'>
          <span className='sr-only'>linked</span>
          <YouTube className='w-6 h-auto' />
        </Link>
      )}
      {setting.instagram && (
        <Link
          href={setting.instagram}
          className='text-gray-400 hover:text-gray-500'>
          <span className='sr-only'>linked</span>
          <Instagram className='w-6 h-auto' />
        </Link>
      )}
      {setting.linked && (
        <Link
          href={setting.linked}
          className='text-gray-400 hover:text-gray-500'>
          <span className='sr-only'>linked</span>
          <LinkedIn className='w-6 h-auto' />
        </Link>
      )}
      {setting.whatsapp && (
        <Link
          href={`${whatsappUrl(setting.whatsapp)}`}
          className='text-gray-400 hover:text-gray-500'>
          <span className='sr-only'>whatsapp</span>
          <WhatsApp className='w-6 h-auto' />
        </Link>
      )}
    </div>
  );
}
