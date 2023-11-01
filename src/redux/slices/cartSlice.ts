'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Locale } from '@/types/index';
import { Country, Membership, Order, PaymentFields } from '@/types/queries';
import { capitalize, random, round, toString } from 'lodash';
import { sha256 } from "js-sha256";
import { getPrice } from '@/src/constants';

const initialState: { membership: Membership, payment: PaymentFields, order: Omit<Order, 'membership' | 'user'> } = {
  membership: {
    id: 0,
    name: ``,
    description: ``,
    price: 0,
    sale_price: 0,
    on_sale: false,
    sort: 'subscription',
    zone: 'A',
    is_featured: false
  },
  payment: {
    token: `${process.env.NEXT_PUBLIC_PAYMENT_TOKEN}`,
    messageId: 1,
    transactionId: ``,
    merchantId: `${process.env.NEXT_PUBLIC_MERCHANT_ID}`,
    amount: 0,
    currencyCode: '840',
    redirectUrl: `https://dev.ar-expo.ru/order/result/`,
    queryString: null,
    paymentUrl: `${process.env.NEXT_PUBLIC_PAYMENT_URL}`
  },
  order: {
    paid: false,
    total: 0,
    net_total: 0,
    discount: 0,
    reference_id: '0',
    status: 'pending',
    membership_id: '0',
  }

};
const transactionId = toString(random(9999, 99999));
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setMembership: (state, action: PayloadAction<{ membership: Membership, country: Country, lang: Locale['lang'] }>) => {
      const { lang, country, membership } = action.payload;
      const { merchantId, messageId, token } = state.payment;
      const amountValues = country.lang === 'ar' ? '00' : (country.lang === 'ru') ? '000' : '00'; // now Price is already converted.
      const finalPrice = membership.on_sale ? membership.sale_price : membership.price;
      const convertedPrice = round(getPrice(finalPrice, country));
      const amount = `${convertedPrice}${amountValues}`;
      const currencyCode = country.lang === 'ar' ? '682' : country.lang === 'ru' ? '643' : '840';
      const redirectUrl = process.env.NODE_ENV === "production" ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/redirect/order?lang=${lang}` : `http://ar-expo-backend.test/redirect/order?lang=${lang}`;
      const toBeHashed = `${token}${amount}${currencyCode}${capitalize(
        lang
      )}${merchantId}${messageId}${redirectUrl}${transactionId}`;
      const hashed: string = sha256(toBeHashed);
      return {
        membership: action.payload.membership,
        payment: {
          ...initialState.payment,
          transactionId,
          amount,
          currencyCode,
          redirectUrl,
          queryString: `MessageID=${state.payment?.messageId}&TransactionID=${transactionId}&MerchantID=${merchantId}&Amount=${amount}&Language=${capitalize(
            lang
          )}&CurrencyISOCode=${currencyCode}&ResponseBackURL=${redirectUrl}&SecureHash=${hashed}`
        },
        order: {
          paid: false,
          status: 'pending',
          total: round(membership.price),
          net_total: round(finalPrice),
          discount: round(membership.on_sale ? membership.price - membership.sale_price : 0),
          membership_id: membership.id,
          reference_id: transactionId,
        }
      };
    },
    resetMembership: (state, action: PayloadAction<void>) => initialState,
  },
});

export const { setMembership, resetMembership } = cartSlice.actions;
