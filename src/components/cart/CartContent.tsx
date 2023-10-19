"use client";
import { useCreateOrUpdateOrderMutation } from "@/redux/api/orderApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setMembership } from "@/redux/slices/cartSlice";
import { Locale } from "@/types/index";
import { Country, Membership } from "@/types/queries";
import { isNull } from "lodash";
import { useEffect } from "react";

type Props = {
  membership: Membership;
  country: Country;
  lang: Locale["lang"];
};
export default function ({ membership, country, lang }: Props) {
  const {
    cart: {
      payment: { queryString, paymentUrl },
    },
    auth: { isAuth },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [triggerCreateOrUpdateOrderQuery, { data, isSuccess }] =
    useCreateOrUpdateOrderMutation();

  useEffect(() => {
    dispatch(setMembership({ membership, country, lang }));
    
  }, []);
  console.log("queryString", queryString);
  return (
    <>
      {!isNull(queryString) && (
        <form
          action={`${paymentUrl}${queryString}`}
          className={"border-4 bg-blue-600"}
          method='post'
          target='_blank'>
          <button type='submit'>submit</button>
        </form>
      )}
    </>
  );
}
