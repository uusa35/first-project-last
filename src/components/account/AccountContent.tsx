"use client";
import { Tab } from "@headlessui/react";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import { ArrowBack } from "@mui/icons-material";
export default function ({}) {
  return (
    <Tab.Group
      vertical={true}
      as={`div`}
      className={`flex flex-col md:flex-row p-3 md:p-0`}>
      <Tab.List
        className={`flex flex-col justify-start items-center w-full md:w-1/3 p-6 bg-expo-light gap-y-6 `}
        as={"div"}>
        <Tab className={`flex w-full  justify-start items-center`}>
          <div className='flex flex-row justify-start items-center gap-x-4'>
            <div className='p-4 bg-white rounded-md shadow-md ring ring-gray-200'>
              <ArrowsPointingOutIcon className='w-8 h-8 text-gray-800' />
            </div>
            <div className='flex flex-col justify-start items-start text-expo-dark'>
              <div>Tab Title 1</div>
              <div>Tab Description 1</div>
            </div>
          </div>
        </Tab>
        <Tab className={`flex w-full  justify-start items-center`}>
          <div className='flex flex-row justify-start items-center gap-x-4'>
            <div className='p-4 bg-white rounded-md shadow-lg'>
              <ArrowsPointingOutIcon className='w-8 h-8 ' />
            </div>
            <div className='flex flex-col justify-start items-start text-expo-dark'>
              <div>Tab Title 1</div>
              <div>Tab Description 1</div>
            </div>
          </div>
        </Tab>
      </Tab.List>
      <Tab.Panels as={"div"} className={`flex w-full md:w-2/3 p-4 flex-col`}>
        <Tab.Panel>Content 1</Tab.Panel>
        <Tab.Panel>Content 2</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
