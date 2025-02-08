import $ from "jquery";

export function initializeSearchInput() {
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
  $("#inpt_search").off("focus");
  $("#inpt_search").off("blur");
}
