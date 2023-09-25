window.setTimeout(() => {
    if (!route.includes("contact")) return;

    const send_form: HTMLFormElement = document.querySelector("#send_form");
    send_form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!firebase.auth().currentUser) {
            createPopup(
                "Wiadomość mail nie została wysłana! Zarejestruj się lub zaloguj aby mieć dostęp do wysyłania wiadomości mail"
            );
            return
        }
        if (firebase.auth().currentUser.emailVerified == true) {
            sendMail();
        } else {
            createPopup(
                "Wiadomość mail nie została wysłana! Zweryfikuj swój mail aby mieć dostęp do wysyłania wiadomości mail"
            );
        }
    });
}, 250);

function sendMail() {
    var cookieData = document.cookie.split(";").map((c) => c.trim());
    for (var i = 0; i < cookieData.length; i++) {
        if (cookieData[i].startsWith("sessionData=")) {
            var sessionData = JSON.parse(cookieData[i].split("=")[1]);
            if (sessionData) {
                const send_email: string = sessionData.email;
                const send_title: HTMLInputElement =
                    document.querySelector("#send_title");
                const send_message: HTMLInputElement =
                    document.querySelector("#send_message");

                sendToDatabase(send_email, send_title, send_message);
            }
        }
    }
}

function sendToDatabase(email: string, send_title: any, send_message: any) {
    var database_ref = firebase.database().ref();
    var user_data = {
        email: email,
        message: send_message.value,
        title: send_title.value,
    };

    const id = Math.floor(Math.random() * 999999);

    database_ref.child("mails/" + id).set(user_data);
    createPopup("Pomyślnie wysłałeś wiadomość mail!");
    send_message.value = "";
    send_title.value = "";
}
