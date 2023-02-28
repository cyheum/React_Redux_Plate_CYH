export interface IHomeInitialState {
  resultData: ResultDetail | null;
  resultMonthData: ResultDetail | null;
  isLoading: {
    main: boolean;
    ranking: boolean;
    campaign: boolean;
    graph: boolean;
    chart: boolean;
  };
  selectedYear: number | string;
  selectedMonth: number | string;
  selectedResult: ResultPaymentMonthly | null;
  modals: {
    result: boolean;
  };
}

export interface CommonData {
  Revenue: number; //수익
  Commission: number; //수수료
  Complete: number; //캠페인 완료 수
}

export interface ResultDetail {
  IsTest: boolean; //환경 false:라이브
  Result: boolean; //true:성공, false:실패
  ResultCode: number; //코드
  ResultMsg: string; //결과 메시지
  Payment: ResultPayment;
}

export interface ResultPayment extends CommonData {
  Monthly: ResultPaymentMonthly[];
}

export interface ResultPaymentMonthly extends CommonData {
  Status: number; //해당 월 정산 상태 (1: 출금 요청, 2:  출금 거절, 3: 출금 완료, 4: 출금 취소, 5: 출금 가능)
  Datetime: string; //해당 월 시작 날짜
  AppKey: number; //사용 안함
  App: ResultPaymentMonthlyApp[];
}

export interface ResultPaymentMonthlyApp extends CommonData {
  AppName: string; //앱명
  AppKey: string | number; //앱 키
  Campaign: AppCampaign[];
}

export interface AppCampaign extends CommonData {
  CampaignName: string;
  Datetime: string;
  CampaignKey: string;
  AppKey: number | string;
}

export interface GetResultsDataParams {
  search_year: number | string; // 년도
  search_month?: number | string; // 1 ~ 12월 (넣지 않으면 해당 년도)
}
