;
(function (win, $) {

  var eventScaleUpImage = function () {
    const $wrap = $('.js-ani-zoom-business');
    if (!$wrap.length) return;

    const $imageStep0 = $wrap.find('.ani-scale-up.step0');
    const $imageStep1 = $wrap.find('.ani-scale-up.step1');
    const $imageTarget = $wrap.find('.ani-scale-up.target');
    const $textBlack = $wrap.find('.js-fade-text-black .text-title');
    const $textWhite = $wrap.find('.js-fade-text-white');

    if (!$imageStep0.length || !$imageStep1.length || !$imageTarget.length || !$textBlack.length || !$textWhite.length) return;

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

  var eventSwiperVision = function () {
    const $wrap = $('.js-slide-vision');
    if (!$wrap.length) return;

    const $bgSlideStep0 = $wrap.find('.ani-slide.step0');
    const $bgSlideStep1 = $wrap.find('.ani-slide.step1');
    const $bgSlideTarget = $wrap.find('.ani-slide.target');
    const $bgFull = $bgSlideTarget.find('.bg-full');
    const $swiperVision = $wrap.find('.swiper-vision');

    if (!$bgSlideStep0.length || !$bgSlideStep1.length || !$bgSlideTarget.length || !$bgFull.length || !$swiperVision.length) return;

    const tl = gsap.timeline();

    tl.set($bgSlideTarget, {
      x: () => $bgSlideStep0[0].getBoundingClientRect().x,
      y: () => $bgSlideStep0[0].getBoundingClientRect().y - $wrap[0].getBoundingClientRect().y,
      width: () => $bgSlideStep0.outerWidth(),
      height: () => $bgSlideStep0.outerHeight(),
      padding: () => '0',
      borderRadius: () => '6px',
    });

    tl.to($bgSlideTarget, {
      x: () => $bgSlideStep1[0].getBoundingClientRect().x,
      y: () => $bgSlideStep1[0].getBoundingClientRect().y - $wrap[0].getBoundingClientRect().y,
      width: () => $bgSlideStep1.outerWidth(),
      height: () => $bgSlideStep1.outerHeight(),
      padding: () => '3%',
      borderRadius: () => '0',
    });

    tl.fromTo($bgFull, {
      opacity: 0,
      borderRadius: '6px',
    }, {
      opacity: 1,
      borderRadius: '0',
    }, '<');

    tl.fromTo($swiperVision, {
      opacity: 0,
    }, {
      opacity: 1,
    }, '>');

    const sct = ScrollTrigger.create({
      id: 'ani-slide-vision',
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

  var swiperSlideVision = function () {
    const $swiperArea = $('.js-swiper-custom');
    const $thisSwiper = $swiperArea.find('.swiper-vision')[0];
    const $swiperParents = $('.swiper-full');
    const $paginationText = $('.js-pagination-text');

    if (!$thisSwiper || !$swiperParents.length || !$paginationText.length) return;

    const swiperVision = new Swiper($thisSwiper, {
      speed: 1000,
      parallax: true,
      loop: true,
      grabCursor: true,
      autoplay: {
        delay: 5 * 1000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.swiper-vision .swiper-button-next',
        prevEl: '.swiper-vision .swiper-button-prev',
      },
      on: {
        init: function (swiper) {
          swiper.autoplay.stop();

          let checkOpacityInterval = setInterval(() => {
            const opacity = parseFloat($swiperParents.css('opacity'));

            if (opacity > 0.8 && !swiper.autoplay.running) {
              swiper.autoplay.start();
            } else if (opacity <= 0.8 && swiper.autoplay.running) {
              swiper.autoplay.stop();
            }
          }, 1000);
        },
        slideChange: function (swiper) {
          const realIndex = swiper.realIndex;
          $paginationText.find('.text')
            .eq(realIndex)
            .addClass('is-active')
            .siblings()
            .removeClass('is-active');
        }
      }
    });
  };

  $(win).on('scroll', function () {}).scroll();

  $(win).on('load', function () {
    eventScaleUpImage();
    eventSwiperVision();
    swiperSlideVision();
  });

})(window, window.jQuery);
