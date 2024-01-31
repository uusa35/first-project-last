import { call, put, delay, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import i18n from 'i18next';
import { toast } from 'react-toastify';
import { startCase } from 'lodash';
import { persistor } from '@/redux/store';
import { toastMessageSlice } from '@/redux/slices/toastMessageSlice';
import { settingSlice } from '@/redux/slices/settingSlice';


export function* startResetEnireAppSceanrio() {
  const version: any = localStorage.getItem('version');
  if (process.env.NEXT_PUBLIC_APP_VERSION && version !== process.env.NEXT_PUBLIC_APP_VERSION) {
    localStorage.setItem('version', process.env.NEXT_PUBLIC_APP_VERSION);
    yield delay(5000)
    persistor.purge()
    yield delay(5000)
    window.location.reload();
  }
}

export function* startEnableLoadingScenario(action: PayloadAction) {
  try {
    yield delay(3000);
    yield put({ type: `${settingSlice.actions.disableLoading}` });
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

export function* startSetAuthScenario(action: PayloadAction<any>) {
  // const { locale: { lang } } = yield select();
  // yield delay(1000);
  // window.location.href = `/${lang}`;

}
export function* startShowToastMessageScenario(action: PayloadAction<any>) {
  try {
    const { toastMessage } = yield select();
    toast.dismiss();
    toast(startCase(toastMessage.content), {
      type: toastMessage.type,
      toastId: toastMessage.type
    });
    yield delay(5000);
    toast.dismiss();
    yield put({ type: `${toastMessageSlice.actions.hideToastMessage}` });
  } catch (e) {
  } finally {
  }
}
