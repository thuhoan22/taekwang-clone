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

  var eventHistoryScroll1 = function() {
    const $wrap = $('.js-history-phase1');
    if(!$wrap.length) return;

    const $phase1From = $wrap.find('.ani-phase.step0');
    const $phase1To = $wrap.find('.ani-phase.step1');
    const $phase1Target = $wrap.find('.ani-phase.target');
    const $phase1End = $('.section-history2').find('.ani-phase.end');

    const $phase1TextFade = $phase1Target.find('.text-area');
    const $phase1TextItemFade = $phase1TextFade.find('.text-area-year');

    const $phaseDetailWrap = $('.section-history2').find('.phase-detail');
    const $phaseDetailFade = $phaseDetailWrap.find('.js-phase-content-fade');

    const tl = gsap.timeline();

    gsap.set($phase1Target, { opacity: 1 });
    gsap.set($phase1End, { opacity: 0 });

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

    tl.to($phase1TextFade, {
      opacity: 1,
    });

    $phase1TextItemFade.each(function (i) {
      const $this = $(this);
      const $phase1Line = $this.find('.line');
      tl.fromTo($this, {
        x: '-10%',
        opacity: 0,
      }, {
        x: '0',
        opacity: 1,
      });

      tl.fromTo($phase1Line, {
        scale: 0,
      }, {
        scale: 1,
      }, '<');
    });

    tl.to($phase1TextFade, {
      opacity: 0
    },'+=0.5');

    tl.set($phase1Target, {
      opacity: 0
    });

    tl.to($phase1Target, {
      x: () => $phase1End[0].getBoundingClientRect().x,
      y: () => $phase1End[0].getBoundingClientRect().y - $wrap[0].getBoundingClientRect().y,
      width: () => $phase1End.outerWidth(),
      height: () => $phase1End.outerHeight(),
      duration: 1,
    },'+=0.5');

    tl.to($phase1Target, {
      opacity: 0,
      duration: 0.4,
    }, '<');

    tl.to($phase1End, {
      opacity: 1,
      duration: 0.4,
    }, '<');

    // tl.fromTo($phaseDetailFade, {
    //   y: '100',
    //   opacity: 0,
    // }, {
    //   y: '0',
    //   opacity: 1,
    //   duration: 1,
    // }, '>');
    tl.to($phaseDetailFade, {
      opacity: 1,
      duration: 1,
    });

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

  var eventHistoryScroll2 = function () {
    gsap.registerPlugin(ScrollTrigger);

    $('.section-history').each(function () {
      var $section = $(this);

      // ===== ELEMENTS =====
      var $phase1 = $section.find('.ani-phase');
      var $bg = $section.find('.bg-full');
      var $textArea = $section.find('.text-area');
      var $year1 = $section.find('.js-text-area-year1');
      var $year2 = $section.find('.js-text-area-year2');

      var $phaseDetail = $section.find('.phase-detail');
      var $overview = $section.find('.phase-detail-overview');
      var $phaseList = $section.find('.phase-list');
      var $bgPlaceholder = $section.find('.bg-placeholder');

      // ===== TIMELINE 1 : BG scale full + year animation + bg thu nhỏ =====
      var tlIntro = gsap.timeline({
        scrollTrigger: {
          trigger: $phase1[0],
          start: 'top top',
          end: '200% top',
          scrub: 1,
          pin: true,
        }
      });

      tlIntro
        // ===== PHASE 1 : BG scale từ giữa (0.8 → 1) =====
        .fromTo($bg[0],{
          scale: 0.9,
          transformOrigin: 'center center'
        },
        {
          scale: 1,
          ease: 'none',
          duration: 1
        })

        // ===== YEAR 1 : text fade từ trái + line fade & mở từ giữa =====
        .from($year1.find('.text-year')[0],{
          x: -60,
          opacity: 0,
          duration: 0.4
        })
        .to($year1.find('.line')[0],{
          scaleX: 1,
          opacity: 1,
          transformOrigin: 'center center',
          duration: 0.4,
          ease: 'power2.out'
        },'<')

        // ===== YEAR 2 =====
        .from($year2.find('.text-year')[0],{
          x: -60,
          opacity: 0,
          duration: 0.4
        })
        .to($year2.find('.line')[0],{
          scaleX: 1,
          opacity: 1,
          transformOrigin: 'center center',
          duration: 0.4,
          ease: 'power2.out'
        },'<')

        // ===== Fade out text area =====
        .to($textArea[0],{
          opacity: 0,
          duration: 0.4
        })
        // ===== PHASE 2: BG scale nhỏ lệch trái (1 → 0.3) =====
        // .to($bg[0],{
        //   scale: 0.3,
        //   transformOrigin: 'left center',
        //   xPercent: 15,
        //   ease: 'power2.inOut',
        //   duration: 1,
        // },'+=0.3');

        .to($bg[0],{
          duration: 0,
          opacity: 0,
        },'<')

        .to($bgPlaceholder[0],{
          duration: 0,
          opacity: 1,
        },'<')

        .to($bgPlaceholder[0],{
          opacity: 1,
          scale: 0.3,
          transformOrigin: 'left center',
          xPercent: 15,
          ease: 'none',
          duration: 1
        },'+=0.3');

        // .fromTo($bgPlaceholder[0],{
        //   duration: 0,
        //   opacity: 1,
        // },
        // {
        //   opacity: 1,
        //   scale: 0.3,
        //   transformOrigin: 'left center',
        //   xPercent: 15,
        //   ease: 'none',
        //   duration: 1
        // },'+=0.3');

      // ===== PHASE DETAIL: Trượt từ dưới lên bên dưới bg =====
      // gsap.from(
      //   $phaseDetail[0],
      //   {
      //     y: 160,
      //     opacity: 0,
      //     scrollTrigger: {
      //       trigger: $phaseDetail[0],
      //       start: 'top bottom',
      //       end: 'top 60%',
      //       scrub: true,
      //     }
      //   }
      // );

      // gsap.from($phaseDetail[0],{
      //   opacity: 0,
      //   scrollTrigger: {
      //     trigger: $phaseDetail[0],
      //     start: 'top bottom',
      //     end: 'top 60%',
      //     scrub: true,
      //   }
      // });

      // ===== OVERVIEW PIN: Đi qua bg → pin =====
      // ScrollTrigger.create({
      //   trigger: $overview[0],
      //   start: 'top top',
      //   endTrigger: $phaseList[0],
      //   end: 'bottom bottom',
      //   scrub: true,
      //   pin: true,
      //   pinSpacing: false
      // });

      ScrollTrigger.create({
        trigger: $phaseDetail[0],
        start: 'top 10%',
        end: 'top 0%',
        scrub: true,
      });
    });
  };



	$(win).on('scroll', function () {
    eventParallaxImage();
    // const overview = document.querySelector('.phase-detail-overview');
    // if (!overview) return;

    // const rect = overview.getBoundingClientRect();
    // console.log('Scroll Y:', window.scrollY);
    // console.log('Overview top (viewport):', rect.top);

	}).scroll();

	$(win).on('load', function () {
    eventScaleRightHistory();
    eventSplitOverlayHistory();
    handleMouseover();
    eventHistoryScroll1();
    eventHistoryScroll2();
	});

})(window, window.jQuery);
