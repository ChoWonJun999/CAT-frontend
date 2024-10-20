import Axios from 'axios';

// CSRF 토큰 가져오기 함수
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// API의 기본 URL 설정
const baseUrl = 'http://127.0.0.1:8000/api/';

// Axios 인스턴스 생성
const AxiosInstance = Axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

// 요청 인터셉터 설정
AxiosInstance.interceptors.request.use(
  config => {
    // CSRF 토큰 추가
    const csrftoken = getCookie('csrftoken');
    if (csrftoken) {
      config.headers['X-CSRFToken'] = csrftoken;
    }

    // JWT access 토큰 추가
    const accessToken = localStorage.getItem('access');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
AxiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // 토큰 만료로 인한 401 에러 처리
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh');
        if (refreshToken) {
          // 토큰 갱신 요청
          const response = await Axios.post(`${baseUrl}token/refresh/`, {
            refresh: refreshToken,
          });

          // 새로운 access 토큰 저장
          localStorage.setItem('access', response.data.access);

          // Authorization 헤더 업데이트
          originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;

          // 원래의 요청 재시도
          return AxiosInstance(originalRequest);
        } else {
          // refresh 토큰이 없으면 로그인 페이지로 리디렉션
          window.location.href = '/login';
        }
      } catch (refreshError) {
        // 토큰 갱신 실패 시 로그인 페이지로 리디렉션
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default AxiosInstance;
