var ip = network.getMyIp();
var roomName;
var tiempo;
var espacios;
var intervalToAnnounce;
var port = global.infoGame.UDP;  
console.log(ip);

$('#crearSala').on('click',function( ev ){
    ev.preventDefault();
    var element = $('#NomSala');
    if(element.val() === ''){
      alert('No puede crear una sala sin nombre.');
    }else{
        roomName = element.val();
        global.infoGame.ip = ip;
        global.infoGame.roomName = roomName;
        global.infoGame.TIME = tiempo;
        global.infoGame.espacios = espacios;
        console.log(roomName);
        console.log(global.infoGame);
        announceRoom(ip,roomName,tiempo,espacios);
        //window.location.href = "../html/servidor.html";
    }
});
function announceRoom(ip , room, time, space){
    var message = {
        'codigo': 1,
        'nombre': room,
        'tiempo': time,
        'espacios': space
    };

    intervalToAnnounce = setInterval(function(){
                network.serverUDP(message,port);
    }, 1000*tiempo);

     var data = {
        type: 'alert-success',
        message: 'El servidor se esta Anunciando.',
        description: 'En el puerto: ' + port
    };
    alert('El servidor se esta anunciando en el puerto:'+port+' ');
}



