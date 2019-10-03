var express = require("express");
var app = express();
var sql = require("mssql");

app.engine('html', require('ejs').renderFile);  //allows html pages and injection of data into them 
app.use(express.static('public'));

var server = app.listen(process.env.PORT || 8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("app listening at http://" + host + " and port num " + port); 
});

var sqlConfig = {
    user: "Fred",
    password: "123",
    server: "WIN-70OAN17IPPO",
    port: 1234,
    database: "Northwind"
}

//app.listen(port, () => console.log(`Example app listening on port ${port}!.... http://127.0.0.1:${port}/`))

app.get("/",function(req,res){
    res.render(__dirname + "/views/index.html");
    // res.sendFile(__dirname + "/views/index.html");
});

app.get("/index.html",function(req,res){
    res.render(__dirname + "/views/index.html");
    // res.sendFile(__dirname + "/views/index.html");
});

app.get("/charts.html",function(req,res){
    res.sendFile(__dirname + "/views/charts.html");
});

app.get("/tables.html",function(req,res){
    res.sendFile(__dirname + "/views/tables.html");
});

app.get('/js/WeatherChart.js',
    function(req,res){
        res.sendFile(path.join(__dirname + '/js/WeatherChart.js'));
    }); 

app.get('/js/WeatherChart.js',
    function(req,res){
        res.sendFile(path.join(__dirname + '/js/datatables-demo.js'));
    }); 

app.get('/js/NorthDB.js',
    function(req,res){
        res.sendFile(path.join(__dirname + '/js/NorthDB.js'));
    }); 


// DB Shite

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