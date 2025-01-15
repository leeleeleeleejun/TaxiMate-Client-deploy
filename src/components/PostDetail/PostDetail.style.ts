import styled from 'styled-components';
import MarkerContainerStyle from '@/components/common/MarkerContainer/MarkerContainer.style.ts';

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

export const PostDetailHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;

  color: var(--color-gray-100);
  font-size: var(--font-small);

  & > div {
    display: flex;
  }
`;

export const PostDetailTitleContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding: 10px 20px;

  h2 {
    font-size: 18px;
    font-weight: var(--weight-semi-bold);

    margin-bottom: 5px;
  }
`;

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

export const ButtonBox = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: center;
  gap: 16px;

  & > button {
    width: 110px;
    min-height: 45px;
    font-size: 18px;
    font-weight: var(--weight-bold);
  }
`;

export const JoinButton = styled.button`
  border-radius: 6px;
  background-color: var(--color-main);

  color: var(--color-white);
`;

export const LeaveButton = styled.button`
  color: var(--color-red);
  text-decoration: underline;
`;

const statusTag = styled.div`
  margin-left: 5px;
  padding: 8px;
  border-radius: 20px;
  font-weight: var(--weight-semi-bold);
  font-size: var(--font-small);
`;

export const ParticipationTag = styled(statusTag)`
  color: var(--color-available-text);
  background-color: var(--color-available-background);
`;

export const CloseTag = styled(statusTag)`
  color: var(--color-unavailable-text);
  background-color: var(--color-unavailable-background);
`;

export const ParticipantsBoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  & > div {
    max-width: 50%;
    flex-grow: 0.5;
  }
`;
