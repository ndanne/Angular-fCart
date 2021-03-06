var express = require("express");
var mysql   = require("mysql");
var bodyParser  = require("body-parser");
//var md5 = require('MD5');
var rest = require("./REST.js");
var app  = express();
var path = require('path');
var port = process.env.PORT || 3000;
var rootPath = path.normalize(__dirname + '/');
function REST(){
    var self = this;
    self.connectMysql();
};


REST.prototype.connectMysql = function() {
    var self = this;
    var pool      =    mysql.createPool({
        connectionLimit : 100,
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'test',
        debug    :  false
    });
    pool.getConnection(function(err,connection){
        if(err) {
          self.stop(err);
        } else {
          self.configureExpress(connection);
        }
    });
}

REST.prototype.configureExpress = function(connection) {
      var self = this;
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      var router = express.Router();
      app.use(function(req, res, next) {
        //res.header("Access-Control-Allow-Credentials: true");
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        //res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
      });
      app.use('/api', router);
      var rest_router = new rest(router,connection);
      self.startServer();
}

REST.prototype.startServer = function() {
      app.use(express.static(rootPath+'/'));
      app.get('*', function(req, res){ res.sendFile(rootPath+'/index.html')})
      app.listen(port, function(){
          console.log("All right ! I am alive at Port 3000.");
      });
}

REST.prototype.stop = function(err) {
    console.log("ISSUE WITH MYSQL n" + err);
    process.exit(1);
}

new REST();
