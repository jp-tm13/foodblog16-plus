import { __ } from "@wordpress/i18n";
import sideMenu from "../../icons/side-menu";

document.addEventListener("DOMContentLoaded", () => {
  // handle search form opening and closing
  const searchFormEl = document.querySelector(
    ".fblgstp-search-button-container"
  );
  const searchFormOverlay = document.querySelector(
    ".fblgstp-search-button-overlay"
  );
  const searchFormBtn = document.querySelectorAll(
    ".fblgstp-search-button, .fblgstp-search-button-overlay"
  );
  // attach event-listeners for opening/closing
  searchFormBtn.forEach((el) => {
    el.addEventListener("click", (event) => {
      searchFormEl.classList.toggle("fblgstp-search-button-open");
      searchFormOverlay.classList.toggle("fblgstp-search-button-open");
    });
  });

  // // remove element from parent if click outside of element is registered
  // function hideOnClickOutside(element, parent) {
  //   const outsideClickListener = (event) => {
  //     if (!element.contains(event.target)) {
  //       parent.removeChild(element);
  //       removeClickListener();
  //     }
  //   };

  //   const removeClickListener = () => {
  //     document.removeEventListener("click", outsideClickListener);
  //   };

  //   document.addEventListener("click", outsideClickListener);
  // }

  // // add event-listener to search button for opening and closing the search-form
  // const searchBtn = document.querySelector(".fblgstp-search-button");
  // const headerEl = document.querySelector(".fblgstp-header-main");

  // searchBtn.addEventListener("click", (event) => {
  //   // add the search-form to header
  //   const searchFormEl = document.querySelector(".fblgstp-search-overlay");

  //   if (!searchFormEl) {
  //     const div = document.createElement("div");
  //     div.className = "fblgstp-search-overlay";
  //     div.innerHTML = `
  //       <form class="fblgstp-search-form">
  //         <input
  //           type="text"
  //           placeholder="${__("What are you looking for?", "foodblog16-plus")}"
  //           name="s"
  //           class="fblgstp-search-input"
  //         />
  //         <button type="submit" class="fblgstp-search-btn">
  //           ${__("Search", "foodblog16-plus")}
  //         </button>
  //       </form>
  //     `;

  //     headerEl.appendChild(div);
  //     event.stopPropagation();

  //     hideOnClickOutside(
  //       document.querySelector(".fblgstp-search-overlay"),
  //       headerEl
  //     );
  //   }
  // });
});
