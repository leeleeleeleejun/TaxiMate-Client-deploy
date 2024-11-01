import Header from '@/components/common/Layout/Header';
import ArrowLeftIcon from '@/assets/icons/common/arrow-left-icon.svg?react';
import { Container, SubTitle } from './CreatePostChildPageLayout.style.ts';
import { ReactNode } from 'react';

const CreatePostChilePageLayout = ({
  subTitle,
  children,
  backHandle,
}: {
  subTitle?: string;
  children: ReactNode;
  backHandle: () => void;
}) => {
  return (
    <>
      <Header>
        <button onClick={backHandle}>
          <ArrowLeftIcon />
        </button>
      </Header>
      <Container $subTitle={subTitle}>
        {subTitle && <SubTitle>{subTitle}</SubTitle>}
        {children}
      </Container>
    </>
  );
};

export default CreatePostChilePageLayout;
