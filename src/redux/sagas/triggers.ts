import {
  takeLatest,
  call,
  put,
  all,
  throttle,
  takeEvery,
  debounce,
} from 'redux-saga/effects';
import {
  startChangeLangScenario,
  startEnableLoadingScenario,
  startShowToastMessageScenario,
  startResetEnireAppSceanrio,
  startUpdateCartProductScenario,
} from './appSaga';
import { localeSlice } from '@/redux/slices/localeSlice';

export function* triggerResetEntireApp() {
  yield takeLatest(`resetEntireApp`, startResetEnireAppSceanrio);
}


export function* triggerEnableLoading() {
  // yield takeLatest(
  //   `${appLoadingSlice.actions.enableAppLoading}`,
  //   startEnableLoadingScenario
  // );
}

export function* triggerChangeLang() {
  yield takeLatest(`${localeSlice.actions.setLocale}`, startChangeLangScenario);
}

export function* triggerShowToastMessage() {
  // yield takeLatest(
  // yield debounce(
  // 1000,
  // `${appSettingSlice.actions.showToastMessage}`,
  // `appSetting/showToastMessage`,
  // startShowToastMessageScenario
  // );
}
