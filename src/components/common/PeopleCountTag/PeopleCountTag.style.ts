import styled, { css } from 'styled-components';

export const PeopleCountTagContainer = styled.div<{
  $isClose: boolean | undefined;
  $isMax: boolean;
}>`
  display: flex;
  align-items: center;
  white-space: nowrap;

  width: fit-content;
  padding: 5px 8px;

  font-size: var(--font-semi-micro);
  font-weight: var(--weight-semi-bold);

  right: 5%;
  z-index: 2;

  border-radius: 20px;

  ${({ $isClose, $isMax }) =>
    $isClose
      ? css`
          color: var(--color-gray-100);
          background-color: var(--color-gray-300);
        `
      : $isMax
        ? css`
            color: var(--color-unavailable-text);
            background-color: var(--color-unavailable-background);
          `
        : css`
            color: var(--color-available-text);
            background-color: var(--color-available-background);
          `}

  & > svg {
    fill: ${({ $isClose, $isMax }) =>
      $isClose
        ? `var(--color-gray-100)`
        : $isMax
          ? 'var(--color-unavailable-text)'
          : 'var(--color-available-text)'};

    margin-right: 4px;
  }
`;
