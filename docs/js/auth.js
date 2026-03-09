function parseJwt(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

async function handleCredentialResponse(response) {

    const data = parseJwt(response.credential);

    localStorage.setItem("user", JSON.stringify(data));

    const { error } = await supabaseClient
        .from("users")
        .upsert([
            {
                name: data.name,
                email: data.email
            }
        ], { onConflict: "email" });

    if (error) {
        console.error("Supabase insert error:", error);
        alert("Ошибка при сохранении в базу!");
    } else {
        alert("Welcome " + data.name);
        window.location.href = "profile.html";
    }
}