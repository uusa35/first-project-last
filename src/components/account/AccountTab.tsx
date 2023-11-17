import { Tab } from "@headlessui/react";
import Link from "next/link";

type Props = {
  icon?: React.ReactNode;
  active: boolean;
  title?: React.ReactNode;
  desc?: React.ReactNode;
  tab_index: string;
  link?: string;
};

export function AccountTab({
  icon,
  active,
  title,
  desc,
  tab_index,
  link,
}: Props) {
  return (
    <Tab className={`flex w-full  justify-start items-center capitalize`}>
      <Link
        href={link || `?active_tab=${tab_index}`}
        className="flex flex-row justify-start items-center gap-x-4"
      >
        <div className="p-4 bg-white rounded-md shadow-md ring ring-gray-200">
          {icon}
        </div>
        <div
          className={`flex flex-col justify-start items-start text-start text-gray-400`}
        >
          <div
            className={`font-semibold ${
              active ? "text-expo-dark" : "text-gray-400"
            } `}
          >
            {title}
          </div>
          <div>{desc}</div>
        </div>
      </Link>
    </Tab>
  );
}
