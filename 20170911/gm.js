$('.inputs:gt(5)').keydown(function(key) {
	if (key.which === 13) {
		var index = $('.inputs').index(this) + 1;
		$('.inputs').eq(index).select();
	}
});
$('.inputs:gt(5)').keyup(function() {
	if ($('.inputs:gt(5):lt(9)').filter(function() {
			return $.trim($(this).val()).length === 0
		}).length == 0) {
		var r1 = [];
		var r2 = [];
		var r3 = [];
		$('.inputs:gt(5):lt(3)').each(function(i) {
			r1 = math.subset(r1, math.index(i), math.eval($(this).val()), 0);
		});
		$('.inputs:gt(8):lt(3)').each(function(i) {
			r2 = math.subset(r2, math.index(i), math.eval($(this).val()), 0);
		});
		$('.inputs:gt(11)').each(function(i) {
			r3 = math.subset(r3, math.index(i), math.eval($(this).val()), 0);
		});
		var $results = $('.results').eq(1);
		$results.empty()
		
		$results.append('<p> <\/p>')
		.append('<p> You Entered: <\/p>')
		.append('<p> $$\\mathbf{r_1} = \\left(' + math.round(r1,4) + '\\right) \\mathrm{DU}$$ <\/p>')
		.append('<p> $$\\mathbf{r_2} = \\left(' + math.round(r2,4) + '\\right) \\mathrm{DU}$$ <\/p>')
		.append('<p> $$\\mathbf{r_3} = \\left(' + math.round(r3,4) + '\\right) \\mathrm{DU}$$ <\/p>');
		
		print(r1);
		print(r2);
		print(r3);
		var D = math.add(math.add(math.cross(r1,r2),math.cross(r2,r3)),math.cross(r3,r1));
		$results.append('<p> $$\\mathbf{D} = \\left(' + math.round(D,4) + '\\right) $$ <\/p>');
		print(D);
		var S = math.add(math.add(math.multiply((m(r2)-m(r3)),r1),math.multiply((m(r3)-m(r1)),r2)),math.multiply((m(r1)-m(r2)),r3));
		$results.append('<p> $$\\mathbf{S} = \\left(' + math.round(S,4) + '\\right) $$ <\/p>');
		print(S);
		var e = m(S)/m(D);
		$results.append('<p> $$e = ' + math.round(e,4) + '$$ <\/p>');
		print(e);
		var Q = math.divide(S,m(S));
		$results.append('<p> $$\\mathbf{Q} = \\left(' + math.round(Q,4) + '\\right) $$ <\/p>');
		print(Q);
		var N = math.add(math.add(math.multiply(m(r3),math.cross(r1,r2)),math.multiply(m(r1),math.cross(r2,r3))),math.multiply(m(r2),math.cross(r3,r1)));
		$results.append('<p> $$\\mathbf{N} = \\left(' + math.round(N,4) + '\\right) $$ <\/p>');
		print(N);
		var p = m(N)/m(D)
		$results.append('<p> $p = ' + math.round(p,4) + '$ $\\mathrm{DU}$ <\/p>');
		print(p);
		var W = math.divide(N,m(N));
		$results.append('<p> $$\\mathbf{W} = \\left(' + math.round(W,4) + '\\right) $$ <\/p>');
		print(W);
		var P = math.cross(Q,W);
		$results.append('<p> $$\\mathbf{P} = \\left(' + math.round(P,4) + '\\right) $$ <\/p>');
		print(P);
		var coplanarIFFZero = math.dot(r1,math.cross(r2,r3));
		$results.append('<p> $$ \\mathbf{r_1}\\cdot\\left( \\mathbf{r_2}\\times\\mathbf{r_3} \\right) = \\left(' + math.round(N,4) + '\\right) $$ <\/p>');
		/* coplanar check */
		print(coplanarIFFZero);
		var dotDN = math.dot(D,N); 
		$results.append('<p> $$ \\mathbf{D}\\cdot\\mathbf{N} = ' + math.round(dotDN,4) + '$$ <\/p>');
		/* D !=== 0, N !=== 0, d(D,N) > 0, % all for 2 body  */
		print(dotDN);
		var u = 1;
		$results.append('<p> $$\\mu=1 \\mathrm{{DU}^3\\over {TU}^2}$$ <\/p>');
		print(u);
		var L=math.sqrt(u/(m(D)*m(N)));
		$results.append('<p> $$L = ' + math.round(L,4) + ' $$ <\/p>');
		print(L);
		var B1=math.cross(D,r1);
		$results.append('<p> $$\\mathbf{B_1} = \\left(' + math.round(B1,4) + '\\right) $$ <\/p>');
		print(B1);
		var v1=math.add(math.multiply(L/m(r1),B1),math.multiply(L,S));
		$results.append('<p> $$\\mathbf{v_1} = \\left(' + math.round(v1,4) + '\\right) \\mathrm{DU\\over TU}$$ <\/p>');
		print(v1);
		var orbit1 = new Orbit(r1, v1);
		if (!(orbit1.vo === undefined)) {
			$results.append('<p> $\\nu_{01} = ' + math.round(orbit1.vo,4) + ' $ degrees  <\/p>');
		} else {
			$results.append('<p> $\\nu_{01} = ' + orbit1.vo + ' $  <\/p>');
		}
		var B2=math.cross(D,r2);
		$results.append('<p> $$\\mathbf{B_2} = \\left(' + math.round(B2,4) + '\\right) $$ <\/p>');
		print(B2);
		var v2=math.add(math.multiply(L/m(r2),B2),math.multiply(L,S));
		$results.append('<p> $$\\mathbf{v_2} = \\left(' + math.round(v2,4) + '\\right) \\mathrm{DU\\over TU}$$ <\/p>');
		print(v2);
		var orbit2 = new Orbit(r2, v2);
		if (!(orbit2.vo === undefined)) {
			$results.append('<p> $\\nu_{02} = ' + math.round(orbit2.vo,4) + ' $ degrees  <\/p>');
		} else {
			$results.append('<p> $\\nu_{02} = ' + orbit2.vo + ' $  <\/p>');
		}
		var B3=math.cross(D,r3);
		$results.append('<p> $$\\mathbf{B_3} = \\left(' + math.round(B3,4) + '\\right) $$ <\/p>');
		print(B3);
		var v3=math.add(math.multiply(L/m(r3),B3),math.multiply(L,S));
		$results.append('<p> $$\\mathbf{v_3} = \\left(' + math.round(v3,4) + '\\right) \\mathrm{DU\\over TU}$$ <\/p>');
		print(v3);
		var orbit3 = new Orbit(r3, v3);
		if (!(orbit3.vo === undefined)) {
			$results.append('<p> $\\nu_{03} = ' + math.round(orbit3.vo,4) + ' $ degrees  <\/p>');
		} else {
			$results.append('<p> $\\nu_{03} = ' + orbit3.vo + ' $  <\/p>');
		}
		MathJax.Hub.Queue(['Typeset', MathJax.Hub, $results[0]]);
	}
});