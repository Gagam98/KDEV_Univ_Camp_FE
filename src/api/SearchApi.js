import $ from "jquery";

export function initializeSearchInput() {
  // 검색창에 포커스 시 'active' 클래스 추가
  $("#inpt_search").on("focus", function () {
    $(this).parent("label").addClass("active");
  });

  // 포커스를 잃었을 때 입력 값이 없으면 'active' 클래스 제거
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
