import { __ } from "@wordpress/i18n";
import sideMenu from "../../icons/side-menu";

document.addEventListener("DOMContentLoaded", () => {
  // handle search form opening and closing
  //// get elements from document
  const searchFormEl = document.querySelector(
    ".fblgstp-search-button-container"
  );
  const searchFormOverlay = document.querySelector(
    ".fblgstp-search-button-overlay"
  );
  const searchFormBtn = document.querySelectorAll(
    ".fblgstp-search-button, .fblgstp-search-button-overlay"
  );
  //// attach event-listeners for opening/closing
  searchFormBtn.forEach((el) => {
    el.addEventListener("click", (event) => {
      searchFormEl.classList.toggle("fblgstp-search-button-open");
      searchFormOverlay.classList.toggle("fblgstp-search-button-open");
    });
  });
});
