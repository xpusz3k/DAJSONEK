window.setTimeout(() => {
    if (!route.includes("shop")) return;

    firebase
        .database()
        .ref("items/")
        .once("value", function (snapshot: any) {
            firebase
                .database()
                .ref("items")
                .once("value", function (snapshot: any) {
                    snapshot.forEach(function (childSnapshot: any) {
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

function toUrl(url: string) {
    window.open(`${url}`, "_blank");
}
