let nav: HTMLElement;
let nav_button: HTMLElement;

window.setInterval(() => {
    nav = document.querySelector("nav");

    if (document.documentElement.scrollTop > 0) {
        nav.classList.add("scroll");
    } else {
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
                const logButton: HTMLButtonElement =
                    document.querySelector("#logBtn");

                logButton.style.display = "none";
            }
        }
    }
}, 250);
