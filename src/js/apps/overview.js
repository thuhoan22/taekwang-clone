; (function (win, $) {

  var eventZoomOverview = function() {
    const $wrap = $('.js-wrap-zoom-overview');
    if (!$wrap.length) return;

    const $aniBox_0 = $wrap.find('.ani-box-zoom.step0');
    const $aniBox_1 = $wrap.find('.ani-box-zoom.step1');
    const $aniBox_target = $wrap.find('.ani-box-zoom.target');

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
      id: 'kv-overview',// Assign a name when displaying markers
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

  var eventSplitOverlay = function() {
    const $wrap = $('.js-diagonal-overlay');
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

  var changeBackground = function() {
    const $wrap = $('.js-change-bg');
    if (!$wrap.length) return;

    const $trigger = $wrap.find('.info-history');
    if (!$trigger.length) return;

    $wrap.css('background-color','white');

    const tl = gsap.timeline();
    tl.to($wrap, {
      'background-color':'black'
    });

    const sct = ScrollTrigger.create({
      id: 'change-bg',
      animation: tl,
      trigger: $trigger,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      toggleActions: 'play none none reverse',
      toggleClass: 'scroll-trigger-active',
      invalidateOnRefresh: true,
    })
  };

  var cursorCustom = function(moving_scale_x = 1, moving_scale_y = 1) {
    $('.js-cursor').each(function () {
      const $cursorArea = $(this);
      const $cursorCustom = $cursorArea.find('.cursor-custom');
      const $cursorOrigin = $cursorArea.find('.cursor-origin');

      if (!$cursorCustom.length || !$cursorOrigin.length) return;

      $cursorArea.off('mouseenter mouseleave mousemove');

      $cursorArea.on('mouseenter', function (evt) {
        const pos = getPos(evt, $cursorArea, $cursorOrigin, $cursorCustom);

        gsap.to($cursorCustom, {
          x: pos.x,
          y: pos.y,
          duration: 0,
          overwrite: 'auto',
        });

        gsap.to($cursorCustom, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });

      $cursorArea.on('mouseleave', function () {
        gsap.to($cursorCustom, {
          scale: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });

      $cursorArea.on('mousemove', function (evt) {
        const pos = getPos(evt, $cursorArea, $cursorOrigin, $cursorCustom);

        gsap.to($cursorCustom, {
          x: pos.x,
          y: pos.y,
          duration: 0.2,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });
    });

    function getPos(evt, $cursorArea, $cursorOrigin, $cursorCustom) {
      const rect = $cursorOrigin[0].getBoundingClientRect();
      const areaRect = $cursorArea[0].getBoundingClientRect();

      const x = (rect.x - areaRect.x) + ((evt.clientX - rect.x) * moving_scale_x) - ($cursorCustom.outerWidth() / 2);
      const y = (rect.y - areaRect.y) + ((evt.clientY - rect.y) * moving_scale_y) - ($cursorCustom.outerHeight() / 2);

      return { x, y };
    }
  };

  // INIT
	$(win).on('scroll', function () {
    // Optional: future scroll logic
	}).scroll();

	$(win).on('load', function () {
    eventZoomOverview();
    eventSplitOverlay();
    changeBackground();
    cursorCustom();
	});

})(window, window.jQuery);
