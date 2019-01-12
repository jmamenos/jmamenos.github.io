function orbitalElements() {
		
	// instantiate parser 
	var parser = math.parser(); 
	
	// intialize results 
	var $results = $('.results').eq(0);
	$results.empty();
	$results.append('<p></p>');
	
	// r
	parse('r = [' + inputs(0) + ', ' + inputs(1) + ', ' + inputs(2) + ']'); 	
	if (names()) {write('Position vector:');}
	write('$$\\mathbf{r}=' + round(parser.get('r')) + '\\,\\mathrm{DU}$$');
	
	// v
	parse('v = [' + inputs(3) + ', ' + inputs(4) + ', ' + inputs(5) + ']'); 
	if (names()) {write('Velocity vector:');}
	write('$$\\mathbf{v}=' + round(parser.get('v')) + '\\,\\mathrm{DU\\over TU}$$');
	
	// h
	parse('h = cross(r,v)');
	if (parser.eval('norm(h)')===0) {write('$\\mathbf{h}=0$, try a different combination.');return 'h=0, try a different combination.';}
	if (names()) {write('Specific Angular Momentum');}
	if (equations()) {write('$$\\mathbf{h} = \\mathbf{r}\\times\\mathbf{v}$$');}
	write('$$\\mathbf{h}=' + round(parser.get('h')) + '\\,\\mathrm{{DU}^2\\over TU}$$');
	parse('u = 1');
	
	// u
	if (names()) {write('Standard Gravitational Parameter');}
	if (equations()) {write('No equation. Using relative units $\\mu$ is set to 1.');}
	write('$$\\mu=1 \\,\\mathrm{{DU}^3\\over {TU}^2}$$');
	
	// p
	parse('p = norm(h)^2/u');
	if (names()) {write('Orbit Parameter (or Semilatus Rectum)');}
	if (equations()) {write('$$\\mathrm{p} = {\\mathrm{h}^2\\over \\mu} $$');}
	write('$$\\mathrm{p} = ' + round(parser.get('p')) + ' \\;\\mathrm{DU}$$')
	
	// e
	parse('e = (1/u)*((norm(v)^2-u/norm(r))*r-dot(r,v)*v)');
	if (names()) {write('Eccentricity');}
	if (equations()) {write('$$\\mathbf{e} = {1\\over \\mu}\\left[\\left(\\mathrm{v}^2-{\\mu\\over \\mathrm{r}}\\right)\\mathbf{r}-(\\mathbf{r}\\cdot\\mathbf{v})\\mathbf{v}\\right]$$');}
	write('$$\\mathrm{e} = ' + round(parser.eval('norm(e)')) + '$$')
	if (annotations()) {
		if (round(parser.eval('norm(e)')) === 0) {
			write('Orbit Type: Circular');
		} else if (round(parser.eval('norm(e)')) > 0 && round(parser.eval('norm(e)')) < 1) {
			write('Orbit Type: Elliptic');
		} else if (round(parser.eval('norm(e)')) === 1) {
			write('Orbit Type: Parabolic');
		} else if (round(parser.eval('norm(e)')) > 1) {
			write('Orbit Type: Hyperbolic');
		}
	}
	
	// a
	parse('a = p/(1-norm(e)^2)');
	if (names()) {write('Semimajor Axis');}
	if (equations()) {write('if $\\mathrm{e}=1$ then $\\mathrm{a}=\\infty$');write('else $\\mathrm{a}={\\mathrm{p}\\over 1-\\mathrm{e}^2}$');}
	write('$$\\mathrm{a} = ' + round(parser.eval('a')) + ' \\;\\mathrm{DU}$$')
	if (annotations()) {
		if (round(parser.get('a')) < 0) {
			write('Orbit Type: Hyperbolic');
		}
	}
	
	// i
	parse('i = acos(h[3]/norm(h))'); 
	if (names()) {write('Inclination');}
	if (equations()) {write('$$ \\mathrm{i}=\\cos^{-1}{\\left({\\mathrm{h_K}\\over \\mathrm{h}}\\right)} $$');}
	write('$$\\mathrm{i}=' + round(parser.eval('i*180/pi')) + '°$$');
	if (annotations()) {
		if (round(parser.eval('i*180/pi')) === 0) {
			write('Orbit Type: Direct Equatorial');
		} else if (round(parser.eval('i*180/pi')) > 0 && round(parser.eval('i*180/pi')) < 90) {
			write('Orbit Type: Direct');
		} else if (round(parser.eval('i*180/pi')) === 90) {
			write('Orbit Type: Polar');
		} else if (round(parser.eval('i*180/pi')) > 90 && round(parser.eval('i*180/pi')) < 180) {
			write('Orbit Type: Retrograde');
		} else {
			write('Orbit Type: Retrograde Equatorial');
		}
	}
	
	// n
	parse('n = cross([0,0,1],h)');
	if (names()) {write('Normal Vector (Line of Nodes)');}
	if (equations()) {write('$$ \\mathbf{n} = [0, 0, 1] \\times \\mathbf{h} $$');}
	write('$$\\mathbf{n}=' + round(parser.get('n')) + '$$');
	
	// o
	if (names()) {write('Longitude (or Right Ascension) of Ascending Node');}
	if (equations()) {write('if $\\mathrm{n} = 0$ then $\\mathrm{\\Omega} = undefined $');
	                  write('else if $\\mathrm{n_J} < 0$ then $\\mathrm{\\Omega} = 2\\pi - \\cos^{-1}{\\left({\\mathrm{n_I}\\over \\mathrm{n}}\\right)} $ ');
					  write('else $\\mathrm{\\Omega} = \\cos^{-1}{\\left({\\mathrm{n_I}\\over \\mathrm{n}}\\right)} $');}
	if (parser.eval('round(norm(n),4)==0')) {
		parse('o = 0');
		// o = undefined 
		write('$$\\mathrm{\\Omega}=undefined$$');
	} else if (parser.eval('n[2]<0')) {
		parse('o = 2*pi-acos(' + clamp('n[1]/norm(n)') + ')');
		write('$$\\mathrm{\\Omega}=' + round(parser.eval('o*180/pi')) + '°$$');
	} else {
		parse('o = acos(' + clamp('n[1]/norm(n)') + ')');
		write('$$\\mathrm{\\Omega}=' + round(parser.eval('o*180/pi')) + '°$$');
	}
	
	// w
	if (names()) {write('Argument of Periapsis');}
	if (equations()) {write('if $\\mathrm{ne} = 0$ then $\\mathrm{\\omega} = undefined $');
	                  write('else if $\\mathrm{e_K} < 0$ then $\\mathrm{\\omega} = 2\\pi - \\cos^{-1}{\\left({\\mathbf{n} \\cdot \\mathbf{e} \\over \\mathrm{ne}}\\right)} $');
					  write('else $\\mathrm{\\omega} = \\cos^{-1}{\\left({\\mathbf{n} \\cdot \\mathbf{e} \\over \\mathrm{ne}}\\right)} $');}
	if (parser.eval('round(norm(n),4)*round(norm(e),4)==0')) {
		parse('w = 0');
		// w = undefined 
		write('$$\\mathrm{\\omega}=undefined$$');
	} else if (parser.eval('e[3]<0')) {
		parse('w = 2*pi-acos(' + clamp('dot(n,e)/(norm(n)*norm(e))') + ')');
		write('$$\\mathrm{\\omega}=' + round(parser.eval('w*180/pi')) + '°$$');
	} else {
		parse('w = acos(' + clamp('dot(n,e)/(norm(n)*norm(e))') + ')');
		write('$$\\mathrm{\\omega}=' + round(parser.eval('w*180/pi')) + '°$$');
	}
	
	// vo
	if (names()) {write('True Anomaly (at Epoch)');}
	if (equations()) {write('if $\\mathrm{er} = 0$ then $\\mathrm{\\nu_0} = undefined $');
	                  write('else if $\\mathbf{r} \\cdot \\mathbf{v} < 0$ then $\\mathrm{\\nu_0}=2\\pi - \\cos^{-1}{\\left({\\mathbf{e} \\cdot \\mathbf{r} \\over \\mathrm{er}}\\right)} $');
					  write('else $\\mathrm{\\nu_0}=\\cos^{-1}{\\left({\\mathbf{e} \\cdot \\mathbf{r} \\over \\mathrm{er}}\\right)} $');}
	if (parser.eval('round(norm(e),4)*round(norm(r),4)==0')) {
		parse('vo = 0');
		// vo = undefined 
		write('$$\\mathrm{\\nu_0}=undefined$$');
	} else if (parser.eval('dot(r,v)<0')) {
		parse('vo = 2*pi-acos(' + clamp('dot(e,r)/(norm(e)*norm(r))') + ')');
		write('$$\\mathrm{\\nu_0}=' + round(parser.eval('vo*180/pi')) + '°$$');
	} else {
		parse('vo = acos(' + clamp('dot(e,r)/(norm(e)*norm(r))') + ')');
		write('$$\\mathrm{\\nu_0}=' + round(parser.eval('vo*180/pi')) + '°$$');
	}
	
	window.orbit.r=parser.get('r');
	window.orbit.v=parser.get('v');
	window.orbit.h=parser.get('h');
	window.orbit.u=parser.get('u');
	window.orbit.p=parser.get('p');
	window.orbit.e=parser.get('e');
	window.orbit.a=parser.get('a');
	window.orbit.i=parser.eval('i*180/pi');
	window.orbit.n=parser.get('n');
	window.orbit.o=parser.eval('o*180/pi');
	window.orbit.w=parser.eval('w*180/pi');
	window.orbit.vo=parser.eval('vo*180/pi');
	
	function clamp(code) {
		var temp = math.string(parser.eval(code)); 
		if (parseFloat(temp) > 1) {return 1;} 
		else if (parseFloat(temp) < -1) {return -1;}
		else {return temp;}
	}
	
	function parse(code) {
		parser.eval(code);
	}
	
	function log(code) {
		return print(parser.eval(code));
	}
	
	function print(value) {
		var precision = 14;
		console.log(math.format(value, precision));
	}
	
	function inputs(index) {
		return math.string($('.inputs').eq(index).val());
	}
	
	function write(code) {
		$results.append('<p>');
		$results.append(code);
		$results.append('</p>');
		MathJax.Hub.Queue(['Typeset', MathJax.Hub, $results[0]]);
	}
	
	function stringify(object) {
		return math.string(object);
	}
	
	function equations() {
		return $('input[type=checkbox]').eq(0).is(':checked');
	}
	
	function names() {
		return $('input[type=checkbox]').eq(1).is(':checked');
	}
	
	function annotations() {
		return $('input[type=checkbox]').eq(2).is(':checked');
	}
	
	function round(value) {
		var temp = parseFloat($('input[name=options]:checked').val());
		if (temp === undefined) {return math.round(value,4);}
		else {return math.round(value,temp);}
	}
	
}