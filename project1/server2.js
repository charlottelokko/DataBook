var express = require("express");
var app = express();
//var port = 3000

var sql = require("mssql");
app.engine('html', require('ejs').renderFile);  //allows html pages and injection of data into them 

var sqlConfig = {
    user: "Fred",
    password: "123",
    server: "WIN-70OAN17IPPO",
    port: 1234,
    database: "Northwind"
}

//Connection String parameters
sql.connect(sqlConfig, function (req, res) {
    app.get("/customers", (req, res) => {
        var request = new sql.Request();
        request.query("select top 2 * from Customers", function (err, results) {
            res.json(results.recordset);
        });
    });

    app.get("/products", (req, res) => {
        var request = new sql.Request();
        request.query("select top 20 * from Products", function (err, results) {
            res.json(results.recordset);
        });
    });

    //MVC example
    app.get("/things/:minprice?/:maxprice?", function (req, res) {        //Controller, with a parameter
        var sqlMinPrice = (req.params.minprice || 0);
        var sqlMaxPrice = (req.params.maxprice || 999);

         //...invoking the MODEL
        var request = new sql.Request(); 
        // request.query("select * from Products where unitprice <" + sqlMinPrice, function (err, results) {
        request.input("min", sqlMinPrice)
        request.input("max", sqlMaxPrice)
        request.execute("usp_ProductsBetweenOrdered", function (err, results) {

            var sData = JSON.stringify(results.recordsets[0]);
            //returning a VIEW
            res.render(__dirname + "/views/thingList.html", {list: sData});
        });
    });


});

app.get("/changePrices/:anAmount?", function (req, res) {
    var amount = (req.params.anAmount || 0);
    if(amount==0){
        res.send("no amount given");
    }
    else{
        var request = new sql.Request();
        request.input("amount", amount);
        request.execute("usp_AlterAllPrices", function (err, results) {
            res.send("updated by " + amount );
        });
        
    }
});


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => res.send('Home page should be here somewhere'))

//app.listen(port, () => console.log(`Example app listening on port ${port}!.... http://127.0.0.1:${port}/`))

var server = app.listen(process.env.PORT || 8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("app listening at http://%s:%s", host, port);
    //console.log("app listening at http://" + host + " and port num" + port); 
});

//Essentially creating a REST API with JSON data! 
// app.get("/customers", function(req,res){
//     res.json([
//         {name: 'jim', age:42},
//         {name:'charles',age:44},
//         {name:'pickens',age:33}
//     ]);
// });


app.get("/customers", function (req, res) {
    var request = new sql.Request();
    request.query("select top 2 * from Customers", function (err, results) {
        res.json(results.recordset);
    });
});

app.get("/products", function (req, res) {
    var request = new sql.Request();
    request.query("select top 2 * from products", function (err, results) {
        res.json(results.recordset);
    });
});


app.get('/bananas', (req, res) => res.send('You must be a monkey!'));

// app.get("/movies",function(req,res){
//     var someData = [{name:'jaws',length:90},{name:'AD Astro', length:110}]; //imagine from the db
//     res.render(__dirname + "/views/movieList.html",{fullList:someData});
// });

// app.get("/movies", function (req, res) {
//     var request = new sql.Request();
//     request.query("select top 5 * from customers", function (err, results) {
//         //res.json(results.recordset);
//         res.render(__dirname + "/views/movieList.html", {list:results.recordset});
//     });
// });

// var engines = require('consolidate');

// app.set('views', __dirname + '/views');
// app.engine('html', engines.mustache);
// app.set('view engine', 'html');