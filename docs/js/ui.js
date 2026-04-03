document.addEventListener("DOMContentLoaded", function () {

    var accordions = document.querySelectorAll(".accordion");

    accordions.forEach(function (acc) {

        var header = acc.querySelector(".accordion-header");
        var panel = acc.querySelector(".accordion-panel");

        header.addEventListener("click", function () {

            acc.classList.toggle("active");

            if (acc.classList.contains("active")) {
                panel.style.maxHeight = panel.scrollHeight + "px";
            } else {
                panel.style.maxHeight = "0";
            }
        });
    });

    var menuButton = document.getElementById("menuButton");
    var menu = document.getElementById("menu");

    if (menuButton) {
        menuButton.addEventListener("click", function () {
            menu.classList.toggle("show-menu");
        });
    }

    $(document).ready(function () {
        $('.image-carousel').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            dots: true
        });
    });

    const purchaseBtn = document.getElementById("purchaseButton");
const overlay = document.getElementById("overlay");
const closeModal = document.getElementById("closeModal");

purchaseBtn.addEventListener("click", () => {
    overlay.style.display = "flex";
});

closeModal.addEventListener("click", () => {
    overlay.style.display = "none";
});

// закрытие по клику вне окна
overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
        overlay.style.display = "none";
    }
});

});

