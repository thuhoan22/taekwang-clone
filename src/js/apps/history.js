; (function (win, $) {

  var eventScaleRightHistory = function() {
    const $wrap = $('.js-scale-right-history');
    if(!$wrap.length) return;

    const $imageStep0 = $wrap.find('.ani-box-zoom.step0');
    const $imageStep1 = $wrap.find('.ani-box-zoom.step1');
    const $imageTarget = $wrap.find('.ani-box-zoom.target');

    if(!$imageStep0.length || !$imageStep1.length || !$imageTarget.length) return;

    const tl = gsap.timeline();

    tl.set($imageTarget, {
      x: () => $imageStep0[0].getBoundingClientRect().x,
      y: () => $imageStep0[0].getBoundingClientRect().y - $wrap[0].getBoundingClientRect().y,
      width: () => $imageStep0.outerWidth(),
      height: () => $imageStep0.outerHeight(),
    });

    tl.to($imageTarget, {
      x: () => $imageStep1[0].getBoundingClientRect().x,
      y: () => $imageStep1[0].getBoundingClientRect().y - $wrap[0].getBoundingClientRect().y,
      width: () => $imageStep1.outerWidth(),
      height: () => $imageStep1.outerHeight(),
    })

    const sct = ScrollTrigger.create({
      id: 'history-scale-right',
      animation: tl,
      trigger: $wrap,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      pin: true,
      toggleActions: 'play none none reverse',
      toggleClass: 'scroll-trigger-active',
      invalidateOnRefresh: true,
    })
  };

  var eventSplitOverlayHistory = function() {
    const $wrap = $('.js-diagonal-overlay-history');
    if (!$wrap.length) return;

    const $leftBox = $wrap.find('.overlay-box-left');
    const $rightBox = $wrap.find('.overlay-box-right');

    if (!$leftBox.length || !$rightBox.length) return;

    const tl = gsap.timeline();

    tl.fromTo($leftBox, { x: 0 }, { x: '-100%' });
    tl.fromTo($rightBox, { x: 0 }, { x: '100%' }, '<');

    const sct = ScrollTrigger.create({
      id: 'diagonal-overlay',
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

  var eventParallaxImage = function() {
    const $wrap = $('.js-parallax-image');
    const $thisImage = $wrap.find('.bg-parallax img');
    if(!$wrap.length || !$thisImage.length) return;

    const tl = gsap.timeline();

    tl.to($thisImage, {
      y: () => $wrap[0].getBoundingClientRect().y * 0.2,
    });

    const sct = ScrollTrigger.create({
      id: 'parallax-image',
      animation: tl,
      trigger: $wrap,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      pin: true,
    });
  };


	$(win).on('scroll', function () {
	}).scroll();

	$(win).on('load', function () {
    eventScaleRightHistory();
    eventSplitOverlayHistory();
    eventParallaxImage();
	});

})(window, window.jQuery);
