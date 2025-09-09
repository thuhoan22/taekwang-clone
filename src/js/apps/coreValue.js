; (function (win, $) {

  var eventZoomOverview = function() {
    const $wrap = $('.js-zoom-coreValue');
    const $aniBox_0 = $wrap.find('.ani-zoom-out.step0');
    const $aniBox_1 = $wrap.find('.ani-zoom-out.step1');
    const $aniBox_target = $wrap.find('.ani-zoom-out.target');

    const tl = gsap.timeline();

    tl.set($aniBox_target, {
      x: function () {
        return $aniBox_0.rect().x;
      },
      y: function () {
        return $aniBox_0.rect().y - $wrap.rect().y;
      },
      width: function () {
        return $aniBox_0.width();
      },
      height: function () {
        return $aniBox_0.height();
      },
    });

    tl.to($aniBox_target, {
      x: function () {
        return $aniBox_1.rect().x;
      },
      y: function () {
        return $aniBox_1.rect().y - $wrap.rect().y;
      },
      width: function () {
        return $aniBox_1.width();
      },
      height: function () {
        return $aniBox_1.height();
      },
    });

    const sct = ScrollTrigger.create({
      id: 'kv-coreValue',// Assign a name when displaying markers
      animation: tl,// Connect to the tween
      trigger: $wrap,// Set the trigger element
      end: 'bottom top',
      start: 'top top',
      scrub: 1,
      pin: true,
      toggleActions: 'play none none reverse',
      toggleClass: 'scroll-trigger-active',// Add class while trigger is active
      invalidateOnRefresh: true,// Respond to resize events
    });
  };

  var eventSplitOverlay = function() {
    const $wrap = $('.js-diagonal-overlay');
    const $leftBox = $wrap.find('.overlay-box-left');
    const $rightBox = $wrap.find('.overlay-box-right');

    const tl = gsap.timeline();

    tl.fromTo($leftBox, {
      x: 0,
    }, {
      x: '-100%',
    });

    tl.fromTo($rightBox, {
      x: 0,
    }, {
      x: '100%',
    }, '<');

    const sct = ScrollTrigger.create({
      id: 'diagonal-overlay',
      animation: tl,
      trigger: $wrap,
      end: 'bottom top',
      start: 'top top',
      scrub: 1,
      pin: true,
      end: 'bottom top',
      start: 'top top',
      toggleActions: 'play none none reverse',
      toggleClass: 'scroll-trigger-active',
      invalidateOnRefresh: true,
    });
  };

	$(win).on('scroll', function () {
	}).scroll();

	$(win).on('load', function () {
    eventZoomOverview();
    // eventSplitOverlay();
	});

})(window, window.jQuery);
