// IT'S A ROUTES CONFIGURATION FILE! DON'T DELETE THIS IF YOU WANT USING ROUTES!

// Get route name from window location
const routes: string[] = window.location.search.substring(1).split('?')
const route: string = window.location.search.substring(1);

// Check if route name is correctly
if (routes[0] != "") {
    // Fetch route file
    fetch(`./src/routes/${routes[0]}.html`)
        .then(function (response) {
            // Check if route file is valid, if not, change html file to default
            if (!response.ok) {
                window.location.search = "";
            }
            // Return a html file text
            return response.text();
        })
        .then(function (html) {
            // Change a html file content to grabbed text
            document.body.innerHTML = html;
            document.title += ` | ${routes[0]}`;
        });
}
