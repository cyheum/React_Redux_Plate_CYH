import { IconDownArrow3 } from '@svg';
import React, { forwardRef, useState } from 'react';

import { INextDate, ISelectedDate } from '@/interfaces';
import { getMonthDate, getNewDateObj, getNowDate, toTwinNum } from '@/utils';

import * as S from './index.style';

interface IProps {
  containerStyle?: string;
  eng?: boolean;
  noViewToday?: boolean;
  maxPage?: number;
  reverse?: boolean;
  allView?: boolean;
  measureList?: string[];
  selectedDate?: ISelectedDate | null;
  defaultDate?: ISelectedDate | null;
  startDate?: ISelectedDate | null;
  endDate?: ISelectedDate | null;
  checkTag?(
    dateObj: ISelectedDate
  ): 'bad' | 'not_bad' | 'good' | 'great' | 'best';
  checkDisabled?(dateObj: ISelectedDate): boolean;
  onClickDate: (option: INextDate) => void;
}

export const Calendar = forwardRef<HTMLDivElement, IProps>(
  (
    {
      containerStyle,
      eng,
      maxPage = 12,
      selectedDate,
      reverse,
      allView,
      defaultDate,
      noViewToday,
      startDate,
      endDate,
      measureList,
      checkTag,
      checkDisabled,
      onClickDate,
    },
    ref
  ) => {
    const [page, setPage] = useState(0);
    const tBodyData = getMonthDate(
      defaultDate ?? getNewDateObj(new Date()),
      reverse ? -page : page
    );
    const ENG_WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const KR_WEEK = ['일', '월', '화', '수', '목', '금', '토'];
    const nowDateObj = getNowDate();

    const onClickSetPage = (num: number) => {
      setPage((page) => page + num);
    };

    return (
      <S.Container
        ref={ref}
        $containerStyle={containerStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <S.TitleDate>
          {(allView ? true : reverse ? page < maxPage : page > 0) && (
            <S.PrevButton onClick={() => onClickSetPage(reverse ? 1 : -1)}>
              <IconDownArrow3 />
            </S.PrevButton>
          )}
          {tBodyData.year}년 {tBodyData.month}월
          {(allView ? true : reverse ? page !== 0 : page !== maxPage) && (
            <S.PrevButton
              onClick={() => onClickSetPage(reverse ? -1 : 1)}
              $rightButton
            >
              <IconDownArrow3 />
            </S.PrevButton>
          )}
        </S.TitleDate>
        <S.Table>
          <thead>
            <S.TableHeader>
              {(eng ? ENG_WEEK : KR_WEEK).map((day) => (
                <td key={day}>
                  <S.DayName>{day}</S.DayName>
                </td>
              ))}
            </S.TableHeader>
          </thead>
          <S.TableBody>
            {tBodyData.date.map((data, index) => (
              <S.TableBodyRow key={index}>
                {data.map((dateObj) => {
                  const { year, month, date, day } = dateObj;
                  const dateTime = new Date(year, month - 1, date).getTime();
                  const isFuture = new Date().getTime() < dateTime;
                  const isNow =
                    nowDateObj.year === year &&
                    nowDateObj.month === month &&
                    nowDateObj.date === date;
                  const isSelected = selectedDate
                    ? selectedDate.month === month && selectedDate.date === date
                    : defaultDate
                      ? defaultDate.month === month && defaultDate.date === date
                      : false;
                  const isStartOrEndDay =
                    (startDate?.year === year &&
                      startDate?.month === month &&
                      startDate?.date === date) ||
                    (endDate?.year === year &&
                      endDate?.month === month &&
                      endDate?.date === date);
                  const startDateTime = startDate
                    ? new Date(
                        startDate.year,
                        startDate.month - 1,
                        startDate.date
                      ).getTime()
                    : 0;
                  const endDateTime = endDate
                    ? new Date(
                        endDate.year,
                        endDate.month - 1,
                        endDate.date
                      ).getTime()
                    : 0;
                  const isDuringDay =
                    startDateTime <= dateTime && dateTime <= endDateTime;

                  return (
                    <S.TableChild
                      key={`${month}월 ${date}일`}
                      $day={day}
                      $inNowMonth={month === tBodyData.month}
                      $isSelected={isSelected}
                      $isStartOrEndDay={isStartOrEndDay}
                      $isDuringDay={isDuringDay}
                      $disabled={checkDisabled ? checkDisabled(dateObj) : false}
                      onClick={() => {
                        if (checkDisabled) {
                          if (!checkDisabled(dateObj))
                            onClickDate({ year, month, date, day });
                        } else {
                          onClickDate({ year, month, date, day });
                        }
                      }}
                    >
                      {measureList?.includes(
                        `${year}${toTwinNum(month)}${toTwinNum(date)}`
                      ) && <S.MeasureTag>측정</S.MeasureTag>}
                      <p>{date}</p>
                      {!isNow && !isFuture && checkTag && isDuringDay ? (
                        <S.CircleTag $tag={checkTag(dateObj)} />
                      ) : (
                        <></>
                      )}
                      {isNow && !noViewToday && <p>오늘</p>}
                    </S.TableChild>
                  );
                })}
              </S.TableBodyRow>
            ))}
          </S.TableBody>
        </S.Table>
      </S.Container>
    );
  }
);
