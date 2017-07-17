var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(path.join(__dirname, 'build')));

startPort(3000);

function startPort(port) {
    if(port > 65535){
        console.error("没有找到可用的端口");
        return;
    }
    app.listen(port, function () {
        var host = this.address().address;
        var port = this.address().port;

        console.log('listening at http://%s:%s', host, port);
    }).on('error', function() {
        startPort(port + 1);
    });

}

