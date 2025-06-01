/******/ (() => { // webpackBootstrap
/*!*****************************************************!*\
  !*** ./src/blocks/navigation-side-menu/frontend.js ***!
  \*****************************************************/
document.addEventListener("DOMContentLoaded", () => {
  // handle side menu opening and closing
  //// get menu element and elements for opening/closing
  const sideMenuEl = document.querySelector(".fblgstp-side-menu-container");
  const sideMenuOverlay = document.querySelector(".fblgstp-side-menu-overlay");
  const sideMenuBtn = document.querySelectorAll(".fblgstp-side-menu-button, .fblgstp-side-menu-overlay");
  // attach event-listeners for opening/closing
  sideMenuBtn.forEach(el => {
    el.addEventListener("click", event => {
      sideMenuEl.classList.toggle("fblgstp-side-menu-open");
      sideMenuOverlay.classList.toggle("fblgstp-side-menu-open");
    });
  });

  // handle authentication modal opening and closing
  //// get modal element and elements for opening/closing the modal
  const modalEl = document.querySelector(".fblgstp-authentication-modal");
  const modalOpenBtn = document.querySelectorAll(".fblgstp-open-modal");
  const modalCloseBtn = document.querySelectorAll(".fblgstp-modal-close-button, .fblgstp-modal-overlay");
  //// attach event-listeners to open button/elements
  modalOpenBtn.forEach(el => {
    el.addEventListener("click", event => {
      event.preventDefault();
      modalEl.classList.add("fblgstp-modal-show");
    });
  });
  //// attach event-listeners to close button
  modalCloseBtn.forEach(el => {
    el.addEventListener("click", event => {
      event.preventDefault();
      modalEl.classList.remove("fblgstp-modal-show");
    });
  });

  // handle tab switching
  //// get tab links and sign-in/-up elements
  const tabEl = document.querySelectorAll(".fblgstp-tabs a");
  const signInFormEl = document.querySelector("#signin-tab");
  const signUpFormEl = document.querySelector("#signup-tab");
  //// attach event listeners to tabs
  tabEl.forEach(tab => {
    tab.addEventListener("click", event => {
      event.preventDefault();
      // remove 'fblgstp-active-tab' class from all tabs
      tabEl.forEach(currentTab => currentTab.classList.remove("fblgstp-active-tab"));
      event.currentTarget.classList.add("fblgstp-active-tab");
      // add 'fblgstp-active-tab' class to current tab
      const activeTab = event.currentTarget.getAttribute("href");
      // show/hide appropriate forms
      if (activeTab === "#signin-tab") {
        signInFormEl.style.display = "block";
        signUpFormEl.style.display = "none";
      } else {
        signInFormEl.style.display = "none";
        signUpFormEl.style.display = "block";
      }
    });
  });

  // handle sign-up from submission
  signUpFormEl.addEventListener("submit", async event => {
    event.preventDefault();
    // disable input while handling submission
    const signUpFieldset = signUpFormEl.querySelector("fieldset");
    signUpFieldset.setAttribute("disabled", true);
    // render status message
    const signUpStatus = signUpFormEl.querySelector("#signup-status");
    signUpStatus.innerHTML = `
      <div class="fblgstp-modal-status fblgstp-modal-status-info">
        Please wait! We are creating your account.
      </div>
    `;
    // get data from frontend
    const formData = {
      username: signUpFormEl.querySelector("#su-name").value,
      email: signUpFormEl.querySelector("#su-email").value,
      password: signUpFormEl.querySelector("#su-password").value
    };
    // send request to RestApi
    const response = await fetch(fblgstp_auth_rest.signup, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });
    const responseJSON = await response.json();
    // check if sign-up was successful
    if (responseJSON.status === 2) {
      signUpStatus.innerHTML = `
        <div class="fblgstp-modal-status fblgstp-modal-status-success">
          Success! Your account has been created.
        </div>
      `;
      location.reload();
    } else {
      signUpFieldset.removeAttribute("disabled");
      signUpStatus.innerHTML = `
        <div class="fblgstp-modal-status fblgstp-modal-status-danger">
          Unable to create account! Please try again.
        </div>
      `;
    }
  });

  // handle sign-in form submission
  signInFormEl.addEventListener("submit", async event => {
    event.preventDefault();
    // disable input while handling submission
    const signInFieldset = signInFormEl.querySelector("fieldset");
    signInFieldset.setAttribute("disabled", true);
    // render status message
    const signInStatus = signInFormEl.querySelector("#signin-status");
    signInStatus.innerHTML = `
      <div class="fblgstp-modal-status fblgstp-modal-status-info">
        Please wait! Attempting login.
      </div>
    `;
    // get data from frontend
    const formData = {
      user_login: signInFormEl.querySelector("#si-email").value,
      password: signInFormEl.querySelector("#si-password").value
    };
    // send request to Rest API
    const response = await fetch(fblgstp_auth_rest.signin, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });
    // check if sign-in was successful
    const responseJSON = await response.json();
    if (responseJSON.status === 2) {
      signInStatus.innerHTML = `
        <div class="fblgstp-modal-status fblgstp-modal-status-success">
          Success! Your are logged in.
        </div>
      `;
      location.reload();
    } else {
      signInFieldset.removeAttribute("disabled");
      signInStatus.innerHTML = `
        <div class="fblgstp-modal-status fblgstp-modal-status-danger">
          Unable to login! Please try again.
        </div>
      `;
    }
  });
});
/******/ })()
;
//# sourceMappingURL=frontend.js.map