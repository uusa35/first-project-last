"use client";
import { useCreateOrUpdateOrderMutation } from "@/redux/api/orderApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { resetMembership, setMembership } from "@/redux/slices/cartSlice";
import { showErrorToastMessage } from "@/redux/slices/toastMessageSlice";
import { Locale } from "@/types/index";
import { Country, Membership } from "@/types/queries";
import { first, isNull } from "lodash";
import { useEffect, useRef } from "react";

type Props = {
  membership: Membership;
  country: Country;
  lang: Locale["lang"];
};
export default function ({ membership, country, lang }: Props) {
  const {
    cart: {
      payment: { queryString, paymentUrl },
      order,
    },
    auth: { isAuth },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const fromRef = useRef<any>();
  const [triggerCreateOrUpdateOrderQuery, { data, isSuccess, error }] =
    useCreateOrUpdateOrderMutation();

  useEffect(() => {
    dispatch(setMembership({ membership, country, lang }));
  }, []);

  const createOrder = async () =>
    await triggerCreateOrUpdateOrderQuery({ ...order }).then((r: any) => {
      if (r.error) {
        dispatch(
          showErrorToastMessage({
            content: `${first(r.error.data.message)}`,
          })
        );
      } else {
        dispatch(resetMembership());
        fromRef.current && fromRef.current.submit();
      }
    });

  return (
    <>
      {!isNull(queryString) && (
        <form
          action={`${paymentUrl}${queryString}`}
          className={"border-4 bg-blue-600"}
          method='post'
          ref={fromRef}>
          <button type='submit' onClick={() => createOrder()}>
            submit
          </button>
        </form>
      )}
    </>
  );
}
