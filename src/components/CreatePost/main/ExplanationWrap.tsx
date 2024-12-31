import ContentWrap from '@/components/CreatePost/ContentWrap.tsx';
import {
  CheckLength,
  TextArea,
} from '@/components/CreatePost/createPost.style.ts';
import ExplainIcon from '@/assets/icons/createPost/explain-icon .svg?react';
import { ContentWrapProps } from '@/types/props';

const ExplanationWrap = ({ value, setRegisterDataFunc }: ContentWrapProps) => {
  if (!setRegisterDataFunc) return null;
  if (typeof value !== 'string') return null;

  const setExplanationValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRegisterDataFunc('explanation', e.target.value);
  };

  return (
    <ContentWrap
      theme={'간단 설명'}
      explain={'동승자들에게 하고 싶은 말을 자유롭게 작성하세요!'}
      SvgIcon={ExplainIcon}
    >
      <TextArea
        value={value}
        placeholder={'학교 정문 앞에서 탑승할게요!'}
        onChange={setExplanationValue}
        maxLength={500}
      />
      <CheckLength>{value.length} / 500</CheckLength>
    </ContentWrap>
  );
};

export default ExplanationWrap;
