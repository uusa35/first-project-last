"use client";
import Image from "next/image";
import Logo from "@/appImages/logo.png";
import { appLinks, logoBlured } from "../constants";
import Link from "next/link";
import { useParams } from "next/navigation";

const MainAside = async () => {
  const { lang }: any = useParams();
  return (
    <aside
      className={`hidden md:block md:w-1/2 lg:w-7/12 xl:w-2/3 min-h-screen text-seazen-dark
     bg-fixed bg-center bg-cover bg-no-repeat  border border-gray-900 flex-row justify-center items-center`}>
      <div className='grid grid-rows-3 h-full'>
        <div className='row-span-1 flex justify-start items-start bg-gray-100'>
          <h1 className='text-xl'>header</h1>
        </div>
        <Link
          href={appLinks.home(lang)}
          className='row-span-1 flex justify-center items-center'>
          <Image
            className='h-20 w-20 object-center rounded-md'
            src={Logo}
            alt='seazen'
            fill={false}
            placeholder='blur'
            loading='lazy'
            blurDataURL={logoBlured}
          />
        </Link>

        <div className='row-span-1 flex justify-start items-end bg-gray-100'>
          <h1 className='text-xl'>footer</h1>
        </div>
      </div>
    </aside>
  );
};

export default MainAside;
