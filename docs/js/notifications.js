document.addEventListener("DOMContentLoaded", async () => {

    if (!window.location.pathname.includes("notifications.html")) return;

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
        console.error("Ошибка загрузки:", error);
        return;
    }

    if (data) {
        document.getElementById("notifyUpdates").checked = data.notifyupdates || false;
        document.getElementById("notifySecurity").checked = data.notifysecurity || false;
        document.getElementById("notifyNews").checked = data.notifynews || false;
        document.getElementById("notifyMarketing").checked = data.notifymarketing || false;
    }

    const saveButton = document.getElementById("saveNotifications");

    if (!saveButton) return;

    saveButton.addEventListener("click", async () => {

        const settings = {
            notifyupdates: document.getElementById("notifyUpdates").checked,
            notifysecurity: document.getElementById("notifySecurity").checked,
            notifynews: document.getElementById("notifyNews").checked,
            notifymarketing: document.getElementById("notifyMarketing").checked
        };

        const { error } = await supabaseClient
            .from("users")
            .update(settings)
            .eq("email", user.email);

        if (error) {
            console.error(error);
            alert("Ошибка сохранения");
        } else {

            const message = document.getElementById("saveMessage");

            message.textContent = "Saved";
            message.style.opacity = "1";

            setTimeout(() => {
                message.style.opacity = "0";
            }, 2000);
        }

    });

});