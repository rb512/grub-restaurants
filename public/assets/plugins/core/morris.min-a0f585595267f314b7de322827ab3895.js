(function(){var t,e,i,n,s=[].slice,r={}.hasOwnProperty,a=function(t,e){function i(){this.constructor=t}for(var n in e)r.call(e,n)&&(t[n]=e[n]);return i.prototype=e.prototype,t.prototype=new i,t.__super__=e.prototype,t},o=function(t,e){return function(){return t.apply(e,arguments)}},l=[].indexOf||function(t){for(var e=0,i=this.length;i>e;e++)if(e in this&&this[e]===t)return e;return-1};e=window.Morris={},t=jQuery,e.EventEmitter=function(){function t(){}return t.prototype.on=function(t,e){return null==this.handlers&&(this.handlers={}),null==this.handlers[t]&&(this.handlers[t]=[]),this.handlers[t].push(e),this},t.prototype.fire=function(){var t,e,i,n,r,a,o;if(i=arguments[0],t=2<=arguments.length?s.call(arguments,1):[],null!=this.handlers&&null!=this.handlers[i]){for(a=this.handlers[i],o=[],n=0,r=a.length;r>n;n++)e=a[n],o.push(e.apply(null,t));return o}},t}(),e.commas=function(t){var e,i,n,s;return null!=t?(n=0>t?"-":"",e=Math.abs(t),i=Math.floor(e).toFixed(0),n+=i.replace(/(?=(?:\d{3})+$)(?!^)/g,","),s=e.toString(),s.length>i.length&&(n+=s.slice(i.length)),n):"-"},e.pad2=function(t){return(10>t?"0":"")+t},e.Grid=function(i){function n(e){var i=this;if(this.el="string"==typeof e.element?t(document.getElementById(e.element)):t(e.element),null==this.el||0===this.el.length)throw new Error("Graph container element not found");"static"===this.el.css("position")&&this.el.css("position","relative"),this.options=t.extend({},this.gridDefaults,this.defaults||{},e),"string"==typeof this.options.units&&(this.options.postUnits=e.units),this.raphael=new Raphael(this.el[0]),this.elementWidth=null,this.elementHeight=null,this.dirty=!1,this.init&&this.init(),this.setData(this.options.data),this.el.bind("mousemove",function(t){var e;return e=i.el.offset(),i.fire("hovermove",t.pageX-e.left,t.pageY-e.top)}),this.el.bind("mouseout",function(){return i.fire("hoverout")}),this.el.bind("touchstart touchmove touchend",function(t){var e,n;return n=t.originalEvent.touches[0]||t.originalEvent.changedTouches[0],e=i.el.offset(),i.fire("hover",n.pageX-e.left,n.pageY-e.top),n}),this.el.bind("click",function(t){var e;return e=i.el.offset(),i.fire("gridclick",t.pageX-e.left,t.pageY-e.top)}),this.postInit&&this.postInit()}return a(n,i),n.prototype.gridDefaults={dateFormat:null,axes:!0,grid:!0,gridLineColor:"#aaa",gridStrokeWidth:.5,gridTextColor:"#888",gridTextSize:12,gridTextFamily:"sans-serif",gridTextWeight:"normal",hideHover:!1,yLabelFormat:null,xLabelAngle:0,numLines:5,padding:25,parseTime:!0,postUnits:"",preUnits:"",ymax:"auto",ymin:"auto 0",goals:[],goalStrokeWidth:1,goalLineColors:["#666633","#999966","#cc6666","#663333"],events:[],eventStrokeWidth:1,eventLineColors:["#005a04","#ccffbb","#3a5f0b","#005502"]},n.prototype.setData=function(t,i){var n,s,r,a,o,l,h,u,c,d,f,p,g,m;return null==i&&(i=!0),this.options.data=t,null==t||0===t.length?(this.data=[],this.raphael.clear(),null!=this.hover&&this.hover.hide(),void 0):(p=this.cumulative?0:null,g=this.cumulative?0:null,this.options.goals.length>0&&(o=Math.min.apply(null,this.options.goals),a=Math.max.apply(null,this.options.goals),g=null!=g?Math.min(g,o):o,p=null!=p?Math.max(p,a):a),this.data=function(){var i,n,a;for(a=[],r=i=0,n=t.length;n>i;r=++i)h=t[r],l={},l.label=h[this.options.xkey],this.options.parseTime?(l.x=e.parseDate(l.label),this.options.dateFormat?l.label=this.options.dateFormat(l.x):"number"==typeof l.label&&(l.label=new Date(l.label).toString())):(l.x=r,this.options.xLabelFormat&&(l.label=this.options.xLabelFormat(l))),c=0,l.y=function(){var t,e,i,n;for(i=this.options.ykeys,n=[],s=t=0,e=i.length;e>t;s=++t)f=i[s],m=h[f],"string"==typeof m&&(m=parseFloat(m)),null!=m&&"number"!=typeof m&&(m=null),null!=m&&(this.cumulative?c+=m:null!=p?(p=Math.max(m,p),g=Math.min(m,g)):p=g=m),this.cumulative&&null!=c&&(p=Math.max(c,p),g=Math.min(c,g)),n.push(m);return n}.call(this),a.push(l);return a}.call(this),this.options.parseTime&&(this.data=this.data.sort(function(t,e){return(t.x>e.x)-(e.x>t.x)})),this.xmin=this.data[0].x,this.xmax=this.data[this.data.length-1].x,this.events=[],this.options.parseTime&&this.options.events.length>0&&(this.events=function(){var t,i,s,r;for(s=this.options.events,r=[],t=0,i=s.length;i>t;t++)n=s[t],r.push(e.parseDate(n));return r}.call(this),this.xmax=Math.max(this.xmax,Math.max.apply(null,this.events)),this.xmin=Math.min(this.xmin,Math.min.apply(null,this.events))),this.xmin===this.xmax&&(this.xmin-=1,this.xmax+=1),this.ymin=this.yboundary("min",g),this.ymax=this.yboundary("max",p),this.ymin===this.ymax&&(g&&(this.ymin-=1),this.ymax+=1),(this.options.axes===!0||this.options.grid===!0)&&(this.options.ymax===this.gridDefaults.ymax&&this.options.ymin===this.gridDefaults.ymin?(this.grid=this.autoGridLines(this.ymin,this.ymax,this.options.numLines),this.ymin=Math.min(this.ymin,this.grid[0]),this.ymax=Math.max(this.ymax,this.grid[this.grid.length-1])):(u=(this.ymax-this.ymin)/(this.options.numLines-1),this.grid=function(){var t,e,i,n;for(n=[],d=t=e=this.ymin,i=this.ymax;i>=e?i>=t:t>=i;d=t+=u)n.push(d);return n}.call(this))),this.dirty=!0,i?this.redraw():void 0)},n.prototype.yboundary=function(t,e){var i,n;return i=this.options["y"+t],"string"==typeof i?"auto"===i.slice(0,4)?i.length>5?(n=parseInt(i.slice(5),10),null==e?n:Math[t](e,n)):null!=e?e:0:parseInt(i,10):i},n.prototype.autoGridLines=function(t,e,i){var n,s,r,a,o,l,h,u,c;return o=e-t,c=Math.floor(Math.log(o)/Math.log(10)),h=Math.pow(10,c),s=Math.floor(t/h)*h,n=Math.ceil(e/h)*h,l=(n-s)/(i-1),1===h&&l>1&&Math.ceil(l)!==l&&(l=Math.ceil(l),n=s+l*(i-1)),0>s&&n>0&&(s=Math.floor(t/l)*l,n=Math.ceil(e/l)*l),1>l?(a=Math.floor(Math.log(l)/Math.log(10)),r=function(){var t,e;for(e=[],u=t=s;n>=s?n>=t:t>=n;u=t+=l)e.push(parseFloat(u.toFixed(1-a)));return e}()):r=function(){var t,e;for(e=[],u=t=s;n>=s?n>=t:t>=n;u=t+=l)e.push(u);return e}(),r},n.prototype._calc=function(){var t,e,i,n,s,r;return s=this.el.width(),i=this.el.height(),(this.elementWidth!==s||this.elementHeight!==i||this.dirty)&&(this.elementWidth=s,this.elementHeight=i,this.dirty=!1,this.left=this.options.padding,this.right=this.elementWidth-this.options.padding,this.top=this.options.padding,this.bottom=this.elementHeight-this.options.padding,this.options.axes&&(r=function(){var t,i,n,s;for(n=this.grid,s=[],t=0,i=n.length;i>t;t++)e=n[t],s.push(this.measureText(this.yAxisFormat(e)).width);return s}.call(this),this.left+=Math.max.apply(Math,r),t=function(){var t,e,i;for(i=[],n=t=0,e=this.data.length;e>=0?e>t:t>e;n=e>=0?++t:--t)i.push(this.measureText(this.data[n].text,-this.options.xLabelAngle).height);return i}.call(this),this.bottom-=Math.max.apply(Math,t)),this.width=Math.max(1,this.right-this.left),this.height=Math.max(1,this.bottom-this.top),this.dx=this.width/(this.xmax-this.xmin),this.dy=this.height/(this.ymax-this.ymin),this.calc)?this.calc():void 0},n.prototype.transY=function(t){return this.bottom-(t-this.ymin)*this.dy},n.prototype.transX=function(t){return 1===this.data.length?(this.left+this.right)/2:this.left+(t-this.xmin)*this.dx},n.prototype.redraw=function(){return this.raphael.clear(),this._calc(),this.drawGrid(),this.drawGoals(),this.drawEvents(),this.draw?this.draw():void 0},n.prototype.measureText=function(t,e){var i,n;return null==e&&(e=0),n=this.raphael.text(100,100,t).attr("font-size",this.options.gridTextSize).attr("font-family",this.options.gridTextFamily).attr("font-weight",this.options.gridTextWeight).rotate(e),i=n.getBBox(),n.remove(),i},n.prototype.yAxisFormat=function(t){return this.yLabelFormat(t)},n.prototype.yLabelFormat=function(t){return"function"==typeof this.options.yLabelFormat?this.options.yLabelFormat(t):""+this.options.preUnits+e.commas(t)+this.options.postUnits},n.prototype.updateHover=function(t,e){var i,n;return i=this.hitTest(t,e),null!=i?(n=this.hover).update.apply(n,i):void 0},n.prototype.drawGrid=function(){var t,e,i,n,s,r;if(this.options.grid!==!1||this.options.axes!==!1){for(s=this.grid,r=[],i=0,n=s.length;n>i;i++)t=s[i],e=this.transY(t),this.options.axes&&this.drawYAxisLabel(this.left-this.options.padding/2,e,this.yAxisFormat(t)),this.options.grid?r.push(this.drawGridLine("M"+this.left+","+e+"H"+(this.left+this.width))):r.push(void 0);return r}},n.prototype.drawGoals=function(){var t,e,i,n,s,r,a;for(r=this.options.goals,a=[],i=n=0,s=r.length;s>n;i=++n)e=r[i],t=this.options.goalLineColors[i%this.options.goalLineColors.length],a.push(this.drawGoal(e,t));return a},n.prototype.drawEvents=function(){var t,e,i,n,s,r,a;for(r=this.events,a=[],i=n=0,s=r.length;s>n;i=++n)e=r[i],t=this.options.eventLineColors[i%this.options.eventLineColors.length],a.push(this.drawEvent(e,t));return a},n.prototype.drawGoal=function(t,e){return this.raphael.path("M"+this.left+","+this.transY(t)+"H"+this.right).attr("stroke",e).attr("stroke-width",this.options.goalStrokeWidth)},n.prototype.drawEvent=function(t,e){return this.raphael.path("M"+this.transX(t)+","+this.bottom+"V"+this.top).attr("stroke",e).attr("stroke-width",this.options.eventStrokeWidth)},n.prototype.drawYAxisLabel=function(t,e,i){return this.raphael.text(t,e,i).attr("font-size",this.options.gridTextSize).attr("font-family",this.options.gridTextFamily).attr("font-weight",this.options.gridTextWeight).attr("fill",this.options.gridTextColor).attr("text-anchor","end")},n.prototype.drawGridLine=function(t){return this.raphael.path(t).attr("stroke",this.options.gridLineColor).attr("stroke-width",this.options.gridStrokeWidth)},n}(e.EventEmitter),e.parseDate=function(t){var e,i,n,s,r,a,o,l,h,u,c;return"number"==typeof t?t:(i=t.match(/^(\d+) Q(\d)$/),s=t.match(/^(\d+)-(\d+)$/),r=t.match(/^(\d+)-(\d+)-(\d+)$/),o=t.match(/^(\d+) W(\d+)$/),l=t.match(/^(\d+)-(\d+)-(\d+)[ T](\d+):(\d+)(Z|([+-])(\d\d):?(\d\d))?$/),h=t.match(/^(\d+)-(\d+)-(\d+)[ T](\d+):(\d+):(\d+(\.\d+)?)(Z|([+-])(\d\d):?(\d\d))?$/),i?new Date(parseInt(i[1],10),3*parseInt(i[2],10)-1,1).getTime():s?new Date(parseInt(s[1],10),parseInt(s[2],10)-1,1).getTime():r?new Date(parseInt(r[1],10),parseInt(r[2],10)-1,parseInt(r[3],10)).getTime():o?(u=new Date(parseInt(o[1],10),0,1),4!==u.getDay()&&u.setMonth(0,1+(4-u.getDay()+7)%7),u.getTime()+6048e5*parseInt(o[2],10)):l?l[6]?(a=0,"Z"!==l[6]&&(a=60*parseInt(l[8],10)+parseInt(l[9],10),"+"===l[7]&&(a=0-a)),Date.UTC(parseInt(l[1],10),parseInt(l[2],10)-1,parseInt(l[3],10),parseInt(l[4],10),parseInt(l[5],10)+a)):new Date(parseInt(l[1],10),parseInt(l[2],10)-1,parseInt(l[3],10),parseInt(l[4],10),parseInt(l[5],10)).getTime():h?(c=parseFloat(h[6]),e=Math.floor(c),n=Math.round(1e3*(c-e)),h[8]?(a=0,"Z"!==h[8]&&(a=60*parseInt(h[10],10)+parseInt(h[11],10),"+"===h[9]&&(a=0-a)),Date.UTC(parseInt(h[1],10),parseInt(h[2],10)-1,parseInt(h[3],10),parseInt(h[4],10),parseInt(h[5],10)+a,e,n)):new Date(parseInt(h[1],10),parseInt(h[2],10)-1,parseInt(h[3],10),parseInt(h[4],10),parseInt(h[5],10),e,n).getTime()):new Date(parseInt(t,10),0,1).getTime())},e.Hover=function(){function i(i){null==i&&(i={}),this.options=t.extend({},e.Hover.defaults,i),this.el=t("<div class='"+this.options["class"]+"'></div>"),this.el.hide(),this.options.parent.append(this.el)}return i.defaults={"class":"morris-hover morris-default-style"},i.prototype.update=function(t,e,i){return this.html(t),this.show(),this.moveTo(e,i)},i.prototype.html=function(t){return this.el.html(t)},i.prototype.moveTo=function(t,e){var i,n,s,r,a,o;return a=this.options.parent.innerWidth(),r=this.options.parent.innerHeight(),n=this.el.outerWidth(),i=this.el.outerHeight(),s=Math.min(Math.max(0,t-n/2),a-n),null!=e?(o=e-i-10,0>o&&(o=e+10,o+i>r&&(o=r/2-i/2))):o=r/2-i/2,this.el.css({left:s+"px",top:parseInt(o)+"px"})},i.prototype.show=function(){return this.el.show()},i.prototype.hide=function(){return this.el.hide()},i}(),e.Line=function(t){function i(t){return this.hilight=o(this.hilight,this),this.onHoverOut=o(this.onHoverOut,this),this.onHoverMove=o(this.onHoverMove,this),this.onGridClick=o(this.onGridClick,this),this instanceof e.Line?(i.__super__.constructor.call(this,t),void 0):new e.Line(t)}return a(i,t),i.prototype.init=function(){return this.pointGrow=Raphael.animation({r:this.options.pointSize+3},25,"linear"),this.pointShrink=Raphael.animation({r:this.options.pointSize},25,"linear"),"always"!==this.options.hideHover?(this.hover=new e.Hover({parent:this.el}),this.on("hovermove",this.onHoverMove),this.on("hoverout",this.onHoverOut),this.on("gridclick",this.onGridClick)):void 0},i.prototype.defaults={lineWidth:3,pointSize:4,lineColors:["#0b62a4","#7A92A3","#4da74d","#afd8f8","#edc240","#cb4b4b","#9440ed"],pointWidths:[1],pointStrokeColors:["#ffffff"],pointFillColors:[],smooth:!0,xLabels:"auto",xLabelFormat:null,xLabelMargin:24,continuousLine:!0,hideHover:!1},i.prototype.calc=function(){return this.calcPoints(),this.generatePaths()},i.prototype.calcPoints=function(){var t,e,i,n,s,r;for(s=this.data,r=[],i=0,n=s.length;n>i;i++)t=s[i],t._x=this.transX(t.x),t._y=function(){var i,n,s,r;for(s=t.y,r=[],i=0,n=s.length;n>i;i++)e=s[i],null!=e?r.push(this.transY(e)):r.push(e);return r}.call(this),r.push(t._ymax=Math.min.apply(null,[this.bottom].concat(function(){var i,n,s,r;for(s=t._y,r=[],i=0,n=s.length;n>i;i++)e=s[i],null!=e&&r.push(e);return r}())));return r},i.prototype.hitTest=function(t){var e,i,n,s,r;if(0===this.data.length)return null;for(r=this.data.slice(1),e=n=0,s=r.length;s>n&&(i=r[e],!(t<(i._x+this.data[e]._x)/2));e=++n);return e},i.prototype.onGridClick=function(t,e){var i;return i=this.hitTest(t,e),this.fire("click",i,this.options.data[i],t,e)},i.prototype.onHoverMove=function(t,e){var i;return i=this.hitTest(t,e),this.displayHoverForRow(i)},i.prototype.onHoverOut=function(){return this.options.hideHover!==!1?this.displayHoverForRow(null):void 0},i.prototype.displayHoverForRow=function(t){var e;return null!=t?((e=this.hover).update.apply(e,this.hoverContentForRow(t)),this.hilight(t)):(this.hover.hide(),this.hilight())},i.prototype.hoverContentForRow=function(t){var e,i,n,s,r,a,o;for(n=this.data[t],e="<div class='morris-hover-row-label'>"+n.label+"</div>",o=n.y,i=r=0,a=o.length;a>r;i=++r)s=o[i],e+="<div class='morris-hover-point' style='color: "+this.colorFor(n,i,"label")+"'>\n  "+this.options.labels[i]+":\n  "+this.yLabelFormat(s)+"\n</div>";return"function"==typeof this.options.hoverCallback&&(e=this.options.hoverCallback(t,this.options,e)),[e,n._x,n._ymax]},i.prototype.generatePaths=function(){var t,i,n,s,r;return this.paths=function(){var a,o,h,u;for(u=[],n=a=0,o=this.options.ykeys.length;o>=0?o>a:a>o;n=o>=0?++a:--a)r=this.options.smooth===!0||(h=this.options.ykeys[n],l.call(this.options.smooth,h)>=0),i=function(){var t,e,i,r;for(i=this.data,r=[],t=0,e=i.length;e>t;t++)s=i[t],void 0!==s._y[n]&&r.push({x:s._x,y:s._y[n]});return r}.call(this),this.options.continuousLine&&(i=function(){var e,n,s;for(s=[],e=0,n=i.length;n>e;e++)t=i[e],null!==t.y&&s.push(t);return s}()),i.length>1?u.push(e.Line.createPath(i,r,this.bottom)):u.push(null);return u}.call(this)},i.prototype.draw=function(){return this.options.axes&&this.drawXAxis(),this.drawSeries(),this.options.hideHover===!1?this.displayHoverForRow(this.data.length-1):void 0},i.prototype.drawXAxis=function(){var t,i,n,s,r,a,o,l,h,u,c=this;for(o=this.bottom+this.options.padding/2,r=null,s=null,t=function(t,e){var i,n,a,l,h;return i=c.drawXAxisLabel(c.transX(e),o,t),h=i.getBBox(),i.transform("r"+-c.options.xLabelAngle),n=i.getBBox(),i.transform("t0,"+n.height/2+"..."),0!==c.options.xLabelAngle&&(l=-.5*h.width*Math.cos(c.options.xLabelAngle*Math.PI/180),i.transform("t"+l+",0...")),n=i.getBBox(),(null==r||r>=n.x+n.width||null!=s&&s>=n.x)&&n.x>=0&&n.x+n.width<c.el.width()?(0!==c.options.xLabelAngle&&(a=1.25*c.options.gridTextSize/Math.sin(c.options.xLabelAngle*Math.PI/180),s=n.x-a),r=n.x-c.options.xLabelMargin):i.remove()},n=this.options.parseTime?1===this.data.length&&"auto"===this.options.xLabels?[[this.data[0].label,this.data[0].x]]:e.labelSeries(this.xmin,this.xmax,this.width,this.options.xLabels,this.options.xLabelFormat):function(){var t,e,i,n;for(i=this.data,n=[],t=0,e=i.length;e>t;t++)a=i[t],n.push([a.label,a.x]);return n}.call(this),n.reverse(),u=[],l=0,h=n.length;h>l;l++)i=n[l],u.push(t(i[0],i[1]));return u},i.prototype.drawSeries=function(){var t,e,i,n,s,r;for(this.seriesPoints=[],t=e=n=this.options.ykeys.length-1;0>=n?0>=e:e>=0;t=0>=n?++e:--e)this._drawLineFor(t);for(r=[],t=i=s=this.options.ykeys.length-1;0>=s?0>=i:i>=0;t=0>=s?++i:--i)r.push(this._drawPointFor(t));return r},i.prototype._drawPointFor=function(t){var e,i,n,s,r,a;for(this.seriesPoints[t]=[],r=this.data,a=[],n=0,s=r.length;s>n;n++)i=r[n],e=null,null!=i._y[t]&&(e=this.drawLinePoint(i._x,i._y[t],this.options.pointSize,this.colorFor(i,t,"point"),t)),a.push(this.seriesPoints[t].push(e));return a},i.prototype._drawLineFor=function(t){var e;return e=this.paths[t],null!==e?this.drawLinePath(e,this.colorFor(null,t,"line")):void 0},i.createPath=function(t,i,n){var s,r,a,o,l,h,u,c,d,f,p,g,m,v;for(u="",i&&(a=e.Line.gradients(t)),c={y:null},o=m=0,v=t.length;v>m;o=++m)s=t[o],null!=s.y&&(null!=c.y?i?(r=a[o],h=a[o-1],l=(s.x-c.x)/4,d=c.x+l,p=Math.min(n,c.y+l*h),f=s.x-l,g=Math.min(n,s.y-l*r),u+="C"+d+","+p+","+f+","+g+","+s.x+","+s.y):u+="L"+s.x+","+s.y:i&&null==a[o]||(u+="M"+s.x+","+s.y)),c=s;return u},i.gradients=function(t){var e,i,n,s,r,a,o,l;for(i=function(t,e){return(t.y-e.y)/(t.x-e.x)},l=[],n=a=0,o=t.length;o>a;n=++a)e=t[n],null!=e.y?(s=t[n+1]||{y:null},r=t[n-1]||{y:null},null!=r.y&&null!=s.y?l.push(i(r,s)):null!=r.y?l.push(i(r,e)):null!=s.y?l.push(i(e,s)):l.push(null)):l.push(null);return l},i.prototype.hilight=function(t){var e,i,n,s,r;if(null!==this.prevHilight&&this.prevHilight!==t)for(e=i=0,s=this.seriesPoints.length-1;s>=0?s>=i:i>=s;e=s>=0?++i:--i)this.seriesPoints[e][this.prevHilight]&&this.seriesPoints[e][this.prevHilight].animate(this.pointShrink);if(null!==t&&this.prevHilight!==t)for(e=n=0,r=this.seriesPoints.length-1;r>=0?r>=n:n>=r;e=r>=0?++n:--n)this.seriesPoints[e][t]&&this.seriesPoints[e][t].animate(this.pointGrow);return this.prevHilight=t},i.prototype.colorFor=function(t,e,i){return"function"==typeof this.options.lineColors?this.options.lineColors.call(this,t,e,i):"point"===i?this.options.pointFillColors[e%this.options.pointFillColors.length]||this.options.lineColors[e%this.options.lineColors.length]:this.options.lineColors[e%this.options.lineColors.length]},i.prototype.drawXAxisLabel=function(t,e,i){return this.raphael.text(t,e,i).attr("font-size",this.options.gridTextSize).attr("font-family",this.options.gridTextFamily).attr("font-weight",this.options.gridTextWeight).attr("fill",this.options.gridTextColor)},i.prototype.drawLinePath=function(t,e){return this.raphael.path(t).attr("stroke",e).attr("stroke-width",this.options.lineWidth)},i.prototype.drawLinePoint=function(t,e,i,n,s){return this.raphael.circle(t,e,i).attr("fill",n).attr("stroke-width",this.strokeWidthForSeries(s)).attr("stroke",this.strokeForSeries(s))},i.prototype.strokeWidthForSeries=function(t){return this.options.pointWidths[t%this.options.pointWidths.length]},i.prototype.strokeForSeries=function(t){return this.options.pointStrokeColors[t%this.options.pointStrokeColors.length]},i}(e.Grid),e.labelSeries=function(i,n,s,r,a){var o,l,h,u,c,d,f,p,g,m,v;if(h=200*(n-i)/s,l=new Date(i),f=e.LABEL_SPECS[r],void 0===f)for(v=e.AUTO_LABEL_ORDER,g=0,m=v.length;m>g;g++)if(u=v[g],d=e.LABEL_SPECS[u],h>=d.span){f=d;break}for(void 0===f&&(f=e.LABEL_SPECS.second),a&&(f=t.extend({},f,{fmt:a})),o=f.start(l),c=[];(p=o.getTime())<=n;)p>=i&&c.push([f.fmt(o),p]),f.incr(o);return c},i=function(t){return{span:60*t*1e3,start:function(t){return new Date(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours())},fmt:function(t){return""+e.pad2(t.getHours())+":"+e.pad2(t.getMinutes())},incr:function(e){return e.setUTCMinutes(e.getUTCMinutes()+t)}}},n=function(t){return{span:1e3*t,start:function(t){return new Date(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes())},fmt:function(t){return""+e.pad2(t.getHours())+":"+e.pad2(t.getMinutes())+":"+e.pad2(t.getSeconds())},incr:function(e){return e.setUTCSeconds(e.getUTCSeconds()+t)}}},e.LABEL_SPECS={decade:{span:1728e8,start:function(t){return new Date(t.getFullYear()-t.getFullYear()%10,0,1)},fmt:function(t){return""+t.getFullYear()},incr:function(t){return t.setFullYear(t.getFullYear()+10)}},year:{span:1728e7,start:function(t){return new Date(t.getFullYear(),0,1)},fmt:function(t){return""+t.getFullYear()},incr:function(t){return t.setFullYear(t.getFullYear()+1)}},month:{span:24192e5,start:function(t){return new Date(t.getFullYear(),t.getMonth(),1)},fmt:function(t){return""+t.getFullYear()+"-"+e.pad2(t.getMonth()+1)},incr:function(t){return t.setMonth(t.getMonth()+1)}},day:{span:864e5,start:function(t){return new Date(t.getFullYear(),t.getMonth(),t.getDate())},fmt:function(t){return""+t.getFullYear()+"-"+e.pad2(t.getMonth()+1)+"-"+e.pad2(t.getDate())},incr:function(t){return t.setDate(t.getDate()+1)}},hour:i(60),"30min":i(30),"15min":i(15),"10min":i(10),"5min":i(5),minute:i(1),"30sec":n(30),"15sec":n(15),"10sec":n(10),"5sec":n(5),second:n(1)},e.AUTO_LABEL_ORDER=["decade","year","month","day","hour","30min","15min","10min","5min","minute","30sec","15sec","10sec","5sec","second"],e.Area=function(i){function n(i){var r;return this instanceof e.Area?(r=t.extend({},s,i),this.cumulative=!r.behaveLikeLine,"auto"===r.fillOpacity&&(r.fillOpacity=r.behaveLikeLine?.8:1),n.__super__.constructor.call(this,r),void 0):new e.Area(i)}var s;return a(n,i),s={fillOpacity:"auto",behaveLikeLine:!1},n.prototype.calcPoints=function(){var t,e,i,n,s,r,a;for(r=this.data,a=[],n=0,s=r.length;s>n;n++)t=r[n],t._x=this.transX(t.x),e=0,t._y=function(){var n,s,r,a;for(r=t.y,a=[],n=0,s=r.length;s>n;n++)i=r[n],this.options.behaveLikeLine?a.push(this.transY(i)):(e+=i||0,a.push(this.transY(e)));return a}.call(this),a.push(t._ymax=Math.max.apply(Math,t._y));return a},n.prototype.drawSeries=function(){var t,e,i,n,s,r,a,o;for(this.seriesPoints=[],e=this.options.behaveLikeLine?function(){r=[];for(var t=0,e=this.options.ykeys.length-1;e>=0?e>=t:t>=e;e>=0?t++:t--)r.push(t);return r}.apply(this):function(){a=[];for(var t=s=this.options.ykeys.length-1;0>=s?0>=t:t>=0;0>=s?t++:t--)a.push(t);return a}.apply(this),o=[],i=0,n=e.length;n>i;i++)t=e[i],this._drawFillFor(t),this._drawLineFor(t),o.push(this._drawPointFor(t));return o},n.prototype._drawFillFor=function(t){var e;return e=this.paths[t],null!==e?(e+="L"+this.transX(this.xmax)+","+this.bottom+"L"+this.transX(this.xmin)+","+this.bottom+"Z",this.drawFilledPath(e,this.fillForSeries(t))):void 0},n.prototype.fillForSeries=function(t){var e;return e=Raphael.rgb2hsl(this.colorFor(this.data[t],t,"line")),Raphael.hsl(e.h,this.options.behaveLikeLine?.9*e.s:.75*e.s,Math.min(.98,this.options.behaveLikeLine?1.2*e.l:1.25*e.l))},n.prototype.drawFilledPath=function(t,e){return this.raphael.path(t).attr("fill",e).attr("fill-opacity",this.options.fillOpacity).attr("stroke-width",0)},n}(e.Line),e.Bar=function(i){function n(i){return this.onHoverOut=o(this.onHoverOut,this),this.onHoverMove=o(this.onHoverMove,this),this.onGridClick=o(this.onGridClick,this),this instanceof e.Bar?(n.__super__.constructor.call(this,t.extend({},i,{parseTime:!1})),void 0):new e.Bar(i)}return a(n,i),n.prototype.init=function(){return this.cumulative=this.options.stacked,"always"!==this.options.hideHover?(this.hover=new e.Hover({parent:this.el}),this.on("hovermove",this.onHoverMove),this.on("hoverout",this.onHoverOut),this.on("gridclick",this.onGridClick)):void 0},n.prototype.defaults={barSizeRatio:.75,barGap:3,barColors:["#0b62a4","#7a92a3","#4da74d","#afd8f8","#edc240","#cb4b4b","#9440ed"],xLabelMargin:50},n.prototype.calc=function(){var t;return this.calcBars(),this.options.hideHover===!1?(t=this.hover).update.apply(t,this.hoverContentForRow(this.data.length-1)):void 0},n.prototype.calcBars=function(){var t,e,i,n,s,r,a;for(r=this.data,a=[],t=n=0,s=r.length;s>n;t=++n)e=r[t],e._x=this.left+this.width*(t+.5)/this.data.length,a.push(e._y=function(){var t,n,s,r;for(s=e.y,r=[],t=0,n=s.length;n>t;t++)i=s[t],null!=i?r.push(this.transY(i)):r.push(null);return r}.call(this));return a},n.prototype.draw=function(){return this.options.axes&&this.drawXAxis(),this.drawSeries()},n.prototype.drawXAxis=function(){var t,e,i,n,s,r,a,o,l,h,u,c,d;for(h=this.bottom+this.options.padding/2,a=null,r=null,d=[],t=u=0,c=this.data.length;c>=0?c>u:u>c;t=c>=0?++u:--u)o=this.data[this.data.length-1-t],e=this.drawXAxisLabel(o._x,h,o.label),l=e.getBBox(),e.transform("r"+-this.options.xLabelAngle),i=e.getBBox(),e.transform("t0,"+i.height/2+"..."),0!==this.options.xLabelAngle&&(s=-.5*l.width*Math.cos(this.options.xLabelAngle*Math.PI/180),e.transform("t"+s+",0...")),(null==a||a>=i.x+i.width||null!=r&&r>=i.x)&&i.x>=0&&i.x+i.width<this.el.width()?(0!==this.options.xLabelAngle&&(n=1.25*this.options.gridTextSize/Math.sin(this.options.xLabelAngle*Math.PI/180),r=i.x-n),d.push(a=i.x-this.options.xLabelMargin)):d.push(e.remove());return d},n.prototype.drawSeries=function(){var t,e,i,n,s,r,a,o,l,h,u,c,d,f;return i=this.width/this.options.data.length,o=null!=this.options.stacked?1:this.options.ykeys.length,t=(i*this.options.barSizeRatio-this.options.barGap*(o-1))/o,a=i*(1-this.options.barSizeRatio)/2,f=this.ymin<=0&&this.ymax>=0?this.transY(0):null,this.bars=function(){var o,p,g,m;for(g=this.data,m=[],n=o=0,p=g.length;p>o;n=++o)l=g[n],s=0,m.push(function(){var o,p,g,m;for(g=l._y,m=[],h=o=0,p=g.length;p>o;h=++o)d=g[h],null!==d?(f?(c=Math.min(d,f),e=Math.max(d,f)):(c=d,e=this.bottom),r=this.left+n*i+a,this.options.stacked||(r+=h*(t+this.options.barGap)),u=e-c,this.options.stacked&&(c-=s),this.drawBar(r,c,t,u,this.colorFor(l,h,"bar")),m.push(s+=u)):m.push(null);return m}.call(this));return m}.call(this)},n.prototype.colorFor=function(t,e,i){var n,s;return"function"==typeof this.options.barColors?(n={x:t.x,y:t.y[e],label:t.label},s={index:e,key:this.options.ykeys[e],label:this.options.labels[e]},this.options.barColors.call(this,n,s,i)):this.options.barColors[e%this.options.barColors.length]},n.prototype.hitTest=function(t){return 0===this.data.length?null:(t=Math.max(Math.min(t,this.right),this.left),Math.min(this.data.length-1,Math.floor((t-this.left)/(this.width/this.data.length))))},n.prototype.onGridClick=function(t,e){var i;return i=this.hitTest(t,e),this.fire("click",i,this.options.data[i],t,e)},n.prototype.onHoverMove=function(t,e){var i,n;return i=this.hitTest(t,e),(n=this.hover).update.apply(n,this.hoverContentForRow(i))},n.prototype.onHoverOut=function(){return this.options.hideHover!==!1?this.hover.hide():void 0},n.prototype.hoverContentForRow=function(t){var e,i,n,s,r,a,o,l;for(n=this.data[t],e="<div class='morris-hover-row-label'>"+n.label+"</div>",l=n.y,i=a=0,o=l.length;o>a;i=++a)r=l[i],e+="<div class='morris-hover-point' style='color: "+this.colorFor(n,i,"label")+"'>\n  "+this.options.labels[i]+":\n  "+this.yLabelFormat(r)+"\n</div>";return"function"==typeof this.options.hoverCallback&&(e=this.options.hoverCallback(t,this.options,e)),s=this.left+(t+.5)*this.width/this.data.length,[e,s]},n.prototype.drawXAxisLabel=function(t,e,i){var n;return n=this.raphael.text(t,e,i).attr("font-size",this.options.gridTextSize).attr("font-family",this.options.gridTextFamily).attr("font-weight",this.options.gridTextWeight).attr("fill",this.options.gridTextColor)},n.prototype.drawBar=function(t,e,i,n,s){return this.raphael.rect(t,e,i,n).attr("fill",s).attr("stroke-width",0)},n}(e.Grid),e.Donut=function(i){function n(i){this.select=o(this.select,this),this.click=o(this.click,this);var n;if(!(this instanceof e.Donut))return new e.Donut(i);if(this.el="string"==typeof i.element?t(document.getElementById(i.element)):t(i.element),this.options=t.extend({},this.defaults,i),null===this.el||0===this.el.length)throw new Error("Graph placeholder not found.");void 0!==i.data&&0!==i.data.length&&(this.data=i.data,this.values=function(){var t,e,i,s;for(i=this.data,s=[],t=0,e=i.length;e>t;t++)n=i[t],s.push(parseFloat(n.value));return s}.call(this),this.redraw())}return a(n,i),n.prototype.defaults={colors:["#0B62A4","#3980B5","#679DC6","#95BBD7","#B0CCE1","#095791","#095085","#083E67","#052C48","#042135"],backgroundColor:"#FFFFFF",labelColor:"#000000",formatter:e.commas},n.prototype.redraw=function(){var t,i,n,s,r,a,o,l,h,u,c,d,f,p,g,m,v,b,y,w,x,_,C;for(this.el.empty(),this.raphael=new Raphael(this.el[0]),i=this.el.width()/2,n=this.el.height()/2,f=(Math.min(i,n)-10)/3,c=0,w=this.values,p=0,v=w.length;v>p;p++)d=w[p],c+=d;for(l=5/(2*f),t=1.9999*Math.PI-l*this.data.length,a=0,r=0,this.segments=[],x=this.values,s=g=0,b=x.length;b>g;s=++g)d=x[s],h=a+l+t*(d/c),u=new e.DonutSegment(i,n,2*f,f,a,h,this.options.colors[r%this.options.colors.length],this.options.backgroundColor,r,this.raphael),u.render(),this.segments.push(u),u.on("hover",this.select),u.on("click",this.click),a=h,r+=1;for(this.text1=this.drawEmptyDonutLabel(i,n-10,this.options.labelColor,15,800),this.text2=this.drawEmptyDonutLabel(i,n+10,this.options.labelColor,14),o=Math.max.apply(null,function(){var t,e,i,n;for(i=this.values,n=[],t=0,e=i.length;e>t;t++)d=i[t],n.push(d);return n}.call(this)),r=0,_=this.values,C=[],m=0,y=_.length;y>m;m++){if(d=_[m],d===o){this.select(r);break}C.push(r+=1)}return C},n.prototype.click=function(t){return this.fire("click",t,this.data[t])},n.prototype.select=function(t){var e,i,n,s,r,a;for(a=this.segments,s=0,r=a.length;r>s;s++)i=a[s],i.deselect();return n=this.segments[t],n.select(),e=this.data[t],this.setLabels(e.label,this.options.formatter(e.value,e))},n.prototype.setLabels=function(t,e){var i,n,s,r,a,o,l,h;return i=2*(Math.min(this.el.width()/2,this.el.height()/2)-10)/3,r=1.8*i,s=i/2,n=i/3,this.text1.attr({text:t,transform:""}),a=this.text1.getBBox(),o=Math.min(r/a.width,s/a.height),this.text1.attr({transform:"S"+o+","+o+","+(a.x+a.width/2)+","+(a.y+a.height)}),this.text2.attr({text:e,transform:""}),l=this.text2.getBBox(),h=Math.min(r/l.width,n/l.height),this.text2.attr({transform:"S"+h+","+h+","+(l.x+l.width/2)+","+l.y})},n.prototype.drawEmptyDonutLabel=function(t,e,i,n,s){var r;return r=this.raphael.text(t,e,"").attr("font-size",n).attr("fill",i),null!=s&&r.attr("font-weight",s),r},n}(e.EventEmitter),e.DonutSegment=function(t){function e(t,e,i,n,s,r,a,l,h,u){this.cx=t,this.cy=e,this.inner=i,this.outer=n,this.color=a,this.backgroundColor=l,this.index=h,this.raphael=u,this.deselect=o(this.deselect,this),this.select=o(this.select,this),this.sin_p0=Math.sin(s),this.cos_p0=Math.cos(s),this.sin_p1=Math.sin(r),this.cos_p1=Math.cos(r),this.is_long=r-s>Math.PI?1:0,this.path=this.calcSegment(this.inner+3,this.inner+this.outer-5),this.selectedPath=this.calcSegment(this.inner+3,this.inner+this.outer),this.hilight=this.calcArc(this.inner)}return a(e,t),e.prototype.calcArcPoints=function(t){return[this.cx+t*this.sin_p0,this.cy+t*this.cos_p0,this.cx+t*this.sin_p1,this.cy+t*this.cos_p1]},e.prototype.calcSegment=function(t,e){var i,n,s,r,a,o,l,h,u,c;return u=this.calcArcPoints(t),i=u[0],s=u[1],n=u[2],r=u[3],c=this.calcArcPoints(e),a=c[0],l=c[1],o=c[2],h=c[3],"M"+i+","+s+("A"+t+","+t+",0,"+this.is_long+",0,"+n+","+r)+("L"+o+","+h)+("A"+e+","+e+",0,"+this.is_long+",1,"+a+","+l)+"Z"},e.prototype.calcArc=function(t){var e,i,n,s,r;return r=this.calcArcPoints(t),e=r[0],n=r[1],i=r[2],s=r[3],"M"+e+","+n+("A"+t+","+t+",0,"+this.is_long+",0,"+i+","+s)},e.prototype.render=function(){var t=this;return this.arc=this.drawDonutArc(this.hilight,this.color),this.seg=this.drawDonutSegment(this.path,this.color,this.backgroundColor,function(){return t.fire("hover",t.index)},function(){return t.fire("click",t.index)})},e.prototype.drawDonutArc=function(t,e){return this.raphael.path(t).attr({stroke:e,"stroke-width":2,opacity:0})},e.prototype.drawDonutSegment=function(t,e,i,n,s){return this.raphael.path(t).attr({fill:e,stroke:i,"stroke-width":3}).hover(n).click(s)},e.prototype.select=function(){return this.selected?void 0:(this.seg.animate({path:this.selectedPath},150,"<>"),this.arc.animate({opacity:1},150,"<>"),this.selected=!0)},e.prototype.deselect=function(){return this.selected?(this.seg.animate({path:this.path},150,"<>"),this.arc.animate({opacity:0},150,"<>"),this.selected=!1):void 0},e}(e.EventEmitter)}).call(this);