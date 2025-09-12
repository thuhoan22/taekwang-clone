; (function (win, $) {

  var eventScaleUpImage = function() {
    const $wrap = $('.js-ani-zoom-business');
    if (!$wrap.length) return;

    const $imageStep0 = $wrap.find('.ani-scale-up.step0');
    const $imageStep1 = $wrap.find('.ani-scale-up.step1');
    const $imageTarget = $wrap.find('.ani-scale-up.target');
    const $textBlack = $wrap.find('.js-fade-text-black .text-title');
    const $textWhite = $wrap.find('.js-fade-text-white');

    if(!$imageStep0.length || !$imageStep1.length || !$imageTarget.length || !$textBlack.length || !$textWhite.length) return;

    const tl = gsap.timeline();

    tl.set($imageTarget, {
      x: () => $imageStep0[0].getBoundingClientRect().x,
      y: () => $imageStep0[0].getBoundingClientRect().y - $wrap[0].getBoundingClientRect().y,
      width: () => $imageStep0.outerWidth(),
      height: () => $imageStep0.outerHeight(),
      padding: () => '0',
      borderRadius: () => '6px',
    });

    tl.to($imageTarget, {
      x: () => $imageStep1[0].getBoundingClientRect().x,
      y: () => $imageStep1[0].getBoundingClientRect().y - $wrap[0].getBoundingClientRect().y,
      width: () => $imageStep1.outerWidth(),
      height: () => $imageStep1.outerHeight(),
      padding: () => '3%',
      borderRadius: () => '0',
    });

    tl.fromTo($textBlack, {
      opacity: 0.5,
      letterSpacing: '8px',
    }, {
      opacity: 1,
      letterSpacing: '-0.8px',
    }, '<');

    tl.fromTo($textWhite, {
      opacity: 0,
    }, {
      opacity: 1,
    }, '<');

    const sct = ScrollTrigger.create({
      id: 'ani-zoom-business',
      animation: tl,
      trigger: $wrap,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      pin: true,
      toggleActions: 'play none none reverse',
      toggleClass: 'scroll-trigger-active',
      invalidateOnRefresh: true,
    });
  };

	$(win).on('scroll', function () {
	}).scroll();

	$(win).on('load', function () {
    eventScaleUpImage();
	});

})(window, window.jQuery);
