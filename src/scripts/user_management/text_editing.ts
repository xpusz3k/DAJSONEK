window.setTimeout(() => {

    if (route.includes('dashboard') || route.includes('register') || route.includes('login')) return;

    const heading: any = document.querySelector(".heading");

    const heading_h = heading.querySelectorAll("h2");
    const heading_p = heading.querySelectorAll("p");
    let about_info: any

    if (route.includes('about')) {
        about_info = document.querySelector('#about_info')
    }

    var cookieData = document.cookie.split(";").map((c) => c.trim());
    for (var i = 0; i < cookieData.length; i++) {
        if (cookieData[i].startsWith("sessionData=")) {
            var sessionData = JSON.parse(cookieData[i].split("=")[1]);
            if (sessionData) {
                if (sessionData.email == "kacperbielinski17@gmail.com" || sessionData.email == "kontakt.dajsonek@gmail.com") {
                    heading_h[0].contentEditable = "true";
                    heading_p[0].contentEditable = "true";
                    if (route.includes('about')) {
                        about_info.children[0].contentEditable = 'true'
                        about_info.children[1].contentEditable = 'true'
                    }
                } else {
                    return
                }
            }
        }
    }

    if (route.includes('about')) {

        about_info.children[0].addEventListener('input', () => {
            var database_ref = firebase.database().ref();
            var user_data = {
                content: about_info.children[0].textContent
            };

            database_ref.child(`texts/aboutinfo/h`).set(user_data);
        })
        about_info.children[1].addEventListener('input', () => {
            var database_ref = firebase.database().ref();
            var user_data = {
                content: about_info.children[1].textContent
            };

            database_ref.child(`texts/aboutinfo/p`).set(user_data);
        })
    }

    heading_h[0].addEventListener('input', () => {
        var database_ref = firebase.database().ref();
        var user_data = {
            content: heading_h[0].textContent
        };

        if (route != '') {
            database_ref.child(`texts/${route}/h`).set(user_data);
        } else {
            database_ref.child(`texts/home/h`).set(user_data);
        }
    })
    heading_p[0].addEventListener('input', () => {
        var database_ref = firebase.database().ref();
        var user_data = {
            content: heading_p[0].textContent
        };

        if (route != '') {
            database_ref.child(`texts/${route}/p`).set(user_data);
        } else {
            database_ref.child(`texts/home/p`).set(user_data);
        }
    })
    
}, 250);

window.setTimeout(() => {

    if (route.includes('dashboard') || route.includes('register') || route.includes('login')) return;

    const heading: any = document.querySelector(".heading");

    const heading_h = heading.querySelectorAll("h2");
    const heading_p = heading.querySelectorAll("p");

    if (route != '') {
        firebase.database().ref(`texts/${route}/h`).once("value", function (snapshot: any) {
            if (!snapshot.exists()) return
            heading_h[0].textContent = snapshot.val().content
        });
        firebase.database().ref(`texts/${route}/p`).once("value", function (snapshot: any) {
            if (!snapshot.exists()) return
            heading_p[0].textContent = snapshot.val().content
        });
    } else {
        firebase.database().ref(`texts/home/h`).once("value", function (snapshot: any) {
            if (!snapshot.exists()) return
            heading_h[0].textContent = snapshot.val().content
        });
        firebase.database().ref(`texts/home/p`).once("value", function (snapshot: any) {
            if (!snapshot.exists()) return
            heading_p[0].textContent = snapshot.val().content
        });
    }

    if (route.includes('about')) {
        firebase.database().ref(`texts/aboutinfo/h`).once("value", function (snapshot: any) {
            if (!snapshot.exists()) return
            document.querySelector('#about_info').children[0].textContent = snapshot.val().content
        });
        firebase.database().ref(`texts/aboutinfo/p`).once("value", function (snapshot: any) {
            if (!snapshot.exists()) return
            document.querySelector('#about_info').children[1].textContent = snapshot.val().content
        });
    }
}, 250)