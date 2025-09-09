; (function (win, $) {

  var eventZoomOverview = function() {
    const $wrap = $('.js-wrap-zoom-overview');
    const $aniBox_0 = $wrap.find('.ani-box-zoom.step0');
    const $aniBox_1 = $wrap.find('.ani-box-zoom.step1');
    const $aniBox_target = $wrap.find('.ani-box-zoom.target');

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
      id: 'kv-overview',// Assign a name when displaying markers
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

  var changeBackground = function() {
    const $wrap = $('.js-change-bg');
    const $trigger = $wrap.find('.info-history');

    $wrap.css('background-color','white');

    const tl = gsap.timeline();
    tl.to($wrap, {
      'background-color':'black'
    });

    const sct = ScrollTrigger.create({
      id: 'change-bg',
      animation: tl,
      trigger: $trigger,
      end: 'bottom top',
      start: 'top top',
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

	$(win).on('scroll', function () {
	}).scroll();

	$(win).on('load', function () {
    eventZoomOverview();
    eventSplitOverlay();
    changeBackground();
    cursorCustom();
	});

})(window, window.jQuery);
