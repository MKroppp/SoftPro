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

});