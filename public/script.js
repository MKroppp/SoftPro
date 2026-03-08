const supabaseUrl = "https://gkrqbityqsceivoakjqg.supabase.co";
const supabaseKey = "sb_publishable_NmdFQqEWAyJ8B7l7H4rJYQ_1JyVdO8g";

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", function () {

    const user = JSON.parse(localStorage.getItem("user"));
    const accountButton = document.querySelector(".account-button");
    const logoutButton = document.querySelector(".logout-button");
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

    const checkboxes = [
        "notifyUpdates",
        "notifySecurity",
        "notifyNews",
        "notifyMarketing"
    ];
    const saveButton = document.getElementById("saveNotifications");

    checkboxes.forEach(id => {
        const checkbox = document.getElementById(id);
        if (checkbox) {
            const savedValue = localStorage.getItem(id);
            checkbox.checked = savedValue === "true";
        }
    });

    if (saveButton) {
        saveButton.addEventListener("click", () => {
            checkboxes.forEach(id => {
                const checkbox = document.getElementById(id);
                if (checkbox) {
                    localStorage.setItem(id, checkbox.checked);
                }
            });

            const message = document.getElementById("saveMessage");
            if (message) {
                message.textContent = "Saved";
                message.style.opacity = "1";
                setTimeout(() => {
                    message.style.opacity = "0";
                }, 2000);
            }
        });
    }

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


async function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    const data = parseJwt(response.credential);
    console.log(data);
    localStorage.setItem("user", JSON.stringify(data));

    const { error } = await supabaseClient
        .from("users")
        .upsert([
            {
                name: data.name,
                email: data.email
            }],{ onConflict: "email" });
    if (error) {
        console.error("Supabase insert error:", error);
        alert("Ошибка при сохранении в базу!");
    } else {
        console.log("User saved to Supabase!");
        alert("Welcome " + data.name);
        window.location.href = "profile.html";
    }
}

function parseJwt(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
    

document.addEventListener("DOMContentLoaded", async () => {
    if (!window.location.pathname.includes("profile.html")) return;
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        window.location.href = "login.html";
        return;
    }
    const { data, error } = await supabaseClient
        .from("users")
        .select("*")
        .eq("email", user.email)
        .single();
    if (error) {
        console.error("Ошибка при загрузке профиля:", error);
    } else if (data) {
        document.getElementById("name").value = data.name || "";
        document.getElementById("surname").value = data.surname || "";
        document.getElementById("email").value = data.email || "";
        document.getElementById("phonenumber").value = data.phonenumber || "";
    }
    const saveButton = document.getElementById("saveProfileInfo");
    saveButton.addEventListener("click", async () => {
        const updatedData = {
            name: document.getElementById("name").value,
            surname: document.getElementById("surname").value,
            phonenumber: document.getElementById("phonenumber").value
        };

        const { error } = await supabaseClient
            .from("users")
            .update(updatedData)
            .eq("email", user.email);

        if (error) {
            alert("Ошибка при сохранении данных!");
            console.error(error);
        } else {
            alert("Данные успешно обновлены!");
        }
    });
});

