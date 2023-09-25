function deleteMail(mail: string) {
    firebase
        .database()
        .ref("mails/" + mail)
        .remove();
    createPopup(`Pomyślnie usunąłeś wiadomość mail o ID ${mail}`);
    window.location.reload()
}
