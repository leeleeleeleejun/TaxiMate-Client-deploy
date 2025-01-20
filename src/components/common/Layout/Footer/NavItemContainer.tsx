import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { NavItem } from '@/components/common/Layout/Footer/Footer.style.ts';

interface NavItemContainerProps {
  children: ReactNode;
  contentName?: string;
  path: string;
}

const NavItemContainer = ({
  children,
  contentName,
  path,
}: NavItemContainerProps) => {
  const { pathname } = useLocation();

  return (
    <NavItem to={path} replace={true} $isActive={path === pathname}>
      {children}
      {contentName && <span>{contentName}</span>}
    </NavItem>
  );
};

export default NavItemContainer;
