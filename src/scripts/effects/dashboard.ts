let emailsDisplayed = false; // Zmienna globalna

function dashboard_show_emails() {
    if (!route.includes("dashboard") || emailsDisplayed) return; // Sprawdzamy, czy maile zostały już wyświetlone

    const dashboard_panel = document.querySelector("#panel");

    if (dashboard_panel.children[2].classList.contains("active")) {
        const d_mails = document.querySelector(".d_mails");

        firebase
            .database()
            .ref("mails")
            .once("value", function (snapshot: any) {
                snapshot.forEach(function (childSnapshot: any) {
                    let childData = childSnapshot.val();
                    let childKey = childSnapshot.key;

                    const mail = document.createElement("div");

                    mail.classList.add("d_mail");
                    mail.innerHTML = `<div class="trash"><button onclick="deleteMail(${childKey})"><i class="fas fa-trash-alt"></i></button></div><h3>${childData.title} | ${childData.email}</h3><p>${childData.message}</p>`;

                    d_mails.appendChild(mail);
                });
            });

        emailsDisplayed = true; // Ustawiamy flagę na true, żeby uniknąć wielokrotnego wywołania
    }
}

function dashboard_show_stats() {
    if (!route.includes("dashboard")) return;

    const dashboard_panel = document.querySelector("#panel");

    if (dashboard_panel.children[0].classList.contains("active")) {
        const created_accounts = document.querySelector("#created_accounts");
        const sended_mails = document.querySelector("#sended_mails");
        const created_items = document.querySelector("#created_items");
        const created_articles = document.querySelector("#created_articles");

        firebase
            .database()
            .ref("mails/")
            .once("value", function (snapshot: any) {
                sended_mails.textContent = snapshot.numChildren();
            });
        firebase
            .database()
            .ref("users/")
            .once("value", function (snapshot: any) {
                created_accounts.textContent = snapshot.numChildren();
            });
        firebase
            .database()
            .ref("items/")
            .once("value", function (snapshot: any) {
                created_items.textContent = snapshot.numChildren();
            });
        firebase
        .database()
        .ref("articles/")
        .once("value", function (snapshot: any) {
            created_articles.textContent = snapshot.numChildren();
        });
    }
}
