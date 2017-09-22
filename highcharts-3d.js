/*
 Highcharts JS v5.0.14-modified (2017-09-22)

 3D features for Highcharts JS

 @license: www.highcharts.com/license
*/
(function(B){"object"===typeof module&&module.exports?module.exports=B:B(Highcharts)})(function(B){(function(b){var t=b.deg2rad,v=b.pick;b.perspective=function(w,z,A){var y=z.options.chart.options3d,r=A?z.inverted:!1,h=z.plotWidth/2,p=z.plotHeight/2,n=y.depth/2,d=v(y.depth,1)*v(y.viewDistance,0),a=z.scale3d||1,f=t*y.beta*(r?-1:1),y=t*y.alpha*(r?-1:1),k=Math.cos(y),c=Math.cos(-f),e=Math.sin(y),m=Math.sin(-f);A||(h+=z.plotLeft,p+=z.plotTop);return b.map(w,function(g){var b,f;f=(r?g.y:g.x)-h;var q=(r?
g.x:g.y)-p,E=(g.z||0)-n;b=c*f-m*E;g=-e*m*f+k*q-c*e*E;f=k*m*f+e*q+k*c*E;q=0<d&&d<Number.POSITIVE_INFINITY?d/(f+n+d):1;b=b*q*a+h;g=g*q*a+p;return{x:r?g:b,y:r?b:g,z:f*a+n}})};b.pointCameraDistance=function(b,z){var w=z.options.chart.options3d,y=z.plotWidth/2;z=z.plotHeight/2;w=v(w.depth,1)*v(w.viewDistance,0)+w.depth;return Math.sqrt(Math.pow(y-b.plotX,2)+Math.pow(z-b.plotY,2)+Math.pow(w-b.plotZ,2))};b.shapeArea=function(b){var w=0,v,y;for(v=0;v<b.length;v++)y=(v+1)%b.length,w+=b[v].x*b[y].y-b[y].x*
b[v].y;return w/2};b.shapeArea3d=function(w,v,t){return b.shapeArea(b.perspective(w,v,t))}})(B);(function(b){function t(a,c,e,d,b,g,f,k){var l=[],q=g-b;return g>b&&g-b>Math.PI/2+.0001?(l=l.concat(t(a,c,e,d,b,b+Math.PI/2,f,k)),l=l.concat(t(a,c,e,d,b+Math.PI/2,g,f,k))):g<b&&b-g>Math.PI/2+.0001?(l=l.concat(t(a,c,e,d,b,b-Math.PI/2,f,k)),l=l.concat(t(a,c,e,d,b-Math.PI/2,g,f,k))):["C",a+e*Math.cos(b)-e*x*q*Math.sin(b)+f,c+d*Math.sin(b)+d*x*q*Math.cos(b)+k,a+e*Math.cos(g)+e*x*q*Math.sin(g)+f,c+d*Math.sin(g)-
d*x*q*Math.cos(g)+k,a+e*Math.cos(g)+f,c+d*Math.sin(g)+k]}var v=Math.cos,w=Math.PI,z=Math.sin,A=b.animObject,y=b.charts,r=b.color,h=b.defined,p=b.deg2rad,n=b.each,d=b.extend,a=b.inArray,f=b.map,k=b.merge,c=b.perspective,e=b.pick,m=b.SVGElement,g=b.SVGRenderer,u=b.wrap,x=4*(Math.sqrt(2)-1)/3/(w/2);g.prototype.toLinePath=function(a,c){var e=[];n(a,function(a){e.push("L",a.x,a.y)});a.length&&(e[0]="M",c&&e.push("Z"));return e};g.prototype.toLineSegments=function(a){var c=[],e=!0;n(a,function(a){c.push(e?
"M":"L",a.x,a.y);e=!e});return c};g.prototype.face3d=function(a){var d=this,l=this.createElement("path");l.vertexes=[];l.insidePlotArea=!1;l.enabled=!0;u(l,"attr",function(a,l){if("object"===typeof l&&(h(l.enabled)||h(l.vertexes)||h(l.insidePlotArea))){this.enabled=e(l.enabled,this.enabled);this.vertexes=e(l.vertexes,this.vertexes);this.insidePlotArea=e(l.insidePlotArea,this.insidePlotArea);delete l.enabled;delete l.vertexes;delete l.insidePlotArea;var g=c(this.vertexes,y[d.chartIndex],this.insidePlotArea),
q=d.toLinePath(g,!0),g=b.shapeArea(g),g=this.enabled&&0<g?"visible":"hidden";l.d=q;l.visibility=g}return a.apply(this,[].slice.call(arguments,1))});u(l,"animate",function(a,l){if("object"===typeof l&&(h(l.enabled)||h(l.vertexes)||h(l.insidePlotArea))){this.enabled=e(l.enabled,this.enabled);this.vertexes=e(l.vertexes,this.vertexes);this.insidePlotArea=e(l.insidePlotArea,this.insidePlotArea);delete l.enabled;delete l.vertexes;delete l.insidePlotArea;var g=c(this.vertexes,y[d.chartIndex],this.insidePlotArea),
q=d.toLinePath(g,!0),g=b.shapeArea(g),g=this.enabled&&0<g?"visible":"hidden";l.d=q;this.attr("visibility",g)}return a.apply(this,[].slice.call(arguments,1))});return l.attr(a)};g.prototype.polyhedron=function(a){var c=this,e=this.g(),d=e.destroy;e.attr({"stroke-linejoin":"round"});e.faces=[];e.destroy=function(){for(var a=0;a<e.faces.length;a++)e.faces[a].destroy();return d.call(this)};u(e,"attr",function(a,d,l,b,g){if("object"===typeof d&&h(d.faces)){for(;e.faces.length>d.faces.length;)e.faces.pop().destroy();
for(;e.faces.length<d.faces.length;)e.faces.push(c.face3d().add(e));for(var q=0;q<d.faces.length;q++)e.faces[q].attr(d.faces[q],null,b,g);delete d.faces}return a.apply(this,[].slice.call(arguments,1))});u(e,"animate",function(a,d,l,b){if(d&&d.faces){for(;e.faces.length>d.faces.length;)e.faces.pop().destroy();for(;e.faces.length<d.faces.length;)e.faces.push(c.face3d().add(e));for(var g=0;g<d.faces.length;g++)e.faces[g].animate(d.faces[g],l,b);delete d.faces}return a.apply(this,[].slice.call(arguments,
1))});return e.attr(a)};g.prototype.cuboid=function(a){var e=this.g(),c=e.destroy;a=this.cuboidPath(a);e.attr({"stroke-linejoin":"round"});e.front=this.path(a[0]).attr({"class":"highcharts-3d-front"}).add(e);e.top=this.path(a[1]).attr({"class":"highcharts-3d-top"}).add(e);e.side=this.path(a[2]).attr({"class":"highcharts-3d-side"}).add(e);e.fillSetter=function(a){this.front.attr({fill:a});this.top.attr({fill:r(a).brighten(.1).get()});this.side.attr({fill:r(a).brighten(-.1).get()});this.color=a;e.fill=
a;return this};e.opacitySetter=function(a){this.front.attr({opacity:a});this.top.attr({opacity:a});this.side.attr({opacity:a});return this};e.attr=function(a,e,c,d){if("string"===typeof a&&"undefined"!==typeof e){var l=a;a={};a[l]=e}if(a.shapeArgs||h(a.x))a=this.renderer.cuboidPath(a.shapeArgs||a),this.front.attr({d:a[0]}),this.top.attr({d:a[1]}),this.side.attr({d:a[2]});else return m.prototype.attr.call(this,a,void 0,c,d);return this};e.animate=function(a,e,c){h(a.x)&&h(a.y)?(a=this.renderer.cuboidPath(a),
this.front.animate({d:a[0]},e,c),this.top.animate({d:a[1]},e,c),this.side.animate({d:a[2]},e,c),this.attr({zIndex:-a[3]})):a.opacity?(this.front.animate(a,e,c),this.top.animate(a,e,c),this.side.animate(a,e,c)):m.prototype.animate.call(this,a,e,c);return this};e.destroy=function(){this.front.destroy();this.top.destroy();this.side.destroy();return c.call(this)};e.attr({zIndex:-a[3]});return e};b.SVGRenderer.prototype.cuboidPath=function(a){function e(a){return v[a]}var d=a.x,g=a.y,q=a.z,k=a.height,
m=a.width,n=a.depth,u=y[this.chartIndex],p,x,r=u.options.chart.options3d.alpha,h=0,v=[{x:d,y:g,z:q},{x:d+m,y:g,z:q},{x:d+m,y:g+k,z:q},{x:d,y:g+k,z:q},{x:d,y:g+k,z:q+n},{x:d+m,y:g+k,z:q+n},{x:d+m,y:g,z:q+n},{x:d,y:g,z:q+n}],v=c(v,u,a.insidePlotArea);x=function(a,c){var d=[[],-1];a=f(a,e);c=f(c,e);0>b.shapeArea(a)?d=[a,0]:0>b.shapeArea(c)&&(d=[c,1]);return d};p=x([3,2,1,0],[7,6,5,4]);a=p[0];m=p[1];p=x([1,6,7,0],[4,5,2,3]);k=p[0];n=p[1];p=x([1,2,5,6],[0,7,4,3]);x=p[0];p=p[1];1===p?h+=1E4*(1E3-d):p||
(h+=1E4*d);h+=10*(!n||0<=r&&180>=r||360>r&&357.5<r?u.plotHeight-g:10+g);1===m?h+=100*q:m||(h+=100*(1E3-q));h=-Math.round(h);return[this.toLinePath(a,!0),this.toLinePath(k,!0),this.toLinePath(x,!0),h]};b.SVGRenderer.prototype.arc3d=function(c){function g(e){var c=!1,d={};e=k(e);for(var g in e)-1!==a(g,f)&&(d[g]=e[g],delete e[g],c=!0);return c?d:!1}var l=this.g(),b=l.renderer,f="x y r innerR start end".split(" ");c=k(c);c.alpha*=p;c.beta*=p;l.top=b.path();l.side1=b.path();l.side2=b.path();l.inn=b.path();
l.out=b.path();l.onAdd=function(){var a=l.parentGroup,e=l.attr("class");l.top.add(l);n(["out","inn","side1","side2"],function(c){l[c].attr({"class":e+" highcharts-3d-side"}).add(a)})};n(["addClass","removeClass"],function(a){l[a]=function(){var e=arguments;n(["top","out","inn","side1","side2"],function(c){l[c][a].apply(l[c],e)})}});l.setPaths=function(a){var e=l.renderer.arc3dPath(a),c=100*e.zTop;l.attribs=a;l.top.attr({d:e.top,zIndex:e.zTop});l.inn.attr({d:e.inn,zIndex:e.zInn});l.out.attr({d:e.out,
zIndex:e.zOut});l.side1.attr({d:e.side1,zIndex:e.zSide1});l.side2.attr({d:e.side2,zIndex:e.zSide2});l.zIndex=c;l.attr({zIndex:c});a.center&&(l.top.setRadialReference(a.center),delete a.center)};l.setPaths(c);l.fillSetter=function(a){var e=r(a).brighten(-.1).get();this.fill=a;this.side1.attr({fill:e});this.side2.attr({fill:e});this.inn.attr({fill:e});this.out.attr({fill:e});this.top.attr({fill:a});return this};n(["opacity","translateX","translateY","visibility"],function(a){l[a+"Setter"]=function(a,
e){l[e]=a;n(["out","inn","side1","side2","top"],function(c){l[c].attr(e,a)})}});u(l,"attr",function(a,e){var c;"object"===typeof e&&(c=g(e))&&(d(l.attribs,c),l.setPaths(l.attribs));return a.apply(this,[].slice.call(arguments,1))});u(l,"animate",function(a,c,d,b){var l,f=this.attribs,q;delete c.center;delete c.z;delete c.depth;delete c.alpha;delete c.beta;q=A(e(d,this.renderer.globalAnimation));q.duration&&(l=g(c),c.dummy=1,l&&(q.step=function(a,c){function d(a){return f[a]+(e(l[a],f[a])-f[a])*c.pos}
"dummy"===c.prop&&c.elem.setPaths(k(f,{x:d("x"),y:d("y"),r:d("r"),innerR:d("innerR"),start:d("start"),end:d("end")}))}),d=q);return a.call(this,c,d,b)});l.destroy=function(){this.top.destroy();this.out.destroy();this.inn.destroy();this.side1.destroy();this.side2.destroy();m.prototype.destroy.call(this)};l.hide=function(){this.top.hide();this.out.hide();this.inn.hide();this.side1.hide();this.side2.hide()};l.show=function(){this.top.show();this.out.show();this.inn.show();this.side1.show();this.side2.show()};
return l};g.prototype.arc3dPath=function(a){function e(a){a%=2*Math.PI;a>Math.PI&&(a=2*Math.PI-a);return a}var c=a.x,d=a.y,g=a.start,b=a.end-.00001,f=a.r,k=a.innerR,q=a.depth,m=a.alpha,n=a.beta,u=Math.cos(g),p=Math.sin(g);a=Math.cos(b);var x=Math.sin(b),h=f*Math.cos(n),f=f*Math.cos(m),y=k*Math.cos(n),r=k*Math.cos(m),k=q*Math.sin(n),A=q*Math.sin(m),q=["M",c+h*u,d+f*p],q=q.concat(t(c,d,h,f,g,b,0,0)),q=q.concat(["L",c+y*a,d+r*x]),q=q.concat(t(c,d,y,r,b,g,0,0)),q=q.concat(["Z"]),B=0<n?Math.PI/2:0,n=0<
m?0:Math.PI/2,B=g>-B?g:b>-B?-B:g,C=b<w-n?b:g<w-n?w-n:b,D=2*w-n,m=["M",c+h*v(B),d+f*z(B)],m=m.concat(t(c,d,h,f,B,C,0,0));b>D&&g<D?(m=m.concat(["L",c+h*v(C)+k,d+f*z(C)+A]),m=m.concat(t(c,d,h,f,C,D,k,A)),m=m.concat(["L",c+h*v(D),d+f*z(D)]),m=m.concat(t(c,d,h,f,D,b,0,0)),m=m.concat(["L",c+h*v(b)+k,d+f*z(b)+A]),m=m.concat(t(c,d,h,f,b,D,k,A)),m=m.concat(["L",c+h*v(D),d+f*z(D)]),m=m.concat(t(c,d,h,f,D,C,0,0))):b>w-n&&g<w-n&&(m=m.concat(["L",c+h*Math.cos(C)+k,d+f*Math.sin(C)+A]),m=m.concat(t(c,d,h,f,C,b,
k,A)),m=m.concat(["L",c+h*Math.cos(b),d+f*Math.sin(b)]),m=m.concat(t(c,d,h,f,b,C,0,0)));m=m.concat(["L",c+h*Math.cos(C)+k,d+f*Math.sin(C)+A]);m=m.concat(t(c,d,h,f,C,B,k,A));m=m.concat(["Z"]);n=["M",c+y*u,d+r*p];n=n.concat(t(c,d,y,r,g,b,0,0));n=n.concat(["L",c+y*Math.cos(b)+k,d+r*Math.sin(b)+A]);n=n.concat(t(c,d,y,r,b,g,k,A));n=n.concat(["Z"]);u=["M",c+h*u,d+f*p,"L",c+h*u+k,d+f*p+A,"L",c+y*u+k,d+r*p+A,"L",c+y*u,d+r*p,"Z"];c=["M",c+h*a,d+f*x,"L",c+h*a+k,d+f*x+A,"L",c+y*a+k,d+r*x+A,"L",c+y*a,d+r*x,"Z"];
x=Math.atan2(A,-k);d=Math.abs(b+x);a=Math.abs(g+x);g=Math.abs((g+b)/2+x);d=e(d);a=e(a);g=e(g);g*=1E5;b=1E5*a;d*=1E5;return{top:q,zTop:1E5*Math.PI+1,out:m,zOut:Math.max(g,b,d),inn:n,zInn:Math.max(g,b,d),side1:u,zSide1:.99*d,side2:c,zSide2:.99*b}}})(B);(function(b){function t(b,n){var d=b.plotLeft,a=b.plotWidth+d,f=b.plotTop,k=b.plotHeight+f,c=d+b.plotWidth/2,e=f+b.plotHeight/2,m=Number.MAX_VALUE,g=-Number.MAX_VALUE,u=Number.MAX_VALUE,p=-Number.MAX_VALUE,q,h=1;q=[{x:d,y:f,z:0},{x:d,y:f,z:n}];w([0,1],
function(c){q.push({x:a,y:q[c].y,z:q[c].z})});w([0,1,2,3],function(a){q.push({x:q[a].x,y:k,z:q[a].z})});q=A(q,b,!1);w(q,function(a){m=Math.min(m,a.x);g=Math.max(g,a.x);u=Math.min(u,a.y);p=Math.max(p,a.y)});d>m&&(h=Math.min(h,1-Math.abs((d+c)/(m+c))%1));a<g&&(h=Math.min(h,(a-c)/(g-c)));f>u&&(h=0>u?Math.min(h,(f+e)/(-u+f+e)):Math.min(h,1-(f+e)/(u+e)%1));k<p&&(h=Math.min(h,Math.abs((k-e)/(p-e))));return h}var v=b.Chart,w=b.each,z=b.merge,A=b.perspective,y=b.pick,r=b.wrap;v.prototype.is3d=function(){return this.options.chart.options3d&&
this.options.chart.options3d.enabled};v.prototype.propsRequireDirtyBox.push("chart.options3d");v.prototype.propsRequireUpdateSeries.push("chart.options3d");b.wrap(b.Chart.prototype,"isInsidePlot",function(b){return this.is3d()||b.apply(this,[].slice.call(arguments,1))});var h=b.getOptions();z(!0,h,{chart:{options3d:{enabled:!1,alpha:0,beta:0,depth:100,fitToPlot:!0,viewDistance:25,axisLabelPosition:"default",frame:{visible:"default",size:1,bottom:{},top:{},left:{},right:{},back:{},front:{}}}}});r(v.prototype,
"setClassName",function(b){b.apply(this,[].slice.call(arguments,1));this.is3d()&&(this.container.className+=" highcharts-3d-chart")});b.wrap(b.Chart.prototype,"setChartSize",function(b){var n=this.options.chart.options3d;b.apply(this,[].slice.call(arguments,1));if(this.is3d()){var d=this.inverted,a=this.clipBox,f=this.margin;a[d?"y":"x"]=-(f[3]||0);a[d?"x":"y"]=-(f[0]||0);a[d?"height":"width"]=this.chartWidth+(f[3]||0)+(f[1]||0);a[d?"width":"height"]=this.chartHeight+(f[0]||0)+(f[2]||0);this.scale3d=
1;!0===n.fitToPlot&&(this.scale3d=t(this,n.depth))}});r(v.prototype,"redraw",function(b){this.is3d()&&(this.isDirtyBox=!0,this.frame3d=this.get3dFrame());b.apply(this,[].slice.call(arguments,1))});r(v.prototype,"render",function(b){this.is3d()&&(this.frame3d=this.get3dFrame());b.apply(this,[].slice.call(arguments,1))});r(v.prototype,"renderSeries",function(b){var n=this.series.length;if(this.is3d())for(;n--;)b=this.series[n],b.translate(),b.render();else b.call(this)});r(v.prototype,"drawChartBox",
function(h){if(this.is3d()){var n=this.renderer,d=this.options.chart.options3d,a=this.get3dFrame(),f=this.plotLeft,k=this.plotLeft+this.plotWidth,c=this.plotTop,e=this.plotTop+this.plotHeight,d=d.depth,m=f-(a.left.visible?a.left.size:0),g=k+(a.right.visible?a.right.size:0),u=c-(a.top.visible?a.top.size:0),x=e+(a.bottom.visible?a.bottom.size:0),q=0-(a.front.visible?a.front.size:0),p=d+(a.back.visible?a.back.size:0),l=this.hasRendered?"animate":"attr";this.frame3d=a;this.frameShapes||(this.frameShapes=
{bottom:n.polyhedron().add(),top:n.polyhedron().add(),left:n.polyhedron().add(),right:n.polyhedron().add(),back:n.polyhedron().add(),front:n.polyhedron().add()});this.frameShapes.bottom[l]({"class":"highcharts-3d-frame highcharts-3d-frame-bottom",zIndex:a.bottom.frontFacing?-1E3:1E3,faces:[{fill:b.color(a.bottom.color).brighten(.1).get(),vertexes:[{x:m,y:x,z:q},{x:g,y:x,z:q},{x:g,y:x,z:p},{x:m,y:x,z:p}],enabled:a.bottom.visible},{fill:b.color(a.bottom.color).brighten(.1).get(),vertexes:[{x:f,y:e,
z:d},{x:k,y:e,z:d},{x:k,y:e,z:0},{x:f,y:e,z:0}],enabled:a.bottom.visible},{fill:b.color(a.bottom.color).brighten(-.1).get(),vertexes:[{x:m,y:x,z:q},{x:m,y:x,z:p},{x:f,y:e,z:d},{x:f,y:e,z:0}],enabled:a.bottom.visible&&!a.left.visible},{fill:b.color(a.bottom.color).brighten(-.1).get(),vertexes:[{x:g,y:x,z:p},{x:g,y:x,z:q},{x:k,y:e,z:0},{x:k,y:e,z:d}],enabled:a.bottom.visible&&!a.right.visible},{fill:b.color(a.bottom.color).get(),vertexes:[{x:g,y:x,z:q},{x:m,y:x,z:q},{x:f,y:e,z:0},{x:k,y:e,z:0}],enabled:a.bottom.visible&&
!a.front.visible},{fill:b.color(a.bottom.color).get(),vertexes:[{x:m,y:x,z:p},{x:g,y:x,z:p},{x:k,y:e,z:d},{x:f,y:e,z:d}],enabled:a.bottom.visible&&!a.back.visible}]});this.frameShapes.top[l]({"class":"highcharts-3d-frame highcharts-3d-frame-top",zIndex:a.top.frontFacing?-1E3:1E3,faces:[{fill:b.color(a.top.color).brighten(.1).get(),vertexes:[{x:m,y:u,z:p},{x:g,y:u,z:p},{x:g,y:u,z:q},{x:m,y:u,z:q}],enabled:a.top.visible},{fill:b.color(a.top.color).brighten(.1).get(),vertexes:[{x:f,y:c,z:0},{x:k,y:c,
z:0},{x:k,y:c,z:d},{x:f,y:c,z:d}],enabled:a.top.visible},{fill:b.color(a.top.color).brighten(-.1).get(),vertexes:[{x:m,y:u,z:p},{x:m,y:u,z:q},{x:f,y:c,z:0},{x:f,y:c,z:d}],enabled:a.top.visible&&!a.left.visible},{fill:b.color(a.top.color).brighten(-.1).get(),vertexes:[{x:g,y:u,z:q},{x:g,y:u,z:p},{x:k,y:c,z:d},{x:k,y:c,z:0}],enabled:a.top.visible&&!a.right.visible},{fill:b.color(a.top.color).get(),vertexes:[{x:m,y:u,z:q},{x:g,y:u,z:q},{x:k,y:c,z:0},{x:f,y:c,z:0}],enabled:a.top.visible&&!a.front.visible},
{fill:b.color(a.top.color).get(),vertexes:[{x:g,y:u,z:p},{x:m,y:u,z:p},{x:f,y:c,z:d},{x:k,y:c,z:d}],enabled:a.top.visible&&!a.back.visible}]});this.frameShapes.left[l]({"class":"highcharts-3d-frame highcharts-3d-frame-left",zIndex:a.left.frontFacing?-1E3:1E3,faces:[{fill:b.color(a.left.color).brighten(.1).get(),vertexes:[{x:m,y:x,z:q},{x:f,y:e,z:0},{x:f,y:e,z:d},{x:m,y:x,z:p}],enabled:a.left.visible&&!a.bottom.visible},{fill:b.color(a.left.color).brighten(.1).get(),vertexes:[{x:m,y:u,z:p},{x:f,y:c,
z:d},{x:f,y:c,z:0},{x:m,y:u,z:q}],enabled:a.left.visible&&!a.top.visible},{fill:b.color(a.left.color).brighten(-.1).get(),vertexes:[{x:m,y:x,z:p},{x:m,y:u,z:p},{x:m,y:u,z:q},{x:m,y:x,z:q}],enabled:a.left.visible},{fill:b.color(a.left.color).brighten(-.1).get(),vertexes:[{x:f,y:c,z:d},{x:f,y:e,z:d},{x:f,y:e,z:0},{x:f,y:c,z:0}],enabled:a.left.visible},{fill:b.color(a.left.color).get(),vertexes:[{x:m,y:x,z:q},{x:m,y:u,z:q},{x:f,y:c,z:0},{x:f,y:e,z:0}],enabled:a.left.visible&&!a.front.visible},{fill:b.color(a.left.color).get(),
vertexes:[{x:m,y:u,z:p},{x:m,y:x,z:p},{x:f,y:e,z:d},{x:f,y:c,z:d}],enabled:a.left.visible&&!a.back.visible}]});this.frameShapes.right[l]({"class":"highcharts-3d-frame highcharts-3d-frame-right",zIndex:a.right.frontFacing?-1E3:1E3,faces:[{fill:b.color(a.right.color).brighten(.1).get(),vertexes:[{x:g,y:x,z:p},{x:k,y:e,z:d},{x:k,y:e,z:0},{x:g,y:x,z:q}],enabled:a.right.visible&&!a.bottom.visible},{fill:b.color(a.right.color).brighten(.1).get(),vertexes:[{x:g,y:u,z:q},{x:k,y:c,z:0},{x:k,y:c,z:d},{x:g,
y:u,z:p}],enabled:a.right.visible&&!a.top.visible},{fill:b.color(a.right.color).brighten(-.1).get(),vertexes:[{x:k,y:c,z:0},{x:k,y:e,z:0},{x:k,y:e,z:d},{x:k,y:c,z:d}],enabled:a.right.visible},{fill:b.color(a.right.color).brighten(-.1).get(),vertexes:[{x:g,y:x,z:q},{x:g,y:u,z:q},{x:g,y:u,z:p},{x:g,y:x,z:p}],enabled:a.right.visible},{fill:b.color(a.right.color).get(),vertexes:[{x:g,y:u,z:q},{x:g,y:x,z:q},{x:k,y:e,z:0},{x:k,y:c,z:0}],enabled:a.right.visible&&!a.front.visible},{fill:b.color(a.right.color).get(),
vertexes:[{x:g,y:x,z:p},{x:g,y:u,z:p},{x:k,y:c,z:d},{x:k,y:e,z:d}],enabled:a.right.visible&&!a.back.visible}]});this.frameShapes.back[l]({"class":"highcharts-3d-frame highcharts-3d-frame-back",zIndex:a.back.frontFacing?-1E3:1E3,faces:[{fill:b.color(a.back.color).brighten(.1).get(),vertexes:[{x:g,y:x,z:p},{x:m,y:x,z:p},{x:f,y:e,z:d},{x:k,y:e,z:d}],enabled:a.back.visible&&!a.bottom.visible},{fill:b.color(a.back.color).brighten(.1).get(),vertexes:[{x:m,y:u,z:p},{x:g,y:u,z:p},{x:k,y:c,z:d},{x:f,y:c,z:d}],
enabled:a.back.visible&&!a.top.visible},{fill:b.color(a.back.color).brighten(-.1).get(),vertexes:[{x:m,y:x,z:p},{x:m,y:u,z:p},{x:f,y:c,z:d},{x:f,y:e,z:d}],enabled:a.back.visible&&!a.left.visible},{fill:b.color(a.back.color).brighten(-.1).get(),vertexes:[{x:g,y:u,z:p},{x:g,y:x,z:p},{x:k,y:e,z:d},{x:k,y:c,z:d}],enabled:a.back.visible&&!a.right.visible},{fill:b.color(a.back.color).get(),vertexes:[{x:f,y:c,z:d},{x:k,y:c,z:d},{x:k,y:e,z:d},{x:f,y:e,z:d}],enabled:a.back.visible},{fill:b.color(a.back.color).get(),
vertexes:[{x:m,y:x,z:p},{x:g,y:x,z:p},{x:g,y:u,z:p},{x:m,y:u,z:p}],enabled:a.back.visible}]});this.frameShapes.front[l]({"class":"highcharts-3d-frame highcharts-3d-frame-front",zIndex:a.front.frontFacing?-1E3:1E3,faces:[{fill:b.color(a.front.color).brighten(.1).get(),vertexes:[{x:m,y:x,z:q},{x:g,y:x,z:q},{x:k,y:e,z:0},{x:f,y:e,z:0}],enabled:a.front.visible&&!a.bottom.visible},{fill:b.color(a.front.color).brighten(.1).get(),vertexes:[{x:g,y:u,z:q},{x:m,y:u,z:q},{x:f,y:c,z:0},{x:k,y:c,z:0}],enabled:a.front.visible&&
!a.top.visible},{fill:b.color(a.front.color).brighten(-.1).get(),vertexes:[{x:m,y:u,z:q},{x:m,y:x,z:q},{x:f,y:e,z:0},{x:f,y:c,z:0}],enabled:a.front.visible&&!a.left.visible},{fill:b.color(a.front.color).brighten(-.1).get(),vertexes:[{x:g,y:x,z:q},{x:g,y:u,z:q},{x:k,y:c,z:0},{x:k,y:e,z:0}],enabled:a.front.visible&&!a.right.visible},{fill:b.color(a.front.color).get(),vertexes:[{x:k,y:c,z:0},{x:f,y:c,z:0},{x:f,y:e,z:0},{x:k,y:e,z:0}],enabled:a.front.visible},{fill:b.color(a.front.color).get(),vertexes:[{x:g,
y:x,z:q},{x:m,y:x,z:q},{x:m,y:u,z:q},{x:g,y:u,z:q}],enabled:a.front.visible}]})}return h.apply(this,[].slice.call(arguments,1))});v.prototype.retrieveStacks=function(b){var n=this.series,d={},a,f=1;w(this.series,function(k){a=y(k.options.stack,b?0:n.length-1-k.index);d[a]?d[a].series.push(k):(d[a]={series:[k],position:f},f++)});d.totalStacks=f+1;return d};v.prototype.get3dFrame=function(){var p=this,n=p.options.chart.options3d,d=n.frame,a=p.plotLeft,f=p.plotLeft+p.plotWidth,k=p.plotTop,c=p.plotTop+
p.plotHeight,e=n.depth,m=function(a){a=b.shapeArea3d(a,p);return.5<a?1:-.5>a?-1:0},g=m([{x:a,y:c,z:e},{x:f,y:c,z:e},{x:f,y:c,z:0},{x:a,y:c,z:0}]),u=m([{x:a,y:k,z:0},{x:f,y:k,z:0},{x:f,y:k,z:e},{x:a,y:k,z:e}]),h=m([{x:a,y:k,z:0},{x:a,y:k,z:e},{x:a,y:c,z:e},{x:a,y:c,z:0}]),q=m([{x:f,y:k,z:e},{x:f,y:k,z:0},{x:f,y:c,z:0},{x:f,y:c,z:e}]),r=m([{x:a,y:c,z:0},{x:f,y:c,z:0},{x:f,y:k,z:0},{x:a,y:k,z:0}]),m=m([{x:a,y:k,z:e},{x:f,y:k,z:e},{x:f,y:c,z:e},{x:a,y:c,z:e}]),l=!1,v=!1,z=!1,t=!1;w([].concat(p.xAxis,
p.yAxis,p.zAxis),function(a){a&&(a.horiz?a.opposite?v=!0:l=!0:a.opposite?t=!0:z=!0)});var B=function(a,c,e){for(var d=["size","color","visible"],b={},g=0;g<d.length;g++)for(var f=d[g],m=0;m<a.length;m++)if("object"===typeof a[m]){var k=a[m][f];if(void 0!==k&&null!==k){b[f]=k;break}}a=e;!0===b.visible||!1===b.visible?a=b.visible:"auto"===b.visible&&(a=0<c);return{size:y(b.size,1),color:y(b.color,"none"),frontFacing:0<c,visible:a}},d={bottom:B([d.bottom,d.top,d],g,l),top:B([d.top,d.bottom,d],u,v),left:B([d.left,
d.right,d.side,d],h,z),right:B([d.right,d.left,d.side,d],q,t),back:B([d.back,d.front,d],m,!0),front:B([d.front,d.back,d],r,!1)};"auto"===n.axisLabelPosition?(q=function(a,c){return a.visible!==c.visible||a.visible&&c.visible&&a.frontFacing!==c.frontFacing},n=[],q(d.left,d.front)&&n.push({y:(k+c)/2,x:a,z:0,xDir:{x:1,y:0,z:0}}),q(d.left,d.back)&&n.push({y:(k+c)/2,x:a,z:e,xDir:{x:0,y:0,z:-1}}),q(d.right,d.front)&&n.push({y:(k+c)/2,x:f,z:0,xDir:{x:0,y:0,z:1}}),q(d.right,d.back)&&n.push({y:(k+c)/2,x:f,
z:e,xDir:{x:-1,y:0,z:0}}),g=[],q(d.bottom,d.front)&&g.push({x:(a+f)/2,y:c,z:0,xDir:{x:1,y:0,z:0}}),q(d.bottom,d.back)&&g.push({x:(a+f)/2,y:c,z:e,xDir:{x:-1,y:0,z:0}}),u=[],q(d.top,d.front)&&u.push({x:(a+f)/2,y:k,z:0,xDir:{x:1,y:0,z:0}}),q(d.top,d.back)&&u.push({x:(a+f)/2,y:k,z:e,xDir:{x:-1,y:0,z:0}}),h=[],q(d.bottom,d.left)&&h.push({z:(0+e)/2,y:c,x:a,xDir:{x:0,y:0,z:-1}}),q(d.bottom,d.right)&&h.push({z:(0+e)/2,y:c,x:f,xDir:{x:0,y:0,z:1}}),c=[],q(d.top,d.left)&&c.push({z:(0+e)/2,y:k,x:a,xDir:{x:0,
y:0,z:-1}}),q(d.top,d.right)&&c.push({z:(0+e)/2,y:k,x:f,xDir:{x:0,y:0,z:1}}),a=function(a,c,e){if(0===a.length)return null;if(1===a.length)return a[0];for(var d=0,b=A(a,p,!1),g=1;g<b.length;g++)e*b[g][c]>e*b[d][c]?d=g:e*b[g][c]===e*b[d][c]&&b[g].z<b[d].z&&(d=g);return a[d]},d.axes={y:{left:a(n,"x",-1),right:a(n,"x",1)},x:{top:a(u,"y",-1),bottom:a(g,"y",1)},z:{top:a(c,"y",-1),bottom:a(h,"y",1)}}):d.axes={y:{left:{x:a,z:0,xDir:{x:1,y:0,z:0}},right:{x:f,z:0,xDir:{x:0,y:0,z:1}}},x:{top:{y:k,z:0,xDir:{x:1,
y:0,z:0}},bottom:{y:c,z:0,xDir:{x:1,y:0,z:0}}},z:{top:{x:z?f:a,y:k,xDir:z?{x:0,y:0,z:1}:{x:0,y:0,z:-1}},bottom:{x:z?f:a,y:c,xDir:z?{x:0,y:0,z:1}:{x:0,y:0,z:-1}}}};return d};b.Fx.prototype.matrixSetter=function(){var p;if(1>this.pos&&(b.isArray(this.start)||b.isArray(this.end))){var n=this.start||[1,0,0,1,0,0],d=this.end||[1,0,0,1,0,0];p=[];for(var a=0;6>a;a++)p.push(this.pos*d[a]+(1-this.pos)*n[a])}else p=this.end;this.elem.attr(this.prop,p,null,!0)}})(B);(function(b){function t(a,e,b){if(!a.chart.is3d()||
"colorAxis"===a.coll)return e;var c=a.chart,f=A*c.options.chart.options3d.alpha,m=A*c.options.chart.options3d.beta,k=n(b&&a.options.title.position3d,a.options.labels.position3d);b=n(b&&a.options.title.skew3d,a.options.labels.skew3d);var h=c.frame3d,l=c.plotLeft,r=c.plotWidth+l,y=c.plotTop,v=c.plotHeight+y,c=!1,w=0,z=0,t={x:0,y:1,z:0};e=a.swapZ({x:e.x,y:e.y,z:0});if(a.isZAxis)if(a.opposite){if(null===h.axes.z.top)return{};z=e.y-y;e.x=h.axes.z.top.x;e.y=h.axes.z.top.y;l=h.axes.z.top.xDir;c=!h.top.frontFacing}else{if(null===
h.axes.z.bottom)return{};z=e.y-v;e.x=h.axes.z.bottom.x;e.y=h.axes.z.bottom.y;l=h.axes.z.bottom.xDir;c=!h.bottom.frontFacing}else if(a.horiz)if(a.opposite){if(null===h.axes.x.top)return{};z=e.y-y;e.y=h.axes.x.top.y;e.z=h.axes.x.top.z;l=h.axes.x.top.xDir;c=!h.top.frontFacing}else{if(null===h.axes.x.bottom)return{};z=e.y-v;e.y=h.axes.x.bottom.y;e.z=h.axes.x.bottom.z;l=h.axes.x.bottom.xDir;c=!h.bottom.frontFacing}else if(a.opposite){if(null===h.axes.y.right)return{};w=e.x-r;e.x=h.axes.y.right.x;e.z=h.axes.y.right.z;
l=h.axes.y.right.xDir;l={x:l.z,y:l.y,z:-l.x}}else{if(null===h.axes.y.left)return{};w=e.x-l;e.x=h.axes.y.left.x;e.z=h.axes.y.left.z;l=h.axes.y.left.xDir}"chart"!==k&&("flap"===k?a.horiz?(m=Math.sin(f),f=Math.cos(f),a.opposite&&(m=-m),c&&(m=-m),t={x:l.z*m,y:f,z:-l.x*m}):l={x:Math.cos(m),y:0,z:Math.sin(m)}:"ortho"===k?a.horiz?(t=Math.cos(f),k=Math.sin(m)*t,f=-Math.sin(f),m=-t*Math.cos(m),t={x:l.y*m-l.z*f,y:l.z*k-l.x*m,z:l.x*f-l.y*k},f=1/Math.sqrt(t.x*t.x+t.y*t.y+t.z*t.z),c&&(f=-f),t={x:f*t.x,y:f*t.y,
z:f*t.z}):l={x:Math.cos(m),y:0,z:Math.sin(m)}:a.horiz?t={x:Math.sin(m)*Math.sin(f),y:Math.cos(f),z:-Math.cos(m)*Math.sin(f)}:l={x:Math.cos(m),y:0,z:Math.sin(m)});e.x+=w*l.x+z*t.x;e.y+=w*l.y+z*t.y;e.z+=w*l.z+z*t.z;c=p([e],a.chart)[0];b?(0>d(p([e,{x:e.x+l.x,y:e.y+l.y,z:e.z+l.z},{x:e.x+t.x,y:e.y+t.y,z:e.z+t.z}],a.chart))&&(l={x:-l.x,y:-l.y,z:-l.z}),a=p([{x:e.x,y:e.y,z:e.z},{x:e.x+l.x,y:e.y+l.y,z:e.z+l.z},{x:e.x+t.x,y:e.y+t.y,z:e.z+t.z}],a.chart),c.matrix=[a[1].x-a[0].x,a[1].y-a[0].y,a[2].x-a[0].x,a[2].y-
a[0].y,c.x,c.y],c.matrix[4]-=c.x*c.matrix[0]+c.y*c.matrix[2],c.matrix[5]-=c.x*c.matrix[1]+c.y*c.matrix[3]):c.matrix=null;return c}var v,w=b.Axis,z=b.Chart,A=b.deg2rad,y=b.each,r=b.extend,h=b.merge,p=b.perspective,n=b.pick,d=b.shapeArea,a=b.splat,f=b.Tick,k=b.wrap;h(!0,w.prototype.defaultOptions,{labels:{position3d:"offset",skew3d:!1},title:{position3d:null,skew3d:null}});k(w.prototype,"setOptions",function(a,e){a.call(this,e);this.chart.is3d()&&"colorAxis"!==this.coll&&(a=this.options,a.tickWidth=
n(a.tickWidth,0),a.gridLineWidth=n(a.gridLineWidth,1))});k(w.prototype,"getPlotLinePath",function(a){var c=a.apply(this,[].slice.call(arguments,1));if(!this.chart.is3d()||"colorAxis"===this.coll||null===c)return c;var d=this.chart,b=d.options.chart.options3d,b=this.isZAxis?d.plotWidth:b.depth,d=d.frame3d,c=[this.swapZ({x:c[1],y:c[2],z:0}),this.swapZ({x:c[1],y:c[2],z:b}),this.swapZ({x:c[4],y:c[5],z:0}),this.swapZ({x:c[4],y:c[5],z:b})],b=[];this.horiz?(this.isZAxis?(d.left.visible&&b.push(c[0],c[2]),
d.right.visible&&b.push(c[1],c[3])):(d.front.visible&&b.push(c[0],c[2]),d.back.visible&&b.push(c[1],c[3])),d.top.visible&&b.push(c[0],c[1]),d.bottom.visible&&b.push(c[2],c[3])):(d.front.visible&&b.push(c[0],c[2]),d.back.visible&&b.push(c[1],c[3]),d.left.visible&&b.push(c[0],c[1]),d.right.visible&&b.push(c[2],c[3]));b=p(b,this.chart,!1);return this.chart.renderer.toLineSegments(b)});k(w.prototype,"getLinePath",function(a){return this.chart.is3d()&&"colorAxis"!==this.coll?[]:a.apply(this,[].slice.call(arguments,
1))});k(w.prototype,"getPlotBandPath",function(a){if(!this.chart.is3d()||"colorAxis"===this.coll)return a.apply(this,[].slice.call(arguments,1));var c=arguments,d=c[2],b=[],c=this.getPlotLinePath(c[1]),d=this.getPlotLinePath(d);if(c&&d)for(var f=0;f<c.length;f+=6)b.push("M",c[f+1],c[f+2],"L",c[f+4],c[f+5],"L",d[f+4],d[f+5],"L",d[f+1],d[f+2],"Z");return b});k(f.prototype,"getMarkPath",function(a){var c=a.apply(this,[].slice.call(arguments,1)),c=[t(this.axis,{x:c[1],y:c[2],z:0}),t(this.axis,{x:c[4],
y:c[5],z:0})];return this.axis.chart.renderer.toLineSegments(c)});k(f.prototype,"getLabelPosition",function(a){var c=a.apply(this,[].slice.call(arguments,1));return t(this.axis,c)});k(w.prototype,"getTitlePosition",function(a){var c=a.apply(this,[].slice.call(arguments,1));return t(this,c,!0)});k(w.prototype,"drawCrosshair",function(a){var c=arguments;this.chart.is3d()&&"colorAxis"!==this.coll&&c[2]&&(c[2]={plotX:c[2].plotXold||c[2].plotX,plotY:c[2].plotYold||c[2].plotY});a.apply(this,[].slice.call(c,
1))});k(w.prototype,"destroy",function(a){y(["backFrame","bottomFrame","sideFrame"],function(a){this[a]&&(this[a]=this[a].destroy())},this);a.apply(this,[].slice.call(arguments,1))});w.prototype.swapZ=function(a,d){return this.isZAxis?(d=d?0:this.chart.plotLeft,{x:d+a.z,y:a.y,z:a.x-d}):a};v=b.ZAxis=function(){this.init.apply(this,arguments)};r(v.prototype,w.prototype);r(v.prototype,{isZAxis:!0,setOptions:function(a){a=h({offset:0,lineWidth:0},a);w.prototype.setOptions.call(this,a);this.coll="zAxis"},
setAxisSize:function(){w.prototype.setAxisSize.call(this);this.width=this.len=this.chart.options.chart.options3d.depth;this.right=this.chart.chartWidth-this.width-this.left},getSeriesExtremes:function(){var a=this,d=a.chart;a.hasVisibleSeries=!1;a.dataMin=a.dataMax=a.ignoreMinPadding=a.ignoreMaxPadding=null;a.buildStacks&&a.buildStacks();y(a.series,function(c){if(c.visible||!d.options.chart.ignoreHiddenSeries)a.hasVisibleSeries=!0,c=c.zData,c.length&&(a.dataMin=Math.min(n(a.dataMin,c[0]),Math.min.apply(null,
c)),a.dataMax=Math.max(n(a.dataMax,c[0]),Math.max.apply(null,c)))})}});k(z.prototype,"getAxes",function(c){var d=this,b=this.options,b=b.zAxis=a(b.zAxis||{});c.call(this);d.is3d()&&(this.zAxis=[],y(b,function(a,c){a.index=c;a.isX=!0;(new v(d,a)).setScale()}))})})(B);(function(b){function t(b){var d=b.apply(this,[].slice.call(arguments,1));this.chart.is3d()&&(d.stroke=this.options.edgeColor||d.fill,d["stroke-width"]=z(this.options.edgeWidth,1));return d}var v=b.each,w=b.perspective,z=b.pick,A=b.Series,
y=b.seriesTypes,r=b.inArray,h=b.svg,p=b.wrap;p(y.column.prototype,"translate",function(b){b.apply(this,[].slice.call(arguments,1));if(this.chart.is3d()){var d=this,a=d.chart,f=d.options,k=f.depth||25,c=(f.stacking?f.stack||0:d.index)*(k+(f.groupZPadding||1)),e=d.borderWidth%2?.5:0;a.inverted&&!d.yAxis.reversed&&(e*=-1);!1!==f.grouping&&(c=0);c+=f.groupZPadding||1;v(d.data,function(b){if(null!==b.y){var f=b.shapeArgs,h=b.tooltipPos,m;v([["x","width"],["y","height"]],function(a){m=f[a[0]]-e;0>m&&(f[a[1]]+=
f[a[0]]+e,f[a[0]]=-e,m=0);m+f[a[1]]>d[a[0]+"Axis"].len&&0!==f[a[1]]&&(f[a[1]]=d[a[0]+"Axis"].len-f[a[0]]);if(0!==f[a[1]]&&(f[a[0]]>=d[a[0]+"Axis"].len||f[a[0]]+f[a[1]]<=e))for(var c in f)f[c]=0});b.shapeType="cuboid";f.z=c;f.depth=k;f.insidePlotArea=!0;h=w([{x:h[0],y:h[1],z:c}],a,!0)[0];b.tooltipPos=[h.x,h.y]}});d.z=c}});p(y.column.prototype,"animate",function(b){if(this.chart.is3d()){var d=arguments[1],a=this.yAxis,f=this,k=this.yAxis.reversed;h&&(d?v(f.data,function(c){null!==c.y&&(c.height=c.shapeArgs.height,
c.shapey=c.shapeArgs.y,c.shapeArgs.height=1,k||(c.shapeArgs.y=c.stackY?c.plotY+a.translate(c.stackY):c.plotY+(c.negative?-c.height:c.height)))}):(v(f.data,function(a){null!==a.y&&(a.shapeArgs.height=a.height,a.shapeArgs.y=a.shapey,a.graphic&&a.graphic.animate(a.shapeArgs,f.options.animation))}),this.drawDataLabels(),f.animate=null))}else b.apply(this,[].slice.call(arguments,1))});p(y.column.prototype,"plotGroup",function(b,d,a,f,k,c){this.chart.is3d()&&c&&!this[d]&&(this.chart.columnGroup||(this.chart.columnGroup=
this.chart.renderer.g("columnGroup").add(c)),this[d]=this.chart.columnGroup,this.chart.columnGroup.attr(this.getPlotBox()),this[d].survive=!0);return b.apply(this,Array.prototype.slice.call(arguments,1))});p(y.column.prototype,"setVisible",function(b,d){var a=this,f;a.chart.is3d()&&v(a.data,function(b){f=(b.visible=b.options.visible=d=void 0===d?!b.visible:d)?"visible":"hidden";a.options.data[r(b,a.data)]=b.options;b.graphic&&b.graphic.attr({visibility:f})});b.apply(this,Array.prototype.slice.call(arguments,
1))});p(y.column.prototype,"init",function(b){b.apply(this,[].slice.call(arguments,1));if(this.chart.is3d()){var d=this.options,a=d.grouping,f=d.stacking,k=z(this.yAxis.options.reversedStacks,!0),c=0;if(void 0===a||a){a=this.chart.retrieveStacks(f);c=d.stack||0;for(f=0;f<a[c].series.length&&a[c].series[f]!==this;f++);c=10*(a.totalStacks-a[c].position)+(k?f:-f);this.xAxis.reversed||(c=10*a.totalStacks-c)}d.zIndex=c}});p(y.column.prototype,"pointAttribs",t);y.columnrange&&(p(y.columnrange.prototype,
"pointAttribs",t),y.columnrange.prototype.plotGroup=y.column.prototype.plotGroup,y.columnrange.prototype.setVisible=y.column.prototype.setVisible);p(A.prototype,"alignDataLabel",function(b){if(this.chart.is3d()&&("column"===this.type||"columnrange"===this.type)){var d=arguments[4],a={x:d.x,y:d.y,z:this.z},a=w([a],this.chart,!0)[0];d.x=a.x;d.y=a.y}b.apply(this,[].slice.call(arguments,1))});p(b.StackItem.prototype,"getStackBox",function(h,d){var a=h.apply(this,[].slice.call(arguments,1));if(d.is3d()){var f=
{x:a.x,y:a.y,z:0},f=b.perspective([f],d,!0)[0];a.x=f.x;a.y=f.y}return a})})(B);(function(b){var t=b.deg2rad,v=b.each,w=b.pick,z=b.seriesTypes,A=b.svg;b=b.wrap;b(z.pie.prototype,"translate",function(b){b.apply(this,[].slice.call(arguments,1));if(this.chart.is3d()){var r=this,h=r.options,p=h.depth||0,n=r.chart.options.chart.options3d,d=n.alpha,a=n.beta,f=h.stacking?(h.stack||0)*p:r._i*p,f=f+p/2;!1!==h.grouping&&(f=0);v(r.data,function(b){var c=b.shapeArgs;b.shapeType="arc3d";c.z=f;c.depth=.75*p;c.alpha=
d;c.beta=a;c.center=r.center;c=(c.end+c.start)/2;b.slicedTranslation={translateX:Math.round(Math.cos(c)*h.slicedOffset*Math.cos(d*t)),translateY:Math.round(Math.sin(c)*h.slicedOffset*Math.cos(d*t))}})}});b(z.pie.prototype.pointClass.prototype,"haloPath",function(b){var r=arguments;return this.series.chart.is3d()?[]:b.call(this,r[1])});b(z.pie.prototype,"pointAttribs",function(b,r,h){b=b.call(this,r,h);h=this.options;this.chart.is3d()&&(b.stroke=h.edgeColor||r.color||this.color,b["stroke-width"]=w(h.edgeWidth,
1));return b});b(z.pie.prototype,"drawPoints",function(b){b.apply(this,[].slice.call(arguments,1));this.chart.is3d()&&v(this.points,function(b){var h=b.graphic;if(h)h[b.y&&b.visible?"show":"hide"]()})});b(z.pie.prototype,"drawDataLabels",function(b){if(this.chart.is3d()){var r=this.chart.options.chart.options3d;v(this.data,function(b){var h=b.shapeArgs,n=h.r,d=(h.start+h.end)/2,a=b.labelPos,f=-n*(1-Math.cos((h.alpha||r.alpha)*t))*Math.sin(d),k=n*(Math.cos((h.beta||r.beta)*t)-1)*Math.cos(d);v([0,2,
4],function(c){a[c]+=k;a[c+1]+=f})})}b.apply(this,[].slice.call(arguments,1))});b(z.pie.prototype,"addPoint",function(b){b.apply(this,[].slice.call(arguments,1));this.chart.is3d()&&this.update(this.userOptions,!0)});b(z.pie.prototype,"animate",function(b){if(this.chart.is3d()){var r=arguments[1],h=this.options.animation,p=this.center,n=this.group,d=this.markerGroup;A&&(!0===h&&(h={}),r?(n.oldtranslateX=n.translateX,n.oldtranslateY=n.translateY,r={translateX:p[0],translateY:p[1],scaleX:.001,scaleY:.001},
n.attr(r),d&&(d.attrSetters=n.attrSetters,d.attr(r))):(r={translateX:n.oldtranslateX,translateY:n.oldtranslateY,scaleX:1,scaleY:1},n.animate(r,h),d&&d.animate(r,h),this.animate=null))}else b.apply(this,[].slice.call(arguments,1))})})(B);(function(b){var t=b.perspective,v=b.pick,w=b.Point,z=b.seriesTypes,A=b.wrap;A(z.scatter.prototype,"translate",function(b){b.apply(this,[].slice.call(arguments,1));if(this.chart.is3d()){var r=this.chart,h=v(this.zAxis,r.options.zAxis[0]),p=[],n,d,a;for(a=0;a<this.data.length;a++)n=
this.data[a],d=h.isLog&&h.val2lin?h.val2lin(n.z):n.z,n.plotZ=h.translate(d),n.isInside=n.isInside?d>=h.min&&d<=h.max:!1,p.push({x:n.plotX,y:n.plotY,z:n.plotZ});r=t(p,r,!0);for(a=0;a<this.data.length;a++)n=this.data[a],h=r[a],n.plotXold=n.plotX,n.plotYold=n.plotY,n.plotZold=n.plotZ,n.plotX=h.x,n.plotY=h.y,n.plotZ=h.z}});A(z.scatter.prototype,"init",function(b,r,h){r.is3d()&&(this.axisTypes=["xAxis","yAxis","zAxis"],this.pointArrayMap=["x","y","z"],this.parallelArrays=["x","y","z"],this.directTouch=
!0);b=b.apply(this,[r,h]);this.chart.is3d()&&(this.tooltipOptions.pointFormat=this.userOptions.tooltip?this.userOptions.tooltip.pointFormat||"x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3ez: \x3cb\x3e{point.z}\x3c/b\x3e\x3cbr/\x3e":"x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3ez: \x3cb\x3e{point.z}\x3c/b\x3e\x3cbr/\x3e");return b});A(z.scatter.prototype,"pointAttribs",function(t,r){var h=t.apply(this,[].slice.call(arguments,
1));this.chart.is3d()&&r&&(h.zIndex=b.pointCameraDistance(r,this.chart));return h});A(w.prototype,"applyOptions",function(b){var r=b.apply(this,[].slice.call(arguments,1));this.series.chart.is3d()&&void 0===r.z&&(r.z=0);return r})})(B);(function(b){var t=b.Axis,v=b.SVGRenderer,w=b.VMLRenderer;w&&(b.setOptions({animate:!1}),w.prototype.face3d=v.prototype.face3d,w.prototype.polyhedron=v.prototype.polyhedron,w.prototype.cuboid=v.prototype.cuboid,w.prototype.cuboidPath=v.prototype.cuboidPath,w.prototype.toLinePath=
v.prototype.toLinePath,w.prototype.toLineSegments=v.prototype.toLineSegments,w.prototype.createElement3D=v.prototype.createElement3D,w.prototype.arc3d=function(b){b=v.prototype.arc3d.call(this,b);b.css({zIndex:b.zIndex});return b},b.VMLRenderer.prototype.arc3dPath=b.SVGRenderer.prototype.arc3dPath,b.wrap(t.prototype,"render",function(b){b.apply(this,[].slice.call(arguments,1));this.sideFrame&&(this.sideFrame.css({zIndex:0}),this.sideFrame.front.attr({fill:this.sideFrame.color}));this.bottomFrame&&
(this.bottomFrame.css({zIndex:1}),this.bottomFrame.front.attr({fill:this.bottomFrame.color}));this.backFrame&&(this.backFrame.css({zIndex:0}),this.backFrame.front.attr({fill:this.backFrame.color}))}))})(B)});