import VendorWidget from "@/components/widgets/VendorWidget";
import { map } from "lodash";
export default function ({ elements, title }: any) {
  console.log("elements", elements);
  return (
    <div>
      <h1 className='capitalize text-xl my-4'>{title}</h1>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-4'>
        {map(elements, (v, k: number) => (
          <div className={"col-span-1 me-2"} key={k}>
            <VendorWidget vendor={v} />
          </div>
        ))}
      </div>
    </div>
  );
}
