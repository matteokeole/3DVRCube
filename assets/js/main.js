const R = {x: 0, y: 0}, // Cube rotation values
	// Parameters
	P = 2, // Smooth motion (higher number = smoother motion)
	// Device orientation event
	move = e => {
		R.x = e.gamma;
		R.y = e.beta;
		document.querySelector(".test").innerHTML = `${R.x}<br>${R.y}`;
		let transform = `rotateX(${-R.y.toFixed(P)}deg) rotateY(${-R.x.toFixed(P)}deg)`;
		cube.style["-webkit-transform"] = transform;
		cube.style.transform = transform;
		shadowFacing(R.y)
	},
	// Cube shadow facing
	shadowFacing = ry => {
		// Apply a shadow to the faces
		cubeTop.style.boxShadow = `inset 0 0 0 100px rgba(255, 255, 255, ${Math.abs((180 - Math.abs(ry)) / 180 - 0.5)})`;
		cubeBottom.style.boxShadow = `inset 0 0 0 100px rgba(0, 0, 0, ${Math.abs((180 - Math.abs(ry)) / 180 - 0.5)})`;
		let rgb = (R.y >= 0) ? "255, 255, 255" : (R.y < 0) ? "0, 0, 0" : undefined;
		if (rgb) {
			[cubeFront, cubeBack, cubeLeft, cubeRight].forEach(face => {
				face.style.boxShadow = `inset 0 0 0 100px rgba(${rgb}, ${Math.abs((90 - Math.abs(ry)) / 180 - 0.5)})`
			})
		}
	},
	// Cube & faces selectors
	cube = document.querySelector("#cube"),
	cubeTop = cube.children[0],
	cubeBottom = cube.children[1],
	cubeFront = cube.children[2],
	cubeBack = cube.children[3],
	cubeLeft = cube.children[4],
	cubeRight = cube.children[5];
// Device orientation change event
if (DeviceOrientationEvent) addEventListener("deviceorientation", move)