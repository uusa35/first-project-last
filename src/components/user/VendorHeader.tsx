import Image from "next/image";

export default function ({
  title,
  logo,
  bg,
}: {
  title: string;
  logo: string;
  bg: string;
}) {
  return (
    <div className=''>
      <div className='relative bg-white'>
        <div className=''>
          <Image
            src={bg}
            alt={title}
            className='h-60 w-full rounded-xl object-cover object-center'
            width={1000}
            height={1000}
          />
          <div className='absolute -bottom-6 ltr:left-14 rtl:right-14  '>
            <Image
              src={logo}
              alt={title}
              className='h-16 w-16 rounded-full object-cover object-center ring-1 ring-gray-100 shadow-xl'
              width={1000}
              height={1000}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
