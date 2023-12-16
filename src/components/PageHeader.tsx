import Image from "next/image";
type Props = {
  img: string;
  title: string;
};
export default function ({
  img = "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2830&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply",
  title,
}: Props) {
  return (
    <div className={"flex  justify-start items-end "}>
      <Image
        src={`${img}`}
        alt='testing'
        width={1000}
        height={1000}
        className='absolute inset-0 -z-10 h-[60vh] w-full object-cover'
      />
      <div className='p-8 max-w-2xl  text-white flex flex-col  justify-end items-start h-[50vh]'>
        <h1 className='text-7xl  text-center px-5 capitalize'>{title}</h1>
      </div>
    </div>
  );
}
