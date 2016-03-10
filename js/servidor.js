var ip = global.infoGame.ip;
var port = global.infoGame.tcp;
var time = global.infoGame.tiempo;
var roomName = global.infoGame.roomName;
var gameID = global.infoGame.gameID = ip;
var users = [];
var bingoNumbers = [];
var intervalToAnnounce;
var intervalMulticast;
var sendMulticast;

(function startServer(){
    var server = network.net.createServer(function(client){

        console.log('client connected');

        client.on('data',function(data){
            console.log(data.toString());
            var message = parseJSON(data);
            handleData(message,client);
        });
        client.on('end',function(){
            console.log('client disconected');
            var user = _.find(users,function(users){
                        return typeof(users.sock.localAddress) === 'undefined';
                    });
            removePlayer(user);
            //check if an error occurs
            delete user.sock;
            var index = users.indexOf(user);
            users.splice(index, 1);
        });
    });

    server.listen(port,function(){
        console.log('Server listening');
    });

    function handleData( data , sock ) {

        switch(data.codigo){
            case 2:
                responseConnection(data, sock);
                break;
            case 102:
                responseRequestCards(data,sock);
                break;
            case 303:
            case 304:
            case 305:
            case 306:
                announceBingo(data, sock);
                break;
            default:
                console.log('Codigo erroneo de JSON');
                break;
        }
    }
    function responseConnection( json, sock ){

        data = {
            playerName : json.nombre,
            ip : sock.remoteAddress,
        };

        console.log(sock.remoteAddress);
        //render.Player(data);

        var response ={
            'codigo' : 3,
            'aceptado' : true,
            'direccion':ip,
            'id' : gameID
        };

        sock.write(JSON.stringify(response));
        users.push({
            playerName: json.nombre,
            ip: sock.remoteAddress,
            sock: sock,
            cards : []
        });


    }
    function parseJSON( json ){
        try{
            var data = JSON.parse( json );
            return data;
        }catch(err){
            console.log('Error al parsear el JSON  -' + err);
        }
    }
}());

function removePlayer(data){
    $('#'+data.playerName+'-'+ data.ip).remove();
}