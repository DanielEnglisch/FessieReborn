function readTextFile(file)
{
	var rawFile = new XMLHttpRequest();
	var allText = "";
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;
            }
        }
    }
	rawFile.send(null);
	return allText;
}


var InitDemo = function(){

	var canvas = document.getElementById('screen');
	var gl = canvas.getContext('webgl');

	if(!gl){
		gl = canvas.getContext('experimental-webgl');
	}

	if(!gl){
		alert("Not supported!");
	}

	gl.clearColor(0.4,0.2,0.6,1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
	
	//Dont render obstructed vertecies
	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);
	gl.frontFace(gl.CCW);
	gl.cullFace(gl.BACK);
	

	// ### Setup Shaders:

	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	
	gl.shaderSource(vertexShader, readTextFile("VertexShader.glsl"));
	gl.shaderSource(fragmentShader, readTextFile("FragmentShader.glsl"));

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
	[	 //X   //Y  //Z		//RGB
		-1.0, 1.0, -1.0,   0, 0,
		-1.0, 1.0, 1.0,    0, 1,
		1.0, 1.0, 1.0,     1, 1,
		1.0, 1.0, -1.0,    1, 0,

		// Left
		-1.0, 1.0, 1.0,    0, 0,
		-1.0, -1.0, 1.0,   1, 0,
		-1.0, -1.0, -1.0,  1, 1,
		-1.0, 1.0, -1.0,   0, 1,

		// Right
		1.0, 1.0, 1.0,    1, 1,
		1.0, -1.0, 1.0,   0, 1,
		1.0, -1.0, -1.0,  0, 0,
		1.0, 1.0, -1.0,   1, 0,

		// Front
		1.0, 1.0, 1.0,    1, 1,
		1.0, -1.0, 1.0,    1, 0,
		-1.0, -1.0, 1.0,    0, 0,
		-1.0, 1.0, 1.0,    0, 1,

		// Back
		1.0, 1.0, -1.0,    0, 0,
		1.0, -1.0, -1.0,    0, 1,
		-1.0, -1.0, -1.0,    1, 1,
		-1.0, 1.0, -1.0,    1, 0,

		// Bottom
		-1.0, -1.0, -1.0,   1, 1,
		-1.0, -1.0, 1.0,    1, 0,
		1.0, -1.0, 1.0,     0, 0,
1.0, -1.0, -1.0, 0, 1,
	];

	//Gibt die Vertecies an die ein triangle formen
	var indices =
	[
		// Top
		0, 1, 2,
		0, 2, 3,

		// Left
		5, 4, 6,
		6, 4, 7,

		// Right
		8, 9, 10,
		8, 10, 11,

		// Front
		13, 12, 14,
		15, 14, 12,

		// Back
		16, 17, 18,
		16, 18, 19,

		// Bottom
		21, 20, 22,
		22, 20, 23
	];


	// ### Setup/Bind Buffer
	var vertBuff = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertBuff);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertecies), gl.STATIC_DRAW);

	var indBuff = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indBuff);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
	
	// ### Init Shaders
	var posAttribLoc = gl.getAttribLocation(program, 'vertPosition');
	gl.vertexAttribPointer(
		posAttribLoc,	//Attrib
		3, // Vec size (vec2, vec4,...)
		gl.FLOAT, //Datatype
		gl.FALSE, //Normalized?
		5 * Float32Array.BYTES_PER_ELEMENT, // Size of vert in bytes
		0 // Offset
	);
	gl.enableVertexAttribArray(posAttribLoc);


	var texCoordAttrib = gl.getAttribLocation(program, 'vertTexCoord');
	gl.vertexAttribPointer(
		texCoordAttrib,	//Attrib
		2, // Vec size (vec2, vec4,...)
		gl.FLOAT, //Datatype
		gl.FALSE, //Normalized?
		5 * Float32Array.BYTES_PER_ELEMENT, // Size of vert in bytes
		3 * Float32Array.BYTES_PER_ELEMENT // Offset
	);
	gl.enableVertexAttribArray(texCoordAttrib);

	// ### Create Texture
	var texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	
	gl.texImage2D(
		gl.TEXTURE_2D,
		0.0,
		gl.RGBA,
		gl.RGBA,
		gl.UNSIGNED_BYTE,
		document.getElementById("box-img")
	);

	gl.bindTexture(gl.TEXTURE_2D, null);

	// run program
	gl.useProgram(program);	

	//Matrix Uniform attrib from shader
	var matWorldUniLoc = gl.getUniformLocation(program, 'mWorld');
	var matViewUniLoc = gl.getUniformLocation(program, 'mView');
	var matProjUniLoc = gl.getUniformLocation(program, 'mProj');

	//Create matricies
	var worldMatrix = new Float32Array(16);
	var viewMatrix = new Float32Array(16);
	var projMatrix = new Float32Array(16);

	mat4.identity(worldMatrix);
	mat4.lookAt(viewMatrix, [0,0,-5], [0,0,0], [0,1,0] ); //Pos / Lookat / whereisup
	mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.width / canvas.height, 0.1, 1000);

	//Pass matricies to uniform atrrib of shader
	gl.uniformMatrix4fv(matWorldUniLoc, gl.FALSE, worldMatrix);
	gl.uniformMatrix4fv(matViewUniLoc, gl.FALSE, viewMatrix);
	gl.uniformMatrix4fv(matProjUniLoc, gl.FALSE, projMatrix);
	

	// ### Render Loop
	var identityMatrix = new Float32Array(16);
	mat4.identity(identityMatrix);

	var xRot = new Float32Array(16);
	var yRot = new Float32Array(16);
	
	var angle = 0;
	var loop = function(){
		
		//Creating Rotations
		angle = performance.now() / 1000 / 4 * 2 * Math.PI;			// 360 in 6 sec
		mat4.rotate(xRot, identityMatrix, angle, [0,1,0]);	
		mat4.rotate(yRot, identityMatrix, angle / 4, [1,0,0]);
		mat4.mul(worldMatrix, xRot, yRot); //Apply rotation to word
		gl.uniformMatrix4fv(matWorldUniLoc, gl.FALSE, worldMatrix); //Update world
		
		//Render
		gl.clearColor(0.4,0.2,0.6,1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.activeTexture(gl.TEXTURE0);
		gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

		requestAnimationFrame(loop);		
		
	};
	requestAnimationFrame(loop);		
	
};