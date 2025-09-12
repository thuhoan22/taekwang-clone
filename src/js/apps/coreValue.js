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

  var eventSplitOverlay2 = function() {
    const $wrap = $('.js-diagonal-overlay2');
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

  var eventScaleUpImage = function() {
    const $wrap = $('.js-scale-up');
    if (!$wrap.length) return;

    const $imageStep0 = $wrap.find('.ani-scale-up.step0');
    const $imageStep1 = $wrap.find('.ani-scale-up.step1');
    const $imageTarget = $wrap.find('.ani-scale-up.target');
    const $textBlack = $wrap.find('.js-fade-text-black');
    const $textWhite = $wrap.find('.js-fade-text-white');

    if(!$imageStep0.length || !$imageStep1.length || !$imageTarget.length || !$textBlack.length || !$textWhite.length) return;

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
    });

    tl.fromTo($textBlack, {
      opacity: 1,
      y: 0,
    }, {
      opacity: 0,
      y: '100',
    }, '<');

    tl.fromTo($textWhite, {
      opacity: 0,
    }, {
      opacity: 1,
    }, '<');
    // [Able to  use .fromTo or .set/to, can choose 1 in 2]
    // tl.set($textBlack, {
    //   opacity: 1,
    //   y: 0
    // }, '<');
    // tl.to($textBlack, {
    //   opacity: 0,
    //   y: '100'
    // }, '<');

    // tl.set($textWhite, {
    //   opacity: 0,
    // }, '<');
    // tl.to($textWhite, {
    //   opacity: 1,
    // }, '<');

    const sct = ScrollTrigger.create({
      id: 'scale-up-image',
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

  var eventScaleRightImage = function() {
    const $wrap = $('.js-scale-right');
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
      id: 'core-scale-right',
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

  var eventSlideUp = function() {
    const $wrap = $('.section-slide-up');
    if (!$wrap.length) return;

    const $textFade = $wrap.find('.js-fade-text-slide');
    const $slideList = $wrap.find('.slide-list');

    tl = gsap.timeline();

    tl.to($textFade, {
      opacity: 0.5,
    });

    const sct = ScrollTrigger.create({
      id: 'scale-up',
      animation: tl,
      trigger: $slideList,
      start: 'top 20%',
      end: 'top top',
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
    eventZoomOverview();
    eventSplitOverlay2();
    eventScaleUpImage();
    eventScaleRightImage();
    eventSlideUp();
	});

})(window, window.jQuery);
