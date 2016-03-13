var ip = network.getMyIp();
console.log(ip);
var portTCP = global.infoGame.tcp;
var host = global.infoGame.hostAddress;
var ipmulticast = global.infoGame.ipmulticast;
var portmulticast = global.infoGame.portmulticast;
var upd = global.infoGame.udp;
var client = network.clientTCP(portTCP,host);
var jugadores = [];
var gameID;
console.log('Host: '+host+' Puerto: '+ portTCP);

hearMulticast(portmulticast);

client.on('data',function(data){
    console.log(data.toString());
    var message = parseJSON(data);
    handleData(message);
});

function handleData(data){
    switch(data.codigo){
        case 4:
            presentacionJuego(data);
            break;
        case 103:
            break;
        case 5:   
            alert('Ha comenzado el juego.');
            break;
        case 10:
            alert('Ha finalizado el juego.');
            break;
        case 308:
            break;
        case 302:
            break;
        case 307:
            break;
    }
}
function presentacionJuego(data){
    console.log(data);
}
function parseJSON( json ){

    try{
        data = JSON.parse( json );
        return data;
    }catch(err){
        console.log('Error al parsear el JSON  -' + err);
    }

}
function hearMulticast(multicastPort){
    var dgram = require('dgram');
    var socket = dgram.createSocket('udp4');
    var PORT = portmulticast;
    socket.bind(PORT,'0.0.0.0',function(){
        socket.setBroadcast(true);
        socket.setTTL(1);
        socket.addMembership(ipmulticast,ip);
    });

    socket.on('message',function(message,rinfo){
       var data = parseJSON(message);
       handleData(data);

    });
}