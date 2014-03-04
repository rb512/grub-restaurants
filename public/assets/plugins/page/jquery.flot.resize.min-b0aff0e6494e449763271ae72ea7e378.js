/* Flot plugin for automatically redrawing plots as the placeholder resizes.

Copyright (c) 2007-2013 IOLA and Ole Laursen.
Licensed under the MIT license.

It works by listening for changes on the placeholder div (through the jQuery
resize event plugin) - if the size changes, it will redraw the plot.

There are no options. If you need to disable the plugin for some plots, you
can just fix the size of their placeholders.

*/
/* Inline dependency:
 * jQuery resize event - v1.1 - 3/14/2010
 * http://benalman.com/projects/jquery-resize-plugin/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
!function(t,e,n){function i(){a=e[o](function(){r.each(function(){var e=t(this),n=e.width(),i=e.height(),a=t.data(this,h);(n!==a.w||i!==a.h)&&e.trigger(l,[a.w=n,a.h=i])}),i()},s[u])}var a,r=t([]),s=t.resize=t.extend(t.resize,{}),o="setTimeout",l="resize",h=l+"-special-event",u="delay",c="throttleWindow";s[u]=250,s[c]=!0,t.event.special[l]={setup:function(){if(!s[c]&&this[o])return!1;var e=t(this);r=r.add(e),t.data(this,h,{w:e.width(),h:e.height()}),1===r.length&&i()},teardown:function(){if(!s[c]&&this[o])return!1;var e=t(this);r=r.not(e),e.removeData(h),r.length||clearTimeout(a)},add:function(e){function i(e,i,r){var s=t(this),o=t.data(this,h);o.w=i!==n?i:s.width(),o.h=r!==n?r:s.height(),a.apply(this,arguments)}if(!s[c]&&this[o])return!1;var a;return t.isFunction(e)?(a=e,i):(a=e.handler,e.handler=i,void 0)}}}(jQuery,this),function(t){function e(t){function e(){var e=t.getPlaceholder();0!=e.width()&&0!=e.height()&&(t.resize(),t.setupGrid(),t.draw())}function n(t){t.getPlaceholder().resize(e)}function i(t){t.getPlaceholder().unbind("resize",e)}t.hooks.bindEvents.push(n),t.hooks.shutdown.push(i)}var n={};t.plot.plugins.push({init:e,options:n,name:"resize",version:"1.0"})}(jQuery);