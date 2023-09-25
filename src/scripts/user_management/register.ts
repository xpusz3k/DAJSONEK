function register() {
    let reg_email: HTMLInputElement = document.querySelector("#reg_email");
    let reg_password: HTMLInputElement =
        document.querySelector("#reg_password");

    firebase.auth().createUserWithEmailAndPassword(reg_email.value, reg_password.value).then(async function () {
            var user = firebase.auth().currentUser;
            var database_ref = firebase.database().ref();
            var user_data = {
                email: reg_email.value,
                password: reg_password.value,
            };

            await database_ref.child("users/" + user.uid).set(user_data);
            firebase.auth().signInWithEmailAndPassword(user_data.email, user_data.password).then(function (user: any) {});
            firebase.auth().onAuthStateChanged(function (use: any) {
                if (user) {
                    let userId = firebase.auth().currentUser.uid;
                    firebase
                        .database()
                        .ref("users/" + userId)
                        .once("value")
                        .then(async function (snapshot: any) {
                            const email = snapshot.val().email;
                            document.cookie =
                                "sessionData=" +
                                JSON.stringify({ email: email }) +
                                ";max-age=3600";
                            createPopup(
                                `Pomyślnie zostałeś zarejestrowany jako ${email}! Na podany email została wysłana wiadomość z potwierdzeniem.`
                            );
                            await firebase
                            .auth()
                            .currentUser.sendEmailVerification()
                            .then(() => {
                                // E-mail został wysłany pomyślnie
                                console.log("Wysłano e-mail weryfikacyjny");
                                toSite('dashboard')
                                })
                                .catch((error: any) => {
                                    // Wystąpił błąd podczas wysyłania e-maila
                                    console.error(error);
                                });
                        });
                }
            });
        })
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
            } else if (error.code === "auth/weak-password") {
                createPopup("Podane hasło jest zbyt proste do odgadnięcia");
                return;
            } else if (error.code === "auth/email-already-in-use") {
                createPopup(
                    "Wybrany użytkownik został już zarejestrowany, spróbuj się zalogować lub utwórz nowe konto"
                );
                return;
            } else {
                createPopup("Wystąpił błąd podczas logowania");
                console.error(error);
            }
            console.log(error);
        });
}
