async function login() {
    let log_email: HTMLInputElement = document.querySelector("#log_email");
    let log_password: HTMLInputElement =
        document.querySelector("#log_password");

    await firebase
        .auth()
        .signInWithEmailAndPassword(log_email.value, log_password.value)
        .then(function (user: any) {})
        .catch(function (error: any) {
            if (error.code === "auth/wrong-password") {
                createPopup("Złe hasło");
                return;
            } else if (error.code === "auth/invalid-email") {
                createPopup("Zły email");
                return;
            } else if (error.code === "auth/user-not-found") {
                createPopup("Użytkownik nie został znaleziony");
                return;
            } else {
                createPopup("Wystąpił błąd podczas logowania");
                console.error(error);
            }
            console.log(error);
        });
    await firebase.auth().onAuthStateChanged(async function (use: any) {
        var user = firebase.auth().currentUser;
        if (user) {
            let userId = firebase.auth().currentUser.uid;
            await firebase
                .database()
                .ref("users/" + userId)
                .once("value")
                .then(function (snapshot: any) {
                    const email = snapshot.val().email;
                    document.cookie =
                        "sessionData=" +
                        JSON.stringify({ email: email }) +
                        ";max-age=3600";
                    if (firebase.auth().currentUser.emailVerified == false) {
                        createPopup(
                            `Pomyślnie zostałeś zalogowany jako ${email} (Nie potwierdzono)`
                        );
                    } else {
                        createPopup(
                            `Pomyślnie zostałeś zalogowany jako ${email}`
                        );
                    }
                    toSite('')
                });
        }
    });
}
