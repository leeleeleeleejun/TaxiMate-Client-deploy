import formatDate, { isSameDate, formatTime } from './formatDate.ts';

it('두 개의 날짜가 같은지 비교하고 Boolean값을 리턴한다', () => {
  const day1 = new Date('2024-02-07');
  const day2 = new Date('2024-02-07');
  const day3 = new Date('2024-02-08');

  expect(isSameDate(day1, day2)).toBe(true);
  expect(isSameDate(day1, day3)).toBe(false);
});

it('날짜를 오전/오후 0시 00분 형태로 반환한다', () => {
  const morning = new Date('2024-02-07T09:30:00');
  const noon = new Date('2024-02-07T12:00:00');
  const evening = new Date('2024-02-07T18:45:00');

  expect(formatTime(morning)).toBe('오전 9시 30분');
  expect(formatTime(noon)).toBe('오후 12시 00분');
  expect(formatTime(evening)).toBe('오후 6시 45분');
});

describe('formatDate', () => {
  beforeAll(() => {
    // 테스트를 고정된 날짜 기준으로 하도록 시간 고정
    vi.setSystemTime(new Date('2024-02-07T10:00:00')); // 오늘 = 2/7
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('오늘 날짜면 "오늘 HH시 MM분 쯤"을 반환한다', () => {
    const result = formatDate('2024-02-07T13:30:00');
    expect(result).toBe('오늘 오후 1시 30분 쯤');
  });

  it('내일 날짜면 "내일 HH시 MM분 쯤"을 반환한다', () => {
    const result = formatDate('2024-02-08T09:15:00');
    expect(result).toBe('내일 오전 9시 15분 쯤');
  });

  it('오늘/내일이 아닌 날짜는 "MM월 DD일(요일) H시 MM분 쯤" 형태로 반환한다', () => {
    const result = formatDate('2024-02-10T18:00:00'); // 토요일
    expect(result).toBe('02월 10일(토) 오후 6시 00분 쯤');
  });
});
