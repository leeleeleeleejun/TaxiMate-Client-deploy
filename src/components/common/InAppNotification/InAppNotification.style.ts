import styled, { css, keyframes } from 'styled-components';
import { MessageContent } from '@/components/ChatList/chatList.style.ts';
import { Link } from 'react-router-dom';

const slideDown = keyframes`
    0% {
        transform: translateY(-100%);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
`;

// 애니메이션 정의: 아래로 사라지는 애니메이션
const slideUp = keyframes`
    0% {
        transform: translateY(0);
        opacity: 1;
    }
    100% {
        transform: translateY(-100%);
        opacity: 0;
    }
`;

export const Container = styled(Link)<{ $show: boolean }>`
  display: flex;

  ${({ $show }) =>
    $show
      ? css`
          animation: ${slideDown} 0.5s ease-out forwards; /* 애니메이션 종료 후 상태 유지 */
        `
      : css`
          animation: ${slideUp} 1s ease-in forwards; /* 애니메이션 종료 후 상태 유지 */
        `};

  align-items: center;
  max-width: 450px;
  width: 100%;
  padding: 10px 14px;
  position: absolute;
  top: 0;
  z-index: 100001;
  background-color: var(--color-white);
  box-shadow: 0 0 2px 2px var(--color-gray-200);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

export const ProfileName = styled.div`
  font-size: var(--font-small);
  color: var(--color-gray-100);
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-left: 4px;
`;

export const Title = styled.div`
  font-weight: var(--weight-semi-bold);
`;

export const Message = styled(MessageContent)`
  text-align: left;
  font-size: var(--font-small);
  font-weight: var(--weight-regular);
  -webkit-line-clamp: 1;
  flex-grow: 1;
`;
