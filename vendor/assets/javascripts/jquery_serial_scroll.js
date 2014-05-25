/**
 * Copyright (c) 2007-2014 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT.
 * @author Ariel Flesler
 * @version 1.2.4.1
 */
;(function($){var f='.serialScroll';var g=$.serialScroll=function(a){return $(window).serialScroll(a)};g.defaults={duration:1000,axis:'x',event:'click',start:0,step:1,lock:true,cycle:true,constant:true};$.fn.serialScroll=function(d){return this.each(function(){var c=$.extend({},g.defaults,d),event=c.event,step=c.step,lazy=c.lazy,context=c.target?this:document,$pane=$(c.target||this,context),pane=$pane[0],items=c.items,active=c.start,auto=c.interval,nav=c.navigation,timer;if(!pane)return;if(!lazy)items=getItems();if(c.force||auto)jump({},active);$(c.prev||[],context).bind(event,-step,move);$(c.next||[],context).bind(event,step,move);if(!pane.ssbound)$pane.bind('prev'+f,-step,move).bind('next'+f,step,move).bind('goto'+f,jump);if(auto)$pane.bind('start'+f,function(e){if(!auto){clear();auto=true;next()}}).bind('stop'+f,function(){clear();auto=false});$pane.bind('notify'+f,function(e,a){var i=index(a);if(i>-1)active=i});pane.ssbound=true;if(c.jump)(lazy?$pane:getItems()).bind(event,function(e){jump(e,index(e.target))});if(nav)nav=$(nav,context).bind(event,function(e){e.data=Math.round(getItems().length/nav.length)*nav.index(this);jump(e,this)});function move(e){e.data+=active;jump(e,this)};function jump(e,a){if($.isNumeric(a))a=e.data;var n,real=e.type,$items=c.exclude?getItems().slice(0,-c.exclude):getItems(),limit=$items.length-1,elem=$items[a],duration=c.duration;if(real)e.preventDefault();if(auto){clear();timer=setTimeout(next,c.interval)}if(!elem){n=a<0?0:limit;if(active!==n)a=n;else if(!c.cycle)return;else a=limit-n;elem=$items[a]}if(!elem||c.lock&&$pane._scrollable().is(':animated')||real&&c.onBefore&&c.onBefore(e,elem,$pane,getItems(),a)===false)return;if(c.stop)$pane._scrollable().stop(true);if(c.constant)duration=Math.abs(duration/step*(active-a));$pane.scrollTo(elem,duration,c);trigger('notify',a)};function next(){trigger('next')};function clear(){clearTimeout(timer)};function getItems(){return $(items,pane)};function trigger(a){$pane.trigger(a+f,[].slice.call(arguments,1))}function index(a){if(!$.isNumeric(a))return a;var b=getItems(),i;while((i=b.index(a))===-1&&a!==pane)a=a.parentNode;return i}})}})(jQuery);