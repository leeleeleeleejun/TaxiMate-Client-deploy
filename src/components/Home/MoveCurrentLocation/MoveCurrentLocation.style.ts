import styled from 'styled-components';

export const Button = styled.button<{
  $bottom: number;
  $isMax: boolean;
  $activeMarker: string | null;
}>`
  width: 38px;
  height: 38px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;

  position: absolute;
  transition: bottom 0.5s ease;
  bottom: ${({ $isMax, $bottom, $activeMarker }) =>
    $activeMarker ? '140px' : $isMax ? '30px' : `${$bottom - 50}px`};
  right: 5%;
  z-index: 2;

  background-color: var(--color-white);
`;
