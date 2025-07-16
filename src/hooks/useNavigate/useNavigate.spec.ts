import useCustomNavigation from './useNavigate';
import { renderHook } from '@testing-library/react';
import { CLIENT_PATH } from '@/constants/path.ts';
import formatPathWithParams from '@/utils/formatPathWithParams';

const navigateFn = vi.fn();

vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');
  return {
    ...original,
    useNavigate: () => navigateFn,
  };
});

describe('useCustomNavigation', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  it('goBack 함수는 뒤로 이동(-1)을 수행해야 한다.', () => {
    const { result } = renderHook(() => useCustomNavigation());
    result.current.goBack();
    expect(navigateFn).toHaveBeenNthCalledWith(1, -1);
  });

  it('goHome 함수는 "/" 경로로 이동해야 한다.', () => {
    const { result } = renderHook(() => useCustomNavigation());
    result.current.goHome();
    expect(navigateFn).toHaveBeenNthCalledWith(1, '/', { replace: false });
  });

  it('goHome 함수는 replace 옵션이 true일 경우 대체 이동을 수행해야 한다.', () => {
    const { result } = renderHook(() => useCustomNavigation());
    result.current.goHome({ replace: true });
    expect(navigateFn).toHaveBeenNthCalledWith(1, '/', { replace: true });
  });

  it('goTo 함수는 고정 경로로 이동해야 한다.', () => {
    const { result } = renderHook(() => useCustomNavigation());
    result.current.goTo({ path: 'MY_PROFILE' });
    expect(navigateFn).toHaveBeenNthCalledWith(
      1,
      CLIENT_PATH['MY_PROFILE'],
      undefined
    );
  });

  it('동적 값(id)이 포함된 특정 경로(CLIENT_PATH) url 설정', () => {
    const ID = 1;
    expect(formatPathWithParams(CLIENT_PATH['CHAT_ROOM'], ID)).toBe(
      '/chat-list/1'
    );
  });

  it('goTo 함수는 동적 값(id)이 포함된 특정 경로(CLIENT_PATH)로 이동한다.', () => {
    const { result } = renderHook(() => useCustomNavigation());
    const ID = 1;

    result.current.goTo({ path: 'CHAT_ROOM', id: ID });
    expect(navigateFn).toHaveBeenNthCalledWith(1, '/chat-list/1', undefined);
  });

  it('goTo 함수는 옵션과 함께 동적 값(id)이 포함된 특정 경로(CLIENT_PATH)로 이동한다.', () => {
    const { result } = renderHook(() => useCustomNavigation());
    const ID = 1;

    result.current.goTo({
      path: 'CHAT_ROOM',
      id: ID,
      options: { replace: true },
    });
    expect(navigateFn).toHaveBeenNthCalledWith(1, '/chat-list/1', {
      replace: true,
    });
  });
});
