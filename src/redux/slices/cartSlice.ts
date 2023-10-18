import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Locale } from '@/types/index';
import { Country, Membership, PaymentFields } from '@/types/queries';
import { capitalize, random, round, toString } from 'lodash';
import { sha256, sha224 } from "js-sha256";
import { localeSlice } from './localeSlice';
import { getPrice } from '@/src/constants';

const initialState: { membership: Membership, payment: PaymentFields } = {
  membership: {
    id: 0,
    name: ``,
    description: ``,
    price: 0,
    sale_price: 0,
    on_sale: false,
    sort: 'subscription',
    zone: 'A',
  },
  payment: {
    token: `ZGFiMzdmNGZhOWIxZDJjOTljOWZiMGE1`,
    messageId: 1,
    transactionId: ``,
    merchantId: `RB0000002`,
    amount: 0,
    currenyCode: '840',
    redirectUrl: `https://dev.ar-expo.ru/`,
    queryString: null,
    paymentUrl: `https://srstaging.stspayone.com/SmartRoutePaymentWeb/SRPayMsgHandler?`
  }

};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setMembership: (state, action: PayloadAction<{ membership: Membership, country: Country, lang: Locale['lang'] }>) => {
      const transactionId = toString(random(999999, 9999999));
      const { lang, country, membership } = action.payload;
      const { merchantId, messageId, token } = state.payment;
      const amountValues = country.lang === 'ar' ? '000' : (country.lang === 'ru') ? '000' : '00';
      const currentPrice = round(getPrice(membership.on_sale ? membership.sale_price : membership.price, country));
      const amount = `${currentPrice}${amountValues}`;
      const currencyCode = country.lang === 'ar' ? '682' : (country.lang === 'ru') ? '643' : '840';
      const redirectUrl = `https://dev.ar-expo.ru/${lang}/order/result/${transactionId}`;
      const toBeHashed = `${token}${amount}${currencyCode}${capitalize(
        lang
      )}${merchantId}${messageId}${redirectUrl}${transactionId}`;
      const hashed: string = sha256(toBeHashed);
      return {
        membership: action.payload.membership,
        payment: {
          ...state.payment,
          transactionId,
          amount,
          currencyCode,
          redirectUrl,
          queryString: `MessageID=${state.payment?.messageId}&TransactionID=${transactionId}&MerchantID=${merchantId}&Amount=${amount}&Language=${capitalize(
            lang
          )}&CurrencyISOCode=${currencyCode}&ResponseBackURL=${redirectUrl}&SecureHash=${hashed}`
        }
      };
    },
    resetMembership: (state, action: PayloadAction<void>) => initialState,
  },
});

export const { setMembership, resetMembership } = cartSlice.actions;
