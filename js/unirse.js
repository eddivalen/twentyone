var clientUDP = network.clientUDP(global.infoGame.udp);
var port = global.infoGame.tcp;
var template = _.template($('#room-template').html());
var rooms = [];
var confirm = false;

//------------- Escuchar el mensaje broadcast enviado por el Servidor--------------------
clientUDP.on('message',function(message,remote){
        console.log('Mensaje recibido: ' + message + 'remote to: ' +remote.address);
        var packet;
        try{
             packet =  JSON.parse(message);
        }catch(er){
            console.log(er);
        }
        if(packet.codigo == 1){
            data = {
                roomName : packet.nombre,
                tiempo: packet.tiempo,
                espacios: packet.espacios,
                ip: remote.address
            };
            if(!_.contains(rooms,data.ip)){
                $('#rooms').append(template(data));
                rooms.push(data.ip);
            }
        }
});

function parseJSON( json ){
        try{
            var data = JSON.parse( json );
            return data;
        }catch(err){
            console.log('Error al parsear el JSON  -' + err);
        }
    }
/*function requestConnection(){
    data = {
        'codigo' : 2,
        'nombre' : global.infoGame.playerName
    };
    console.log(data);
    clientTCP.write(JSON.stringify(data));
}*/
//------------- Conectarse a un Servidor--------------------
$('.btn-floating').on('click',function(ev){
    ev.preventDefault();
    var element = $("input[name='rooms']:checked");
    var address = element.val();
    console.log(address);

    if(typeof(address) != 'undefined'){
        global.infoGame.hostAddress = address;
        global.infoGame.roomNamec = element.attr('data-roomName');
        var clientTCP = network.clientTCP(port,address);
//------------- Solicitar entrada al Servidor--------------------
            data = {
                'codigo' : 2,
                'nombre' : global.infoGame.playerName
            };
            console.log(data);
            clientTCP.write(JSON.stringify(data));
//------------- Esperar respuesta del Servidor--------------------
        var m='undefined';
        clientTCP.on('data',function(data){
            console.log(data.toString());
            var message = parseJSON(data);
                if(message.codigo === 3 && message.aceptado === true){
                    console.log(message);
                    global.infoGame.ipmulticast = message.direccion;
                    global.infoGame.idcliente = message.id;
                    confirm = true;
                }else{
                    confirm = false;
                }
        });
        setTimeout(function(){
           console.log('aceptado: '+confirm);
            if(confirm === true){
                clientUDP.close();
                window.location.href = '../html/jugarCliente.html';
            }else{
                alert('No puede ingresar a una sala llena.');
            } 
        },50);
    }else{
        alert('Debe seleccionar una sala para jugar.');
    }
});