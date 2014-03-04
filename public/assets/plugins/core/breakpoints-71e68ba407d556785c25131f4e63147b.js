/*
	Breakpoints.js
	version 1.0
	
	Creates handy events for your responsive design breakpoints
	
	Copyright 2011 XOXCO, Inc
	http://xoxco.com/

	Documentation for this plugin lives here:
	http://xoxco.com/projects/code/breakpoints
	
	Licensed under the MIT license:
	http://www.opensource.org/licenses/mit-license.php

*/
!function(t){var e=0,n=null;t.fn.resetBreakpoints=function(){t(window).unbind("resize"),n&&clearInterval(n),e=0},t.fn.setBreakpoints=function(i){var r=jQuery.extend({distinct:!0,breakpoints:new Array(320,480,768,1024)},i);n=setInterval(function(){var n=t(window).width(),i=!1;for(var a in r.breakpoints.sort(function(t,e){return e-t})){if(!i&&n>=r.breakpoints[a]&&e<r.breakpoints[a]){if(r.distinct){for(var s in r.breakpoints.sort(function(t,e){return e-t}))t("body").hasClass("breakpoint-"+r.breakpoints[s])&&(t("body").removeClass("breakpoint-"+r.breakpoints[s]),t(window).trigger("exitBreakpoint"+r.breakpoints[s]));i=!0}t("body").addClass("breakpoint-"+r.breakpoints[a]),t(window).trigger("enterBreakpoint"+r.breakpoints[a])}n<r.breakpoints[a]&&e>=r.breakpoints[a]&&(t("body").removeClass("breakpoint-"+r.breakpoints[a]),t(window).trigger("exitBreakpoint"+r.breakpoints[a])),r.distinct&&n>=r.breakpoints[a]&&n<r.breakpoints[a-1]&&e>n&&e>0&&!t("body").hasClass("breakpoint-"+r.breakpoints[a])&&(t("body").addClass("breakpoint-"+r.breakpoints[a]),t(window).trigger("enterBreakpoint"+r.breakpoints[a]))}e!=n&&(e=n)},250)}}(jQuery);