import { ISelectedDate } from '@/interfaces';

export function getNewDateToStr(d: Date, split = '-') {
  if (!d) {
    return '없음';
  }
  const { year, month, date } = getNewDateObj(d);

  return `${year}${split}${month}${split}${date}`;
}

export function getSecurityNum(num: string) {
  if (num.length < 6) {
    return { year: 0, month: 0, date: 0 };
  }
  const nowYear = Number(new Date().getFullYear().toString().slice(2));
  const year = num.length === 8 ? num.slice(0, 4) : num.slice(0, 2);
  const month = num.length === 8 ? num.slice(4, 6) : num.slice(2, 4);
  const date = num.length === 8 ? num.slice(6) : num.slice(4);

  return {
    year:
      num.length === 8
        ? Number(year)
        : nowYear < Number(year)
          ? Number(`19${year}`)
          : Number(`20${year}`),
    month: Number(month),
    date: Number(date),
  };
}

export function toTwinNum(date: string | number) {
  if (date.toString().length < 2) {
    return `0${date}`;
  }
  return `${date}`;
}

export function toFourNum(num: string | number) {
  const len = num.toString().length;
  if (len === 4) {
    return `${num}`;
  } else if (len === 3) {
    return `0${num}`;
  } else if (len === 2) {
    return `00${num}`;
  } else if (len === 1) {
    return `000${num}`;
  } else {
    return `${num}`.slice(-4);
  }
}

export function getDayName(num: number) {
  switch (num) {
    case 0:
      return '일';
    case 1:
      return '월';
    case 2:
      return '화';
    case 3:
      return '수';
    case 4:
      return '목';
    case 5:
      return '금';
    case 6:
      return '토';
  }
}

export function getEnDayName(num: number) {
  switch (num) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
  }
}

export function getNowDate(today: Date = new Date()) {
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const day = today.getDay();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();

  return { year, month, date, day, hours, minutes, seconds };
}

export function getWeekDate() {
  const monthArr31 = [1, 3, 5, 7, 8, 10, 12];
  const today = getNowDate();
  const weekDate = [0, 1, 2, 3, 4, 5, 6].map((n) => {
    const { year, month, date, day, hours, minutes, seconds } = today;
    if (monthArr31.includes(month)) {
      if (date + n > 31) {
        return {
          year,
          month: month + 1,
          date: (date + n + 1) % 31,
          day: (day + n) % 7,
          hours: n === 0 ? hours : 0,
          minutes: n === 0 ? minutes : 0,
          seconds: n === 0 ? seconds : 0,
        };
      } else {
        return {
          year,
          month,
          date: date + n,
          day: (day + n) % 7,
          hours: n === 0 ? hours : 0,
          minutes: n === 0 ? minutes : 0,
          seconds: n === 0 ? seconds : 0,
        };
      }
    } else if (month === 2) {
      if (date + n > (year % 4 === 0 ? 29 : 28)) {
        return {
          year,
          month: month + 1,
          date: (date + n) % (year % 4 === 0 ? 29 : 28),
          day: (day + n) % 7,
          hours: n === 0 ? hours : 0,
          minutes: n === 0 ? minutes : 0,
          seconds: n === 0 ? seconds : 0,
        };
      } else {
        return {
          year,
          month,
          date: date + n,
          day: (day + n) % 7,
          hours: n === 0 ? hours : 0,
          minutes: n === 0 ? minutes : 0,
          seconds: n === 0 ? seconds : 0,
        };
      }
    } else {
      if (date + n > 30) {
        return {
          year,
          month: month + 1,
          date: (date + n + 1) % 30,
          day: (day + n) % 7,
          hours: n === 0 ? hours : 0,
          minutes: n === 0 ? minutes : 0,
          seconds: n === 0 ? seconds : 0,
        };
      } else {
        return {
          year,
          month,
          date: date + n,
          day: (day + n) % 7,
          hours: n === 0 ? hours : 0,
          minutes: n === 0 ? minutes : 0,
          seconds: n === 0 ? seconds : 0,
        };
      }
    }
  });

  return weekDate;
}

export function getDateStrObj(data: string) {
  const [years, times] = data.split('T');
  const [year, month, date] = years.split('-');
  const [hours, minutes, seconds] = times.split(':');

  return years && times
    ? {
        year: year ?? '1',
        month: month ?? '1',
        date: date ?? '1',
        day: new Date(Number(year), Number(month) - 1, Number(date)).getDay(),
        hours: hours ?? '00',
        minutes: minutes ?? '00',
        seconds: seconds ? seconds.slice(0, 2) : '00',
      }
    : null;
}

export function getFullDateObj(dateStr: string) {
  if (dateStr.length !== 8) {
    return { year: 0, month: 0, date: 0, day: 0 };
  }
  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const date = dateStr.slice(6);
  const dayNum = new Date(
    Number(year),
    Number(month) - 1,
    Number(date)
  ).getDay();

  return {
    year: Number(year),
    month: Number(month),
    date: Number(date),
    day: dayNum,
  };
}

export function getDateObj(date: string) {
  const [years, times] = date.split('T');
  const newYears = years.length ? years.split('-').map((n) => Number(n)) : [];
  const newTimes = times?.length
    ? times.includes('Z')
      ? times
          .slice(0, -1)
          .split(':')
          .map((n) => Number(n))
      : times
          .split('+')[0]
          .split(':')
          .map((n) => Number(n))
    : [];
  const isYearExist = newYears.length > 0;
  const isTimeExist = newTimes.length > 0;
  const dayNum = isYearExist
    ? new Date(newYears[0], newYears[1] - 1, newYears[2]).getDay()
    : 0;

  const startDate = {
    year: isYearExist ? newYears[0] : 0,
    month: isYearExist ? newYears[1] : 0,
    date: isYearExist ? newYears[2] : 0,
    day: dayNum,
    hours: isTimeExist ? newTimes[0] : 0,
    minutes: isTimeExist ? newTimes[1] : 0,
    seconds: isTimeExist ? newTimes[2] : 0,
  };
  return startDate;
}

