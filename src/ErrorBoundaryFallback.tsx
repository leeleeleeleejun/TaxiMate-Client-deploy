import type { ErrorBoundaryFallbackProps } from '@suspensive/react';
import Container from '@/components/common/Layout/Layout.style.ts';
import TaxiIcon from '@/assets/icons/login/taxi-icon.svg?react';
import styled from 'styled-components';

const ErrorBoundaryFallback = ({ reset }: ErrorBoundaryFallbackProps) => (
  <Container>
    <IconWrap>
      <TaxiIcon />
      <span>에러가 발생했어요</span>
      <span>페이지를 새로고침해주세요</span>
    </IconWrap>
    <RefreshButton onClick={reset}>새로고침</RefreshButton>
  </Container>
);

export default ErrorBoundaryFallback;

const IconWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  font-size: 18px;
`;

export const RefreshButton = styled.button`
  margin: 40px auto;
  padding: 10px 20px;
  width: 100px;
  border-radius: 6px;
  background-color: #313d4c;

  color: white;
`;
