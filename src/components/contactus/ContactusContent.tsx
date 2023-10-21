"use client";
export default function () {
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const formDataObject = Object.fromEntries(formData);
    const data = await fetch("/api/send/contactus", {
      method: "POST",
      body: JSON.stringify(formDataObject),
    }).then((r) => r.json());
    console.log("data", data);
  };
  return (
    <form onSubmit={onSubmit} method='POST' className='mt-16'>
      <div className='grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2'>
        <div className='sm:col-span-2'>
          <label
            htmlFor='name'
            className='block text-sm font-semibold leading-6 text-gray-900'>
            First name
          </label>
          <div className='mt-2.5'>
            <input
              type='text'
              name='name'
              id='name'
              autoComplete='given-name'
              className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>

        <div className='sm:col-span-2'>
          <label
            htmlFor='email'
            className='block text-sm font-semibold leading-6 text-gray-900'>
            Email
          </label>
          <div className='mt-2.5'>
            <input
              id='email'
              name='email'
              type='email'
              autoComplete='email'
              className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>
        <div className='sm:col-span-2'>
          <label
            htmlFor='company'
            className='block text-sm font-semibold leading-6 text-gray-900'>
            Company
          </label>
          <div className='mt-2.5'>
            <input
              type='text'
              name='company'
              id='company'
              autoComplete='organization'
              className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>
        <div className='sm:col-span-2'>
          <div className='flex justify-between text-sm leading-6'>
            <label
              htmlFor='phone'
              className='block font-semibold text-gray-900'>
              Phone
            </label>
            <p id='phone-description' className='text-gray-400'>
              Optional
            </p>
          </div>
          <div className='mt-2.5'>
            <input
              type='tel'
              name='phone'
              id='phone'
              autoComplete='tel'
              aria-describedby='phone-description'
              className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>
        <div className='sm:col-span-2'>
          <div className='flex justify-between text-sm leading-6'>
            <label
              htmlFor='message'
              className='block text-sm font-semibold leading-6 text-gray-900'>
              How can we help you?
            </label>
            <p id='message-description' className='text-gray-400'>
              Max 500 characters
            </p>
          </div>
          <div className='mt-2.5'>
            <textarea
              id='message'
              name='message'
              rows={4}
              aria-describedby='message-description'
              className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              defaultValue={""}
            />
          </div>
        </div>
        <fieldset className='sm:col-span-2'>
          <legend className='block text-sm font-semibold leading-6 text-gray-900'>
            Expected budget
          </legend>
          <div className='mt-4 space-y-4 text-sm leading-6 text-gray-600'>
            <div className='flex gap-x-2.5'>
              <input
                id='budget-under-25k'
                name='budget'
                defaultValue='under_25k'
                type='radio'
                className='mt-1 h-4 w-4 border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-600'
              />
              <label htmlFor='budget-under-25k'>Less than $25K</label>
            </div>
            <div className='flex gap-x-2.5'>
              <input
                id='budget-25k-50k'
                name='budget'
                defaultValue='25k-50k'
                type='radio'
                className='mt-1 h-4 w-4 border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-600'
              />
              <label htmlFor='budget-25k-50k'>$25K – $50K</label>
            </div>
            <div className='flex gap-x-2.5'>
              <input
                id='budget-50k-100k'
                name='budget'
                defaultValue='50k-100k'
                type='radio'
                className='mt-1 h-4 w-4 border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-600'
              />
              <label htmlFor='budget-50k-100k'>$50K – $100K</label>
            </div>
            <div className='flex gap-x-2.5'>
              <input
                id='budget-over-100k'
                name='budget'
                defaultValue='over_100k'
                type='radio'
                className='mt-1 h-4 w-4 border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-600'
              />
              <label htmlFor='budget-over-100k'>$100K+</label>
            </div>
          </div>
        </fieldset>
      </div>
      <div className='mt-10 flex justify-end border-t border-gray-900/10 pt-8'>
        <button
          type='submit'
          className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
          Send message
        </button>
      </div>
    </form>
  );
}
