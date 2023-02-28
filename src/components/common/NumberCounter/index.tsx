import React, { useRef } from "react";
import { useSpring, animated } from "react-spring";
import * as S from "./index.styled";

interface IProps {
  num: number;
  description?: string;
  delay?: number;
  cssStyle?: string;
}

export const NumberCounter: React.FC<IProps> = ({
  num,
  description,
  delay,
  cssStyle,
}) => {
  const fakeNumberElement = useRef<HTMLDivElement | null>(null);
  const { number } = useSpring({
    from: { number: 0 },
    number: num,
    delay: delay ?? 100,
    config: { mass: 1, tension: 20, friction: 10 },
  });

  return (
    <S.Container minWidth={(fakeNumberElement.current?.scrollWidth ?? 0) + 10}>
      <S.Number as={animated.p} cssstyle={cssStyle}>
        {number.to((n) => Number(n.toFixed() ?? "0").toLocaleString())}
      </S.Number>
      <S.Number cssstyle={cssStyle}>{description}</S.Number>
      <S.FakeNumber ref={fakeNumberElement}>
        {(num ?? 0).toLocaleString()}
        {description}
      </S.FakeNumber>
    </S.Container>
  );
};
