
/* =====================================================
   DRIVE EASE - CAR RENTAL MANAGEMENT SYSTEM
   Main JavaScript
===================================================== */


/* =====================================================
   MOBILE MENU
===================================================== */

const menuBtn = document.querySelector(".menu-btn");
const navMenu = document.querySelector(".nav-menu");

if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", function () {

        navMenu.classList.toggle("mobile-active");

        const icon = menuBtn.querySelector("i");

        if (navMenu.classList.contains("mobile-active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

    });

}


/* =====================================================
   CLOSE MOBILE MENU WHEN LINK IS CLICKED
===================================================== */

const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        if (navMenu) {
            navMenu.classList.remove("mobile-active");
        }

        if (menuBtn) {
            const icon = menuBtn.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        }

    });

});


/* =====================================================
   BOOKING FORM
===================================================== */

const bookingForm = document.querySelector(".booking-form");

if (bookingForm) {

    bookingForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const location =
            bookingForm.querySelector("select");

        const pickupDate =
            bookingForm.querySelectorAll("input[type='date']")[0];

        const returnDate =
            bookingForm.querySelectorAll("input[type='date']")[1];


        /* Check Location */

        if (!location || location.value === "Select Location") {

            alert("Please select your pick-up location.");

            return;
        }


        /* Check Pickup Date */

        if (!pickupDate || pickupDate.value === "") {

            alert("Please select your pick-up date.");

            return;
        }


        /* Check Return Date */

        if (!returnDate || returnDate.value === "") {

            alert("Please select your return date.");

            return;
        }


        /* Date Validation */

        const pickup =
            new Date(pickupDate.value);

        const returnDay =
            new Date(returnDate.value);


        if (returnDay < pickup) {

            alert(
                "Return date cannot be earlier than pick-up date."
            );

            return;
        }


        /* Successful Search */

        alert(
            "Cars found!\n\n" +
            "Location: " + location.value + "\n" +
            "Pick-up: " + pickupDate.value + "\n" +
            "Return: " + returnDate.value
        );


        /*
            Later we will replace this alert
            with actual car search functionality.
        */

    });

}


/* =====================================================
   SET MINIMUM DATE FOR BOOKING
===================================================== */

const today = new Date();

const year = today.getFullYear();

const month =
    String(today.getMonth() + 1).padStart(2, "0");

const day =
    String(today.getDate()).padStart(2, "0");

const todayDate =
    `${year}-${month}-${day}`;


const pickupInput =
    document.querySelector(
        ".booking-form input[type='date']"
    );

const returnInput =
    document.querySelectorAll(
        ".booking-form input[type='date']"
    )[1];


if (pickupInput) {

    pickupInput.min = todayDate;

}


if (returnInput) {

    returnInput.min = todayDate;

}


/* =====================================================
   UPDATE RETURN DATE
   WHEN PICKUP DATE CHANGES
===================================================== */

if (pickupInput && returnInput) {

    pickupInput.addEventListener("change", function () {

        returnInput.min = pickupInput.value;

        if (
            returnInput.value &&
            returnInput.value < pickupInput.value
        ) {

            returnInput.value = pickupInput.value;

        }

    });

}


/* =====================================================
   RENT NOW BUTTONS
===================================================== */

const rentButtons =
    document.querySelectorAll(".rent-btn");


rentButtons.forEach(function (button) {

    button.addEventListener("click", function (event) {

        /*
            The buttons currently navigate
            to car-details.html.

            Later we can store the selected
            car information in localStorage.
        */

        const card =
            button.closest(".car-card");

        if (!card) {
            return;
        }


        const carName =
            card.querySelector("h3");

        const price =
            card.querySelector(".price strong");


        if (carName && price) {

            const selectedCar = {

                name: carName.textContent,

                price: price.textContent

            };


            localStorage.setItem(
                "selectedCar",
                JSON.stringify(selectedCar)
            );

        }

    });

});


/* =====================================================
   SMOOTH SCROLL
===================================================== */

const smoothLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


smoothLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId =
            link.getAttribute("href");

        if (
            targetId &&
            targetId !== "#"
        ) {

            const target =
                document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }

    });

});


/* =====================================================
   NAVBAR SHADOW ON SCROLL
===================================================== */

const header =
    document.querySelector(".header");


window.addEventListener("scroll", function () {

    if (!header) {
        return;
    }

    if (window.scrollY > 20) {

        header.style.boxShadow =
            "0 5px 20px rgba(0,0,0,0.08)";

    } else {

        header.style.boxShadow = "none";

    }

});


/* =====================================================
   FEATURED CAR HOVER EFFECT
===================================================== */

const carCards =
    document.querySelectorAll(".car-card");


carCards.forEach(function (card) {

    card.addEventListener("mouseenter", function () {

        card.style.cursor = "pointer";

    });

});


/* =====================================================
   CURRENT YEAR
===================================================== */

const footerYear =
    document.querySelector(".footer-bottom p");


if (footerYear) {

    footerYear.innerHTML =
        `© ${new Date().getFullYear()} DriveEase. All Rights Reserved.`;

}


/* =====================================================
   PAGE LOAD MESSAGE
===================================================== */

console.log(
    "DriveEase Car Rental System loaded successfully."
);


/* ================= LOGIN POPUP FUNCTIONALITY ================= */

const loginModal = document.getElementById("loginModal");
const signupModal = document.getElementById("signupModal");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

let pendingDestination = "";

function openLogin(destination = "") {
    pendingDestination = destination;
    signupModal.classList.remove("show");
    loginModal.classList.add("show");
    document.body.classList.add("modal-open");
}

function openSignup() {
    loginModal.classList.remove("show");
    signupModal.classList.add("show");
    document.body.classList.add("modal-open");
}

function closeAuth() {
    loginModal.classList.remove("show");
    signupModal.classList.remove("show");
    document.body.classList.remove("modal-open");
}

function continueAfterLogin() {
    sessionStorage.setItem("driveEaseLoggedIn", "true");

    const destination = pendingDestination;
    pendingDestination = "";

    closeAuth();

    if (destination) {
        window.location.href = destination;
    } else {
        alert("Login successful! Welcome to DriveEase.");
    }
}

/* Login button and protected links */
document.addEventListener("click", function (event) {
    const link = event.target.closest("a");

    if (!link) return;

    const isLoginButton = link.classList.contains("login-btn");
    const isContactLink = link.getAttribute("href") === "contact.html";
    const isRentLink = link.getAttribute("href") === "car-details.html";
    const isProtected = link.hasAttribute("data-auth-required");

    if (!isLoginButton && !isContactLink && !isRentLink && !isProtected) {
        return;
    }

    if (sessionStorage.getItem("driveEaseLoggedIn") === "true") {
        if (isLoginButton) {
            event.preventDefault();
            alert("You are already logged in.");
        }
        return;
    }

    event.preventDefault();

    const destination = isLoginButton ? "" : link.getAttribute("href");
    openLogin(destination);
});

/* Close buttons */
document.getElementById("closeLogin").addEventListener("click", closeAuth);
document.getElementById("closeSignup").addEventListener("click", closeAuth);

/* Switch between login and signup */
document.getElementById("showSignup").addEventListener("click", openSignup);

document.getElementById("showLogin").addEventListener("click", function () {
    signupModal.classList.remove("show");
    loginModal.classList.add("show");
});

/* Close popup by clicking outside the card */
[loginModal, signupModal].forEach(function (modal) {
    modal.addEventListener("click", function (event) {
        if (event.target === modal) closeAuth();
    });
});

/* Close popup with Escape key */
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeAuth();
});

/* Demo login */
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    document.getElementById("loginMessage").textContent = "";
    continueAfterLogin();
});

/* Demo signup */
signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    document.getElementById("signupMessage").textContent = "";
    continueAfterLogin();
});
