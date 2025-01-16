import styled from 'styled-components';
import MarkerContainerStyle from '@/components/common/MarkerContainer/MarkerContainer.style.ts';

export const ContentContainer = styled.div`
  padding: 0 20px;

  font-size: var(--font-small);
  font-weight: var(--weight-regular);
  color: var(--color-gray-100);

  white-space: pre-wrap;
`;

export const MoveInfoContainer = styled.div`
  padding: 15px 20px;

  font-size: var(--font-semi-micro);
  font-weight: var(--weight-regular);
  color: var(--color-gray-100);

  border-bottom: 1px solid var(--color-gray-300);

  span {
    margin: 0 10px 0 5px;
    font-size: var(--font-small);
    color: black;
  }
`;

export const PostDetailContainer = styled.div`
  height: 100%;
  overflow: auto;

  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .map-wrapper {
    width: 100%;
    min-height: 250px;
    margin: 20px 0;

    overflow: hidden;
  }

  ${MarkerContainerStyle}
`;
