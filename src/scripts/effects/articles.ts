window.setTimeout(() => {
    if (routes[1] != undefined) {
        const articleID = routes[1].substring(3)
        
        const article_preview = document.querySelector('.article_preview')

        firebase.database().ref(`articles/${articleID}`).once("value", function (snapshot: any) {
            if (!snapshot.exists()) {
                window.location.search = routes[0]
                return
            } else {
                article_preview.classList.add('show')
                const article_heading: any = document.querySelector('.article_heading')

                firebase.database().ref(`articles/${articleID}`).once("value", function (snapshot: any) {
                    article_heading.children[0].textContent = snapshot.val().h
                    article_heading.children[1].src = snapshot.val().url
                    article_heading.children[2].textContent = snapshot.val().p
                })
            }
        });
    }
}, 250)

window.setTimeout(() => {
    if (routes[0] == 'article' && routes[1] == undefined) {
        firebase.database().ref('articles/').once("value", function (snapshot: any) {
            snapshot.forEach(function (childSnapshot: any) {
                let childData = childSnapshot.val();
                let childKey = childSnapshot.key;

                const article = document.createElement("div");

                article.classList.add("article");
                article.addEventListener('click', () => {
                    toSite(`article?id=${childKey}`)
                })
                article.innerHTML = `<div class="img"><img src="${childData.url}" alt=""></div><h3>${childData.h}</h3>`;

                const articles = document.querySelector(".article_list");

                articles.appendChild(article);
            });
        });
    }
})