var addEvent = function(object, type, callback) {
    if (object == null || typeof(object) == 'undefined') return;
    if (object.addEventListener) {
        object.addEventListener(type, callback, false);
    } else if (object.attachEvent) {
        object.attachEvent("on" + type, callback);
    } else {
        object["on"+type] = callback;
    }
};


var InitDemo = function(){

	

	var canvas = document.getElementById('screen');
	var gl = canvas.getContext('webgl');

	if(!gl){
		gl = canvas.getContext('experimental-webgl');
	}

	if(!gl){
		alert("Not supported!");
	}

	//### Setup window
	canvas.width =  window.innerWidth-20;
	canvas.height = window.innerHeight-20;
	gl.viewport(0,0, window.innerWidth-20, window.innerHeight-20);

	addEvent(window, "resize", function(event) {
		canvas.width =  window.innerWidth-20;
		canvas.height = window.innerHeight-20;
		gl.viewport(0,0, window.innerWidth-20, window.innerHeight-20);
		drawCall();
		
	});

	
	// ### Setup Shaders:

	//"Position Shader"
	var vertexShaderCode = [
		"precision mediump float;",
		"attribute vec2 vertPosition;",
		"attribute vec3 vertColor;",
		"varying vec3 fragColor;",		
		"void main(){",
		"fragColor = vertColor;",
		"gl_Position = vec4(vertPosition, 0.0, 1.0);",
		"}",
	].join("\n");

	//"Color Shader"
	var fragmentShaderCode = [
		"precision mediump float;",
		"varying vec3 fragColor;",				
		"void main(){",
		"gl_FragColor = vec4(fragColor,1.0);",
		"}",
		"",
	].join("\n");

	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	
	gl.shaderSource(vertexShader, vertexShaderCode);
	gl.shaderSource(fragmentShader, fragmentShaderCode);

	gl.compileShader(vertexShader);
	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
		console.error("Error compiling vertex shader!", gl.getShaderInfoLog(vertexShader));
		return;
	}

	gl.compileShader(fragmentShader);
	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)){
		console.error("Error compiling fragment shader!", gl.getShaderInfoLog(fragmentShader));
		return;
	}

	// ### Link/Validate program
	var program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);

	if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
		console.error("Error linking program!", gl.getProgramInfoLog(program));
		return;
	}

	gl.validateProgram(program);
	if(!gl.getProgramParameter(program, gl.VALIDATE_STATUS)){
		console.error("Program validation failed!", gl.getProgramInfoLog(program));
		return;
	}

	// ### Vertecies:
	var vertecies = 
	[	 //X   //Y		//RGB
		 0.0,  0.5,		1.0,0.0,0.0,
		-0.5, -0.5,		0.0,1.0,0.0,
		 0.5, -0.5,		0.0,0.0,1.0
	];

	// ### Setup/Bind Buffer
	var vertBuff = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertBuff);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertecies), gl.STATIC_DRAW);

	// ### Init Shaders
	var posAttribLoc = gl.getAttribLocation(program, 'vertPosition');
	gl.vertexAttribPointer(
		posAttribLoc,	//Attrib
		2, // Vec size (vec2, vec4,...)
		gl.FLOAT, //Datatype
		gl.FALSE, //Normalized?
		5 * Float32Array.BYTES_PER_ELEMENT, // Size of vert in bytes
		0 // Offset
	);
	gl.enableVertexAttribArray(posAttribLoc);


	var colAttribLoc = gl.getAttribLocation(program, 'vertColor');
	gl.vertexAttribPointer(
		colAttribLoc,	//Attrib
		3, // Vec size (vec2, vec4,...)
		gl.FLOAT, //Datatype
		gl.FALSE, //Normalized?
		5 * Float32Array.BYTES_PER_ELEMENT, // Size of vert in bytes
		2 * Float32Array.BYTES_PER_ELEMENT // Offset
	);
	gl.enableVertexAttribArray(colAttribLoc);

	gl.useProgram(program);
	
	var drawCall = function(){
		gl.clearColor(0.4,0.2,0.6,1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
		gl.drawArrays(gl.TRIANGLES, 0, 3);
	}
	drawCall();

	
};