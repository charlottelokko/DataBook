var express = require("express");
var app = express();
//var port = 3000;

app.engine('html', require('ejs').renderFile);  //allows html pages and injection of data into them 

app.use(express.static('public'));


var server = app.listen(process.env.PORT || 8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("app listening at http://" + host + " and port num" + port); 
});

//app.listen(port, () => console.log(`Example app listening on port ${port}!.... http://127.0.0.1:${port}/`))

app.get("/",function(req,res){
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