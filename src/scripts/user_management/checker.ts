window.setInterval(() => {
    // if (route.includes("login") || route.includes("register")) {
    //     var cookieData = document.cookie.split(";").map((c) => c.trim());
    //     for (var i = 0; i < cookieData.length; i++) {
    //         if (cookieData[i].startsWith("sessionData=")) {
    //             var sessionData = JSON.parse(cookieData[i].split("=")[1]);
    //             if (sessionData) {
    //                 toSite("");
    //             }
    //         }
    //     }
    // }

    if (route.includes("dashboard")) {
        var cookieData = document.cookie.split(";").map((c) => c.trim());
        for (var i = 0; i < cookieData.length; i++) {
            if (cookieData[i].startsWith("sessionData=")) {
                var sessionData = JSON.parse(cookieData[i].split("=")[1]);
                if (sessionData) {
                    if (sessionData.email != "kacperbielinski17@gmail.com") {
                        if (sessionData.email != "kontakt.dajsonek@gmail.com") {
                            toSite("");
                        }
                    }
                }
            } else {
                toSite("");
            }
        }
    }
}, 250);
