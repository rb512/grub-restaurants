/**
 * hovers.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
!function(){function t(){var t=250,e=mina.easeinout;[].slice.call(document.querySelectorAll("#grid > a")).forEach(function(i){var n=Snap(i.querySelector("svg")),s=n.select("path"),r={from:s.attr("d"),to:i.getAttribute("data-path-to")};i.addEventListener("mouseenter",function(){s.animate({path:r.to},t,e)}),i.addEventListener("mouseleave",function(){s.animate({path:r.from},t,e)})})}t()}();