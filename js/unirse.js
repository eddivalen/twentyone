var clientUDP = network.clientUDP(global.infoGame.udp);
var template = _.template($('#room-template').html());
var rooms = [];

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
               // $.material.init();
            }
        }
});
//Events
$('.btn-floating').on('click',function(ev){
    ev.preventDefault();
    var element = $("input[name='rooms']:checked");
    var address = element.val();
    console.log(address);

   // console.log(ev);
    if(typeof(address) != 'undefined'){
        global.infoGame.hostAddress = address;
        global.infoGame.roomNamec = element.attr('data-roomName');
        clientUDP.close();
        window.location.href = '../html/jugarCliente.html';
    }else{
        alert('Debe seleccionar una sala para jugar.');
    }
});