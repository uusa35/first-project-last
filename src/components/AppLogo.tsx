import { useGetSettingQuery } from "@/redux/api";
import Link from "next/link";
import { Setting } from "@/types/queries";

export default function () {
  const { data: setting, isSuccess } = useGetSettingQuery<{
    data: Setting;
    isSuccess: boolean;
  }>({});
  if (!isSuccess) return null;
  return (
    <Link href='/' className='-m-1.5 p-1.5'>
      <span className='sr-only'>{setting.name}</span>
      <img className='h-8 w-auto' src={setting.image} alt='' />
    </Link>
  );
}
