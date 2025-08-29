; (function (win, $) {

  var animateElement = function () {
    var el = $('[data-animate]');
    el.each(function () {
      var $this = $(this),
        thisOffSetTop = $this.offset().top,
        windowScroll = $(window).scrollTop(),
        scrollPoint = windowScroll + $(window).innerHeight();

      if (thisOffSetTop < scrollPoint) {
        $this.addClass('animate-active');
      }
    });
  };

	$(win).on('scroll', function () {
    animateElement();
	}).scroll();

	$(win).on('load', function () {
    animateElement();
	});

})(window, window.jQuery);
