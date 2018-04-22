module.exports = function (app, addon) {

    app.get('/', function (req, res) {
        res.format({
            'text/html': function () {
                res.redirect('/atlassian-connect.json');
            },
            'application/json': function () {
                res.redirect('/atlassian-connect.json');
            }
        });
    });

    //nh - the presence of `addon.authenticate()` dictates whether or not the REST
    //requires authentication. Below, `addon.authenticate()` has been removed
    //means that to access this endpoint, no authentication is required
    app.get('/hello-world', function (req, res) {
            // the `render()` method takes two params: name of template
            // and a json object to pass the context in
            res.render('hello-world', {
                title: 'Atlassian Connect'
            });
        }
    );

    // Add any additional route handlers you need for views or REST resources here...


    // load any additional files you have in routes and apply those to the app
    {
        const fs = require('fs');
        const path = require('path');
        const files = fs.readdirSync("routes");
        for(const index in files) {
            const file = files[index];
            if (file === "index.js") continue;
            // skip non-javascript files
            if (path.extname(file) != ".js") continue;

            let routes = require("./" + path.basename(file));

            if (typeof routes === "function") {
                routes(app, addon);
            }
        }
    }
};
