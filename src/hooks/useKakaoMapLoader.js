import { useEffect } from "react";

export const useKakaoMapLoader = (callback) => {
  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=273162e89b73e08bbf2a0524708342e1&autoload=false&libraries=services`;
      script.async = true;

      script.onload = () => {
        window.kakao.maps.load(callback);
      };

      document.body.appendChild(script);
    } else {
      window.kakao.maps.load(callback);
    }
  }, [callback]);
};
