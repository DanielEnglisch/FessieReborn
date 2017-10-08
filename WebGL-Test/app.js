var InitDemo = function(){
	console.log('It twerks!');

	var canvas = document.getElementById('screen');
	var gl = canvas.getContext('webgl');

	if(!gl){
		gl = canvas.getContext('experimental-webgl');
	}

	if(!gl){
		alert("Not supported!");
	}

	gl.clearColor(0.2, 0.4, 0.25, 1.0);

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	

};