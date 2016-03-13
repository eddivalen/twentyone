<<<<<<< HEAD
var ip = global.infoGame.ipmulticast;
=======
var ip = network.getMyIp();
>>>>>>> origin/master
var port = global.infoGame.tcp;
var time = global.infoGame.tiempo;
var roomName = global.infoGame.roomName;
var portmulticast = global.infoGame.portmulticast;
var idcliente;
var jugadores = new Array(new Object);
var users = [];
var cant = global.infoGame.espacios;
var intervalToAnnounce;
var intervalMulticast;
var sendMulticast;
var template = _.template($('#players-template').html());
var ipcliente;
var cantidad_jug = global.infoGame.espacios;
<<<<<<< HEAD
var pos;
=======
>>>>>>> origin/master

announceRoom(global.infoGame.roomNames,global.infoGame.tiempo,cantidad_jug,global.infoGame.udp);
    function announceRoom(room, time, space, port){
        var message = {
            'codigo': 1,
            'nombre': room,
            'tiempo': time,
            'espacios': space
        };
        console.log('espacios:'+message.espacios);
        intervalToAnnounce = setInterval(function(){
                network.serverUDP(message,port);
        }, 1000*global.infoGame.tiempo);
        var data = {
            type: 'alert-success',
            message: 'El servidor se esta Anunciando.',
            description: 'En el puerto: ' + port
        };
    }

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
<<<<<<< HEAD
    function responseConnection( json, sock ){        
        if(global.infoGame.espacios <= 0){
          
=======
    function responseConnection( json, sock ){

        data = {
            playerName : json.nombre,
            ip : sock.remoteAddress,
        };

        console.log(sock.remoteAddress);
        //render.Player(data);
        
        if(global.infoGame.espacios == 0){
>>>>>>> origin/master
            var response ={
                'codigo' : 3,
                'aceptado' : false,
                'direccion': null,
                'id' : null
            };
        }else{
<<<<<<< HEAD
              idcliente = (cant + 1) - cantidad_jug;
              console.log('idcliente: '+idcliente);
                var response ={
                    'codigo' : 3,
                    'aceptado' : true,
                    'direccion':ip,
                    'id' : idcliente
                };
            cantidad_jug =  cantidad_jug - 1;
            console.log('espacios: '+cantidad_jug);
            global.infoGame.espacios = cantidad_jug;
            
            sock.write(JSON.stringify(response));
            ipcliente = sock.remoteAddress;
            ipcliente = ipcliente.replace("::ffff:","");

            console.log(ipcliente);
                data = {
                playerName : json.nombre,
                ip : ipcliente,
                };
            pos = idcliente - 1;
            jugadores[pos]= {nombre: json.nombre, id: idcliente};
            console.log(ipcliente);
            
            clearInterval(intervalToAnnounce);
            announceRoom(global.infoGame.roomNames,global.infoGame.tiempo,cantidad_jug,global.infoGame.udp);
            $('#players').append(template(data));
            users.push({
                ip: ipcliente,
                playerName: json.nombre
            });
        }
=======
            var response ={
                'codigo' : 3,
                'aceptado' : true,
                'direccion':ip,
                'id' : 'SERVIDOR_EDDY'
            };
            cantidad_jug =  cantidad_jug - 1;
            console.log('espacios: '+cantidad_jug);
            
            global.infoGame.espacios = cantidad_jug;
        }
        sock.write(JSON.stringify(response));
        ipcliente = sock.remoteAddress;
        ipcliente = ipcliente.replace("::ffff:"," ");
        console.log(ipcliente);
        clearInterval(intervalToAnnounce);
        announceRoom(global.infoGame.roomNames,global.infoGame.tiempo,cantidad_jug,global.infoGame.udp);
        $('#players').append(template(data));
        users.push({
            ip: ipcliente,
            playerName: json.nombre
        });
>>>>>>> origin/master
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

$('#crearSala').on('click',function(ev){
    ev.preventDefault();
    console.log('Empezar juego');
    sendMulticast = network.multicast(portmulticast);
    clearInterval(intervalToAnnounce);
    data = presentacionJuego(cantidad_jug);
    console.log(jugadores);
    console.log(data)
    sendMulticast(data);
    ev.currentTarget.remove();
});
 function presentacionJuego(cant){
        if(cant === 0){
            var data = {
                'codigo': 4,
                'jugadores': [
                    jugadores[0],
                    jugadores[1]
                ]
            };
            return data;
        }
    }
function removePlayer(data){
    $('#'+data.playerName+'-'+ data.ip).remove();
}