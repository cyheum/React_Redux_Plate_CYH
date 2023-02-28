import { call, put, select, takeEvery } from "redux-saga/effects";
import { homeActions, RootState } from "..";
import { GET, POST, RESULTS_API } from "@/utils";
import { PayloadAction } from "@reduxjs/toolkit";
import { GetResultsDataParams, IHomeInitialState } from "@/interfaces";

export function* getResultSaga({
  payload,
}: PayloadAction<GetResultsDataParams>) {
  try {
    yield put(homeActions.setOneLoading({ id: "graph", value: true }));
    const result: IHomeInitialState["resultData"] = yield call(
      POST,
      RESULTS_API,
      { bodyData: payload }
    );
    yield put(homeActions.setResultData(result));
  } catch (error) {
    console.error(error);
  } finally {
    yield put(homeActions.setOneLoading({ id: "graph", value: false }));
  }
}

export function* getResultMonthSaga({
  payload,
}: PayloadAction<GetResultsDataParams>) {
  try {
    const prevLoadings: IHomeInitialState = yield select(
      ({ home }: RootState) => home
    );
    yield put(
      homeActions.setIsLoading({
        ...prevLoadings.isLoading,
        campaign: true,
        chart: true,
        ranking: true,
      })
    );
    const result: IHomeInitialState["resultData"] = yield call(
      POST,
      RESULTS_API,
      { bodyData: payload }
    );
    yield put(homeActions.setResultMonthData(result));
  } catch (error) {
    console.error(error);
  } finally {
    yield put(
      homeActions.setIsLoading({
        campaign: false,
        chart: false,
        ranking: false,
        graph: false,
        main: false,
      })
    );
  }
}

export function* watchGetResult() {
  yield takeEvery(homeActions.getResultData, getResultSaga);
}

export function* watchGetResultMonth() {
  yield takeEvery(homeActions.getResultMonthData, getResultMonthSaga);
}

export default [watchGetResult, watchGetResultMonth].map((fn) => fn());
