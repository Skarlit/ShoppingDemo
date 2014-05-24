(function( $ ) {

 var scrollHandler = function(event){
	 event.preventDefault();
	 var pos = $(this).scrollTop() - 6 * event.deltaY * event.deltaFactor;
	 console.log(event.taget)
	 $(event.target).unbind('mousewheel',$.fn.scrollHandler);
	 $(this).scrollTo(pos, 700, function(){
	 		$(event.target).bind('mousewheel', $.fn.scrollHandler);
 	 });
	};

	$.fn.smoothScroll = function(){
		this.on('mousewheel', scrollHandler);
		return this;
	}

})(jQuery);