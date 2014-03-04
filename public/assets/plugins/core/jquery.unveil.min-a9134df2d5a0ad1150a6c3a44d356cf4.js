/**
 * jQuery Unveil
 * A very lightweight jQuery plugin to lazy load images
 * http://luis-almeida.github.com/unveil
 *
 * Licensed under the MIT license.
 * Copyright 2013 Luís Almeida
 * https://github.com/luis-almeida
 */
!function(t){t.fn.unveil=function(e,i){function n(){var e=h.filter(function(){var e=t(this),i=r.scrollTop(),n=i+r.height(),s=e.offset().top,o=s+e.height();return o>=i-a&&n+a>=s});s=e.trigger("unveil"),h=h.not(s)}var s,r=t(window),a=e||0,o=window.devicePixelRatio>1,l=o?"data-src-retina":"data-src",h=this;return this.one("unveil",function(){var t=this.getAttribute(l);t=t||this.getAttribute("data-src"),t&&(this.setAttribute("src",t),"function"==typeof i&&i.call(this))}),r.scroll(n),r.resize(n),n(),this}}(window.jQuery||window.Zepto);