import getTimeAgoString from './getTimeAgoString';

describe('getTimeAgoString', () => {
  const now = new Date('2024-07-10T12:00:00'); // 고정된 현재 시간

  beforeEach(() => {
    vi.useFakeTimers(); // 타이머 mocking 시작
    vi.setSystemTime(now); // 현재 시간을 고정
  });

  afterEach(() => {
    vi.useRealTimers(); // 테스트 후 실제 시간 복원
  });

  it('"방금 전"인 경우 (1분 이하)', () => {
    const timestamp = new Date(now.getTime() - 10 * 1000).toISOString(); // 10초 전
    expect(getTimeAgoString(timestamp)).toBe('방금 전');
  });

  it('"몇 분 전"인 경우 (1시간 이하)', () => {
    const timestamp = new Date(now.getTime() - 3 * 60 * 1000).toISOString(); // 3분 전
    expect(getTimeAgoString(timestamp)).toBe('3분 전');
  });

  it('"몇 시간 전"인 경우 (1일 이하)', () => {
    const timestamp = new Date(
      now.getTime() - 2 * 60 * 60 * 1000
    ).toISOString(); // 2시간 전
    expect(getTimeAgoString(timestamp)).toBe('2시간 전');
  });

  it('"며칠 전"인 경우 (5일 이하)', () => {
    const timestamp = new Date(
      now.getTime() - 3 * 24 * 60 * 60 * 1000
    ).toISOString(); // 3일 전
    expect(getTimeAgoString(timestamp)).toBe('3일 전');
  });

  it('6일 이상 지난 경우 yyyy.MM.dd 형식 반환', () => {
    const oldDate = new Date('2024-06-30T08:30:00'); // 10일 전
    expect(getTimeAgoString(oldDate.toISOString())).toBe('2024.06.30');
  });
});
