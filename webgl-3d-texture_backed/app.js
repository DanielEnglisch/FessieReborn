var gl;

var InitDemo = function () {
	loadTextResource('./VertexShader.glsl', function (vsErr, vsText) {
		if (vsErr) {
			alert('Fatal error getting vertex shader (see console)');
			console.error(vsErr);
		} else {
			loadTextResource('./FragmentShader.glsl', function (fsErr, fsText) {
				if (fsErr) {
					alert('Fatal error getting fragment shader (see console)');
					console.error(fsErr);
				} else {
					loadJSONResource('./model.json', function (modelErr, modelObj) {
						if (modelErr) {
							alert('Fatal error getting Susan model (see console)');
							console.error(fsErr);
						} else {
							loadImage('./model.png', function (imgErr, img) {
								if (imgErr) {
									alert('Fatal error getting Susan texture (see console)');
									console.error(imgErr);
								} else { 
									RunDemo(vsText, fsText, img, modelObj);
								}
							});
						}
					});
				}
			});
		}
	});
};

var RunDemo = function (vertexShaderText, fragmentShaderText, SusanImage, SusanModel) {
	console.log('This is working');

	var canvas = document.getElementById('screen');
	gl = canvas.getContext('webgl');

	if (!gl) {
		console.log('WebGL not supported, falling back on experimental-webgl');
		gl = canvas.getContext('experimental-webgl');
	}

	if (!gl) {
		alert('Your browser does not support WebGL');
	}

	gl.clearColor(0.75, 0.85, 0.8, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);
	gl.frontFace(gl.CCW);
	gl.cullFace(gl.BACK);

	//
	// Create shaders
	// 
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

	gl.shaderSource(vertexShader, vertexShaderText);
	gl.shaderSource(fragmentShader, fragmentShaderText);

	gl.compileShader(vertexShader);
	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
		return;
	}

	gl.compileShader(fragmentShader);
	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
		return;
	}

	var program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.error('ERROR linking program!', gl.getProgramInfoLog(program));
		return;
	}
	gl.validateProgram(program);
	if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
		console.error('ERROR validating program!', gl.getProgramInfoLog(program));
		return;
	}

	//
	// Create buffer
	//
	var susanVertices = SusanModel.meshes[0].vertices;
	var susanIndices = [].concat.apply([], SusanModel.meshes[0].faces);
	var susanTexCoords = SusanModel.meshes[0].texturecoords[0];

	var susanPosVertexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, susanPosVertexBufferObject);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(susanVertices), gl.STATIC_DRAW);

	var susanTexCoordVertexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, susanTexCoordVertexBufferObject);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(susanTexCoords), gl.STATIC_DRAW);

	var susanIndexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, susanIndexBufferObject);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(susanIndices), gl.STATIC_DRAW);

	gl.bindBuffer(gl.ARRAY_BUFFER, susanPosVertexBufferObject);
	var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
	gl.vertexAttribPointer(
		positionAttribLocation, // Attribute location
		3, // Number of elements per attribute
		gl.FLOAT, // Type of elements
		gl.FALSE,
		3 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
		0 // Offset from the beginning of a single vertex to this attribute
	);
	gl.enableVertexAttribArray(positionAttribLocation);

	gl.bindBuffer(gl.ARRAY_BUFFER, susanTexCoordVertexBufferObject);
	var texCoordAttribLocation = gl.getAttribLocation(program, 'vertTexCoord');
	gl.vertexAttribPointer(
		texCoordAttribLocation, // Attribute location
		2, // Number of elements per attribute
		gl.FLOAT, // Type of elements
		gl.FALSE,
		2 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
		0
	);
	gl.enableVertexAttribArray(texCoordAttribLocation);

	//
	// Create texture
	//
	var modelTexture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, modelTexture);
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texImage2D(
		gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
		gl.UNSIGNED_BYTE,
		SusanImage
	);
	gl.bindTexture(gl.TEXTURE_2D, null);

	// Tell OpenGL state machine which program should be active.
	gl.useProgram(program);

	var matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
	var matViewUniformLocation = gl.getUniformLocation(program, 'mView');
	var matProjUniformLocation = gl.getUniformLocation(program, 'mProj');

	var worldMatrix = new Float32Array(16);
	var viewMatrix = new Float32Array(16);
	var projMatrix = new Float32Array(16);

	var locX = -30;
	var locY = -30;
	var locZ = -10;

	var mX = 0;
	var mY = 0;
	var mZ = 0;
	

	mat4.identity(worldMatrix);
	mat4.lookAt(viewMatrix, [locX, locY, locZ], [0,0,0], [0, 1, 0]); // Camera
	mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.clientWidth / canvas.clientHeight, 0.1, 1000.0);

	gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
	gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
	gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);

	var xRotationMatrix = new Float32Array(16);
	var yRotationMatrix = new Float32Array(16);
	var worldRotation = new Float32Array(16);
	
	// Key Event
	document.addEventListener('keydown', function(event) {
		if (event.keyCode == 38) {
			mat4.lookAt(viewMatrix, [locX, ++locY, locZ], [locX+5, locY, locZ+5], [0, 1, 0]); // Camera			
		}else if (event.keyCode == 40) {
			mat4.lookAt(viewMatrix, [locX, --locY, locZ], [locX+5, locY, locZ+5], [0, 1, 0]); // Camera			
		} else if (event.keyCode == 37) {
			mat4.lookAt(viewMatrix, [locX, locY, --locZ], [locX+5, locY, locZ+5], [0, 1, 0]); // Camera			
		}else if (event.keyCode == 39) {
			mat4.lookAt(viewMatrix, [locX, locY, ++locZ], [locX+5, locY, locZ+5], [0, 1, 0]); // Camera			
		}else if (event.keyCode == 87) {
			mat4.lookAt(viewMatrix, [++locX, locY, locZ], [locX+5, locY, locZ+5], [0, 1, 0]); // Camera			
		}else if (event.keyCode == 83) {
			mat4.lookAt(viewMatrix, [--locX, locY, locZ], [locX+5, locY, locZ+5], [0, 1, 0]); // Camera			
		}

		console.info(locX + " " + locY + " " + locZ);
	});

	//
	// Main render loop
	//
	var identityMatrix = new Float32Array(16);
	mat4.identity(identityMatrix);
	var angle = 0;
	var loop = function () {

		mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.clientWidth / canvas.clientHeight, 0.1, 1000.0);
		gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
		

		angle = performance.now() / 1000 / 6 * 2 * Math.PI;
		mat4.rotate(yRotationMatrix, identityMatrix, -90, [0, 1, 0]);
		mat4.rotate(xRotationMatrix, identityMatrix,0 , [0, 1, 0]);
		mat4.mul(worldMatrix, yRotationMatrix, xRotationMatrix );

		//mat4.rotate(worldRotation, identityMatrix, -90 , [1, 0, 0]);
		//mat4.mul(worldMatrix, worldRotation);
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);

		gl.clearColor(0.75, 0.85, 0.8, 1.0);
		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

		gl.bindTexture(gl.TEXTURE_2D, modelTexture);
		gl.activeTexture(gl.TEXTURE0);

		gl.drawElements(gl.TRIANGLES, susanIndices.length, gl.UNSIGNED_SHORT, 0);

		requestAnimationFrame(loop);
	};
	requestAnimationFrame(loop);
};