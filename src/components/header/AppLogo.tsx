"use client";
import { useGetSettingQuery } from "@/redux/api";
import Link from "next/link";
import { Setting } from "@/types/queries";
import Image from "next/image";

export default function ({ logo , name } : { logo : string , name : string}) {
  
  return (
    <Link href='/' className='-m-1.5 p-1.5'>
      <span className='sr-only'>{name}</span>
      <Image
        width={100}
        height={100}
        alt={name}
        className='h-8 w-auto'
        src={logo}
      />
    </Link>
  );
}
