// var http = require("http"); //loads HTTP module
// http.createServer(function (request, response) {    //creating a server and passing in a function
//     response.writeHead(200,{'Content-Type' : 'text/plain'})
//     response.end('Hiyaaaa\n');
// }).listen(8081);

// console.log('Server running at http://127.0.0.1:8081/');


var http = require("http"); //loads HTTP module
http.createServer(function (req, res) {    //creating a server and passing in a function
    res.writeHead(200)
    res.end('Hiyaaaa\n');
    console.log("Refeshed");
}).listen(8081);

console.log(new Date() +'Server running at http://127.0.0.1:8081/');
