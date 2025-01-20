import { CLIENT_PATH } from '@/constants/path.ts';
const localUrl = import.meta.env.VITE_API_LOCAL_URL;
const kakaoClient = import.meta.env.VITE_KAKAO_CLIENT_ID;

export const getKakaoInga = async () => {
  const isAndroid = /Android/.test(navigator.userAgent);
  // const isiOS = /(iPhone|iPad|iPod)/.test(navigator.userAgent);
  try {
    if (isAndroid) {
      window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClient}&redirect_uri=${localUrl + CLIENT_PATH.LOGIN_LOADING}&response_type=code`;
    } else {
      await window.Kakao.Auth.authorize({
        redirectUri: localUrl + CLIENT_PATH.LOGIN_LOADING,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
