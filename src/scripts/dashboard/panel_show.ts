window.setInterval(() => {
    if (!route.includes("dashboard")) return;
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
