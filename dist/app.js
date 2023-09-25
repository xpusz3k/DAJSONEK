var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function toSite(site) {
    window.location.search = site;
}
const routes = window.location.search.substring(1).split('?');
const route = window.location.search.substring(1);
if (routes[0] != "") {
    fetch(`./src/routes/${routes[0]}.html`)
        .then(function (response) {
        if (!response.ok) {
            window.location.search = "";
        }
        return response.text();
    })
        .then(function (html) {
        document.body.innerHTML = html;
        document.title += ` | ${routes[0]}`;
    });
}
function showShopPopup() {
    const d_edit_shop_add_popup = document.querySelector(".d_edit_shop_add_popup");
    d_edit_shop_add_popup.classList.toggle("show");
    const d_edit_shop_del_popup = document.querySelector(".d_edit_shop_del_popup");
    d_edit_shop_del_popup.classList.toggle("show");
}
function showArticlePopup() {
    const d_edit_articles_add_popup = document.querySelector(".d_edit_articles_add_popup");
    d_edit_articles_add_popup.classList.toggle("show");
    const d_edit_articles_del_popup = document.querySelector(".d_edit_articles_del_popup");
    d_edit_articles_del_popup.classList.toggle("show");
}
function addItem() {
    const item_name = document.querySelector("#item_name");
    const item_cost = document.querySelector("#item_cost");
    const item_url = document.querySelector("#item_url");
    var database_ref = firebase.database().ref();
    var user_data = {
        name: item_name.value,
        cost: item_cost.value,
        url: item_url.value,
    };
    const id = Math.floor(Math.random() * 999999);
    database_ref.child("items/" + id).set(user_data);
    createPopup(`Pomyślnie utworzyłeś przedmiot o nazwie "${item_name.value}" oraz cenie "${item_cost.value} PLN"`);
    item_name.value = "";
    item_cost.value = "";
    item_url.value = "";
}
function addArticle() {
    const article_name = document.querySelector("#article_name");
    const article_text = document.querySelector("#article_text");
    const article_image = document.querySelector("#article_image");
    var database_ref = firebase.database().ref();
    var user_data = {
        h: article_name.value,
        p: article_text.value,
        url: article_image.value,
    };
    const id = Math.floor(Math.random() * 999999);
    database_ref.child(`articles/${id}/`).set(user_data);
    createPopup(`Pomyślnie utworzyłeś artykuł o id ${id}`);
    article_name.value = "";
    article_text.value = "";
    article_image.value = "";
}
function delArticle() {
    const article_id = document.querySelector("#article_id");
    firebase.database().ref(`articles/${article_id.value}`).once("value", function (snapshot) {
        if (!snapshot.exists()) {
            createPopup("Wskazany artykuł nie został jeszcze utworzony");
            return;
        }
        firebase.database().ref(`articles/${article_id.value}`).remove();
        createPopup(`Pomyślnie usunąłeś artykuł o ID "${article_id.value}"`);
        article_id.value = "";
    });
}
function delItem() {
    const item_name = document.querySelector("#item_del_name");
    firebase
        .database()
        .ref("items")
        .once("value", function (snapshot) {
        if (!snapshot.exists()) {
            createPopup("Wskazany przedmiot nie został jeszcze utworzony");
            return;
        }
        snapshot.forEach(function (childSnapshot) {
            let childData = childSnapshot.val();
            let childKey = childSnapshot.key;
            if (childData.name == item_name.value) {
                firebase
                    .database()
                    .ref("items/" + childKey)
                    .remove();
                createPopup(`Pomyślnie usunąłeś przedmiot o nazwie "${item_name.value}"`);
                item_name.value = "";
            }
            else {
                createPopup("Wskazany przedmiot nie został jeszcze utworzony");
            }
        });
    });
}
function panel(panel) {
    const dashboard_panel = document.querySelector("#panel");
    if (panel == "stats") {
        reset_actives();
        dashboard_panel.children[0].classList.add("active");
    }
    if (panel == "edit") {
        reset_actives();
        dashboard_panel.children[1].classList.add("active");
    }
    if (panel == "mails") {
        reset_actives();
        dashboard_panel.children[2].classList.add("active");
    }
}
window.setInterval(() => {
    if (!route.includes("dashboard"))
        return;
    const dashboard_panel = document.querySelector("#panel");
    if (!dashboard_panel.children[0].classList.contains("active")) {
        const selected = document.querySelector(".d_stats");
        selected.classList.remove("show");
    }
    if (!dashboard_panel.children[1].classList.contains("active")) {
        const selected = document.querySelector(".d_edits");
        selected.classList.remove("show");
    }
    if (!dashboard_panel.children[2].classList.contains("active")) {
        const selected = document.querySelector(".d_mails");
        selected.classList.remove("show");
    }
}, 100);
window.setInterval(() => {
    if (!route.includes("dashboard"))
        return;
    const dashboard_panel = document.querySelector("#panel");
    if (dashboard_panel.children[0].classList.contains("active")) {
        const selected = document.querySelector(".d_stats");
        selected.classList.add("show");
        dashboard_show_stats();
    }
    if (dashboard_panel.children[1].classList.contains("active")) {
        const selected = document.querySelector(".d_edits");
        selected.classList.add("show");
        dashboard_show_stats();
    }
    if (dashboard_panel.children[2].classList.contains("active")) {
        const selected = document.querySelector(".d_mails");
        selected.classList.add("show");
        dashboard_show_emails();
    }
}, 100);
function reset_actives() {
    const dashboard_panel = document.querySelector("#panel");
    for (let i = 0; i < dashboard_panel.childElementCount; i++) {
        dashboard_panel.children[i].classList.remove("active");
    }
}
window.setTimeout(() => {
    if (routes[1] != undefined) {
        const articleID = routes[1].substring(3);
        const article_preview = document.querySelector('.article_preview');
        firebase.database().ref(`articles/${articleID}`).once("value", function (snapshot) {
            if (!snapshot.exists()) {
                window.location.search = routes[0];
                return;
            }
            else {
                article_preview.classList.add('show');
                const article_heading = document.querySelector('.article_heading');
                firebase.database().ref(`articles/${articleID}`).once("value", function (snapshot) {
                    article_heading.children[0].textContent = snapshot.val().h;
                    article_heading.children[1].src = snapshot.val().url;
                    article_heading.children[2].textContent = snapshot.val().p;
                });
            }
        });
    }
}, 250);
window.setTimeout(() => {
    if (routes[0] == 'article' && routes[1] == undefined) {
        firebase.database().ref('articles/').once("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                let childData = childSnapshot.val();
                let childKey = childSnapshot.key;
                const article = document.createElement("div");
                article.classList.add("article");
                article.addEventListener('click', () => {
                    toSite(`article?id=${childKey}`);
                });
                article.innerHTML = `<div class="img"><img src="${childData.url}" alt=""></div><h3>${childData.h}</h3>`;
                const articles = document.querySelector(".article_list");
                articles.appendChild(article);
            });
        });
    }
});
window.setTimeout(() => {
    if (!route.includes("contact"))
        return;
    const send_form = document.querySelector("#send_form");
    send_form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (!firebase.auth().currentUser) {
            createPopup("Wiadomość mail nie została wysłana! Zarejestruj się lub zaloguj aby mieć dostęp do wysyłania wiadomości mail");
            return;
        }
        if (firebase.auth().currentUser.emailVerified == true) {
            sendMail();
        }
        else {
            createPopup("Wiadomość mail nie została wysłana! Zweryfikuj swój mail aby mieć dostęp do wysyłania wiadomości mail");
        }
    });
}, 250);
function sendMail() {
    var cookieData = document.cookie.split(";").map((c) => c.trim());
    for (var i = 0; i < cookieData.length; i++) {
        if (cookieData[i].startsWith("sessionData=")) {
            var sessionData = JSON.parse(cookieData[i].split("=")[1]);
            if (sessionData) {
                const send_email = sessionData.email;
                const send_title = document.querySelector("#send_title");
                const send_message = document.querySelector("#send_message");
                sendToDatabase(send_email, send_title, send_message);
            }
        }
    }
}
function sendToDatabase(email, send_title, send_message) {
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
let emailsDisplayed = false;
function dashboard_show_emails() {
    if (!route.includes("dashboard") || emailsDisplayed)
        return;
    const dashboard_panel = document.querySelector("#panel");
    if (dashboard_panel.children[2].classList.contains("active")) {
        const d_mails = document.querySelector(".d_mails");
        firebase
            .database()
            .ref("mails")
            .once("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                let childData = childSnapshot.val();
                let childKey = childSnapshot.key;
                const mail = document.createElement("div");
                mail.classList.add("d_mail");
                mail.innerHTML = `<div class="trash"><button onclick="deleteMail(${childKey})"><i class="fas fa-trash-alt"></i></button></div><h3>${childData.title} | ${childData.email}</h3><p>${childData.message}</p>`;
                d_mails.appendChild(mail);
            });
        });
        emailsDisplayed = true;
    }
}
function dashboard_show_stats() {
    if (!route.includes("dashboard"))
        return;
    const dashboard_panel = document.querySelector("#panel");
    if (dashboard_panel.children[0].classList.contains("active")) {
        const created_accounts = document.querySelector("#created_accounts");
        const sended_mails = document.querySelector("#sended_mails");
        const created_items = document.querySelector("#created_items");
        const created_articles = document.querySelector("#created_articles");
        firebase
            .database()
            .ref("mails/")
            .once("value", function (snapshot) {
            sended_mails.textContent = snapshot.numChildren();
        });
        firebase
            .database()
            .ref("users/")
            .once("value", function (snapshot) {
            created_accounts.textContent = snapshot.numChildren();
        });
        firebase
            .database()
            .ref("items/")
            .once("value", function (snapshot) {
            created_items.textContent = snapshot.numChildren();
        });
        firebase
            .database()
            .ref("articles/")
            .once("value", function (snapshot) {
            created_articles.textContent = snapshot.numChildren();
        });
    }
}
function createPopup(text) {
    if (document.querySelectorAll(".popup_info").length != 0)
        return;
    const popup = document.createElement("div");
    popup.classList.add("popup_info");
    popup.innerHTML = `<h4>INFORMACJA</h4><p>${text}</p>`;
    document.querySelector("section").appendChild(popup);
    window.setTimeout(() => {
        const created = document.querySelector(".popup_info");
        created.classList.add("active");
        window.setTimeout(() => {
            created.classList.remove("active");
            window.setTimeout(() => {
                created.remove();
            }, 500);
        }, 5 * 1000);
    }, 100);
}
let nav;
let nav_button;
window.setInterval(() => {
    nav = document.querySelector("nav");
    if (document.documentElement.scrollTop > 0) {
        nav.classList.add("scroll");
    }
    else {
        nav.classList.remove("scroll");
    }
    nav_button = document.querySelector(".menu");
}, 250);
window.setTimeout(() => {
    nav_button.addEventListener("click", () => {
        nav.classList.toggle("media");
    });
    var cookieData = document.cookie.split(";").map((c) => c.trim());
    for (var i = 0; i < cookieData.length; i++) {
        if (cookieData[i].startsWith("sessionData=")) {
            var sessionData = JSON.parse(cookieData[i].split("=")[1]);
            if (sessionData) {
                const logButton = document.querySelector("#logBtn");
                logButton.style.display = "none";
            }
        }
    }
}, 250);
window.setTimeout(() => {
    if (!route.includes("shop"))
        return;
    firebase
        .database()
        .ref("items/")
        .once("value", function (snapshot) {
        firebase
            .database()
            .ref("items")
            .once("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                let childData = childSnapshot.val();
                const item = document.createElement("div");
                item.classList.add("box");
                item.innerHTML = `<div class="top"><h3>${childData.name}</h3></div><div class="cost"><h4>${childData.cost} PLN</h4></div><div class="buy"><button onclick="toUrl('${childData.url}')">PRZEJDŹ DO ZAKUPU <i class="fas fa-arrow-right"></i></button></div>`;
                const items = document.querySelector(".boxes");
                items.appendChild(item);
            });
        });
    });
}, 250);
function toUrl(url) {
    window.open(`${url}`, "_blank");
}
function deleteMail(mail) {
    firebase
        .database()
        .ref("mails/" + mail)
        .remove();
    createPopup(`Pomyślnie usunąłeś wiadomość mail o ID ${mail}`);
    window.location.reload();
}
function reloadMails() {
    const d_mails = document.querySelector(".d_mails");
    for (let i = 0; i < d_mails.childElementCount; i++) {
        d_mails.children[i].remove();
    }
    dashboard_show_emails();
}
window.setInterval(() => {
    if (route.includes("dashboard.html")) {
        var cookieData = document.cookie.split(";").map((c) => c.trim());
        for (var i = 0; i < cookieData.length; i++) {
            if (cookieData[i].startsWith("sessionData=")) {
                var sessionData = JSON.parse(cookieData[i].split("=")[1]);
                if (sessionData) {
                    if (sessionData.email != "kacperbielinski17@gmail.com") {
                        if (sessionData.email != "kontakt.dajsonek@gmail.com") {
                            toSite("");
                        }
                    }
                }
            }
            else {
                toSite("");
            }
        }
    }
}, 250);
window.setTimeout(() => {
    if (!route.includes("register"))
        return;
    const reg_form = document.querySelector("#reg_form");
    reg_form.addEventListener("submit", function (event) {
        event.preventDefault();
        register();
    });
}, 250);
window.setTimeout(() => {
    if (!route.includes("login"))
        return;
    const log_form = document.querySelector("#log_form");
    log_form.addEventListener("submit", function (event) {
        event.preventDefault();
        login();
    });
}, 250);
function login() {
    return __awaiter(this, void 0, void 0, function* () {
        let log_email = document.querySelector("#log_email");
        let log_password = document.querySelector("#log_password");
        yield firebase
            .auth()
            .signInWithEmailAndPassword(log_email.value, log_password.value)
            .then(function (user) { })
            .catch(function (error) {
            if (error.code === "auth/wrong-password") {
                createPopup("Złe hasło");
                return;
            }
            else if (error.code === "auth/invalid-email") {
                createPopup("Zły email");
                return;
            }
            else if (error.code === "auth/user-not-found") {
                createPopup("Użytkownik nie został znaleziony");
                return;
            }
            else {
                createPopup("Wystąpił błąd podczas logowania");
                console.error(error);
            }
            console.log(error);
        });
        yield firebase.auth().onAuthStateChanged(function (use) {
            return __awaiter(this, void 0, void 0, function* () {
                var user = firebase.auth().currentUser;
                if (user) {
                    let userId = firebase.auth().currentUser.uid;
                    yield firebase
                        .database()
                        .ref("users/" + userId)
                        .once("value")
                        .then(function (snapshot) {
                        const email = snapshot.val().email;
                        document.cookie =
                            "sessionData=" +
                                JSON.stringify({ email: email }) +
                                ";max-age=3600";
                        if (firebase.auth().currentUser.emailVerified == false) {
                            createPopup(`Pomyślnie zostałeś zalogowany jako ${email} (Nie potwierdzono)`);
                        }
                        else {
                            createPopup(`Pomyślnie zostałeś zalogowany jako ${email}`);
                        }
                        toSite('');
                    });
                }
            });
        });
    });
}
function register() {
    let reg_email = document.querySelector("#reg_email");
    let reg_password = document.querySelector("#reg_password");
    firebase.auth().createUserWithEmailAndPassword(reg_email.value, reg_password.value).then(function () {
        return __awaiter(this, void 0, void 0, function* () {
            var user = firebase.auth().currentUser;
            var database_ref = firebase.database().ref();
            var user_data = {
                email: reg_email.value,
                password: reg_password.value,
            };
            yield database_ref.child("users/" + user.uid).set(user_data);
            firebase.auth().signInWithEmailAndPassword(user_data.email, user_data.password).then(function (user) { });
            firebase.auth().onAuthStateChanged(function (use) {
                if (user) {
                    let userId = firebase.auth().currentUser.uid;
                    firebase
                        .database()
                        .ref("users/" + userId)
                        .once("value")
                        .then(function (snapshot) {
                        return __awaiter(this, void 0, void 0, function* () {
                            const email = snapshot.val().email;
                            document.cookie =
                                "sessionData=" +
                                    JSON.stringify({ email: email }) +
                                    ";max-age=3600";
                            createPopup(`Pomyślnie zostałeś zarejestrowany jako ${email}! Na podany email została wysłana wiadomość z potwierdzeniem.`);
                            yield firebase
                                .auth()
                                .currentUser.sendEmailVerification()
                                .then(() => {
                                console.log("Wysłano e-mail weryfikacyjny");
                                toSite('dashboard.html');
                            })
                                .catch((error) => {
                                console.error(error);
                            });
                        });
                    });
                }
            });
        });
    })
        .catch(function (error) {
        if (error.code === "auth/wrong-password") {
            createPopup("Złe hasło");
            return;
        }
        else if (error.code === "auth/invalid-email") {
            createPopup("Zły email");
            return;
        }
        else if (error.code === "auth/user-not-found") {
            createPopup("Użytkownik nie został znaleziony");
            return;
        }
        else if (error.code === "auth/weak-password") {
            createPopup("Podane hasło jest zbyt proste do odgadnięcia");
            return;
        }
        else if (error.code === "auth/email-already-in-use") {
            createPopup("Wybrany użytkownik został już zarejestrowany, spróbuj się zalogować lub utwórz nowe konto");
            return;
        }
        else {
            createPopup("Wystąpił błąd podczas logowania");
            console.error(error);
        }
        console.log(error);
    });
}
window.setTimeout(() => {
    if (route.includes('dashboard') || route.includes('register') || route.includes('login'))
        return;
    const heading = document.querySelector(".heading");
    const heading_h = heading.querySelectorAll("h2");
    const heading_p = heading.querySelectorAll("p");
    let about_info;
    if (route.includes('about')) {
        about_info = document.querySelector('#about_info');
    }
    var cookieData = document.cookie.split(";").map((c) => c.trim());
    for (var i = 0; i < cookieData.length; i++) {
        if (cookieData[i].startsWith("sessionData=")) {
            var sessionData = JSON.parse(cookieData[i].split("=")[1]);
            if (sessionData) {
                if (sessionData.email == "kacperbielinski17@gmail.com" || sessionData.email == "kontakt.dajsonek@gmail.com") {
                    heading_h[0].contentEditable = "true";
                    heading_p[0].contentEditable = "true";
                    if (route.includes('about')) {
                        about_info.children[0].contentEditable = 'true';
                        about_info.children[1].contentEditable = 'true';
                    }
                }
                else {
                    return;
                }
            }
        }
    }
    if (route.includes('about')) {
        about_info.children[0].addEventListener('input', () => {
            var database_ref = firebase.database().ref();
            var user_data = {
                content: about_info.children[0].textContent
            };
            database_ref.child(`texts/aboutinfo/h`).set(user_data);
        });
        about_info.children[1].addEventListener('input', () => {
            var database_ref = firebase.database().ref();
            var user_data = {
                content: about_info.children[1].textContent
            };
            database_ref.child(`texts/aboutinfo/p`).set(user_data);
        });
    }
    heading_h[0].addEventListener('input', () => {
        var database_ref = firebase.database().ref();
        var user_data = {
            content: heading_h[0].textContent
        };
        if (route != '') {
            database_ref.child(`texts/${route}/h`).set(user_data);
        }
        else {
            database_ref.child(`texts/home/h`).set(user_data);
        }
    });
    heading_p[0].addEventListener('input', () => {
        var database_ref = firebase.database().ref();
        var user_data = {
            content: heading_p[0].textContent
        };
        if (route != '') {
            database_ref.child(`texts/${route}/p`).set(user_data);
        }
        else {
            database_ref.child(`texts/home/p`).set(user_data);
        }
    });
}, 250);
window.setTimeout(() => {
    if (route.includes('dashboard') || route.includes('register') || route.includes('login'))
        return;
    const heading = document.querySelector(".heading");
    const heading_h = heading.querySelectorAll("h2");
    const heading_p = heading.querySelectorAll("p");
    if (route != '') {
        firebase.database().ref(`texts/${route}/h`).once("value", function (snapshot) {
            if (!snapshot.exists())
                return;
            heading_h[0].textContent = snapshot.val().content;
        });
        firebase.database().ref(`texts/${route}/p`).once("value", function (snapshot) {
            if (!snapshot.exists())
                return;
            heading_p[0].textContent = snapshot.val().content;
        });
    }
    else {
        firebase.database().ref(`texts/home/h`).once("value", function (snapshot) {
            if (!snapshot.exists())
                return;
            heading_h[0].textContent = snapshot.val().content;
        });
        firebase.database().ref(`texts/home/p`).once("value", function (snapshot) {
            if (!snapshot.exists())
                return;
            heading_p[0].textContent = snapshot.val().content;
        });
    }
    if (route.includes('about')) {
        firebase.database().ref(`texts/aboutinfo/h`).once("value", function (snapshot) {
            if (!snapshot.exists())
                return;
            document.querySelector('#about_info').children[0].textContent = snapshot.val().content;
        });
        firebase.database().ref(`texts/aboutinfo/p`).once("value", function (snapshot) {
            if (!snapshot.exists())
                return;
            document.querySelector('#about_info').children[1].textContent = snapshot.val().content;
        });
    }
}, 250);
//# sourceMappingURL=app.js.map