import { call, put, delay, select, all } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import i18n from 'i18next';
import { toast, TypeOptions } from 'react-toastify';
import { lowerCase, snakeCase, startCase } from 'lodash';
import { persistor } from '@/redux/store';
import { orderApi } from '../api/orderApi';
import { toastMessageSlice } from '../slices/toastMessageSlice';

export function* startResetEnireAppSceanrio() {
  persistor.purge();
}

export function* startEnableLoadingScenario(action: PayloadAction) {
  try {
  } catch (e) {
  } finally {
  }
}

export function* startUpdateCartProductScenario(action: PayloadAction<any>) {
  try {
  } catch (e) {
  } finally {
  }
}


export function* startChangeLangScenario(action: PayloadAction<string>) {
  try {

    yield delay(2000);
    i18n.changeLanguage(action.payload);
  } catch (e: any) {

  } finally {
  }
}

export function* startShowToastMessageScenario(action: PayloadAction<any>) {
  try {
    const { toastMessage } = yield select();
    toast.dismiss();
    toast(startCase(toastMessage.content), {
      type: toastMessage.type,
      toastId: toastMessage.type
    });
    yield delay(2000);
    toast.dismiss();
    yield put({ type: `${toastMessageSlice.actions.hideToastMessage}` });
  } catch (e) {
  } finally {
  }
}
