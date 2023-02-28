import {
  GetResultsDataParams,
  IHomeInitialState,
  ResultPaymentMonthly,
} from "@/interfaces";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IHomeInitialState = {
  isLoading: {
    main: false,
    ranking: false,
    campaign: false,
    graph: false,
    chart: false,
  },
  resultData: null,
  resultMonthData: null,
  selectedYear: 2018,
  selectedMonth: "all",
  selectedResult: null,
  modals: {
    result: false,
  },
};

const slice = createSlice({
  name: "homeReducer",
  initialState,
  reducers: {
    setIsLoading: (
      state,
      { payload }: PayloadAction<IHomeInitialState["isLoading"]>
    ) => {
      state.isLoading = payload;
    },
    setOneLoading: (
      state,
      {
        payload,
      }: PayloadAction<{
        id: keyof IHomeInitialState["isLoading"];
        value: boolean;
      }>
    ) => {
      state.isLoading[payload.id] = payload.value;
    },
    setResultData: (
      state,
      { payload }: PayloadAction<IHomeInitialState["resultData"]>
    ) => {
      state.resultData = payload;
    },
    setResultMonthData: (
      state,
      { payload }: PayloadAction<IHomeInitialState["resultData"]>
    ) => {
      state.resultMonthData = payload;
    },
    setSelectedYear: (state, { payload }: PayloadAction<number | string>) => {
      state.selectedYear = payload;
    },
    setSelectedMonth: (state, { payload }: PayloadAction<number | string>) => {
      state.selectedMonth = payload;
    },
    setSelectedResult: (
      state,
      { payload }: PayloadAction<ResultPaymentMonthly>
    ) => {
      state.selectedResult = payload;
    },
    setModals: (
      state,
      { payload }: PayloadAction<IHomeInitialState["modals"]>
    ) => {
      state.modals = payload;
    },
    openModal: (
      state,
      { payload }: PayloadAction<keyof IHomeInitialState["modals"]>
    ) => {
      state.modals[payload] = true;
    },
    closeModal: (state, _: PayloadAction) => {
      state.modals = {
        result: false,
      };
    },
    getResultData: (_, __: PayloadAction<GetResultsDataParams>) => {},
    getResultMonthData: (_, __: PayloadAction<GetResultsDataParams>) => {},
  },
});

export const selectHomeState = createSelector(
  (state: IHomeInitialState) => state.isLoading,
  (state: IHomeInitialState) => state.resultData,
  (state: IHomeInitialState) => state.resultMonthData,
  (state: IHomeInitialState) => state.selectedYear,
  (state: IHomeInitialState) => state.selectedMonth,
  (state: IHomeInitialState) => state.selectedResult,
  (state: IHomeInitialState) => state.modals,
  (
    isLoading,
    resultData,
    resultMonthData,
    selectedYear,
    selectedMonth,
    selectedResult,
    modals
  ) => {
    return {
      isLoading,
      resultData,
      resultMonthData,
      selectedYear,
      selectedMonth,
      selectedResult,
      modals,
    };
  }
);

export const home = slice.name;
export const homeReducer = slice.reducer;
export const homeActions = slice.actions;

export default homeReducer;
