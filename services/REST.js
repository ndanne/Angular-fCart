var mysql = require("mysql");
function REST_ROUTER(router,connection) {
    var self = this;
    self.handleRoutes(router,connection);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection) {
    router.get("/",function(req,res){
        res.json({"Message" : "Hello World !"});
    });
    //http://localhost:3000/api/games/
    router.post("/games",function(req,res){
        var query = "INSERT INTO ??(??, ??, ??, ??) VALUES (?, ?, ?, ?)";
        var table = ["prefix_gamearena","title", "platform", "score", "genre", req.body.title, req.body.platform, req.body.score, req.body.genre];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Game Added!"});
            }
        });
    });

    router.get("/games",function(req,res){
    	
        var query = "SELECT * FROM ??";
        if(req.query.genre){
        	query += " WHERE ?? LIKE ?"
        }

        var table = ["prefix_gamearena", "genre", req.query.genre];
        
         console.log(req.query.key);
        query = mysql.format(query,table);
        console.log(query);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query -"+err});
            } else {
                res.json({"Error" : false, "Message" : "Success", "GamesArena" : rows});
            }
        });
    });
//http://localhost:3000/api/games/game_id
     router.get("/games/:game_id",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["prefix_gamearena","game_id",req.params.game_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "GamesArena" : rows});
            }
        });
    });

     router.put("/games",function(req,res){
        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        var table = ["prefix_gamearena","title",req.body.title,"game_id",req.body.game_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Updated the password for email "+req.body.email});
            }
        });
    });
    
    router.delete("/games/:game_id",function(req,res){
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["prefix_gamearena","game_id",req.params.game_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Deleted the user with email "+req.params.email});
            }
        });
    }); 
}


module.exports = REST_ROUTER;
