import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';

import { GetResultsDataParams, IHomeInitialState } from '@/interfaces';
import { POST, RESULTS_API } from '@/utils';

import { homeActions } from '..';

export function* getResultSaga({
  payload,
}: PayloadAction<GetResultsDataParams>) {
  try {
    yield put(homeActions.setOneLoading({ id: 'main', value: true }));
    const result: IHomeInitialState['resultData'] = yield call(
      POST,
      RESULTS_API,
      { bodyData: payload }
    );
    yield put(homeActions.setResultData(result));
  } catch (error) {
    console.error(error);
  } finally {
    yield put(homeActions.setOneLoading({ id: 'main', value: false }));
  }
}

export function* watchGetResult() {
  yield takeEvery(homeActions.getResultData, getResultSaga);
}

export default [watchGetResult].map((fn) => fn());
