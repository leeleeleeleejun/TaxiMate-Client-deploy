import { NavItem } from '@/components/common/Layout/Footer/Footer.style.ts';
import { NavItemContainerProps } from '@/types/props';
import { useLocation } from 'react-router-dom';

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
