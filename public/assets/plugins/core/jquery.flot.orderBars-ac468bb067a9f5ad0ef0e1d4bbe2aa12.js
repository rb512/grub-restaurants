!function(t){function e(t){function e(t,e,s){var a=null;if(i(e)&&(h(e),n(t),r(t),l(e),m>=2)){var o=u(e),v=0,y=c();"undefined"==typeof x[e.bars.order]&&(x[e.bars.order]=d(o)?-1*f(g,o-1,Math.floor(m/2)-1)-y:f(g,Math.ceil(m/2),o-2)+y+2*b),v=x[e.bars.order],a=p(s,e,v),s.points=a}return a}function i(t){return null!=t.bars&&t.bars.show&&null!=t.bars.order}function n(t){var e=w?t.getPlaceholder().innerHeight():t.getPlaceholder().innerWidth(),i=w?s(t.getData(),1):s(t.getData(),0),n=i[1]-i[0];y=n/e}function s(t,e){for(var i=new Array,n=0;n<t.length;n++)i[0]=t[n].data[0][e],i[1]=t[n].data[t[n].data.length-1][e];return i}function r(t){g=a(t.getData()),m=g.length}function a(t){for(var e=new Array,i=[],n=0;n<t.length;n++)null!=t[n].bars.order&&t[n].bars.show&&i.indexOf(t[n].bars.order)<0&&(i.push(t[n].bars.order),e.push(t[n]));return e.sort(o)}function o(t,e){var i=t.bars.order,n=e.bars.order;return n>i?-1:i>n?1:0}function l(t){v="undefined"!=typeof t.bars.lineWidth?t.bars.lineWidth:2,b=v*y}function h(t){t.bars.horizontal&&(w=!0)}function u(t){for(var e=0,i=0;i<g.length;++i)if(t==g[i]){e=i;break}return e+1}function c(){var t=0;return m%2!=0&&(t=g[Math.ceil(m/2)].bars.barWidth/2),t}function d(t){return t<=Math.ceil(m/2)}function f(t,e,i){for(var n=0,s=e;i>=s;s++)n+=t[s].bars.barWidth+2*b;return n}function p(t,e,i){for(var n=t.pointsize,s=t.points,r=0,a=w?1:0;a<s.length;a+=n)s[a]+=i,e.data[r][3]=s[a],r++;return s}var g,m,v,b,y=1,w=!1,x={};t.hooks.processDatapoints.push(e)}var i={series:{bars:{order:null}}};t.plot.plugins.push({init:e,options:i,name:"orderBars",version:"0.2"})}(jQuery);