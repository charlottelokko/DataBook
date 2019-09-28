var http = require("http"); //loads HTTP module
http.createServer(function (req, res) {    //creating a server and passing in a function
    res.writeHead(200)
    res.end('Hiyaaaa\n');
    console.log("Refeshed");
}).listen(8081);

console.log(new Date() +'Server running at http://127.0.0.1:8081/');