export function getNewDateObj(newDate: Date) {
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const date = newDate.getDate();
  const day = newDate.getDay();
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();
  const seconds = newDate.getSeconds();

  return { year, month, date, day, hours, minutes, seconds };
}

export function getBirthDate(year: number, month: number) {
  const today = getNowDate();
  if (today.month - month < 1) {
    return `${today.year - year - 1}-${toTwinNum(today.month - month + 12)}-01`;
  }
  return `${today.year - year}-${toTwinNum(today.month - month)}-01`;
}

export function getYearMonthAge(birthDate?: string | null) {
  if (!birthDate) {
    return { year: '', month: '' };
  }
  const today = getNowDate();
  const newBirthDate = birthDate.split('-');
  const [year, month] = [Number(newBirthDate[0]), Number(newBirthDate[1])];
  if (today.month - month < 0) {
    return {
      year: String(today.year - year - 1),
      month: String(today.month - month + 12),
    };
  }
  return {
    year: String(today.year - year),
    month: String(today.month - month),
  };
}

export function getMonthDate(newDate: ISelectedDate, page: number = 0) {
  const doMonth = getNewDateObj(
    new Date(newDate.year, newDate.month - 1 + page, 1)
  );

  const prevMonthLastDate = getNewDateObj(
    new Date(doMonth.year, doMonth.month - 1, 0)
  );
  const startDate =
    prevMonthLastDate.day === 0
      ? prevMonthLastDate
      : prevMonthLastDate.day === 6
        ? doMonth
        : getNewDateObj(
            new Date(doMonth.year, doMonth.month - 1, -prevMonthLastDate.day)
          );
  let monthDate = [] as {
    year: number;
    month: number;
    date: number;
    day: number;
    hours: number;
    minutes: number;
    seconds: number;
  }[];
  for (let i = 0; i < 42; i++) {
    monthDate.push(
      getNewDateObj(
        new Date(startDate.year, startDate.month - 1, startDate.date + i)
      )
    );
  }

  const week1 = monthDate.slice(0, 7);
  const week2 = monthDate.slice(7, 14);
  const week3 = monthDate.slice(14, 21);
  const week4 = monthDate.slice(21, 28);
  const week5 = monthDate.slice(28, 35);
  const week6 = monthDate.slice(35);

  const week4LastDate = week4[week4.length - 1];
  const week5LastDate = week5[week5.length - 1];
  const lastDate = new Date(doMonth.year, doMonth.month, 0);
  const isLastWeek4 =
    week4LastDate.month !== doMonth.month ||
    !(week4LastDate.date < lastDate.getDate());
  const isLastWeek5 =
    week5LastDate.month !== doMonth.month ||
    !(week5LastDate.date < lastDate.getDate());
  const dateArr = [week1, week2, week3, week4];

  return {
    year: doMonth.year,
    month: doMonth.month,
    date: isLastWeek4
      ? dateArr
      : isLastWeek5
        ? [...dateArr, week5]
        : [...dateArr, week5, week6],
  };
}

export function getMonthName(month: number) {
  switch (month) {
    case 1:
      return 'January';
    case 2:
      return 'February';
    case 3:
      return 'March';
    case 4:
      return 'April';
    case 5:
      return 'May';
    case 6:
      return 'June';
    case 7:
      return 'July';
    case 8:
      return 'August';
    case 9:
      return 'September';
    case 10:
      return 'October';
    case 11:
      return 'November';
    case 12:
      return 'December';
  }
}

export function getDateDashSplit(newDate: string) {
  if (!newDate) {
    return {
      year: 0,
      month: 0,
      date: 0,
      day: 0,
    };
  }
  const [year, month, date] = newDate.split('-');
  const newDates = new Date(Number(year), Number(month) - 1, Number(date));
  const result = getNewDateObj(newDates);
  return {
    year: result.year,
    month: result.month,
    date: result.date,
    day: result.day,
  };
}

export function checkDisabledDate(
  dateObj: ISelectedDate,
  ableDates?: string[]
) {
  const { year, month, date, day } = dateObj;
  const today = getNowDate();
  const userDate = new Date(year, month - 1, date);
  const twoDaysAfter = new Date(today.year, today.month - 1, today.date + 2);
  let isBeforeToday = false;

  if ([6, 0].includes(twoDaysAfter.getDay())) {
    isBeforeToday =
      new Date(today.year, today.month - 1, today.date + 4) > userDate;
  } else {
    isBeforeToday = twoDaysAfter > userDate;
  }

  const isWeekend = day === 0 || day === 6;
  const holidays = [
    '1/1',
    '3/1',
    '5/5',
    '6/6',
    '8/15',
    '10/3',
    '10/9',
    '12/25',
  ];
  const isHoliDay = holidays.includes(`${month}/${date}`);
  const isAbleDates = ableDates
    ? ableDates.includes(`${year}-${toTwinNum(month)}-${toTwinNum(date)}`)
    : false;

  if (isBeforeToday || isWeekend || isHoliDay || !isAbleDates) {
    return true;
  } else {
    return false;
  }
}
