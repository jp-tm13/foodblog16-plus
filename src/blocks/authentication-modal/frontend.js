document.addEventListener("DOMContentLoaded", () => {
  // handle modal opening and closing
  // get authentication modal
  const modalEl = document.querySelector(
    ".wp-block-foodblog16-plus-authentication-modal"
  );
  // get elements to open the modal
  const openModalBtn = document.querySelectorAll(".open-modal");

  // add event listeners to elements for opening the modal
  openModalBtn.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();

      // add class to show modal
      modalEl.classList.add("modal-show");
    });
  });

  // handle tab switching
  // get all tab links
  const tabs = document.querySelectorAll(".tabs a");
  // get sign-in/-up form elements
  const signinForm = document.querySelector("#signin-tab");
  const signupForm = document.querySelector("#signup-tab");

  // add event listeners to the tabs
  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();

      // remove 'active-tab' class from all tabs
      tabs.forEach((currentTab) => currentTab.classList.remove("active-tab"));
      e.currentTarget.classList.add("active-tab");
      // add 'active-tab' class to current tab
      const activeTab = e.currentTarget.getAttribute("href");

      // show/hide appropriate forms
      if (activeTab === "#signin-tab") {
        signinForm.style.display = "block";
        signupForm.style.display = "none";
      } else {
        signinForm.style.display = "none";
        signupForm.style.display = "block";
      }
    });
  });

  // handle signup submition
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // disable input while handling submission
    const signupFieldset = signupForm.querySelector("fieldset");
    signupFieldset.setAttribute("disabled", true);

    // render status message
    const signupStatus = signupForm.querySelector("#signup-status");
    signupStatus.innerHTML = `
      <div class="modal-status modal-status-info">
        Please wait! We are creating your account.
      </div>
    `;

    // get data from the frontend
    const formData = {
      username: signupForm.querySelector("#su-name").value,
      email: signupForm.querySelector("#su-email").value,
      password: signupForm.querySelector("#su-password").value,
    };

    // send request to RestAPI
    const response = await fetch(fblgstp_auth_rest.signup, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const responseJSON = await response.json();

    // check if sign-up was successful
    if (responseJSON.status === 2) {
      signupStatus.innerHTML = `
        <div class="modal-status modal-status-success">
          Success! Your account has been created.
        </div>
      `;
      location.reload();
    } else {
      signupFieldset.removeAttribute("disabled");
      signupStatus.innerHTML = `
        <div class="modal-status modal-status-danger">
          Unable to create account! Please try again.
        </div>
      `;
    }
  });

  // handle sign-in form submission
  signinForm.addEventListener("submit", async (event) => {
    // cancel default action if possible
    event.preventDefault();

    // disable input while handling submission
    const signinFieldset = signinForm.querySelector("fieldset");
    signinFieldset.setAttribute("disabled", true);

    // render status message
    const signinStatus = signinForm.querySelector("#signin-status");
    signinStatus.innerHTML = `
      <div class="modal-status modal-status-info">
        Please wait! Attempting login.
      </div>
    `;

    // get data from frontend
    const formData = {
      user_login: signinForm.querySelector("#si-email").value,
      password: signinForm.querySelector("#si-password").value,
    };

    // send request to Rest API
    const response = await fetch(fblgstp_auth_rest.signin, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    // check if sign-in was successful
    const responseJSON = await response.json();
    if (responseJSON.status === 2) {
      signinStatus.innerHTML = `
        <div class="modal-status modal-status-success">
          Success! Your are logged in.
        </div>
      `;
      location.reload();
    } else {
      signinFieldset.removeAttribute("disabled");
      signinStatus.innerHTML = `
        <div class="modal-status modal-status-danger">
          Unable to login! Please try again.
        </div>
      `;
    }
  });
});
