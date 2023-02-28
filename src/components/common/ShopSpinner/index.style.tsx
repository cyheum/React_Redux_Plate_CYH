import styled, { keyframes } from 'styled-components';
import { mixins } from '@/styles';

const spin = keyframes`
from {
  transform: rotate(0);
} to {
  transform: rotate(360deg);
}
`;

const lds_ellipsis1 = keyframes`
0% {
    transform: scale(0);
} 100% {
    transform: scale(1);
}
`;

const lds_ellipsis2 = keyframes`
0% {
    transform: translate(0, 0);
}  100% {
    transform: translate(184.61%, 0);
}
`;

const lds_ellipsis3 = keyframes`
  0% {
    transform: scale(1);
  } 100% {
    transform: scale(0);
  }
`;

export const Container = styled.div<{ height?: number }>`
  ${mixins.flexSet()}
  width: 100%;
  height: ${({ height }) => height ?? 10}rem;

  img {
    width: 4.25rem;
    height: 4.25rem;
    object-fit: contain;
    -webkit-animation: ${spin} 1500ms infinite linear;
    animation: ${spin} 1500ms infinite linear;
  }
`;

export const Spinner = styled.div`
  position: relative;
  width: 5rem;
  height: 5rem;

  > div {
    position: absolute;
    top: 41.25%;
    width: 16.25%;
    height: 16.25%;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
    -webkit-animation-timing-function: cubic-bezier(0, 1, 1, 0);

    &:nth-child(1) {
      left: 10%;
      animation: ${lds_ellipsis1} 0.6s infinite;
      -webkit-animation: ${lds_ellipsis1} 0.6s infinite;
    }

    &:nth-child(2) {
      left: 10%;
      animation: ${lds_ellipsis2} 0.6s infinite;
      -webkit-animation: ${lds_ellipsis2} 0.6s infinite;
    }

    &:nth-child(3) {
      left: 40%;
      animation: ${lds_ellipsis2} 0.6s infinite;
      -webkit-animation: ${lds_ellipsis2} 0.6s infinite;
    }

    &:nth-child(4) {
      left: 70%;
      animation: ${lds_ellipsis3} 0.6s infinite;
      -webkit-animation: ${lds_ellipsis3} 0.6s infinite;
    }
  }
`;
