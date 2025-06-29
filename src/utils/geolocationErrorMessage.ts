const geolocationErrorMessage = (code: number, fallback: string): string => {
  return {
    1: '위치 접근 권한이 거부되었습니다.',
    2: '위치를 확인할 수 없습니다.',
    3: '위치 확인 시간이 초과되었습니다.',
  }[code] ?? fallback
}

export default geolocationErrorMessage;