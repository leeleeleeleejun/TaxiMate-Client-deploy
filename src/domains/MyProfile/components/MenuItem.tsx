import { ReactNode } from 'react';
import { Container } from './MenuItem.style.ts';
import ArrowRightIcon from '@/assets/icons/common/arrow-right-icon.svg?react';

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
    <Container>
      <div>
        <SvgIcon />
        {content}
      </div>
      {children || <ArrowRightIcon />}
    </Container>
  );
};

export default MenuItem;
