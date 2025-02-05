// src/api/searchInputHandler.js
import $ from "jquery";

export function initializeSearchInput() {
  // 검색 입력 이벤트 핸들러 추가
  $("#inpt_search").on("focus", function () {
    $(this).parent("label").addClass("active");
  });

  $("#inpt_search").on("blur", function () {
    if ($(this).val().length === 0) {
      $(this).parent("label").removeClass("active");
    }
  });
}

export function cleanupSearchInput() {
  // 이벤트 핸들러 제거
  $("#inpt_search").off("focus");
  $("#inpt_search").off("blur");
}
