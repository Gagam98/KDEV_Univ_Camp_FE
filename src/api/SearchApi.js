export function initializeSearchInput() {
  const searchInput = document.getElementById("inpt_search");

  function handleFocus() {
    searchInput.parentElement.classList.add("active");
  }

  function handleBlur() {
    if (searchInput.value.length === 0) {
      searchInput.parentElement.classList.remove("active");
    }
  }

  searchInput.addEventListener("focus", handleFocus);
  searchInput.addEventListener("blur", handleBlur);

  setTimeout(() => {
    searchInput.parentElement.classList.add("active");
  }, 1000);

  return { handleFocus, handleBlur };
}

export function cleanupSearchInput(eventHandlers) {
  const searchInput = document.getElementById("inpt_search");

  if (searchInput && eventHandlers) {
    searchInput.removeEventListener("focus", eventHandlers.handleFocus);
    searchInput.removeEventListener("blur", eventHandlers.handleBlur);
  }
}
