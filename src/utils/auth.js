import { jwtDecode } from "jwt-decode";

/**
 * JWT 토큰을 디코딩하는 함수
 * @param {string} token - 디코딩할 JWT 토큰
 * @returns {object|null} 디코딩된 데이터 또는 null
 */
export function decodeToken(token) {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("토큰 디코딩 실패:", error);
    return null;
  }
}

/**
 * 토큰이 만료되었는지 확인하는 함수
 * @param {string} token - 확인할 JWT 토큰
 * @returns {boolean} 토큰이 만료되었는지 여부
 */
export function isTokenExpired(token) {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;

  const currentTime = Math.floor(Date.now() / 1000); // 현재 시간 (초 단위)
  return decoded.exp < currentTime;
}

/**
 * 토큰에서 사용자 정보를 추출하는 함수
 * @param {string} token - JWT 토큰
 * @returns {object|null} 사용자 정보 (id, password, nickname) 또는 null
 */
export function getUserInfoFromToken(token) {
  const decoded = decodeToken(token);
  if (!decoded) return null;

  return {
    id: decoded.id || null,
    password: decoded.password || null,
    nickname: decoded.nickname || null,
  };
}

/**
 * 로컬 스토리지에서 토큰을 가져오는 함수
 * @param {string} key - 토큰 키 (기본값: "token")
 * @returns {string|null} JWT 토큰 또는 null
 */
export function getTokenFromStorage(key = "token") {
  return localStorage.getItem(key);
}

/**
 * 토큰을 로컬 스토리지에 저장하는 함수
 * @param {string} token - 저장할 JWT 토큰
 * @param {string} key - 토큰 키 (기본값: "token")
 */
export function saveTokenToStorage(token, key = "token") {
  localStorage.setItem(key, token);
}

/**
 * 로컬 스토리지에서 토큰을 삭제하는 함수
 * @param {string} key - 토큰 키 (기본값: "token")
 */
export function removeTokenFromStorage(key = "token") {
  localStorage.removeItem(key);
}
