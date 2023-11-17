import { useAppSelector } from "@/redux/hooks";
import React from "react";

type Props = {};

export default function PreviousDeals({}: Props) {
  const { hasValidDeal, deals } = useAppSelector((state) => state.auth);

  console.log({ deals });

  return (
    <div>
      {hasValidDeal ? (
        <div>
          {/* {deals.map(itm=>{
        return(
            <div></div>
        )
    })} */}
        </div>
      ) : null}
    </div>
  );
}
