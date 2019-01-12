function orbit() {
	// Initialize canvas 
	$("#canvas").empty();
	var renderer = new THREE.WebGLRenderer({alpha: true});
	renderer.setPixelRatio(window.devicePixelRatio);
	var scene = new THREE.Scene();
	
	// Get the div that will hold the renderer
	var container = document.getElementById('canvas');
	var w = container.offsetWidth;
	var h = $(window).height()-10;
	renderer.setSize(w, h);
	
	// Add the renderer to the div
	container.appendChild(renderer.domElement);
	
	// Create camera
	var camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 1000);
	
	// Set up camera 
	camera.position.set(20.4904*0.8,5.4904*0.8,10*0.8); // [15 15 10] * ROT3(-30) * 0.8 
	camera.up = new THREE.Vector3(0, 0, 1);
	camera.lookAt(new THREE.Vector3(0, 0, 0));
	
	// Be able to drag, rotate and zoom in and out 
	var controls = new THREE.OrbitControls(camera, renderer.domElement);
	
	// Set up lighting (ambient and directional)
	scene.add(new THREE.AmbientLight(0x888888));
	var light = new THREE.DirectionalLight(0xcccccc, 0.55);
	light.position.set(60, 60, 60)
	scene.add(light)
	
	// Sphere (3/4) above 
	var planet = new THREE.Mesh(new THREE.SphereGeometry(2, 50, 50, Math.PI * 1.5, Math.PI * 1.5, 0, Math.PI * 0.5), new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture('images/earthmap1k-upper.jpg')}))
	planet.rotateX(Math.PI * 0.5);
	scene.add(planet)
	
	// Sphere lower 
	var planet = new THREE.Mesh(new THREE.SphereGeometry(2, 50, 50, 0, Math.PI * 2, Math.PI * 0.5, Math.PI * 0.5), new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture('images/earthmap1k-lower.jpg')}))
	planet.rotateX(Math.PI * 0.5);
	scene.add(planet)
	
	// IJ plane 
	var plane = new THREE.Mesh(new THREE.PlaneGeometry(8, 8, 1, 1), new THREE.MeshBasicMaterial({color: 0xcccccc,side: THREE.DoubleSide}));
	scene.add(plane);
	
	// IJ plane border
	var group = new THREE.Group();
	group.add(cylinderMesh( new THREE.Vector3( 4, 4, 0 ), new THREE.Vector3( 4, -4, 0 ) ,0x0000) );
	group.add(cylinderMesh( new THREE.Vector3( 4, -4, 0 ), new THREE.Vector3( -4, -4, 0 ) ,0x0000) );
	group.add(cylinderMesh( new THREE.Vector3( -4, -4, 0 ), new THREE.Vector3( -4, 4, 0 ) ,0x0000) );
	group.add(cylinderMesh( new THREE.Vector3( -4, 4, 0 ), new THREE.Vector3( 4, 4, 0 ) ,0x0000) );
	scene.add(group);
	
	// Right circle (on JK plane) 
	var circleJK = new THREE.Mesh(new THREE.CircleGeometry(2, 50, Math.PI * 0.5, Math.PI * 0.5), new THREE.MeshBasicMaterial({color: 0x696969,side: THREE.DoubleSide}));
	circleJK.rotateY(Math.PI * 0.5);
	scene.add(circleJK);
	
	// Left circle (on IJ plane)
	var circleIJ = new THREE.Mesh(new THREE.CircleGeometry(2, 50, Math.PI * 0.5, Math.PI * 0.5), new THREE.MeshBasicMaterial({color: 0x353535,side: THREE.DoubleSide}));
	circleIJ.rotateY(Math.PI * 0.5);
	circleIJ.rotateX(Math.PI * 0.5);
	scene.add(circleIJ);
	
	// Vector and sprite I axis
	scene.add(makeVectorGroup(new THREE.Vector3(0, 0, 0), new THREE.Vector3(6, 0, 0), 0xCD5C5C));
	var spritey = makeTextSprite("I", {fontsize: 28,borderColor: {r: 0,g: 0,b: 0,a: 0},backgroundColor: {r: 0,g: 0,b: 0,a: 0}});
	spritey.position.set(6, 0, 0);
	scene.add(spritey);
	
	// Vector and sprite J axis 
	scene.add(makeVectorGroup(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 6, 0), 0x45B39D));
	var spritey = makeTextSprite("J", {fontsize: 28,borderColor: {r: 0,g: 0,b: 0,a: 0},backgroundColor: {r: 0,g: 0,b: 0,a: 0}});
	spritey.position.set(0, 6, 0);
	scene.add(spritey);
	
	// Vector and sprite K axis 
	scene.add(makeVectorGroup(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 6), 0x2E86C1));
	var spritey = makeTextSprite("K", {fontsize: 28,borderColor: {r: 0,g: 0,b: 0,a: 0},backgroundColor: {r: 0,g: 0,b: 0,a: 0}});
	spritey.position.set(0, 0, 6);
	scene.add(spritey);
	
	// Add e label (scaled)
	if (!(math.round(m(window.orbit.e), 4) === 0)) {
		var group = makeVectorGroup(new THREE.Vector3(0, 0, 0), scale(window.orbit.e), 0x999999);
		scene.add(group);
		var spritey = makeTextSprite("e", {fontsize: 28,borderColor: {r: 0,g: 0,b: 0,a: 0},backgroundColor: {r: 0,g: 0,b: 0,a: 0}});
		spritey.position.set(scale(window.orbit.e).x, scale(window.orbit.e).y, scale(window.orbit.e).z);
		scene.add(spritey);
	}
	
	// Add n label 
	if (!(math.round(window.orbit.i, 4) === 0 || math.round(window.orbit.i, 4) === 180)) {
		var group = makeVectorGroup(new THREE.Vector3(0, 0, 0), scale(window.orbit.n), 0x999999);
		scene.add(group);
		var spritey = makeTextSprite("n", {fontsize: 28,borderColor: {r: 0,g: 0,b: 0,a: 0},backgroundColor: {r: 0,g: 0,b: 0,a: 0}});
		spritey.position.set(scale(window.orbit.n).x, scale(window.orbit.n).y, scale(window.orbit.n).z);
		scene.add(spritey);
	}
	
	// Add h label (scaled)
	var group = makeVectorGroup(new THREE.Vector3(0, 0, 0), scale(window.orbit.h), 0x999999);
	scene.add(group);
	var spritey = makeTextSprite("h", {fontsize: 28,borderColor: {r: 0,g: 0,b: 0,a: 0},backgroundColor: {r: 0,g: 0,b: 0,a: 0}});
	spritey.position.set(scale(window.orbit.h).x, scale(window.orbit.h).y, scale(window.orbit.h).z);
	scene.add(spritey);
	
	// Orbit 
	var orbitPts = [], orbr, orbx, orby;
	if (m(window.orbit.e) >= 0 && m(window.orbit.e) < 1) {
		for (var voii = 0; voii < 362; voii += 2) { // 360 rounding won't close object 
			orbr = window.orbit.p / (1 + m(window.orbit.e) * math.cos(voii / 180 * Math.PI));
			orbx = orbr * math.cos(voii / 180 * Math.PI);
			orby = orbr * math.sin(voii / 180 * Math.PI);
			orbitPts.push(new THREE.Vector3(orbx * 2, orby * 2, 0));
		}
	} else if (m(window.orbit.e) >= 1) { // for parabolic and hyperbolic orbits: filter out reflected part 
		for (var voii = 0; voii < 362; voii += 2) {
			orbr = window.orbit.p / (1 + m(window.orbit.e) * math.cos(voii / 180 * Math.PI));
			orbx = orbr * math.cos(voii / 180 * Math.PI);
			orby = orbr * math.sin(voii / 180 * Math.PI);
			orbitPts.push(new THREE.Vector3(orbx * 2, orby * 2, 0));
		}
		var iif = 0;
		for (var ii = 0; ii < orbitPts.length - 1; ii++) {
			if (orbitPts[ii + 1].x - orbitPts[ii].x > 0) {
				iif = ii;
				break;
			}
		}
		var orbitPts = [];
		for (voii = 360 - iif * 2; voii < 360 + iif * 2; voii += 2) {
			orbr = window.orbit.p / (1 + m(window.orbit.e) * math.cos(voii / 180 * Math.PI));
			orbx = orbr * math.cos(voii / 180 * Math.PI);
			orby = orbr * math.sin(voii / 180 * Math.PI);
			orbitPts.push(new THREE.Vector3(orbx * 2, orby * 2, 0));
		}
		
	}
	
	// Orbit line (tube) 
	if (math.round(m(window.orbit.e), 4) === 1) {
		var mesh = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(orbitPts), 9000, 0.015, 8, false), new THREE.MeshBasicMaterial({color: 0x000000}));
	} else {
		var mesh = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(orbitPts), 400, 0.015, 8, false), new THREE.MeshBasicMaterial({color: 0x000000}));
	}
	scene.add(mesh);
	
	// Orbit translucent yellow 
	if (m(window.orbit.e) <= 1.1) {
		var mesh1 = new THREE.Mesh(new THREE.ShapeBufferGeometry(new THREE.Shape(orbitPts)), new THREE.MeshPhongMaterial({
			color: 0xffff00,
			opacity: 0.2,
			side: THREE.DoubleSide,
			transparent: !0,
			depthWrite: false
		}));
		scene.add(mesh1);
	}
	
	// o
	if (window.orbit.o) {
		mesh.rotateZ(window.orbit.o / 180 * Math.PI);
		if (m(window.orbit.e) <= 1.1) {
			mesh1.rotateZ(window.orbit.o / 180 * Math.PI);
		}
	}
	
	// i
	if (window.orbit.i) {
		mesh.rotateX(window.orbit.i / 180 * Math.PI);
		if (m(window.orbit.e) <= 1.1) {
			mesh1.rotateX(window.orbit.i / 180 * Math.PI);
		}
	}
	
	// w
	if (window.orbit.w) {
		mesh.rotateZ(window.orbit.w / 180 * Math.PI);
		if (m(window.orbit.e) <= 1.1) {
			mesh1.rotateZ(window.orbit.w / 180 * Math.PI);
				}
	}
	
	// Satellite placement 
	// https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Widmanst%C3%A4tten_pattern_kevinzim.jpg/220px-Widmanst%C3%A4tten_pattern_kevinzim.jpg
	var sat = new THREE.Mesh(new THREE.SphereGeometry(0.15, 10, 10, 0, Math.PI * 2, 0, Math.PI * 2), new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture('images/sat.jpg')}));
	sat.position.set(window.orbit.r.valueOf()[0] * 2, window.orbit.r.valueOf()[1] * 2, window.orbit.r.valueOf()[2] * 2);
	scene.add(sat);
	
	// Call animate function 
	animate();
	
	// Listeners 
	window.addEventListener('resize', onWindowResize, false);
	$('#canvas').on('widthChanged',function(){onWindowResize();});
	document.addEventListener('mousedown', onDocumentMouseDown, false);
	document.addEventListener('mouseup', onDocumentMouseUp, false);
	
	// Vectors such as e and h are not to scale. They are scaled to the same magnitude as other vectors (length 6), using this function: 
	function scale(input) {
		a = 6 / math.sqrt(math.pow(input.valueOf()[0], 2) + math.pow(input.valueOf()[1], 2) + math.pow(input.valueOf()[2], 2));
		var output = new THREE.Vector3();
		output.x = a * input.valueOf()[0];
		output.y = a * input.valueOf()[1];
		output.z = a * input.valueOf()[2];
		return output;
	}
	
	// Combine makeArrowHelpers() and cylinderMesh() to make a complete arrow   
	function makeVectorGroup(from, to, color) {
		var g = new THREE.Vector3().subVectors(to, from);
		var tn = math.sqrt(-4 * math.sqrt(math.pow(g.x, 2) + math.pow(g.y, 2) + math.pow(g.z, 2)) + 4 * math.pow(g.x, 2) + 4 * math.pow(g.y, 2) + 4 * math.pow(g.z, 2) + 1);
		var td = 2 * math.sqrt(math.pow(g.x, 2) + math.pow(g.y, 2) + math.pow(g.z, 2));
		var t = tn / td;
		var to2 = new THREE.Vector3();
		to2.x = from.x + t * g.x;
		to2.y = from.y + t * g.y;
		to2.z = from.z + t * g.z;
		var group = new THREE.Group();
		var arrowHelper = makeArrowHelper(from, to, color);
		var cylinder = cylinderMesh(from, to2, color);
		group.add(arrowHelper);
		group.add(cylinder);
		return group;
	}
	
	// Make an arrow helper from one point to another in specified color 
	function makeArrowHelper(from, to, color) {
		var direction = to.clone().sub(from);
		var length = direction.length();
		var arrowHelper = new THREE.ArrowHelper(direction.normalize(), from, length, color, 0.5, 0.2);
		return arrowHelper;
	}
	
	// Make cylinder mesh from one point to another in specified color
	function cylinderMesh(pointX, pointY, meshColor) {
		var direction = new THREE.Vector3().subVectors(pointY, pointX);
		var orientation = new THREE.Matrix4();
		orientation.lookAt(pointX, pointY, new THREE.Object3D().up);
		orientation.multiply(new THREE.Matrix4().set(1, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1));
		var edgeGeometry = new THREE.CylinderGeometry(0.015, 0.015, direction.length(), 8, 1);
		var edge = new THREE.Mesh(edgeGeometry, new THREE.MeshBasicMaterial({
			color: meshColor
		}));
		edge.applyMatrix(orientation);
		// position based on midpoints - there may be a better solution than this
		edge.position.x = (pointY.x + pointX.x) / 2;
		edge.position.y = (pointY.y + pointX.y) / 2;
		edge.position.z = (pointY.z + pointX.z) / 2;
		return edge;
	}
	
	// Responsive three.js 
	function onWindowResize() {
		var container = document.getElementById('canvas');
		var w = container.offsetWidth;
		var h = $(window).height()-10;
		camera.aspect = w / h;
		camera.updateProjectionMatrix();
		renderer.setSize(w, h);
	}
	
	// Render function wrapper 
	function render() {
		renderer.render(scene, camera);
	}
	
	// Actions for when mouse if clicked down 
	function onDocumentMouseDown() {
	}
	
	// Actions for when mouse is up 
	function onDocumentMouseUp() {
	}
	
	// three.js animations call 
	function animate() {
		requestAnimationFrame(animate);
		render();
		controls.update();
	}
	
	// Create 2D text sprite 
	// stemkoski.github.io/Three.js/Sprite-Text-Labels.html/
	// Example parameter: {fontsize: 28, borderColor: {r: 0, g: 0, b: 0, a: 0}}
	function makeTextSprite(message, parameters) {
		if (parameters === undefined) parameters = {};
		var fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Courier";
		var fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] : 18;
		var borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 4;
		var borderColor = parameters.hasOwnProperty("borderColor") ? parameters["borderColor"] : {
			r: 0,
			g: 0,
			b: 0,
			a: 1.0
		};
		var backgroundColor = parameters.hasOwnProperty("backgroundColor") ? parameters["backgroundColor"] : {
			r: 255,
			g: 255,
			b: 255,
			a: 1.0
		};
		var textColor = parameters.hasOwnProperty("textColor") ? parameters["textColor"] : {
			r: 0,
			g: 0,
			b: 0,
			a: 1.0
		};
		var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');
		// Fix for positioning (define canvas size to prevent defaulting to 150 x 300)  
		canvas.width = 24;
		canvas.height = 48;
		context.font = "Bold " + fontsize + "px " + fontface;
		var metrics = context.measureText(message);
		var textWidth = metrics.width;
		context.fillStyle = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";
		context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";
		context.lineWidth = borderThickness;
		roundRect(context, borderThickness / 2, borderThickness / 2, (textWidth + borderThickness) * 1.1, fontsize * 1.4 + borderThickness, 8);
		context.fillStyle = "rgba(" + textColor.r + ", " + textColor.g + ", " + textColor.b + ", 1.0)";
		context.fillText(message, borderThickness, fontsize + borderThickness);
		context.textAlign = 'center';
		context.textBaseline = "middle";
		var texture = new THREE.Texture(canvas)
		texture.needsUpdate = true;
		var spriteMaterial = new THREE.SpriteMaterial({
			map: texture
		});
		var sprite = new THREE.Sprite(spriteMaterial);
		sprite.scale.set(0.01 * fontsize, 0.02 * fontsize, 0.02 * fontsize);
		return sprite;
	}
	
	// Needed because roundRect() is called in makeTextSprite(): 
	// stemkoski.github.io/Three.js/Sprite-Text-Labels.html
	function roundRect(ctx, x, y, w, h, r) {
		ctx.beginPath();
		ctx.moveTo(x + r, y);
		ctx.lineTo(x + w - r, y);
		ctx.quadraticCurveTo(x + w, y, x + w, y + r);
		ctx.lineTo(x + w, y + h - r);
		ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
		ctx.lineTo(x + r, y + h);
		ctx.quadraticCurveTo(x, y + h, x, y + h - r);
		ctx.lineTo(x, y + r);
		ctx.quadraticCurveTo(x, y, x + r, y);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
	}
	
	// Calculate magnitude of 3x1 array (like 3D vector) 
	function m(vect) {
		return output = math.sqrt(math.pow(vect.valueOf()[0], 2) + math.pow(vect.valueOf()[1], 2) + math.pow(vect.valueOf()[2], 2));
	}
}
