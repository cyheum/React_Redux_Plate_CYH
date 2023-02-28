import { ResultDetail } from "@/interfaces";

export const TEMP_DATA: ResultDetail =
  // Response
  {
    Payment: {
      Revenue: 4751675,
      Commission: 0,
      Complete: 12713,
      Monthly: [
        {
          Status: 3,
          Datetime: "2020-10-18",
          Revenue: 4751675,
          Commission: 0,
          Complete: 12713,
          AppKey: 0,
          App: [
            {
              AppName: "AA북스",
              Revenue: 4751675,
              Commission: 0,
              Complete: 12713,
              AppKey: 962612773,
              Campaign: [
                {
                  CampaignName: "[구독하기] 더팩트 네이버뉴스 구독",
                  Datetime: "2020-10-19",
                  Revenue: 49680,
                  Commission: 0,
                  Complete: 414,
                  CampaignKey: "81883323",
                  AppKey: 962612773,
                },
                {
                  CampaignName: "[간편참여] 그랑사가",
                  Datetime: "2020-10-22",
                  Revenue: 100,
                  Commission: 0,
                  Complete: 1,
                  CampaignKey: "456934512",
                  AppKey: 962612773,
                },
              ],
            },
          ],
        },
      ],
    },
    Result: true,
    IsTest: false,
    ResultCode: 1,
    ResultMsg: "성공",
  };

export const YEARS = [
  { id: "2018", name: "2018" },
  { id: "2019", name: "2019" },
  { id: "2020", name: "2020" },
];

export const MONTHS = [
  { id: "all", name: "전체" },
  { id: "1", name: "1" },
  { id: "2", name: "2" },
  { id: "3", name: "3" },
  { id: "4", name: "4" },
  { id: "5", name: "5" },
  { id: "6", name: "6" },
  { id: "7", name: "7" },
  { id: "8", name: "8" },
  { id: "9", name: "9" },
  { id: "10", name: "10" },
  { id: "11", name: "11" },
  { id: "12", name: "12" },
];
