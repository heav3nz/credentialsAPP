//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express();

// Body Parser Middleware
app.use(bodyParser.json());


//Setting up server
var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log("App now running on port", port);
});

//Initiallising connection string
var dbConfig = {
    user: "juerguen",
    password: "sutures2018",
    server: "DEMETECHSERVER",
    database: "SistemaNomina"
};

//Function to connect to database and execute query
var executeQuery = function(res, query) {
    sql.connect(dbConfig, function(err) {
        if (err) {
            console.log("Error while connecting database :- " + err);
            res.send(err);
        } else {
            // create Request object
            var request = new sql.Request();
            // query to the database
            request.query(query, function(err, resp) {
                if (err) {
                    console.log("Error while querying database :- " + err);
                    res.send(err);
                } else {
                    res.send(resp);
                }
            });
        }
    });
}

//GET API
app.get("/api/user", function(req, res) {
    var query = "select * from [Empleado]";
    executeQuery(res, query);
});