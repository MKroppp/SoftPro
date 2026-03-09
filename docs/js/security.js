document.addEventListener("DOMContentLoaded", () => {

    if (!window.location.pathname.includes("security.html")) return;

    const button = document.getElementById("changePasswordButton");

    button.addEventListener("click", async () => {

        const newPassword = document.getElementById("newPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const message = document.getElementById("passwordMessage");

        if (newPassword !== confirmPassword) {
            message.textContent = "Passwords do not match";
            message.style.opacity = "1";
            return;
        }

        const { error } = await supabaseClient.auth.updateUser({
            password: newPassword
        });

        if (error) {
            console.error(error);
            message.textContent = "Error changing password";
        } else {
            message.textContent = "Password updated";
        }

        message.style.opacity = "1";

        setTimeout(() => {
            message.style.opacity = "0";
        }, 2000);

    });

});