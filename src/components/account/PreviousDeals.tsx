import { MainContext } from "@/layouts/MainContentLayout";
import { useAppSelector } from "@/redux/hooks";
import { Deal } from "@/types/queries";
import DOMPurify from "dompurify";
import React from "react";

type Props = {};

export default function PreviousDeals({}: Props) {
  const trans: { [key: string]: string } = React.useContext(MainContext);
  const { hasValidDeal, deals } = useAppSelector((state) => state.auth);

  console.log({ deals });

  return (
    <div>
      <p className="capitalize my-5 text-2xl">{trans.your_deals}</p>
      <div className="grid grid-cols-3 gap-2">
        {hasValidDeal
          ? deals.map((itm: Deal) => {
              return (
                <div
                  className="border border-gray-200 rounded-md p-5"
                  key={itm.id}
                >
                  <p>{itm.membership.name}</p>
                  <div
                    className="overflow-y-auto scrollbar-hide my-5 max-h-20"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(itm.membership.description),
                    }}
                  ></div>
                  {itm.membership.on_sale ? (
                    <div className="flex gap-x-1">
                      <p>{trans.price} </p>
                      <p className="flex flex-wrap gap-x-1">
                        <span className=" line-through">
                          {itm.membership.price}$
                        </span>

                        <span className="text-red-800">
                          {itm.membership.sale_price}$
                        </span>
                      </p>
                    </div>
                  ) : (
                    <p>
                      {trans.price} : {itm.membership.price}$
                    </p>
                  )}
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
