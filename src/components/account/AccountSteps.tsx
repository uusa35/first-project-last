"use client";

export default function () {
  return (
    <nav aria-label='Progress'>
      <div
        className={`grid grid-cols-3  border-t  border-l border-r md:border border-gray-200 rounded-md`}>
        <div className='col-span-full md:col-span-1  flex justify-start items-center border-b md:rtl:border-l md:ltr:border-r border-gray-200 p-4'>
          <div className='flex flex-row justify-center items-center gap-x-3'>
            <div className='flex justify-center items-center w-8 h-8 rounded-full border border-gray-200'>
              <span className='pt-1'>1</span>
            </div>
            <div>primary information</div>
          </div>
        </div>
        <div className='col-span-full md:col-span-1  flex justify-start items-center border-b md:rtl:border-l md:ltr:border-r border-gray-200 p-4'>
          <div className='flex flex-row justify-center items-center gap-x-3'>
            <div className='flex justify-center items-center w-8 h-8 rounded-full  bg-expo-dark text-white'>
              <span className='pt-1'>2</span>
            </div>
            <div>Choose Membership</div>
          </div>
        </div>
        <div className='col-span-full md:col-span-1  flex justify-start items-center border-b md:rtl:border-l md:ltr:border-r border-gray-200 p-4'>
          <div className='flex flex-row justify-center items-center gap-x-3'>
            <div className='flex justify-center items-center w-8 h-8 rounded-full border border-gray-200'>
              <span className='pt-1'>2</span>
            </div>
            <div>Go to Payment Page</div>
          </div>
        </div>
      </div>
    </nav>
  );
}
