import { AppCampaign, ResultPaymentMonthly } from "@/interfaces";

export function toBodyStyleHidden(onOff: boolean) {
  const body = document.querySelector("body") as HTMLElement;

  if (onOff) {
    body.style.overflow = "hidden";
    body.style.position = "relative";
    body.style.height = "100%";
  } else {
    body.removeAttribute("style");
  }
}

export function intComma(number: string | number = "0") {
  let newNum = "" as string | number;
  if (number) {
    if (`${Number(number)}` !== "NaN") {
      newNum = Number(number);
    } else {
      newNum = 0;
    }
  } else {
    newNum = number;
  }

  return (newNum ?? 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getCampaigns(list: ResultPaymentMonthly[]) {
  const campaigns = {} as {
    [key: string]: AppCampaign;
  };
  list.forEach(({ App }) => {
    App.forEach(({ Campaign }) => {
      Campaign.forEach((info) => {
        const prevInfo = campaigns[`${info.CampaignKey}`];
        campaigns[`${info.CampaignKey}`] = prevInfo
          ? {
              ...prevInfo,
              Revenue: prevInfo.Revenue + info.Revenue,
              Complete: prevInfo.Complete + info.Complete,
            }
          : info;
      });
    });
  });
  return campaigns;
}
