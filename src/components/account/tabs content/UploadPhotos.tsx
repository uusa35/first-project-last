import { MainContext } from '@/layouts/MainContentLayout';
import { useAppSelector } from '@/redux/hooks';
import { Tab } from '@headlessui/react';
import React from 'react'

type Props = {}

export default function UploadPhotos({}: Props) {
   const trans: { [key: string]: string } = React.useContext(MainContext);
   const {
     appSetting: { isLoading },
   } = useAppSelector((state) => state);
  return (
    <Tab.Panel>
      <form
        // onSubmit={handleSubmit(onSubmit)}
        className={`space-y-8 ${isLoading && "hidden"}`}
      >
        <h1 className="text-2xl mb-10 mt-5">
          {trans.register_to_participate_in_the_exhibition}
        </h1>

        

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button type="submit" className="btn-default">
            {trans.continue}
          </button>
        </div>
      </form>
    </Tab.Panel>
  );
}