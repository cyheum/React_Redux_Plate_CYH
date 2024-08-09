import styled, { css } from 'styled-components';

import { color, device, mixins } from '@/styles';

interface IDateProps {
  $day: number;
  $inNowMonth: boolean;
  $isSelected: boolean;
  $disabled: boolean;
  $isDuringDay?: boolean;
  $isStartOrEndDay?: boolean;
}

export const Container = styled.div<{ $containerStyle?: string }>`
  ${mixins.flexSet('center', 'center', 'column')}
  ${({ $containerStyle }) => $containerStyle}
`;

export const Table = styled.table`
  width: 100%;
  height: 100%;
`;

export const TitleDate = styled.div`
  ${mixins.fontStyle('bold')}
  ${mixins.lineStyle()}
  position: relative;
  width: 100%;
  margin-bottom: 1.25rem;
  font-size: 1rem;
  text-align: center;
`;

export const PrevButton = styled.button<{ $rightButton?: boolean }>`
  position: absolute;
  top: 0.125rem;
  padding: 0.375rem;
  ${({ $rightButton }) => ($rightButton ? `right: 0.25rem;` : `left: 0.25rem;`)}

  svg {
    width: 0.875rem;
    height: 0.875rem;
    transform: rotate(${({ $rightButton }) => ($rightButton ? -90 : 90)}deg);
  }
`;

export const TableHeader = styled.tr`
  ${mixins.flexSet('space-between')}
  width: 100%;
  margin-bottom: 0.75rem;

  td {
    ${mixins.flexSet()}
    ${mixins.lineStyle('0.875rem')}
  flex: 1;
  }
`;

export const DayName = styled.div`
  ${mixins.lineStyle('0.875rem')}
  font-size: 1rem;
`;

export const TableBody = styled.tbody`
  ${mixins.flexSet()}
  flex-direction: column;
  height: 100%;
`;

export const TableBodyRow = styled.tr`
  ${mixins.flexSet('space-around')}
  flex: 1;
  width: 100%;
`;

export const MeasureTag = styled.div`
  ${mixins.flexSet()}
  position: absolute;
  top: 0.125rem;
  width: 1.75rem;
  height: 0.75rem;
  border-radius: 0.625rem;
  background-color: #222;
  color: white;
  font-size: 0.5rem;
`;

export const TableChild = styled.td<IDateProps>`
  ${mixins.flexSet('flex-start', 'center', 'column')}
  position:relative;
  row-gap: 0.125rem;
  flex: 1;
  height: 100%;
  padding: 0.75rem 0.25rem 0.25rem;
  font-size: 0.875rem;
  text-align: center;
  ${({ $disabled }) => !$disabled && 'cursor: pointer;'}
  color: ${({ $day, $inNowMonth }) => {
    if (!$inNowMonth) {
      return color.gray[300];
    } else {
      return $day === 0 ? 'red' : $day === 6 ? '#006edc' : color.gray[900];
    }
  }};

  ${({ $isSelected, $isStartOrEndDay, $isDuringDay }) =>
    $isSelected
      ? `color: #fff; background-color: #006edc;`
      : $isStartOrEndDay
        ? `background-color: #FFB3B3;`
        : $isDuringDay
          ? `background-color: #FFEFEF;`
          : ''}
  ${({ $disabled }) => {
    if ($disabled) {
      return css`
        color: ${color.gray[300]};
      `;
    } else {
      return css`
        cursor: pointer;

        &:active {
          background-color: #006edc;
          color: white;
        }

        @media ${device.laptop} {
          &:hover {
            background-color: #006edc;
            color: white;
          }
        }
      `;
    }
  }}
`;

type CircleTagType = {
  $tag?: 'bad' | 'not_bad' | 'good' | 'great' | 'best';
};

export const CircleTag = styled.div<CircleTagType>`
  margin-top: 0.25rem;
  width: 0.8125rem;
  height: 0.8125rem;
  border-radius: 50%;
  background-color: ${({ $tag }) =>
    $tag === 'bad'
      ? '#FF0000'
      : $tag === 'not_bad'
        ? '#e16e04'
        : $tag === 'good'
          ? '#F4CD00'
          : $tag === 'great'
            ? '#00984f'
            : '#456EFF'};
`;
