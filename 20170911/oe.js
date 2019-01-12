$('.inputs:lt(6)').keydown(function(key) {
	if (key.which === 13) {
		var index = $('.inputs').index(this) + 1;
		$('.inputs').eq(index).select();
	}
});
$('.inputs:lt(6)').keyup(function() {
	if ($('.inputs:lt(6)').filter(function() {
			return $.trim($(this).val()).length === 0
		}).length == 0) {
		var r = [],
			v = [];
		$('.inputs:lt(3)').each(function(i) {
			r = math.subset(r, math.index(i), math.eval($(this).val()), 0);
		});
		$('.inputs:lt(6):gt(2)').each(function(i) {
			v = math.subset(v, math.index(i), math.eval($(this).val()), 0);
		});
		var orbit = new Orbit(r, v);
		(function() {
			var r = math.round(orbit.r, 4);
			var v = math.round(orbit.v, 4);
			var h = math.round(orbit.h, 4);
			var u = math.round(orbit.u, 4);
			var p = math.round(orbit.p, 4);
			var e = math.round(orbit.e, 4);
			var a = math.round(orbit.a, 4);
			var i = math.round(orbit.i, 4);
			var n = math.round(orbit.n, 4);
			try {
				var o = math.round(orbit.o, 4);
			} catch (e) {}
			try {
				var w = math.round(orbit.w, 4);
			} catch (e) {}
			try {
				var vo = math.round(orbit.vo, 4);
			} catch (e) {}
			var me = math.round(m(orbit.e), 4);
			var mh = math.round(m(orbit.h), 4);
			var $results = $('.results').eq(0);
			$results.empty()
			if (mh === 0) {
				$results.append('<p> <\/p>').append('<p> Specific angular momentum, $h$, is zero. <\/p>').append('<p> Try using a different $\\mathbf{r}$ and $\\mathbf{v}$ combination. <\/p>');
			} else {
				$results.append('<p> <\/p>').append('<p> You Entered: <\/p>').append('<p> $$\\mathbf{r} = \\left(' + r + '\\right) \\mathrm{DU}$$ <\/p>').append('<p> $$\\mathbf{v} = \\left(' + v + '\\right) \\mathrm{DU\\over TU}$$ <\/p>').append('<p> Specific Angular Momentum $\\mathbf{h}$ <\/p>').append('<p> $$ \\mathbf{h} = \\mathbf{r}\\times\\mathbf{v} $$ <\/p>').append('<p> $$ \\mathbf{h} = (' + h + ') \\mathrm{{DU}^2\\over TU}$$ <\/p>').append('<p> Standard Gravitational Parameter $\\mu$ <\/p>').append('<p> $$\\mu=1 \\mathrm{{DU}^3\\over {TU}^2}$$ <\/p>').append('<p> Orbit Parameter $p$ (or Semi-Latus Rectum) <\/p>').append('<p> $$p = {h^2\\over \\mu} $$ <\/p>').append('<p> $p = ' + p + ' \\;\\mathrm{DU}$ <\/p>').append('<p> Eccentricity Vector $\\mathbf{e}$ <\/p>').append('<p> $$ \\mathbf{e} = {1\\over \\mu}\\left[\\left(v^2-{\\mu\\over r}\\right)\\mathbf{r}-(\\mathbf{r}\\cdot\\mathbf{v})\\mathbf{v}\\right] $$ <\/p>').append('<p> $$ \\mathbf{e} = (' + e + ') $$ <\/p>').append('<p> Eccentricity $e$ (Magnitude of Eccentricity Vector) <\/p>').append('<p> <mark>$ e=' + me + '$</mark> <\/p>');
				if (me === 0) {
					$results.append('<p> Orbit Type: Circular <\/p>');
				} else if (me > 0 && me < 1) {
					$results.append('<p> Orbit Type: Elliptic <\/p>');
				} else if (me === 1) {
					$results.append('<p> Orbit Type: Parabolic <\/p>');
				} else if (me > 1) {
					$results.append('<p> Orbit Type: Hyperbolic <\/p>');
				}
				$results.append('<p> Semi-Major Axis $a$ <\/p>').append('<p> if $e=1$ then $a=\\infty$ <\/p>').append('<p> else $a={p\\over 1-e^2}$ <\/p>')
				if (me === 1) {
					$results.append('<p> <mark>$a=\\infty$</mark> <\/p>');
				} else {
					$results.append('<p> <mark>$a=' + a + '\\;\\mathrm{DU}$</mark> <\/p>');
				}
				if (me === 1) {
					$results.append('<p> Orbit Type: Parabolic </p>');
				} else if (a < 0) {
					$results.append('<p> Orbit Type: Hyperbolic <\/p>');
				}
				$results.append('<p> Inclincation $i$ <\/p>').append('<p> $$ i=\\cos^{-1}{\\left({h_K\\over h}\\right)} $$ <\/p>').append('<p> <mark>$ i=' + i + '$ degrees</mark> <\/p>');
				if (i === 0) {
					$results.append('<p> Orbit Type: Direct Equatorial <\/p>');
				} else if (i > 0 && i < 90) {
					$results.append('<p> Orbit Type: Direct <\/p>');
				} else if (i === 90) {
					$results.append('<p> Orbit Type: Polar <\/p>');
				} else if (i > 90 && i < 180) {
					$results.append('<p> Orbit Type: Retrograde <\/p>');
				} else {
					$results.append('<p> Orbit Type: Retrograde Equatorial <\/p>');
				}
				$results.append('<p> Normal Vector $\\mathbf{n}$ <\/p>').append('<p> $$ \\mathbf{n} = (0, 0, 1) \\times \\mathbf{h} $$ <\/p>').append('<p> $$ \\mathbf{n} = \\left(' + n + '\\right)$$ <\/p>').append('<p> Longitude of Ascending Node $\\Omega$ <\/p>').append('<p> if $n = 0$ then $\\Omega = undefined $ <\/p>').append('<p> else if $n_J < 0$ then $\\Omega = 2\\pi - \\cos^{-1}{\\left({n_I\\over n}\\right)} $ <\/p>').append('<p> else $\\Omega = \\cos^{-1}{\\left({n_I\\over n}\\right)} $ <\/p>');
				if (!(orbit.o === undefined)) {
					$results.append('<p> <mark>$\\Omega = ' + o + ' $ degrees </mark> <\/p>');
				} else {
					$results.append('<p> <mark>$\\Omega = ' + orbit.o + ' $ </mark> <\/p>');
				}
				$results.append('<p> Argument of Periapsis $\\omega$').append('<p> if $ne = 0$ then $\\omega = undefined $ <\/p>').append('<p> else if $e_K < 0$ then $\\omega = 2\\pi - \\cos^{-1}{\\left({\\mathbf{n} \\cdot \\mathbf{e} \\over ne}\\right)} $ <\/p>').append('<p> else $\\omega = \\cos^{-1}{\\left({\\mathbf{n} \\cdot \\mathbf{e} \\over ne}\\right)} $ <\/p>');
				if (!(orbit.w === undefined)) {
					$results.append('<p> <mark>$\\omega = ' + w + ' $ degrees </mark> <\/p>');
				} else {
					$results.append('<p> <mark>$\\omega = ' + orbit.w + ' $ </mark> <\/p>');
				}
				$results.append('<p> True Anomaly at Epoch $\\nu_0$ <\/p>').append('<p> if $er = 0$ then $\\nu_0 = undefined $ <\/p>').append('<p> else if $\\mathbf{r} \\cdot \\mathbf{v} < 0$ then $\\nu_0=2\\pi - \\cos^{-1}{\\left({\\mathbf{e} \\cdot \\mathbf{r} \\over er}\\right)} $ <\/p>').append('<p> else $\\nu_0 = \\cos^{-1}{\\left({\\mathbf{e} \\cdot \\mathbf{r} \\over er}\\right)} $ <\/p>');
				if (!(orbit.vo === undefined)) {
					$results.append('<p> <mark>$\\nu_0 = ' + vo + ' $ degrees </mark> <\/p>');
				} else {
					$results.append('<p> <mark>$\\nu_0 = ' + orbit.vo + ' $ </mark> <\/p>');
				}
			}
			MathJax.Hub.Queue(['Typeset', MathJax.Hub, $results[0]]);
		})();
		/** 
		 * three.js
		 */
		var sphereExists = false;
		(function() {
			$("#canvas").empty();
			var renderer = new THREE.WebGLRenderer({
				alpha: true
			});
			renderer.setPixelRatio(window.devicePixelRatio);
			var scene = new THREE.Scene();
			var scene2 = new THREE.Scene();
			// Get the div that will hold the renderer
			var container = document.getElementById('canvas');
			var w = container.offsetWidth;
			var h = container.offsetWidth;
			renderer.setSize(w, h);
			// Add the renderer to the div
			container.appendChild(renderer.domElement);
			// Create camera
			var camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 1000);
			// Set up camera 
			camera.position.set(15.2919, 4.2692, 6.9235);
			camera.up = new THREE.Vector3(0, 0, 1);
			camera.lookAt(new THREE.Vector3(0, 0, 0));
			// Be able to drag and rotate and zoom in and out 
			var controls = new THREE.OrbitControls(camera, renderer.domElement);
			// Set up lighting (ambient and directional)
			scene.add(new THREE.AmbientLight(0x888888));
			var light = new THREE.DirectionalLight(0xcccccc, 0.55);
			light.position.set(60, 60, 60)
			scene.add(light)
				// Sphere (3/4) top
			var planet = new THREE.Mesh(new THREE.SphereGeometry(2, 50, 50, Math.PI * 1.5, Math.PI * 1.5, 0, Math.PI * 0.5), new THREE.MeshPhongMaterial())
			planet.rotateX(Math.PI * 0.5);
			scene.add(planet)
				// Sphere bottom 
			var planet = new THREE.Mesh(new THREE.SphereGeometry(2, 50, 50, 0, Math.PI * 2, Math.PI * 0.5, Math.PI * 0.5), new THREE.MeshPhongMaterial())
			planet.rotateX(Math.PI * 0.5);
			scene.add(planet)
				//material.map = THREE.ImageUtils.loadTexture('figure7.jpg')
				// IJ plane 
			var plane = new THREE.Mesh(new THREE.PlaneGeometry(10, 10, 1, 1), new THREE.MeshBasicMaterial({
				color: 0xF1F1F1,
				side: THREE.DoubleSide
			}));
			scene.add(plane);
			// Right circle (on JK plane) 
			var circleJK = new THREE.Mesh(new THREE.CircleGeometry(2, 50, Math.PI * 0.5, Math.PI * 0.5), new THREE.MeshBasicMaterial({
				color: 0xD1D1D1,
				side: THREE.DoubleSide
			}));
			circleJK.rotateY(Math.PI * 0.5);
			scene.add(circleJK);
			// Left circle (on IJ plane)
			var circleIJ = new THREE.Mesh(new THREE.CircleGeometry(2, 50, Math.PI * 0.5, Math.PI * 0.5), new THREE.MeshBasicMaterial({
				color: 0xC1C1C1,
				side: THREE.DoubleSide
			}));
			circleIJ.rotateY(Math.PI * 0.5);
			circleIJ.rotateX(Math.PI * 0.5);
			scene.add(circleIJ);
			// Vector and sprite I axis
			var group = makeVectorGroup(new THREE.Vector3(0, 0, 0), new THREE.Vector3(6, 0, 0), 0xCD5C5C);
			scene.add(group);
			var spritey = makeTextSprite("I", {
				fontsize: 28,
				borderColor: {
					r: 0,
					g: 0,
					b: 0,
					a: 0
				},
				backgroundColor: {
					r: 0,
					g: 0,
					b: 0,
					a: 0
				}
			});
			spritey.position.set(6, 0, 0);
			scene2.add(spritey);
			// Vector and sprite J axis 
			var group = makeVectorGroup(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 6, 0), 0x45B39D);
			scene.add(group);
			var spritey = makeTextSprite("J", {
				fontsize: 28,
				borderColor: {
					r: 0,
					g: 0,
					b: 0,
					a: 0
				},
				backgroundColor: {
					r: 0,
					g: 0,
					b: 0,
					a: 0
				}
			});
			spritey.position.set(0, 6, 0);
			scene2.add(spritey);
			// Vector and sprite K axis 
			var group = makeVectorGroup(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 6), 0x2E86C1);
			scene.add(group);
			var spritey = makeTextSprite("K", {
				fontsize: 28,
				borderColor: {
					r: 0,
					g: 0,
					b: 0,
					a: 0
				},
				backgroundColor: {
					r: 0,
					g: 0,
					b: 0,
					a: 0
				}
			});
			spritey.position.set(0, 0, 6);
			scene2.add(spritey);
			if (!(math.round(m(orbit.e), 4) === 0)) {
				var group = makeVectorGroup(new THREE.Vector3(0, 0, 0), scale(orbit.e), 0xa3a3a3);
				scene.add(group);
				var spritey = makeTextSprite("e", {
					fontsize: 28,
					borderColor: {
						r: 0,
						g: 0,
						b: 0,
						a: 0
					},
					backgroundColor: {
						r: 0,
						g: 0,
						b: 0,
						a: 0
					}
				});
				spritey.position.set(scale(orbit.e).x, scale(orbit.e).y, scale(orbit.e).z);
				scene2.add(spritey);
			}
			if (!(math.round(orbit.i, 4) === 0 || math.round(orbit.i, 4) === 180)) {
				var group = makeVectorGroup(new THREE.Vector3(0, 0, 0), scale(orbit.n), 0xa3a3a3);
				scene.add(group);
				var spritey = makeTextSprite("n", {
					fontsize: 28,
					borderColor: {
						r: 0,
						g: 0,
						b: 0,
						a: 0
					},
					backgroundColor: {
						r: 0,
						g: 0,
						b: 0,
						a: 0
					}
				});
				spritey.position.set(scale(orbit.n).x, scale(orbit.n).y, scale(orbit.n).z);
				scene2.add(spritey);
			}
			var group = makeVectorGroup(new THREE.Vector3(0, 0, 0), scale(orbit.h), 0xa3a3a3);
			scene.add(group);
			var spritey = makeTextSprite("h", {
				fontsize: 28,
				borderColor: {
					r: 0,
					g: 0,
					b: 0,
					a: 0
				},
				backgroundColor: {
					r: 0,
					g: 0,
					b: 0,
					a: 0
				}
			});
			spritey.position.set(scale(orbit.h).x, scale(orbit.h).y, scale(orbit.h).z);
			scene2.add(spritey);
			// Orbit 
			var orbitPts = [],
				orbr, orbx, orby;
			if (m(orbit.e) > 0 && m(orbit.e) < 1) {
				for (var voii = 0; voii < 362; voii += 2) { // 360 rounding won't close object object
					orbr = orbit.p / (1 + m(orbit.e) * math.cos(voii / 180 * Math.PI));
					orbx = orbr * math.cos(voii / 180 * Math.PI);
					orby = orbr * math.sin(voii / 180 * Math.PI);
					orbitPts.push(new THREE.Vector3(orbx * 2, orby * 2, 0));
				}
			} else if (m(orbit.e) >= 1) { // for parabolic and hyperbolic orbits filter out reflected part 
				for (var voii = 0; voii < 362; voii += 2) {
					orbr = orbit.p / (1 + m(orbit.e) * math.cos(voii / 180 * Math.PI));
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
					orbr = orbit.p / (1 + m(orbit.e) * math.cos(voii / 180 * Math.PI));
					orbx = orbr * math.cos(voii / 180 * Math.PI);
					orby = orbr * math.sin(voii / 180 * Math.PI);
					orbitPts.push(new THREE.Vector3(orbx * 2, orby * 2, 0));
				}
			}
			if (math.round(m(orbit.e), 4) === 1) {
				var mesh = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(orbitPts), 9000, 0.05, 8, false), new THREE.MeshBasicMaterial({
					color: 0x000000
				}));
			} else {
				var mesh = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(orbitPts), 400, 0.05, 8, false), new THREE.MeshBasicMaterial({
					color: 0x000000
				}));
			}
			scene.add(mesh);
			if (m(orbit.e) <= 1.1) {
				var mesh1 = new THREE.Mesh(new THREE.ShapeBufferGeometry(new THREE.Shape(orbitPts)), new THREE.MeshPhongMaterial({
					color: 0xffff00,
					opacity: 0.2,
					side: THREE.DoubleSide,
					transparent: !0
				}));
				scene.add(mesh1);
			}
			if (orbit.o) {
				mesh.rotateZ(orbit.o / 180 * Math.PI);
				if (m(orbit.e) <= 1.1) {
					mesh1.rotateZ(orbit.o / 180 * Math.PI);
				}
			}
			if (orbit.i) {
				mesh.rotateX(orbit.i / 180 * Math.PI);
				if (m(orbit.e) <= 1.1) {
					mesh1.rotateX(orbit.i / 180 * Math.PI);
				}
			}
			if (orbit.w) {
				mesh.rotateZ(orbit.w / 180 * Math.PI);
				if (m(orbit.e) <= 1.1) {
					mesh1.rotateZ(orbit.w / 180 * Math.PI);
				}
			}
			var sat = new THREE.Mesh(new THREE.SphereGeometry(0.2, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2), new THREE.MeshPhongMaterial());
			sat.position.set(orbit.r.valueOf()[0] * 2, orbit.r.valueOf()[1] * 2, orbit.r.valueOf()[2] * 2);
			scene.add(sat);
			renderer.autoClear = false;
			renderer.clear(); // clear buffers
			renderer.render(scene, camera); // render scene 1
			renderer.clearDepth(); // clear depth buffer
			renderer.render(scene2, camera); // render scene 2 
			animate();
			window.addEventListener('resize', onWindowResize, false);
			document.addEventListener('mousedown', onDocumentMouseDown, false);
			document.addEventListener('mouseup', onDocumentMouseUp, false);

			function scale(input) {
				a = 6 / math.sqrt(math.pow(input.valueOf()[0], 2) + math.pow(input.valueOf()[1], 2) + math.pow(input.valueOf()[2], 2));
				var output = new THREE.Vector3();
				output.x = a * input.valueOf()[0];
				output.y = a * input.valueOf()[1];
				output.z = a * input.valueOf()[2];
				return output;
			}
			/** 
			 * 
			 * @return {THREE.group} 
			 */
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
			/**
			 * Instantiate an arrow helper, a default class in three.js, from point to point. 
			 * Also specify color. 
			 * From stack overflow. 
			 * @param from starting point as a three.js Vector3
			 * @param to ending point as a three.js Vector3
			 * @param meshColor desired color for the arrow helper 
			 * @return arrowHelper arrow helper from desired point to desired point 
			 */
			function makeArrowHelper(from, to, color) {
				var direction = to.clone().sub(from);
				var length = direction.length();
				var arrowHelper = new THREE.ArrowHelper(direction.normalize(), from, length, color, 0.5, 0.3);
				return arrowHelper;
			}
			/**
			 * Make a cylinder mesh with base at point x and ceiling at point y. 
			 * Also specify color. 
			 * From stack overflow. 
			 * @param pointX starting point as a three.js Vector3
			 * @param pointY ending point as a three.js Vector3
			 * @param meshColor desired color for the mesh  
			 * @return {THREE.mesh} edge cylinder mesh with base at point x and ceiling at point y 
			 */
			function cylinderMesh(pointX, pointY, meshColor) {
				var direction = new THREE.Vector3().subVectors(pointY, pointX);
				var orientation = new THREE.Matrix4();
				orientation.lookAt(pointX, pointY, new THREE.Object3D().up);
				orientation.multiply(new THREE.Matrix4().set(1, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1));
				var edgeGeometry = new THREE.CylinderGeometry(0.05, 0.05, direction.length(), 8, 1);
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
			/**
			 * Rerender canvas upon resize. 
			 */
			function onWindowResize() {
				var container = document.getElementById('canvas');
				var w = container.offsetWidth;
				var h = container.offsetWidth;
				camera.aspect = w / h;
				camera.updateProjectionMatrix();
				renderer.setSize(w, h);
			}
			/**
			 * Render function for three.js which wraps the renderer call. 
			 * Also a check to sphereExists. 
			 */
			function render() {
				renderer.render(scene, camera);
				if (!(sphereExists)) {
					renderer.clearDepth(); // clear depth buffer
					renderer.render(scene2, camera);
				}
			}
			/** 
			 * Actions for when mouse is clicked down . 
			 */
			function onDocumentMouseDown() {
				if (!(sphereExists)) {
					sphereS = new THREE.Mesh(new THREE.SphereGeometry(2, 50, 50, Math.PI * 2, Math.PI * 2, 0, Math.PI * 2), new THREE.MeshPhongMaterial())
					scene.add(sphereS)
					scene.remove(plane)
					sphereS.rotateX(Math.PI * 0.5);
					sphereExists = true;
				}
			}
			/** 
			 * Actions for when mouse is not clicked down. 
			 */
			function onDocumentMouseUp() {
				if (sphereExists) {
					scene.remove(sphereS);
					scene.add(plane);
					sphereExists = false;
				}
			}
			/** 
			 * three.js animations. Also a call to controls.js. 
			 */
			function animate() {
				requestAnimationFrame(animate);
				render();
				controls.update();
			}
			/**
			 * Create a text sprite (a sprite always faces the camera) 
			 * From stemkoski.github.io/Three.js/Sprite-Text-Labels.html/
			 * Example parameter: {fontsize: 28, borderColor: {r: 0, g: 0, b: 0, a: 0}}
			 */
			function makeTextSprite(message, parameters) {
				if (parameters === undefined) parameters = {};
				var fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Arial";
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
				// Fixes for positioning (define canvas size explicitly to prevent defaulting to 150x300px in newer three.js) 
				//var size = 48;
				canvas.width = 24;
				canvas.height = 48;
				//context.fillStyle = "#8ED6FF";
				// context.fillRect( 0, 0, 24, 48);
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
				sprite.scale.set(0.015 * fontsize, 0.03 * fontsize, 0.03 * fontsize);
				return sprite;
			}
			/**
			 * Called in makeTextSprite 
			 * From stemkoski.github.io/Three.js/Sprite-Text-Labels.html. 
			 */
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
		})();
	}
});