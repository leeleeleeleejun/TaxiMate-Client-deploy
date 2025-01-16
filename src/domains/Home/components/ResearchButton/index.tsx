import { Container } from '@/components/Home/ResearchButton/ResearchButton.style.ts';
import ResearchIcon from '@/assets/icons/map/research-icon.svg?react';

const ResearchButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Container onClick={onClick}>
      <ResearchIcon />현 지도에서 재검색
    </Container>
  );
};

export default ResearchButton;
