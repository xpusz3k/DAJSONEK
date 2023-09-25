window.setTimeout(() => {
    if (!route.includes("register")) return;
    const reg_form: HTMLFormElement = document.querySelector("#reg_form");
    reg_form.addEventListener("submit", function (event) {
        event.preventDefault();

        register();
    });
}, 250);

window.setTimeout(() => {
    if (!route.includes("login")) return;
    const log_form: HTMLFormElement = document.querySelector("#log_form");
    log_form.addEventListener("submit", function (event) {
        event.preventDefault();

        login();
    });
}, 250);
