import { mixins } from "@/styles";
import styled, { css } from "styled-components";

export const Container = styled.div<{ minWidth?: number }>`
  ${mixins.flexSet("")}
  min-width: ${({ minWidth }) => minWidth ?? 0}px;
`;

const numberStyle = css<{ cssstyle?: string }>`
  ${mixins.fontStyle("bold")}
  margin-top: 0.4rem;
  font-size: 1.5rem;
  line-height: 1.375rem;
  ${({ cssstyle }) => cssstyle}
`;

export const Number = styled.p`
  ${numberStyle}
`;

export const FakeNumber = styled.div<{ cssStyle?: string }>`
  ${numberStyle}
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;
