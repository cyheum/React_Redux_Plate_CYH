import { IconDownArrow2, IconDownTriangle } from '@svg';
import styled, { css } from 'styled-components';

import { color, mixins } from '@/styles';

export const Container = styled.div<{ $containerStyle?: string }>`
  position: relative;
  width: 100%;
  ${({ $containerStyle }) => $containerStyle}
`;

interface OrderButtonProps {
  $buttonStyle?: string;
  $fontSize?: number;
}

export const OrderButton = styled.button<OrderButtonProps>`
  ${mixins.flexSet('space-between')}
  width: 100%;
  height: 3rem;
  padding: 0 1.5rem;
  font-size: ${({ $fontSize }) => $fontSize ?? 1}rem;
  border: 0.0625rem solid ${color.gray[850]};
  border-radius: 0.5rem;
  transition: all 0.15s ease-in-out;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }

  .name {
    ${mixins.ellipsis(1)}
  }

  .gray {
    color: ${color.gray['230']};
  }
  ${({ $buttonStyle }) => $buttonStyle}
`;

type TriangleDownIconProps = {
  reversed?: boolean;
};

const downArrowStyle = css<TriangleDownIconProps>`
  flex-shrink: 0;
  width: 0.6125rem;
  transform: ${({ reversed }) => reversed && 'rotate(180deg)'};
  object-fit: contain;
  transition: transform 0.5s ease-in-out;
`;

export const DownArrowIcon = styled(IconDownArrow2)`
  ${downArrowStyle}
  width: 0.8125rem;
  height: 0.5rem;
`;

export const TriangleDownIcon = styled(IconDownTriangle)`
  ${downArrowStyle}
`;

interface SelectItemListProps {
  $itemListStyle?: string;
  $isOpen: boolean;
}

export const SelectItemList = styled.div<SelectItemListProps>`
  ${mixins.noScrollbar()}
  position: absolute;
  top: 3.75rem;
  left: 0;
  z-index: 1000;
  width: 100%;
  max-height: ${({ $isOpen }) => ($isOpen ? 15.875 : 0)}rem;
  background-color: white;
  border: 0.0625rem solid ${color.gray[850]};
  border-radius: 0.5rem;
  overflow-y: auto;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  ${({ $isOpen }) =>
    !$isOpen &&
    css`
      pointer-events: none;
    `}
  transition: opacity 0.15s ease-in-out, max-height 0.4s ease-in-out;
  ${({ $itemListStyle }) => $itemListStyle}
`;

interface SelectItemProps {
  $listItemStyle?: string;
  $isSelected?: boolean;
  $fontSize?: number;
  isSoldout?: boolean;
}

export const SelectItem = styled.div<SelectItemProps>`
  ${mixins.flexSet('flex-start')}
  ${({ $isSelected }) => $isSelected && mixins.fontStyle('bold')}
  padding: 0 1.5rem;
  height: 3rem;
  font-size: ${({ $fontSize }) => $fontSize ?? 1}rem;
  border-bottom: 0.0625rem dashed #222;

  ${({ $isSelected }) => $isSelected && `background-color: ${color.gray[40]};`}
  transition: all 0.15s ease-in-out;

  &:last-child {
    border-bottom: none;
  }

  .option {
    ${mixins.ellipsis()}
    line-height: 1.25rem;
  }
  ${({ isSoldout }) =>
    isSoldout
      ? css`
          color: ${color.gray[400]};
          cursor: not-allowed;
        `
      : css`
          cursor: pointer;

          &:hover {
            background-color: ${color.gray[40]};
          }
        `}
  ${({ $listItemStyle }) => $listItemStyle}
`;
