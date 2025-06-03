document.addEventListener("DOMContentLoaded", () => {
  // handle tab switching
  tabEl = document.querySelectorAll(".fblgstp-link-nav-hero");
  dinnerEl = document.querySelector(".fblgstp-dinner");
  supperEl = document.querySelector(".fblgstp-supper");
  breakfastEl = document.querySelector(".fblgstp-breakfast");
  dessertEl = document.querySelector(".fblgstp-dessert");

  //// attach event listeners to tabs
  tabEl.forEach((tab) => {
    tab.addEventListener("click", (event) => {
      event.preventDefault();
      // remove active class from all tabs
      tabEl.forEach((currentTab) =>
        currentTab.classList.remove("fblgstp-active-nav-link")
      );
      // add active class to current tab
      event.currentTarget.classList.add("fblgstp-active-nav-link");

      // show/hide queries
      const activeTab = event.currentTarget.getAttribute("href");
      if (activeTab === "#dinner") {
        dinnerEl.style.display = "grid";
        supperEl.style.display = "none";
        breakfastEl.style.display = "none";
        dessertEl.style.display = "none";
      } else if (activeTab === "#supper") {
        dinnerEl.style.display = "none";
        supperEl.style.display = "grid";
        breakfastEl.style.display = "none";
        dessertEl.style.display = "none";
      } else if (activeTab === "#breakfast") {
        dinnerEl.style.display = "none";
        supperEl.style.display = "none";
        breakfastEl.style.display = "grid";
        dessertEl.style.display = "none";
      } else if (activeTab === "#dessert") {
        dinnerEl.style.display = "none";
        supperEl.style.display = "none";
        breakfastEl.style.display = "none";
        dessertEl.style.display = "grid";
      }
    });
  });
});
