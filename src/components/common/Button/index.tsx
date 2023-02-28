import React from 'react';
import * as S from './index.style';

export interface ButtonProps {
  buttonType:
    | 'white'
    | 'purple'
    | 'gray'
    | 'black'
    | 'blackWhite'
    | 'blue'
    | 'red'
    | 'pink'
    | 'gradient-blue';
  isLight?: boolean;
  disabledStyle?: string;
  height?: number;
  fontSize?: number;
  lineHeight?: string;
  buttonStyle?: string;
  borderRadius?: number;
  noPreventDefault?: boolean;
  noClick?: boolean;
  disabled?: boolean;
}

export interface ContainerProps {
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
  containerStyled?: string;
}

interface IProps extends Omit<ButtonProps, 'buttonType'>, ContainerProps {
  type?: ButtonProps['buttonType'];
  onClick?: () => void;
  disabled?: boolean;
  text?: string | React.ReactNode;
  getClassName?: string;
  children?: React.ReactNode;
  noStopPropagation?: boolean;
}

const PrimaryButton: React.FC<IProps> = ({
  containerStyled,
  type = 'black',
  text,
  height,
  lineHeight,
  isLight,
  disabled = false,
  disabledStyle,
  onClick,
  marginLeft,
  marginRight,
  marginBottom,
  fontSize,
  children,
  buttonStyle,
  getClassName,
  borderRadius,
  noPreventDefault,
  noClick,
  noStopPropagation,
}) => {
  return (
    <S.Container
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}
      containerStyled={containerStyled}
    >
      <S.Button
        className={getClassName}
        buttonStyle={buttonStyle}
        noClick={noClick}
        height={height}
        lineHeight={lineHeight}
        isLight={isLight}
        fontSize={fontSize}
        buttonType={type}
        disabled={disabled}
        disabledStyle={disabledStyle}
        borderRadius={borderRadius}
        onClick={(e) => {
          if (!noPreventDefault) {
            e.preventDefault();
          }
          if (!noClick) {
            e.stopPropagation();
            onClick && onClick();
          }
        }}
        onMouseDown={(e) => {
          if (!noStopPropagation) {
            e.stopPropagation();
          }
        }}
        onTouchStart={(e) => {
          if (!noStopPropagation) {
            e.stopPropagation();
          }
        }}
      >
        {text}
        {children}
      </S.Button>
      {type === 'gradient-blue' && (
        <S.DiabledButton
          buttonStyle={buttonStyle}
          height={height}
          lineHeight={lineHeight}
          isLight={isLight}
          fontSize={fontSize}
          buttonType={type}
          disabled={disabled}
          disabledStyle={disabledStyle}
          borderRadius={borderRadius}
        >
          {text}
          {children}
        </S.DiabledButton>
      )}
    </S.Container>
  );
};

export default PrimaryButton;
export const MemoizedPrimaryButton = React.memo(PrimaryButton);
