document.addEventListener("DOMContentLoaded", function () {

    const user = JSON.parse(localStorage.getItem("user"));
    const accountButton = document.querySelector(".account-button");
    const logoutButton = document.querySelector(".logout-button");
    if (user) {
        // Показываем имя
        accountButton.innerText = user.name;

        // Показываем кнопку выхода
        logoutButton.style.display = "inline-block";

        // Переход на профиль
        accountButton.addEventListener("click", () => {
            window.location.href = "profile.html";
        });

        // Выход
        logoutButton.addEventListener("click", () => {
            localStorage.removeItem("user");
            window.location.href = "index.html";
        });

    } else {
        // Если не авторизован
        accountButton.addEventListener("click", () => {
            window.location.href = "login.html";
        });
    }

    const checkboxes = [
        "notifyUpdates",
        "notifySecurity",
        "notifyNews",
        "notifyMarketing"
    ];
    const saveButton = document.getElementById("saveNotifications");
    checkboxes.forEach(id => {
        const savedValue = localStorage.getItem(id);
        if (savedValue === "true") {
            document.getElementById(id).checked = true;
        }
    });
    if (saveButton) {
        saveButton.addEventListener("click", () => {
            checkboxes.forEach(id => {
                const isChecked = document.getElementById(id).checked;
                localStorage.setItem(id, isChecked);
            });
        });
    }

    saveButton.addEventListener("click", () => {
    checkboxes.forEach(id => {
        const checkbox = document.getElementById(id);
        localStorage.setItem(id, checkbox.checked);
    });

    const message = document.getElementById("saveMessage");
    message.textContent = "Saved!";
    message.style.opacity = "1";

    setTimeout(() => {
        message.style.opacity = "0";
    }, 2000);
    });

    var accordions = document.querySelectorAll(".accordion");
    accordions.forEach(function (acc) {
        var header = acc.querySelector(".accordion-header");
        var panel = acc.querySelector(".accordion-panel");
        header.addEventListener("click", function () {
            acc.classList.toggle("active");
            if (acc.classList.contains("active")) {
                panel.style.maxHeight = panel.scrollHeight + "px";
                panel.classList.add("active");
            } else {
                panel.style.maxHeight = "0";
                panel.classList.remove("active");
            }
        });
    });

    var menuButton = document.getElementById('menuButton');
    var menu = document.getElementById('menu');

    menuButton.addEventListener('click', function () {
        menu.classList.toggle('show-menu');
    });

    $(document).ready(function () {
        $('.image-carousel').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 2000,
            arrows: true,
            dots: true,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    });

    var showFormButton = document.getElementById("purchaseButton");
    var purchaseForm = document.getElementById("purchaseForm");
    var purchaseFormContent = document.getElementById("purchaseFormContent");

    showFormButton.addEventListener("click", function () {
        purchaseForm.style.display = "block";
    });

    purchaseForm.addEventListener("click", function (event) {
        if (event.target === purchaseForm) {
            purchaseForm.style.display = "none";
        }
    });
});


function handleCredentialResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);

        // Декодируем JWT чтобы получить данные пользователя
        const data = parseJwt(response.credential);

        console.log(data);

        alert("Welcome " + data.name);

        // Можно сохранить пользователя
        localStorage.setItem("user", JSON.stringify(data));

        // Перенаправление
        window.location.href = "index.html";
    }

    function parseJwt(token) {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }
