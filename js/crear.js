var roomName;
var tiempo;
var espacios;
var intervalToAnnounce;
var port = global.infoGame.udp;  

$('#crearSala').on('click',function( ev ){
    ev.preventDefault();
    var element = $('#NomSala');
    if(element.val() === ''){
      alert('No puede crear una sala sin nombre.');
    }else{
        roomName = element.val();
        global.infoGame.roomNames = roomName;
        tiempo = global.infoGame.tiempo;
        espacios = global.infoGame.espacios;
        console.log(espacios+'  '+tiempo+'  '+roomName);
        console.log(roomName);
        console.log(global.infoGame);
        window.location.href = "../html/servidor.html";
    }
});

var crear = {
    announceRoom : function(room, time, space){
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
    }
};