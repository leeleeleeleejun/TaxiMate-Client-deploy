import NextRadio from '@/components/CreatePost/Radio.tsx';
import ContentWrap from '@/components/CreatePost/ContentWrap.tsx';
import MemberIcon from '@/assets/icons/createPost/member-icon.svg?react';

const MemberWrap = ({
  value,
  setRegisterDataFunc,
}: {
  value: string;
  setRegisterDataFunc: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const setMemberValue = (e: string) => {
    setRegisterDataFunc(e);
  };

  return (
    <ContentWrap theme={'탑승인원'} SvgIcon={MemberIcon}>
      <NextRadio value={value} setMemberValue={setMemberValue} />
    </ContentWrap>
  );
};

export default MemberWrap;
