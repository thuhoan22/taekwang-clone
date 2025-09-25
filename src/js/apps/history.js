; (function (win, $) {

  var swiperGrabChallenge = new Swiper('.swiper-grab-challenge', {
    slidesPerView: 'auto',
    grabCursor: true,
    freeMode: true,
    touchStartPreventDefault: true,
  });

  var swiperGrabInnovation = new Swiper('.swiper-grab-innovation', {
    slidesPerView: 'auto',
    grabCursor: true,
    freeMode: true,
    touchStartPreventDefault: true,
  });

  var swiperGrabSharing = new Swiper('.swiper-grab-sharing', {
    slidesPerView: 'auto',
    grabCursor: true,
    freeMode: true,
    touchStartPreventDefault: true,
  });

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
    const $wrapImage = $wrap.find('.bg-parallax');
    if(!$wrap.length || !$wrapImage.length) return;

    let val = 10;
    gsap.set($wrapImage, {
      scale: 1 + (val / 100 * 2) + 0.01,
    });

    const tl = gsap.timeline();
    tl.fromTo($wrapImage, {
      y: `${val}%`,
    }, {
      y: `-${val}%`,
      ease: "none",
    });

    const sct = ScrollTrigger.create({
      id: 'parallax-image',
      animation: tl,
      trigger: $wrap,
      scrub: 1,
      start: 'top bottom',
      end: 'top top',
      toggleActions: 'play none none reverse',
      toggleClass: 'scroll-trigger-active',
      invalidateOnRefresh: true,// Resize compatible
    });
  };

  var handleMouseover = function() {
    const $wrap = $('.section-grab .swiper');
    if(!$wrap.length) return;

    $wrap.on('mouseenter ', function(){
      $(this).parents('.section-grab').addClass('mouseover');
    });

    $wrap.on('mouseup mouseleave', function(){
      $(this).parents('.section-grab').removeClass('mouseover');
    });
  };

  var eventHistoryPhase = function() {
    const $wrap = $('.js-history-phase1');
    if(!$wrap.length) return;

    const $phase1From = $wrap.find('.ani-phase1.step0');
    const $phase1To = $wrap.find('.ani-phase1.step1');
    const $phase1Target = $wrap.find('.ani-phase1.target');
    const $phase1End = $wrap.find('.ani-phase1.end');

    // const $phase1BgFull = $wrap.find('.ani-phase1 .bg-full');
    // const $phase1TextFade = $wrap.find('.ani-phase1 .text-area');
    // const $phase1TextItemFade = $phase1TextFade.find('.text-area-year');

    if(!$phase1From.length || !$phase1To.length || !$phase1Target.length || !$phase1End.length) return;

    const $phase1TextFade = $wrap.find('.text-area');
    const $phase1Text1 = $wrap.find('.js-text-area-year1');
    const $phase1Line1 = $phase1Text1.find('.line');
    const $phase1Text2 = $wrap.find('.js-text-area-year2');
    const $phase1Line2 = $phase1Text2.find('.line');
    if(!$phase1Text1.length || !$phase1Text2.length || !$phase1Line1.length || !$phase1Line2.length) return;

    const $phaseDetail1 = $wrap.find('.js-phase-detail');
    if(!$phaseDetail1.length) return;

    const tl = gsap.timeline();

    // tl.to($phase1BgFull, {
    //   width: '100%',
    //   height: '100%',
    // });

    // tl.to($phase1TextFade, {
    //   opacity: 1,
    // });

    // $phase1TextItemFade.each(function (i) {
    //   const $this = $(this);
    //   const $phase1Line = $this.find('.line');
    //   tl.fromTo($this, {
    //     x: '-10%',
    //     opacity: 0,
    //   }, {
    //     x: '0',
    //     opacity: 1,
    //   });

    //   tl.fromTo($phase1Line, {
    //     scale: 0,
    //   }, {
    //     scale: 1,
    //   }, '<');
    // });

    tl.set($phase1Target, {
      x: () => $phase1From[0].getBoundingClientRect().x,
      y: () => $phase1From[0].getBoundingClientRect().y - $wrap[0].getBoundingClientRect().y,
      width: () => $phase1From.outerWidth(),
      height: () => $phase1From.outerHeight(),
    });

    tl.to($phase1Target, {
      x: () => $phase1To[0].getBoundingClientRect().x,
      y: () => $phase1To[0].getBoundingClientRect().y - $wrap[0].getBoundingClientRect().y,
      width: () => $phase1To.outerWidth(),
      height: () => $phase1To.outerHeight(),
    });

    tl.fromTo($phase1Text1, {
      x: '-50',
      opacity: 0,
    }, {
      x: '0',
      opacity: 1,
    }, '>');

    tl.fromTo($phase1Line1, {
      scale: '0.7'
    }, {
      scale: '1'
    }, '>');

    tl.fromTo($phase1Text2, {
      x: '50',
      opacity: 0,
    }, {
      x: '0',
      opacity: 1,
    }, '+=0.2');

    tl.fromTo($phase1Line2, {
      scale: '0.7'
    }, {
      scale: '1',
      onComplete: () => {
        // when animation of $phase1Line2 complete
        // tl.to($phase1Text1, {
        //   x: '-50',
        //   opacity: 0,
        // }, '>');

        // tl.to($phase1Line1, {
        //   scale: '0.7'
        // }, '>');

        // tl.to($phase1Text2, {
        //   x: '-50',
        //   opacity: 0,
        // }, '>');

        // tl.to($phase1Line2, {
        //   scale: '0.7'
        // }, '>');
      }
    }, '>');

    tl.to($phase1TextFade, {
      opacity: 0
    },'+=0.5');

    tl.to($phase1Target, {
      x: () => $phase1End[0].getBoundingClientRect().x,
      y: () => $phase1End[0].getBoundingClientRect().y - $wrap[0].getBoundingClientRect().y,
      width: () => $phase1End.outerWidth(),
      height: () => $phase1End.outerHeight(),
      duration: 1,
    },'+=0.5');

    tl.fromTo($phaseDetail1, {
      y: '100',
      opacity: 0,
    }, {
      y: '0',
      opacity: 1,
      duration: 1,
    }, '>');



    const sct = ScrollTrigger.create({
      id: 'history-phase1',
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

	$(win).on('scroll', function () {
    eventParallaxImage();
	}).scroll();

	$(win).on('load', function () {
    eventScaleRightHistory();
    eventSplitOverlayHistory();
    handleMouseover();
    eventHistoryPhase();
	});

})(window, window.jQuery);
