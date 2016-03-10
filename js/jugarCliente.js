var ip = network.getMyIp();
var port = global.infoGame.tcp;
var host = global.infoGame.hostAddress;
var ipmulticast = global.infoGame.ipmulticast;
var upd = global.infoGame.udp;
var client = network.clientTCP(port,host);
var myCards = [];
var gameID;
console.log('Host: '+host+' Puerto: '+ port);


requestConnection();

client.on('data',function(data){
    console.log(data.toString());
    var message = parseJSON(data);
    handleData(message);
});

function requestConnection(){
    data = {
        'codigo' : 2,
        'nombre' : global.infoGame.playerName
    };
    console.log(data);
    client.write(JSON.stringify(data));
}
function handleData(data){
    switch(data.codigo){
        case 3:
            handleGameID(data);
            break;
        case 103:
           // console.log(data.NUMEROS);
        //    handleCards(data);
            break;
        case 5:   
            alert('Ha comenzado el juego.');
            //toastr["success"]("","Ha comenzado el juego");
            break;
        case 10:
            alert('Ha finaliado el juego.');
            //toastr["info"]("","Ha finalizado el juego");
            break;
        case 308:
           // handleNumbers(data);
            break;
        case 302:
           // toastr["info"]("","Un cliente ha cantado bingo");
            break;
        case 307:
           // toastr["info"]("Ganador : " +data.CLIENTE+ " con un " + data.TIPOBINGO,"El Servidor Acepto el BINGO");
            break;
    }
}
function handleGameID(data){
    gameID = data.id;
    console.log('Se ha unido al juego con id: ' + data.id);
    hearMulticast(upd);
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
    var PORT = multicastPort;
    socket.bind(PORT,'0.0.0.0',function(){
        socket.setBroadcast(true);
        socket.setTTL(1);
        socket.addMembership(ipmulticast,ip);
    });

    socket.on('message',function(message,rinfo){

       var data = parseJSON(message);
       console.log(data);
       handleData(data);

    });
}