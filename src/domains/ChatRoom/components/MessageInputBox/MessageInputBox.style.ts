import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 10px 20px;
  display: flex;
`;

export const Input = styled.textarea<{ $inputLineLength: number }>`
  width: 90%;
  height: ${(props) => props.$inputLineLength * 20 + 20 + 'px'};

  max-height: 125px;

  padding: 10px 14px;
  resize: none;
  line-height: 1.5;

  margin-right: 10px;
  border-radius: 18px;
  background-color: var(--color-gray-300);

  font-size: var(--font-small);

  outline: none;
`;
