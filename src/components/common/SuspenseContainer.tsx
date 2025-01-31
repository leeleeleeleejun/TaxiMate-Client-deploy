import styled from 'styled-components';
import LoadingIcon from '@/components/common/LoadingIcon';

const SuspenseContainer = () => {
  return (
    <Container>
      <LoadingIcon />
    </Container>
  );
};

export default SuspenseContainer;

const Container = styled.div`
  position: relative;
  height: 100%;
`;
