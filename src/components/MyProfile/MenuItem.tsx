import { MenuItemContainer } from '@/components/MyProfile/myProfile.style.ts';
import ArrowRightIcon from '@/assets/icons/arrow-right-icon.svg?react';
import { ReactNode } from 'react';
const MenuItem = ({
  content,
  SvgIcon,
  children,
}: {
  content: string;
  SvgIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  children?: ReactNode;
}) => {
  return (
    <MenuItemContainer>
      <div>
        <SvgIcon />
        {content}
      </div>
      {children || <ArrowRightIcon />}
    </MenuItemContainer>
  );
};

export default MenuItem;
