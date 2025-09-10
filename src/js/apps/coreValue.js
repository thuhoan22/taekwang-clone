; (function (win, $) {

  var eventZoomOverview = function() {
    const $wrap = $('.js-zoom-coreValue');
    if (!$wrap.length) return;

    const $aniBox_0 = $wrap.find('.ani-zoom-out.step0');
    const $aniBox_1 = $wrap.find('.ani-zoom-out.step1');
    const $aniBox_target = $wrap.find('.ani-zoom-out.target');

    if (!$aniBox_0.length || !$aniBox_1.length || !$aniBox_target.length) return;

    const tl = gsap.timeline();

    tl.set($aniBox_target, {
      x: () => $aniBox_0[0].getBoundingClientRect().x,
      y: () => $aniBox_0[0].getBoundingClientRect().y - $wrap[0].getBoundingClientRect().y,
      width: () => $aniBox_0.outerWidth(),
      height: () => $aniBox_0.outerHeight(),
    });

    tl.to($aniBox_target, {
      x: () => $aniBox_1[0].getBoundingClientRect().x,
      y: () => $aniBox_1[0].getBoundingClientRect().y - $wrap[0].getBoundingClientRect().y,
      width: () => $aniBox_1.outerWidth(),
      height: () => $aniBox_1.outerHeight(),
    });

    const sct = ScrollTrigger.create({
      id: 'kv-coreValue',// Assign a name when displaying markers
      animation: tl,// Connect to the tween
      trigger: $wrap,// Set the trigger element
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      pin: true,
      toggleActions: 'play none none reverse',
      toggleClass: 'scroll-trigger-active',// Add class while trigger is active
      invalidateOnRefresh: true,// Respond to resize events
    });
  };

	$(win).on('scroll', function () {
	}).scroll();

	$(win).on('load', function () {
    eventZoomOverview();
	});

})(window, window.jQuery);
