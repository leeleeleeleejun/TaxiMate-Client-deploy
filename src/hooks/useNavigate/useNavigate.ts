import { NavigateOptions, useNavigate } from 'react-router-dom';
import { CLIENT_PATH } from '@/constants/path.ts';
import formatPathWithParams from '@/utils/formatPathWithParams.ts';

interface GoToParams {
  path: keyof typeof CLIENT_PATH;
  id?: number | string;
  options?: NavigateOptions;
}

const useCustomNavigation = () => {
  const navigate = useNavigate();

  /** 뒤로 이동 */
  const goBack = () => navigate(-1);

  /** 홈으로 이동
   * @param replace 옵션 replace 값
   */
  const goHome = ({ replace = false }: { replace?: boolean } = {}) =>
    navigate('/', { replace });

  /**
   * 특정 경로로 이동
   * @param path 이동할 경로
   * @param id 경로의 동적 값 (id 등)
   * @param options 옵션 (replace 등)
   */
  const goTo = ({ path, id, options }: GoToParams) =>
    id !== undefined
      ? navigate(formatPathWithParams(CLIENT_PATH[path], id), options)
      : navigate(CLIENT_PATH[path], options);

  return {
    goBack,
    goHome,
    goTo,
  };
};

export default useCustomNavigation;
