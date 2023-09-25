function reloadMails() {
    const d_mails = document.querySelector(".d_mails");
    for (let i = 0; i < d_mails.childElementCount; i++) {
        d_mails.children[i].remove();
    }
    dashboard_show_emails();
}
