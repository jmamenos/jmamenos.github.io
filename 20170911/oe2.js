function orbitalElements() {
		
		// instantiate parser 
		var parser = math.parser(); 
		
		// intialize results 
		var $results = $('.results').eq(0);
		$results.empty();
		$results.append('<p></p>');
		
		parse('r = [' + inputs(0) + ', ' + inputs(1) + ', ' + inputs(2) + ']'); 
		write('$$\\mathbf{r}=' + round(parser.get('r')) + '\\,\\mathrm{DU}$$');
		parse('v = [' + inputs(3) + ', ' + inputs(4) + ', ' + inputs(5) + ']'); 
		write('$$\\mathbf{v}=' + round(parser.get('v')) + '\\,\\mathrm{DU\\over TU}$$');
		parse('h = cross(r,v)');
		if (parser.eval('norm(h)')===0) {write('$\\mathbf{h}=0$, try a different combination.');return 'h=0, try a different combination.';}
		write('$$\\mathbf{h}=' + round(parser.get('h')) + '\\,\\mathrm{{DU}^2\\over TU}$$');
		parse('u = 1');
		write('$$\\mu=1 \\,\\mathrm{{DU}^3\\over {TU}^2}$$');
		parse('p = norm(h)^2/u');
		write('$$p = ' + round(parser.get('p')) + ' \\;\\mathrm{DU}$$')
		parse('e = (1/u)*((norm(v)^2-u/norm(r))*r-dot(r,v)*v)');
		write('$$e = ' + round(parser.eval('norm(e)')) + '$$')
		parse('a = p/(1-norm(e)^2)');
		write('$$a = ' + round(parser.eval('a')) + ' \\;\\mathrm{DU}$$')
		parse('i = acos(h[3]/norm(h))'); 
		write('$i=' + round(parser.eval('i*180/pi')) + '$ degrees');
		parse('n = cross([0,0,1],h)');
		write('$$\\mathbf{n}=' + round(parser.get('n')) + '$$');
		if (parse('round(norm(n),4)==0')) {
			// o = undefined 
			write('$\\Omega=$ undefined');
		} else if (parse('n[2]<0')) {
			parse('o = 2*pi-acos(' + clamp('n[1]/norm(n)') + ')');
			write('$\\Omega=' + round(parser.eval('o*180/pi')) + '$ degrees');
		} else {
			parse('o = acos(' + clamp('n[1]/norm(n)') + ')');
			write('$\\Omega=' + round(parser.eval('o*180/pi')) + '$ degrees');
		}
		if (parse('round(norm(n),4)*round(norm(e),4)==0')) {
			// w = undefined 
			write('$\\omega=$ undefined');
		} else if (parse('e[3]<0')) {
			parse('w = 2*pi-acos(' + clamp('dot(n,e)/(norm(n)*norm(e))') + ')');
			write('$\\omega=' + round(parser.eval('w*180/pi')) + '$ degrees');
		} else {
			parse('w = acos(' + clamp('dot(n,e)/(norm(n)*norm(e))') + ')');
			write('$\\omega=' + round(parser.eval('w*180/pi')) + '$ degrees');
		}
		if (parse('round(norm(e),4)*round(norm(r),4)==0')) {
			// vo = undefined 
			write('$\\nu_0=$ undefined');
		} else if (parse('dot(r,v)<0')) {
			parse('vo = 2*pi-acos(' + clamp('dot(e,r)/(norm(e)*norm(r))') + ')');
			write('$\\nu_0=' + round(parser.eval('vo*180/pi')) + '$ degrees');
		} else {
			parse('vo = acos(' + clamp('dot(e,r)/(norm(e)*norm(r))') + ')');
			write('$\\nu_0=' + round(parser.eval('vo*180/pi')) + '$ degrees');
		}
		
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
		
		function round(value) {
			if (window.dp === undefined) {return math.round(value,4);}
			else {return math.round(value,window.dp);}
		}
		
		/*
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
			$results.append('<p> <\/p>')
			.append('<p> Specific angular momentum, $h$, is zero. <\/p>')
			.append('<p> Try using a different $\\mathbf{r}$ and $\\mathbf{v}$ combination. <\/p>');
		} else {
			$results.append('<p> <\/p>')
			.append('<p> You Entered: <\/p>')
			.append('<p> $$\\mathbf{r} = \\left(' + r + '\\right) \\mathrm{DU}$$ <\/p>')
			.append('<p> $$\\mathbf{v} = \\left(' + v + '\\right) \\mathrm{DU\\over TU}$$ <\/p>')
			.append('<p> Specific Angular Momentum $\\mathbf{h}$ <\/p>')
			.append('<p> $$ \\mathbf{h} = \\mathbf{r}\\times\\mathbf{v} $$ <\/p>')
			.append('<p> $$ \\mathbf{h} = (' + h + ') \\mathrm{{DU}^2\\over TU}$$ <\/p>')
			.append('<p> Standard Gravitational Parameter $\\mu$ <\/p>')
			.append('<p> $$\\mu=1 \\mathrm{{DU}^3\\over {TU}^2}$$ <\/p>')
			.append('<p> Orbit Parameter $p$ (or Semi-Latus Rectum) <\/p>')
			.append('<p> $$p = {h^2\\over \\mu} $$ <\/p>')
			.append('<p> $p = ' + p + ' \\;\\mathrm{DU}$ <\/p>')
			.append('<p> Eccentricity Vector $\\mathbf{e}$ <\/p>')
			.append('<p> $$ \\mathbf{e} = {1\\over \\mu}\\left[\\left(v^2-{\\mu\\over r}\\right)\\mathbf{r}-(\\mathbf{r}\\cdot\\mathbf{v})\\mathbf{v}\\right] $$ <\/p>')
			.append('<p> $$ \\mathbf{e} = (' + e + ') $$ <\/p>')
			.append('<p> Eccentricity $e$ (Magnitude of Eccentricity Vector) <\/p>')
			.append('<p> <mark>$ e=' + me + '$</mark> <\/p>');
			if (me === 0) {
				$results.append('<p> Orbit Type: Circular <\/p>');
			} else if (me > 0 && me < 1) {
				$results.append('<p> Orbit Type: Elliptic <\/p>');
			} else if (me === 1) {
				$results.append('<p> Orbit Type: Parabolic <\/p>');
			} else if (me > 1) {
				$results.append('<p> Orbit Type: Hyperbolic <\/p>');
			}
			$results.append('<p> Semi-Major Axis $a$ <\/p>')
			.append('<p> if $e=1$ then $a=\\infty$ <\/p>')
			.append('<p> else $a={p\\over 1-e^2}$ <\/p>')
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
			$results.append('<p> Inclincation $i$ <\/p>')
			.append('<p> $$ i=\\cos^{-1}{\\left({h_K\\over h}\\right)} $$ <\/p>')
			.append('<p> <mark>$ i=' + i + '$ degrees</mark> <\/p>');
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
			$results.append('<p> Normal Vector $\\mathbf{n}$ <\/p>')
			.append('<p> $$ \\mathbf{n} = (0, 0, 1) \\times \\mathbf{h} $$ <\/p>')
			.append('<p> $$ \\mathbf{n} = \\left(' + n + '\\right)$$ <\/p>')
			.append('<p> Longitude of Ascending Node $\\Omega$ <\/p>')
			.append('<p> if $n_J < 0$ then $\\Omega = 2\\pi - \\cos^{-1}{\\left({n_I\\over n}\\right)} $ <\/p>')
			.append('<p> else if $n = 0$ then $\\Omega = undefined $ <\/p>')
			.append('<p> else $\\Omega = \\cos^{-1}{\\left({n_I\\over n}\\right)} $ <\/p>');
			if (!(orbit.o === undefined)) {
				$results.append('<p> <mark>$\\Omega = ' + o + ' $ degrees </mark> <\/p>');
			} else {
				$results.append('<p> <mark>$\\Omega = ' + orbit.o + ' $ </mark> <\/p>');
			}
			$results.append('<p> Argument of Periapsis $\\omega$')
			.append('<p> if $e_K < 0$ then $\\omega = 2\\pi - \\cos^{-1}{\\left({\\mathbf{n} \\cdot \\mathbf{e} \\over ne}\\right)} $ <\/p>')
			.append('<p> else if $ne = 0$ then $\\omega = undefined $ <\/p>')
			.append('<p> else $\\omega = \\cos^{-1}{\\left({\\mathbf{n} \\cdot \\mathbf{e} \\over ne}\\right)} $ <\/p>');
			if (!(orbit.w === undefined)) {
				$results.append('<p> <mark>$\\omega = ' + w + ' $ degrees </mark> <\/p>');
			} else {
				$results.append('<p> <mark>$\\omega = ' + orbit.w + ' $ </mark> <\/p>');
			}
			$results.append('<p> True Anomaly at Epoch $\\nu_0$ <\/p>')
			.append('<p> if $\\mathbf{r} \\cdot \\mathbf{v} < 0$ then $\\nu_0=2\\pi - \\cos^{-1}{\\left({\\mathbf{e} \\cdot \\mathbf{r} \\over er}\\right)} $ <\/p>')
			.append('<p> else if $er = 0$ then $\\nu_0 = undefined $ <\/p>')
			.append('<p> else $\\nu_0 = \\cos^{-1}{\\left({\\mathbf{e} \\cdot \\mathbf{r} \\over er}\\right)} $ <\/p>');
			if (!(orbit.vo === undefined)) {
				$results.append('<p> <mark>$\\nu_0 = ' + vo + ' $ degrees </mark> <\/p>');
			} else {
				$results.append('<p> <mark>$\\nu_0 = ' + orbit.vo + ' $ </mark> <\/p>');
			}
		}
		*/
		
		//MathJax.Hub.Queue(['Typeset', MathJax.Hub, $results[0]]);
}