!function(t){"use strict";function e(t,e,n,i){t.beginPath(),t.arc(e,n,i,0,b,!1),t.fill()}function n(t,e,n,i,r){t.beginPath(),t.moveTo(e,n),t.lineTo(i,r),t.stroke()}function i(t,n,i,r,a,s,o,l){var h=Math.cos(n*b),u=Math.sin(n*b);l-=o,e(t,i-u*a,r+h*s+.5*l,o+(1-.5*h)*l)}function r(t,e,n,r,a,s,o,l){var h;for(h=5;h--;)i(t,e+h/5,n,r,a,s,o,l)}function a(t,e,n,i,a,s,o){e/=3e4;var l=.21*a,h=.12*a,u=.24*a,c=.28*a;t.fillStyle=o,r(t,e,n,i,l,h,u,c),t.globalCompositeOperation="destination-out",r(t,e,n,i,l,h,u-s,c-s),t.globalCompositeOperation="source-over"}function s(t,e,i,r,a,s,o){e/=12e4;var l,h,u,c,d=.25*a-.5*s,f=.32*a+.5*s,p=.5*a-.5*s;for(t.strokeStyle=o,t.lineWidth=s,t.lineCap="round",t.lineJoin="round",t.beginPath(),t.arc(i,r,d,0,b,!1),t.stroke(),l=8;l--;)h=(e+l/8)*b,u=Math.cos(h),c=Math.sin(h),n(t,i+u*f,r+c*f,i+u*p,r+c*p)}function o(t,e,n,i,r,a,s){e/=15e3;var o=.29*r-.5*a,l=.05*r,h=Math.cos(e*b),u=h*b/-16;t.strokeStyle=s,t.lineWidth=a,t.lineCap="round",t.lineJoin="round",n+=h*l,t.beginPath(),t.arc(n,i,o,u+b/8,u+7*b/8,!1),t.arc(n+Math.cos(u)*o*y,i+Math.sin(u)*o*y,o,u+5*b/8,u+3*b/8,!0),t.closePath(),t.stroke()}function l(t,e,n,i,r,a,s){e/=1350;var o,l,h,u,c=.16*r,d=11*b/12,f=7*b/12;for(t.fillStyle=s,o=4;o--;)l=(e+o/4)%1,h=n+(o-1.5)/1.5*(1===o||2===o?-1:1)*c,u=i+l*l*r,t.beginPath(),t.moveTo(h,u-1.5*a),t.arc(h,u,.75*a,d,f,!1),t.fill()}function h(t,e,i,r,a,s,o){e/=750;var l,h,u,c,d=.1875*a;for(t.strokeStyle=o,t.lineWidth=.5*s,t.lineCap="round",t.lineJoin="round",l=4;l--;)h=(e+l/4)%1,u=Math.floor(i+(l-1.5)/1.5*(1===l||2===l?-1:1)*d)+.5,c=r+h*a,n(t,u,c-1.5*s,u,c+1.5*s)}function u(t,e,i,r,a,s,o){e/=3e3;var l,h,u,c,d=.16*a,f=.75*s,p=e*b*.7,g=Math.cos(p)*f,m=Math.sin(p)*f,v=p+b/3,y=Math.cos(v)*f,w=Math.sin(v)*f,x=p+2*b/3,_=Math.cos(x)*f,C=Math.sin(x)*f;for(t.strokeStyle=o,t.lineWidth=.5*s,t.lineCap="round",t.lineJoin="round",l=4;l--;)h=(e+l/4)%1,u=i+Math.sin((h+l/4)*b)*d,c=r+h*a,n(t,u-g,c-m,u+g,c+m),n(t,u-y,c-w,u+y,c+w),n(t,u-_,c-C,u+_,c+C)}function c(t,e,n,i,a,s,o){e/=3e4;var l=.21*a,h=.06*a,u=.21*a,c=.28*a;t.fillStyle=o,r(t,e,n,i,l,h,u,c),t.globalCompositeOperation="destination-out",r(t,e,n,i,l,h,u-s,c-s),t.globalCompositeOperation="source-over"}function d(t,e,n,i,r,a,s){var o=r/8,l=o/3,h=2*l,u=e%1*b,c=Math.cos(u),d=Math.sin(u);t.fillStyle=s,t.strokeStyle=s,t.lineWidth=a,t.lineCap="round",t.lineJoin="round",t.beginPath(),t.arc(n,i,o,u,u+Math.PI,!1),t.arc(n-l*c,i-l*d,h,u+Math.PI,u,!1),t.arc(n+h*c,i+h*d,l,u+Math.PI,u,!0),t.globalCompositeOperation="destination-out",t.fill(),t.globalCompositeOperation="source-over",t.stroke()}function f(t,e,n,i,r,a,s,o,l){e/=2500;var h,u,c,f,p=w[s],g=(e+s-x[s].start)%o,m=(e+s-x[s].end)%o,v=(e+s)%o;if(t.strokeStyle=l,t.lineWidth=a,t.lineCap="round",t.lineJoin="round",1>g){if(t.beginPath(),g*=p.length/2-1,h=Math.floor(g),g-=h,h*=2,h+=2,t.moveTo(n+(p[h-2]*(1-g)+p[h]*g)*r,i+(p[h-1]*(1-g)+p[h+1]*g)*r),1>m){for(m*=p.length/2-1,u=Math.floor(m),m-=u,u*=2,u+=2,f=h;f!==u;f+=2)t.lineTo(n+p[f]*r,i+p[f+1]*r);t.lineTo(n+(p[u-2]*(1-m)+p[u]*m)*r,i+(p[u-1]*(1-m)+p[u+1]*m)*r)}else for(f=h;f!==p.length;f+=2)t.lineTo(n+p[f]*r,i+p[f+1]*r);t.stroke()}else if(1>m){for(t.beginPath(),m*=p.length/2-1,u=Math.floor(m),m-=u,u*=2,u+=2,t.moveTo(n+p[0]*r,i+p[1]*r),f=2;f!==u;f+=2)t.lineTo(n+p[f]*r,i+p[f+1]*r);t.lineTo(n+(p[u-2]*(1-m)+p[u]*m)*r,i+(p[u-1]*(1-m)+p[u+1]*m)*r),t.stroke()}1>v&&(v*=p.length/2-1,c=Math.floor(v),v-=c,c*=2,c+=2,d(t,e,n+(p[c-2]*(1-v)+p[c]*v)*r,i+(p[c-1]*(1-v)+p[c+1]*v)*r,r,a,l))}var p,g;!function(){var e=t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.oRequestAnimationFrame||t.msRequestAnimationFrame,n=t.cancelAnimationFrame||t.webkitCancelAnimationFrame||t.mozCancelAnimationFrame||t.oCancelAnimationFrame||t.msCancelAnimationFrame;e&&n?(p=function(t){function n(){i.value=e(n),t()}var i={value:null};return n(),i},g=function(t){n(t.value)}):(p=setInterval,g=clearInterval)}();var m=500,v=.08,b=2*Math.PI,y=2/Math.sqrt(2),w=[[-.75,-.18,-.7219,-.1527,-.6971,-.1225,-.6739,-.091,-.6516,-.0588,-.6298,-.0262,-.6083,.0065,-.5868,.0396,-.5643,.0731,-.5372,.1041,-.5033,.1259,-.4662,.1406,-.4275,.1493,-.3881,.153,-.3487,.1526,-.3095,.1488,-.2708,.1421,-.2319,.1342,-.1943,.1217,-.16,.1025,-.129,.0785,-.1012,.0509,-.0764,.0206,-.0547,-.012,-.0378,-.0472,-.0324,-.0857,-.0389,-.1241,-.0546,-.1599,-.0814,-.1876,-.1193,-.1964,-.1582,-.1935,-.1931,-.1769,-.2157,-.1453,-.229,-.1085,-.2327,-.0697,-.224,-.0317,-.2064,.0033,-.1853,.0362,-.1613,.0672,-.135,.0961,-.1051,.1213,-.0706,.1397,-.0332,.1512,.0053,.158,.0442,.1624,.0833,.1636,.1224,.1615,.1613,.1565,.1999,.15,.2378,.1402,.2749,.1279,.3118,.1147,.3487,.1015,.3858,.0892,.4236,.0787,.4621,.0715,.5012,.0702,.5398,.0766,.5768,.089,.6123,.1055,.6466,.1244,.6805,.144,.7147,.163,.75,.18],[-.75,0,-.7033,.0195,-.6569,.0399,-.6104,.06,-.5634,.0789,-.5155,.0954,-.4667,.1089,-.4174,.1206,-.3676,.1299,-.3174,.1365,-.2669,.1398,-.2162,.1391,-.1658,.1347,-.1157,.1271,-.0661,.1169,-.017,.1046,.0316,.0903,.0791,.0728,.1259,.0534,.1723,.0331,.2188,.0129,.2656,-.0064,.3122,-.0263,.3586,-.0466,.4052,-.0665,.4525,-.0847,.5007,-.1002,.5497,-.113,.5991,-.124,.6491,-.1325,.6994,-.138,.75,-.14]],x=[{start:.36,end:.11},{start:.56,end:.16}],_=function(t){this.list=[],this.interval=null,this.color=t&&t.color?t.color:"black",this.resizeClear=!(!t||!t.resizeClear)};_.CLEAR_DAY=function(t,e,n){var i=t.canvas.width,r=t.canvas.height,a=Math.min(i,r);s(t,e,.5*i,.5*r,a,a*v,n)},_.CLEAR_NIGHT=function(t,e,n){var i=t.canvas.width,r=t.canvas.height,a=Math.min(i,r);o(t,e,.5*i,.5*r,a,a*v,n)},_.PARTLY_CLOUDY_DAY=function(t,e,n){var i=t.canvas.width,r=t.canvas.height,o=Math.min(i,r);s(t,e,.625*i,.375*r,.75*o,o*v,n),a(t,e,.375*i,.625*r,.75*o,o*v,n)},_.PARTLY_CLOUDY_NIGHT=function(t,e,n){var i=t.canvas.width,r=t.canvas.height,s=Math.min(i,r);o(t,e,.667*i,.375*r,.75*s,s*v,n),a(t,e,.375*i,.625*r,.75*s,s*v,n)},_.CLOUDY=function(t,e,n){var i=t.canvas.width,r=t.canvas.height,s=Math.min(i,r);a(t,e,.5*i,.5*r,s,s*v,n)},_.RAIN=function(t,e,n){var i=t.canvas.width,r=t.canvas.height,s=Math.min(i,r);l(t,e,.5*i,.37*r,.9*s,s*v,n),a(t,e,.5*i,.37*r,.9*s,s*v,n)},_.SLEET=function(t,e,n){var i=t.canvas.width,r=t.canvas.height,s=Math.min(i,r);h(t,e,.5*i,.37*r,.9*s,s*v,n),a(t,e,.5*i,.37*r,.9*s,s*v,n)},_.SNOW=function(t,e,n){var i=t.canvas.width,r=t.canvas.height,s=Math.min(i,r);u(t,e,.5*i,.37*r,.9*s,s*v,n),a(t,e,.5*i,.37*r,.9*s,s*v,n)},_.WIND=function(t,e,n){var i=t.canvas.width,r=t.canvas.height,a=Math.min(i,r);f(t,e,.5*i,.5*r,a,a*v,0,2,n),f(t,e,.5*i,.5*r,a,a*v,1,2,n)},_.FOG=function(t,e,i){var r=t.canvas.width,a=t.canvas.height,s=Math.min(r,a),o=s*v;c(t,e,.5*r,.32*a,.75*s,o,i),e/=5e3;var l=Math.cos(e*b)*s*.02,h=Math.cos((e+.25)*b)*s*.02,u=Math.cos((e+.5)*b)*s*.02,d=Math.cos((e+.75)*b)*s*.02,f=.936*a,p=Math.floor(f-.5*o)+.5,g=Math.floor(f-2.5*o)+.5;t.strokeStyle=i,t.lineWidth=o,t.lineCap="round",t.lineJoin="round",n(t,l+.2*r+.5*o,p,h+.8*r-.5*o,p),n(t,u+.2*r+.5*o,g,d+.8*r-.5*o,g)},_.prototype={add:function(t,e){var n;"string"==typeof t&&(t=document.getElementById(t)),n={element:t,context:t.getContext("2d"),drawing:e},this.list.push(n),this.draw(n,m)},set:function(t,e){var n;for("string"==typeof t&&(t=document.getElementById(t)),n=this.list.length;n--;)if(this.list[n].element===t)return this.list[n].drawing=e,this.draw(this.list[n],m),void 0;this.add(t,e)},remove:function(t){var e;for("string"==typeof t&&(t=document.getElementById(t)),e=this.list.length;e--;)if(this.list[e].element===t)return this.list.splice(e,1),void 0},draw:function(t,e){var n=t.context.canvas;this.resizeClear?n.width=n.width:t.context.clearRect(0,0,n.width,n.height),t.drawing(t.context,e,this.color)},play:function(){var t=this;this.pause(),this.interval=p(function(){var e,n=Date.now();for(e=t.list.length;e--;)t.draw(t.list[e],n)},1e3/60)},pause:function(){this.interval&&(g(this.interval),this.interval=null)}},t.Skycons=_}(this);