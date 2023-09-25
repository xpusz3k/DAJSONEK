function reset_actives() {
    const dashboard_panel = document.querySelector("#panel");

    for (let i = 0; i < dashboard_panel.childElementCount; i++) {
        dashboard_panel.children[i].classList.remove("active");
    }
}
