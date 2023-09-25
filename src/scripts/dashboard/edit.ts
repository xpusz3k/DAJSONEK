// SHOP

function showShopPopup() {
    const d_edit_shop_add_popup = document.querySelector(
        ".d_edit_shop_add_popup"
    );

    d_edit_shop_add_popup.classList.toggle("show");
    const d_edit_shop_del_popup = document.querySelector(
        ".d_edit_shop_del_popup"
    );

    d_edit_shop_del_popup.classList.toggle("show");
}

function showArticlePopup() {
    const d_edit_articles_add_popup = document.querySelector(
        ".d_edit_articles_add_popup"
    );

    d_edit_articles_add_popup.classList.toggle("show");
    const d_edit_articles_del_popup = document.querySelector(
        ".d_edit_articles_del_popup"
    );

    d_edit_articles_del_popup.classList.toggle("show");
}

function addItem() {
    const item_name: HTMLInputElement = document.querySelector("#item_name");
    const item_cost: HTMLInputElement = document.querySelector("#item_cost");
    const item_url: HTMLInputElement = document.querySelector("#item_url");

    var database_ref = firebase.database().ref();
    var user_data = {
        name: item_name.value,
        cost: item_cost.value,
        url: item_url.value,
    };

    const id = Math.floor(Math.random() * 999999);

    database_ref.child("items/" + id).set(user_data);

    createPopup(
        `Pomyślnie utworzyłeś przedmiot o nazwie "${item_name.value}" oraz cenie "${item_cost.value} PLN"`
    );
    item_name.value = "";
    item_cost.value = "";
    item_url.value = "";
}

function addArticle() {
    const article_name: HTMLInputElement = document.querySelector("#article_name");
    const article_text: HTMLInputElement = document.querySelector("#article_text");
    const article_image: HTMLInputElement = document.querySelector("#article_image");

    var database_ref = firebase.database().ref();
    var user_data = {
        h: article_name.value,
        p: article_text.value,
        url: article_image.value,
    };

    const id = Math.floor(Math.random() * 999999);

    database_ref.child(`articles/${id}/`).set(user_data);

    createPopup(
        `Pomyślnie utworzyłeś artykuł o id ${id}`
    );
    article_name.value = "";
    article_text.value = "";
    article_image.value = "";
}

function delArticle() {
    const article_id: HTMLInputElement = document.querySelector("#article_id");

    firebase.database().ref(`articles/${article_id.value}`).once("value", function (snapshot: any) {
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
    const item_name: HTMLInputElement =
        document.querySelector("#item_del_name");

    firebase
        .database()
        .ref("items")
        .once("value", function (snapshot: any) {
            if (!snapshot.exists()) {
                createPopup("Wskazany przedmiot nie został jeszcze utworzony");
                return;
            }
            snapshot.forEach(function (childSnapshot: any) {
                let childData = childSnapshot.val();
                let childKey = childSnapshot.key;

                if (childData.name == item_name.value) {
                    firebase
                        .database()
                        .ref("items/" + childKey)
                        .remove();
                    createPopup(
                        `Pomyślnie usunąłeś przedmiot o nazwie "${item_name.value}"`
                    );
                    item_name.value = "";
                } else {
                    createPopup(
                        "Wskazany przedmiot nie został jeszcze utworzony"
                    );
                }
            });
        });
}
