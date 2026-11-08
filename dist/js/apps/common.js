;
(function (win, $) {

  var lastScrollTop = 0;
  var handleHeaderScroll = function () {
    const currentScroll = $(window).scrollTop();
    const $header = $('.js-header');
    const $keyVisual = $('.js-kv-header');
    if (!$keyVisual.length) return;

    const keyVisualBottom = $keyVisual.offset().top + $keyVisual.outerHeight();

    currentScroll > lastScrollTop ? $header.addClass('is-up') : $header.removeClass('is-up');
    currentScroll > keyVisualBottom ? $header.addClass('has-bg') : $header.removeClass('has-bg');

    lastScrollTop = currentScroll;
  };

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
    handleHeaderScroll();
    animateElement();
  }).scroll();

  $(win).on('load', function () {
    handleHeaderScroll();
    animateElement();
  });

})(window, window.jQuery);
