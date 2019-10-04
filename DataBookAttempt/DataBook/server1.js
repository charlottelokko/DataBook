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


// DB Stuff

//Connection String parameters
sql.connect(sqlConfig, function (req, res) {
      
    app.get("/customers", (req, res) => {
        var request = new sql.Request();
        request.query("select * from Customers", function (err, results) {
            res.json(results.recordset);
        });
    });

    app.get("/products", (req, res) => {
        var request = new sql.Request();
        request.query("select * from Products", function (err, results) {
            res.json(results.recordset);
        });
    });

    app.post('/clicky', function(req,res){
        var request = new sql.Request();
        request.execute("usp_TotalClicks", function(err,results){});
    })

    app.get("/clicky2", (req, res) => {
        var request = new sql.Request();
        request.query("select * from Clicks", function (err, results) {
            res.json(results.recordset);
        });
    });
});