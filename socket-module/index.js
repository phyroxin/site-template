/*======================================================================
 * socket IO functions
 * @params: server = http object
 *======================================================================
 */
exports.init = function(server){

	var  io		 		= require('socket.io').listen(server)
		,cookie  		= require('cookie')
		,connect 		= require('connect')
		,thread	 		= require('webworker-threads')
		,async	 		= require('async')
		,G		 		= require('../globals')
		,interval
		,teamScoreArray = []
		,tableScore		= 0;
	
	// configure socket parameters for fallback and initialize cookies
	io.configure(function(){
		io.set('transports', [
			 'websocket'
			,'xhr-polling'
			,'flashsocket'
			,'htmlfile'
			,'jsonp-polling'
		]);
		io.set('log level', 1);
		//io.set('polling duration', 0);
		//io.set('close timeout', 20);
		//io.set('heartbeats', true);
		//io.set('heartbeat timeout', 15);
		//io.set('heartbeat interval', 20);
		io.set('authorization', function (data, accept){
			// check if there's a cookie header
			if (data.headers.cookie) {
				// if there is, parse the cookie
				data.cookie = cookie.parse(data.headers.cookie);
				//data.sessionID = data.cookie['connect.sid'];
				data.sessionID = connect.utils.parseSignedCookie(data.cookie['express.sid'], 'secret');

				if (data.cookie['express.sid'] == data.sessionID) {
					return accept('Cookie is invalid.', false);
				}
				// accept the incoming connection
				accept(null, true);
			}
		});
	});
	
	// when user has connected...
	io.sockets.on('connection', function(socket){
	
		console.log('SessionID ' + socket.handshake.sessionID);

		// emit socket start and send session cookie for logging
		socket.emit('socket start', {id:socket.handshake.sessionID});
	});
}
