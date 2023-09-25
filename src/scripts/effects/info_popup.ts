function createPopup(text: string) {
    if (document.querySelectorAll(".popup_info").length != 0) return;

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
