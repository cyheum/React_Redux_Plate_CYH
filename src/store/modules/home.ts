import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GetResultsDataParams, IHomeInitialState } from '@/interfaces';

const initialState: IHomeInitialState = {
  isLoading: {
    main: false,
  },
  resultData: null,
  modals: {
    result: false,
  },
};

const slice = createSlice({
  name: 'homeReducer',
  initialState,
  reducers: {
    setIsLoading: (
      state,
      { payload }: PayloadAction<IHomeInitialState['isLoading']>
    ) => {
      state.isLoading = payload;
    },
    setOneLoading: (
      state,
      {
        payload,
      }: PayloadAction<{
        id: keyof IHomeInitialState['isLoading'];
        value: boolean;
      }>
    ) => {
      state.isLoading[payload.id] = payload.value;
    },
    setResultData: (
      state,
      { payload }: PayloadAction<IHomeInitialState['resultData']>
    ) => {
      state.resultData = payload;
    },
    setModals: (
      state,
      { payload }: PayloadAction<IHomeInitialState['modals']>
    ) => {
      state.modals = payload;
    },
    openModal: (
      state,
      { payload }: PayloadAction<keyof IHomeInitialState['modals']>
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
  (state: IHomeInitialState) => state.modals,
  (isLoading, resultData, modals) => {
    return {
      isLoading,
      resultData,
      modals,
    };
  }
);

export const home = slice.name;
export const homeReducer = slice.reducer;
export const homeActions = slice.actions;

export default homeReducer;
