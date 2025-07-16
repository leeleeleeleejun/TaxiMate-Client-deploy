import { expect } from 'vitest';
import geolocationErrorMessage from './';

describe('geolocationErrorMessage', () => {
  it('에러 코드가 1 일 때', () => {
    expect(geolocationErrorMessage(1, '에러에요')).toBe(
      '위치 접근 권한이 거부되었습니다.'
    );
  });
  it('에러 코드가 2 일 때', () => {
    expect(geolocationErrorMessage(2, '에러에요')).toBe(
      '위치를 확인할 수 없습니다.'
    );
  });
  it('에러 코드가 3 일 때', () => {
    expect(geolocationErrorMessage(3, '에러에요')).toBe(
      '위치 확인 시간이 초과되었습니다.'
    );
  });
  it('에러 코드가 0,1,2 이 아닐 떄', () => {
    expect(geolocationErrorMessage(4, '에러에요')).toBe('에러에요');
  });
});
