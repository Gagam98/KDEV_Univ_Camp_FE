// @@/ErrorPage/index.jsx
import { useLocation } from "react-router-dom";

const ErrorPage = () => {
  const location = useLocation();
  const { message, carNumber } = location.state || {};

  return (
    <div>
      <h1>차량 조회 실패</h1>
      <p>{message}</p>
      <p>검색한 차량번호: {carNumber}</p>
    </div>
  );
};

export default ErrorPage;
