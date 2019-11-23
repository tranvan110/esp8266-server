const PORT = process.env.PORT || 5000;
var ip = require('ip');
var server = require('http').createServer();
var io = require('socket.io')(server);
server.listen(PORT, function () {
    console.log("Server address: " + ip.address() + ":" + PORT);
});

var events = ["connect", "getInfo", "setInfo", "info", "message", "heartRate", "stepCount", "grygo", "control"];

io.on("connection", function (socket) {
    console.log("Connected");
    socket.emit("ServerSent", "Send from Server");

    events.forEach(function (event) {
        socket.on(event, function (message) {
            console.log(event + ": " + message);
            socket.broadcast.emit(event, message);
        });
    });

    socket.on("disconnect", function () {
        console.log("Disconnect");
    });
});