function calculateHeight(){var t=parseInt($(".page-content").height());911>t&&console.log("Small")}$(document).ready(function(){function t(t){tallest=0,t.each(function(){thisHeight=$(this).height(),thisHeight>tallest&&(tallest=thisHeight)}),t.height(tallest)}function e(){"1"==$("#main-menu").attr("data-inner-menu")?($("#main-menu").addClass("mini"),$.sidr("close","main-menu"),$.sidr("close","sidr"),$("#main-menu").removeClass("sidr"),$("#main-menu").removeClass("left")):($.sidr("close","main-menu"),$.sidr("close","sidr"),$("#main-menu").removeClass("sidr"),$("#main-menu").removeClass("left"))}function n(){$("#main-menu-toggle").sidr({name:"main-menu",side:"left"})}function i(t){$(t).block({message:'<div class="loading-animator"></div>',css:{border:"none",padding:"2px",backgroundColor:"none"},overlayCSS:{backgroundColor:"#fff",opacity:.3,cursor:"wait"}})}function r(t){$(t).unblock()}if(calculateHeight(),$(".remove-widget").click(function(){return $(this).parent().parent().parent().addClass("animated fadeOut"),$(this).parent().parent().parent().attr("id","id_a"),setTimeout(function(){$("#id_a").remove()},400),!1}),$(".create-folder").click(function(){return $(".folder-input").show(),!1}),$(".folder-name").keypress(function(t){13==t.which&&($(".folder-input").hide(),$('<li><a href="#"><div class="status-icon green"></div>'+$(this).val()+"</a> </li>").insertBefore(".folder-input"),$(this).val(""))}),$("#menu-collapse").click(function(){$(".page-sidebar").hasClass("mini")?($(".page-sidebar").removeClass("mini"),$(".page-content").removeClass("condensed-layout"),$(".footer-widget").show()):($(".page-sidebar").addClass("mini"),$(".page-content").addClass("condensed-layout"),$(".footer-widget").hide(),calculateHeight())}),$(".inside").children("input").blur(function(){$(this).parent().children(".add-on").removeClass("input-focus")}),$(".inside").children("input").focus(function(){$(this).parent().children(".add-on").addClass("input-focus")}),$(".input-group.transparent").children("input").blur(function(){$(this).parent().children(".input-group-addon").removeClass("input-focus")}),$(".input-group.transparent").children("input").focus(function(){$(this).parent().children(".input-group-addon").addClass("input-focus")}),$(".bootstrap-tagsinput input").blur(function(){$(this).parent().removeClass("input-focus")}),$(".bootstrap-tagsinput input").focus(function(){$(this).parent().addClass("input-focus")}),$("#my-task-list").popover({html:!0,content:function(){return $("#notification-list").html()}}),$("#user-options").click(function(){$("#my-task-list").popover("hide")}),$(".chat-menu-toggle").sidr({name:"sidr",side:"right",complete:function(){}}),$(".simple-chat-popup").click(function(){$(this).addClass("hide"),$("#chat-message-count").addClass("hide")}),setTimeout(function(){$("#chat-message-count").removeClass("hide"),$("#chat-message-count").addClass("animated bounceIn"),$(".simple-chat-popup").removeClass("hide"),$(".simple-chat-popup").addClass("animated fadeIn")},5e3),setTimeout(function(){$(".simple-chat-popup").addClass("hide"),$(".simple-chat-popup").removeClass("animated fadeIn"),$(".simple-chat-popup").addClass("animated fadeOut")},8e3),jQuery(".page-sidebar li > a").on("click",function(t){if(0!=$(this).next().hasClass("sub-menu")){var e=$(this).parent().parent();e.children("li.open").children("a").children(".arrow").removeClass("open"),e.children("li.open").children("a").children(".arrow").removeClass("active"),e.children("li.open").children(".sub-menu").slideUp(200),e.children("li").removeClass("open");var n=jQuery(this).next();n.is(":visible")?(jQuery(".arrow",jQuery(this)).removeClass("open"),jQuery(this).parent().removeClass("active"),n.slideUp(200,function(){o()})):(jQuery(".arrow",jQuery(this)).addClass("open"),jQuery(this).parent().addClass("open"),n.slideDown(200,function(){o()})),t.preventDefault()}}),$(".page-sidebar").hasClass("mini")){var a=jQuery(".page-sidebar ul");a.children("li.open").children("a").children(".arrow").removeClass("open"),a.children("li.open").children("a").children(".arrow").removeClass("active"),a.children("li.open").children(".sub-menu").slideUp(200),a.children("li").removeClass("open")}$('[data-height-adjust="true"]').each(function(){var t=$(this).attr("data-elem-height");$(this).css("min-height",t),$(this).css("background-image","url("+$(this).attr("data-background-image")+")"),$(this).css("background-repeat","no-repeat"),$(this).attr("data-background-image")}),$('[data-aspect-ratio="true"]').each(function(){$(this).height($(this).width())}),$('[data-sync-height="true"]').each(function(){t($(this).children())}),$(window).resize(function(){$('[data-aspect-ratio="true"]').each(function(){$(this).height($(this).width())}),$('[data-sync-height="true"]').each(function(){t($(this).children())})});var s=window.screen.height;s-=22.5*s/100,/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||$("#main-menu-wrapper").slimScroll({color:"#a1b2bd",size:"4px",height:s,alwaysVisible:!1}),$.fn.lazyload&&$("img.lazy").lazyload({effect:"fadeIn"}),$(".grid .tools a.remove").on("click",function(){var t=jQuery(this).parents(".grid");t.next().hasClass("grid")||t.prev().hasClass("grid")?jQuery(this).parents(".grid").remove():jQuery(this).parents(".grid").parent().remove()}),$(".grid .tools a.reload").on("click",function(){var t=jQuery(this).parents(".grid");i(t),window.setTimeout(function(){r(t)},1e3)}),$(".grid .tools .collapse, .grid .tools .expand").on("click",function(){var t=jQuery(this).parents(".grid").children(".grid-body");jQuery(this).hasClass("collapse")?(jQuery(this).removeClass("collapse").addClass("expand"),t.slideUp(200)):(jQuery(this).removeClass("expand").addClass("collapse"),t.slideDown(200))}),$(".user-info .collapse").on("click",function(){jQuery(this).parents(".user-info ").slideToggle()});var o=function(){var t=$(".page-content"),e=$(".page-sidebar");t.attr("data-height")||t.attr("data-height",t.height()),e.height()>t.height()?t.css("min-height",e.height()+120):t.css("min-height",t.attr("data-height"))};$(".panel-group").on("hidden.bs.collapse",function(t){$(this).find(".panel-heading").not($(t.target)).addClass("collapsed")}),$(".panel-group").on("shown.bs.collapse",function(){}),$(window).setBreakpoints({distinct:!0,breakpoints:[320,480,768,1024]}),$(window).bind("enterBreakpoint320",function(){$("#main-menu-toggle-wrapper").show(),$("#portrait-chat-toggler").show(),$("#header_inbox_bar").hide(),$("#main-menu").removeClass("mini"),$(".page-content").removeClass("condensed"),n()}),$(window).bind("enterBreakpoint480",function(){$("#main-menu-toggle-wrapper").show(),$(".header-seperation").show(),$("#portrait-chat-toggler").show(),$("#header_inbox_bar").hide(),$("#main-menu").removeClass("mini"),$(".page-content").removeClass("condensed"),n()}),$(window).bind("enterBreakpoint800",function(){$("#main-menu-toggle-wrapper").show(),$("#portrait-chat-toggler").show(),$("#header_inbox_bar").hide(),/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&($("#main-menu").removeClass("mini"),$(".page-content").removeClass("condensed"),n())}),$(window).bind("enterBreakpoint1024",function(){if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){var t=jQuery(".page-sidebar ul");t.children("li.open").children("a").children(".arrow").removeClass("open"),t.children("li.open").children("a").children(".arrow").removeClass("active"),t.children("li.open").children(".sub-menu").slideUp(200),t.children("li").removeClass("open")}}),$(window).bind("exitBreakpoint320",function(){$("#main-menu-toggle-wrapper").hide(),$("#portrait-chat-toggler").hide(),$("#header_inbox_bar").show(),e()}),$(window).bind("exitBreakpoint480",function(){$("#main-menu-toggle-wrapper").hide(),$("#portrait-chat-toggler").hide(),$("#header_inbox_bar").show(),e()}),$(window).bind("exitBreakpoint768",function(){$("#main-menu-toggle-wrapper").hide(),$("#portrait-chat-toggler").hide(),$("#header_inbox_bar").show(),e()}),$("#layout-condensed-toggle").click(function(){$.sidr("close","sidr"),"1"==$("#main-menu").attr("data-inner-menu")?console.log("Menu is already condensed"):$("#main-menu").hasClass("mini")?($("body").removeClass("grey"),$("#main-menu").removeClass("mini"),$(".page-content").removeClass("condensed"),$(".scrollup").removeClass("to-edge"),$(".header-seperation").show(),$(".header-seperation").css("height","61px"),$(".footer-widget").show()):($("body").addClass("grey"),$("#main-menu").addClass("mini"),$(".page-content").addClass("condensed"),$(".scrollup").addClass("to-edge"),$(".header-seperation").hide(),$(".footer-widget").hide())}),$(".scroller").each(function(){$(this).slimScroll({size:"7px",color:"#a1b2bd",height:$(this).attr("data-height"),alwaysVisible:"1"==$(this).attr("data-always-visible")?!0:!1,railVisible:"1"==$(this).attr("data-rail-visible")?!0:!1,disableFadeOut:!0})}),$(".dropdown-toggle").click(function(){$("img").trigger("unveil")}),$.fn.sparkline&&$(".sparklines").sparkline("html",{enableTagOptions:!0}),$("table th .checkall").on("click",function(){$(this).is(":checked")?($(this).closest("table").find(":checkbox").attr("checked",!0),$(this).closest("table").find("tr").addClass("row_selected")):($(this).closest("table").find(":checkbox").attr("checked",!1),$(this).closest("table").find("tr").removeClass("row_selected"))}),$(".animate-number").each(function(){$(this).animateNumbers($(this).attr("data-value"),!0,parseInt($(this).attr("data-animation-duration")))}),$(".animate-progress-bar").each(function(){$(this).css("width",$(this).attr("data-percentage"))}),$(".widget-item > .controller .reload").click(function(){var t=$(this).parent().parent();i(t),window.setTimeout(function(){r(t)},1e3)}),$(".widget-item > .controller .remove").click(function(){$(this).parent().parent().parent().addClass("animated fadeOut"),$(this).parent().parent().parent().attr("id","id_remove_temp_id"),setTimeout(function(){$("#id_remove_temp_id").remove()},400)}),$(".tiles .controller .reload").click(function(){var t=$(this).parent().parent().parent();i(t),window.setTimeout(function(){r(t)},1e3)}),$(".tiles .controller .remove").click(function(){$(this).parent().parent().parent().parent().addClass("animated fadeOut"),$(this).parent().parent().parent().parent().attr("id","id_remove_temp_id"),setTimeout(function(){$("#id_remove_temp_id").remove()},400)}),jQuery().sortable&&($(".sortable").sortable({connectWith:".sortable",iframeFix:!1,items:"div.grid",opacity:.8,helper:"original",revert:!0,forceHelperSize:!0,placeholder:"sortable-box-placeholder round-all",forcePlaceholderSize:!0,tolerance:"pointer"}),$(window).resize(function(){calculateHeight()}),$(window).scroll(function(){$(this).scrollTop()>100?$(".scrollup").fadeIn():$(".scrollup").fadeOut()}),$(".scrollup").click(function(){return $("html, body").animate({scrollTop:0},700),!1}),$("img").unveil())}),$(window).resize(function(){$.sidr("close","sidr")});