import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Locale } from '@/types/index';
import { Country, Membership, Order, PaymentFields } from '@/types/queries';
import { capitalize, random, round, toString } from 'lodash';
import { sha256, sha224 } from "js-sha256";
import { localeSlice } from './localeSlice';
import { getPrice } from '@/src/constants';
import { Pending } from '@mui/icons-material';

const initialState: { membership: Membership, payment: PaymentFields, order: Order } = {
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
    redirectUrl: `https://dev.ar-expo.ru/order/`,
    queryString: null,
    paymentUrl: `https://srstaging.stspayone.com/SmartRoutePaymentWeb/SRPayMsgHandler?`
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

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setMembership: (state, action: PayloadAction<{ membership: Membership, country: Country, lang: Locale['lang'] }>) => {
      const transactionId = toString(random(999999, 9999999));
      const { lang, country, membership } = action.payload;
      const { merchantId, messageId, token } = state.payment;
      const amountValues = country.lang === 'ar' ? '000' : (country.lang === 'ru') ? '000' : '00'; // now Price is already converted.
      const finalPrice = membership.on_sale ? membership.sale_price : membership.price;
      const convertedPrice = round(getPrice(finalPrice, country));
      const amount = `${convertedPrice}${amountValues}`;
      const currencyCode = country.lang === 'ar' ? '682' : (country.lang === 'ru') ? '643' : '840';
      // https://srstaging.stspayone.com/SmartRoutePaymentWeb/Submit3DSPayMsgServlet?PARAMETER_ONE=frjxERNRJ0vyKzmM4V0Xc1pOC%2B8ENOJdv2HyjAjoe98j80WxnZ8EO3%2BKINGP06FC%2C6cqQlt1yfcb0RwXVFtYB%2BGTasvLVXFocKW7Vvi7g%2F%2Bg%3D%2C81
      // const redirectUrl = `https://dev.ar-expo.ru/${lang}/order/${transactionId}`;
      const redirectUrl = `http://localhost:3000/${lang}/order/${transactionId}`;
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
        },
        order: {
          paid: false,
          status: 'pending',
          total: membership.price,
          net_total: finalPrice,
          discount: membership.on_sale ? membership.price - membership.sale_price : 0,
          membership_id: membership.id,
          reference_id: transactionId,
        }
      };
    },
    resetMembership: (state, action: PayloadAction<void>) => initialState,
  },
});

export const { setMembership, resetMembership } = cartSlice.actions;
