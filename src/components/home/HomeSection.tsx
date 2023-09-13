"use client";
import { suppressText } from "@/src/constants";
import { useGetCategoriesQuery } from "@/src/redux/api/categoryApi";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { FC, ReactNode } from "react";
import { map } from "lodash";
import TextTrans from "../TextTrans";

type Props = {};
const HomeSection: FC<Props> = ({}): React.ReactElement => {
  const { setting } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const { data: categories, isSuccess, error } = useGetCategoriesQuery();

  return (
    <div className='w-full bg-blue-500 p-10 rounded-md hidden'>
      <h1> from the state : {setting.title}</h1>
      {isSuccess &&
        map(categories.data, (c, i) => (
          <div key={i}>
            <TextTrans ar={c.name_ar} en={c.name_en} />
          </div>
        ))}
    </div>
  );
};

export default HomeSection;
