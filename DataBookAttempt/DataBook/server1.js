var express = require("express");
var app = express();
//var port = 3000;

app.engine('html', require('ejs').renderFile);  //allows html pages and injection of data into them 


app.get("/",function(req,res){
    res.render(__dirname + "/index.html");
});

var server = app.listen(process.env.PORT || 8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("app listening at http://" + host + " and port num" + port); 
});

//app.listen(port, () => console.log(`Example app listening on port ${port}!.... http://127.0.0.1:${port}/`))
