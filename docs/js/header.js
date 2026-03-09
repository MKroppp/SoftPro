document.addEventListener("DOMContentLoaded", function () {

    const user = JSON.parse(localStorage.getItem("user"));
    const accountButton = document.querySelector(".account-button");
    const logoutButton = document.querySelector(".logout-button");

    if (!accountButton) return;

    if (user) {

        accountButton.innerText = user.name;
        logoutButton.style.display = "inline-block";

        accountButton.addEventListener("click", () => {
            window.location.href = "profile.html";
        });

        logoutButton.addEventListener("click", () => {
            localStorage.removeItem("user");
            window.location.href = "index.html";
        });

    } else {

        accountButton.addEventListener("click", () => {
            window.location.href = "login.html";
        });

    }
});