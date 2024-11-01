import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  padding: 10px 20px;
  overflow: auto;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const CreateSubmitButton = styled.button`
  font-weight: var(--weight-semi-bold);
  color: var(--color-blue);
`;

export const ContentContainer = styled.div`
  padding: 15px 0;

  & > button {
    width: 100%;
    text-align: left;
  }
`;

export const ContentTitle = styled.h2`
  padding: 10px 0 20px;

  display: flex;
  flex-direction: column;
  font-weight: var(--weight-semi-bold);
  font-size: 18px;

  svg {
    margin-left: 5px;
  }

  div {
    display: flex;
  }

  p {
    padding-top: 10px;
    font-size: var(--font-small);
    font-weight: var(--weight-regular);
    color: var(--color-gray-100);
  }
`;

export const TitleInput = styled.input`
  margin-top: -10px;

  width: 100%;

  padding: 12px;

  border-radius: 12px;
  background-color: var(--color-gray-300);

  font-size: var(--font-small);
  font-weight: var(--weight-regular);

  &::placeholder {
    color: var(--color-gray-200);
  }

  &:focus {
    outline: none;
  }
`;

export const DepartureTimeContainer = styled.button`
  display: flex;
  justify-content: space-between;

  font-weight: var(--weight-semi-bold);
  font-size: var(--font-regular);

  div {
    display: flex;
    align-items: center;

    svg {
      margin-right: 5px;
    }
  }
`;

export const TextArea = styled.textarea`
  margin-top: -10px;

  width: 100%;
  height: 150px;

  padding: 12px;

  border-radius: 12px;
  background-color: var(--color-gray-300);

  font-size: var(--font-small);
  font-weight: var(--weight-regular);

  &:focus {
    outline: none;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;

  border-radius: 6px;
  background-color: var(--color-main);

  color: var(--color-white);
  font-weight: var(--weight-bold);
  text-align: center;
`;

export const CheckLength = styled.div`
  text-align: right;
  color: var(--color-gray-200);
  font-size: var(--font-semi-micro);
  font-weight: var(--weight-regular);

  padding: 2px 8px;
`;
