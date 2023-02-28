import styled, { css } from "styled-components";
import { mixins, color } from "@/styles";
import { IconDownTriangle, IconDownArrow2 } from "@svg";

export const Container = styled.div<{ containerStyle?: string }>`
  position: relative;
  ${({ containerStyle }) => containerStyle}
`;

interface OrderButtonProps {
  buttonStyle?: string;
  fontSize?: number;
}

export const OrderButton = styled.button<OrderButtonProps>`
  ${mixins.flexSet("space-between")}
  ${mixins.fontStyle("bold")}
  width: 10rem;
  height: 2.75rem;
  padding: 0 1.5rem;
  font-size: ${({ fontSize }) => fontSize ?? 1}rem;
  border: 0.0625rem solid ${color.gray["150"]};
  border-radius: 6.25rem;
  ${mixins.primaryBoxShadow()}
  ${mixins.primaryTransition()}

  &:hover {
    opacity: 0.7;
  }

  .name {
    ${mixins.ellipsis(1)}
  }
  ${({ buttonStyle }) => buttonStyle}

  @media (max-width: 1024px ) {
    width: 7rem;
  }
`;

type TriangleDownIconProps = {
  reversed?: boolean;
};

const downArrowStyle = css<TriangleDownIconProps>`
  flex-shrink: 0;
  width: 0.875rem;
  height: 0.5625rem;
  transform: ${({ reversed }) => reversed && "rotate(180deg)"};
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
  itemListStyle?: string;
  isOpen: boolean;
}

export const SelectItemList = styled.div<SelectItemListProps>`
  ${mixins.noScrollbar()}
  position: absolute;
  top: 3.25rem;
  left: 0;
  z-index: 1000;
  width: 10rem;
  max-height: ${({ isOpen }) => (isOpen ? 15.875 : 0)}rem;
  background-color: white;
  border: 0.0625rem solid ${color.gray[180]};
  border-radius: 1.6875rem;
  overflow-y: auto;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  ${({ isOpen }) =>
    !isOpen &&
    css`
      pointer-events: none;
    `}
  ${mixins.primaryBoxShadow()}
  transition: opacity 0.15s ease-in-out, max-height 0.4s ease-in-out;
  ${({ itemListStyle }) => itemListStyle}

  @media (max-width: 1024px ) {
    width: 7rem;
  }
`;

interface SelectItemProps {
  listItemStyle?: string;
  isSelected?: boolean;
  fontSize?: number;
}

export const SelectItem = styled.div<SelectItemProps>`
  ${({ isSelected }) => isSelected && mixins.fontStyle("bold")}
  padding: 0.5625rem 1.5rem;
  font-size: ${({ fontSize }) => fontSize ?? 1}rem;

  ${({ isSelected }) => isSelected && `background-color: ${color.gray[40]};`}
  transition: all 0.15s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: ${color.gray[40]};
  }

  .option {
    ${mixins.ellipsis()}
    line-height: 1.25rem;
  }

  ${({ listItemStyle }) => listItemStyle}
`;
