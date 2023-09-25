function panel(panel: string) {
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
