import Image from "next/image";
type Props = {
  img: string;
  title: string;
};
export default function ({ img, title }: Props) {
  return (
    <>
      <Image
        src='https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2830&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply'
        alt='testing'
        width={1000}
        height={1000}
        className='absolute inset-0 -z-10 h-[40vh] w-full object-cover'
      />
      <div className=' mx-auto max-w-2xl w-full text-white flex flex-col  justify-center items-center h-[30vh]'>
        <h1 className='text-3xl font-semibold text-center px-5 capitalize'>
          {title}
        </h1>
      </div>
    </>
  );
}
