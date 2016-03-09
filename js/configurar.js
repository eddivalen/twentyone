$('#submit').on('click',function(ev){
	ev.preventDefault();
	var udp = $("#udp");
	var tcp = $("#tcp");
	var ipbroadcast = $('#broadcast');
	var ipmulticast = $('#ipmulticast');
	var portmulticast = $('#portmulticast');
	var time = $('#tiempo');
	if(udp.val() === '' || tcp.val() === '' || ipbroadcast.val() === '' ||
		ipmulticast.val() === '' || portmulticast.val() === '' || time.val() === ''){
		alert('No puede dejar un campo vacío');
	}else{
		global.infoGame.UDP					= Number($("#udp").val());
		global.infoGame.TCP					= Number($("#tcp").val());
		global.infoGame.ipBroadcast			= $('#broadcast').val();
		global.infoGame.ipMulticast			= $('#ipmulticast').val();
		global.infoGame.portMulticast		= Number($('#portmulticast').val());
		global.infoGame.TIME				= Number($('#tiempo').val());
		console.log(global.infoGame);
		window.location.href = '../html/index.html';
	}
});
