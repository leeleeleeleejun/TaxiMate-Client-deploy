import { API_PATH, CLIENT_PATH } from '@/constants/path.ts';

const kakaoApiKey = import.meta.env.VITE_KAKAO_API;
const localUrl = import.meta.env.VITE_API_LOCAL_URL;
const kakaoClient = import.meta.env.VITE_KAKAO_CLIENT_ID;

export const getAddress = async (x: number, y: number) => {
  try {
    const response = await fetch(
      `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${x}&y=${y}`,
      {
        method: 'GET',
        headers: {
          Authorization: `KakaoAK ${kakaoApiKey}`,
        },
      }
    );
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error);
    }

    return result.documents[0];
  } catch (err) {
    console.error(err);
  }
};

export const getSearchList = async (query: string, x: string, y: string) => {
  const queryString = new URLSearchParams({ query, x, y });

  try {
    const response = await fetch(`${API_PATH.SEARCH.GET}?${queryString}`, {
      method: 'GET',
      headers: {
        Authorization: `KakaoAK ${kakaoApiKey}`,
      },
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error);
    }

    return result;
  } catch (err) {
    console.error(err);
  }
};

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
