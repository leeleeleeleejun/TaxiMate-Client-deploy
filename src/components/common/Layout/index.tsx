import { Outlet } from 'react-router-dom';
import Container from '@/components/common/Layout/Layout.style.ts';

const Layout = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default Layout;
