import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import $ from "jquery";

export default function SearchPage() {
  const navigate = useNavigate();

  useEffect(() => {
    $("#inpt_search").on("focus", function () {
      $(this).parent("label").addClass("active");
    });

    $("#inpt_search").on("blur", function () {
      if ($(this).val().length === 0)
        $(this).parent("label").removeClass("active");
    });

    return () => {
      $("#inpt_search").off("focus");
      $("#inpt_search").off("blur");
    };
  }, []);

  return (
    <div className="cntr">
      <div className="cntr-innr">
        <label className="search" htmlFor="inpt_search">
          <input id="inpt_search" type="text" />
        </label>
        <p>Hover to see the magic.</p>
        <div className="auth-buttons">
          <button onClick={() => navigate("/login")} className="login-btn">
            로그인
          </button>
          <button onClick={() => navigate("/signup")} className="signup-btn">
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
