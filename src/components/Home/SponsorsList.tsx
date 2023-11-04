import Link from "next/link";
import { CheckIcon } from "@heroicons/react/20/solid";
import * as React from "react";
import { AppQueryResult, Membership, User } from "@/types/queries";
import { Locale } from "@/types/index";
import Image from "next/image";

type Props = {
  trans: { [key: string]: string };
  sponsors: AppQueryResult<User[]>;
};

export default function ({ trans, sponsors }: Props) {
  return (
    <div>
      {sponsors.data && (
        <div className='bg-white py-12 sm:py-12 capitalize'>
          <div className='mx-auto max-w-7xl px-6 lg:px-8'>
            <h2 className='text-center text-lg font-semibold leading-8 text-gray-900'>
              {trans.sponsors}
            </h2>
            <div className='mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5'>
              {sponsors.data.map((s: User, i: number) => (
                <Link key={s.id} href={`/user/${s.id}?slug=${s.name}`}>
                  <Image
                    key={i}
                    className='col-span-2 max-h-[100px] w-full object-contain lg:col-span-1'
                    src={s.image}
                    alt={s.name}
                    width={200}
                    height={200}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
