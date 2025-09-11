; (function (win, $) {

  // S: Swiper
  var swiperManagement = new Swiper('.swiper-management', {
		slidesPerView: 'auto',
    // loop: true,
    centeredSlides: true,
    navigation: {
      nextEl: '.swiper-management .swiper-button-next',
      prevEl: '.swiper-management .swiper-button-prev',
    },
    pagination: {
      el: '.swiper-management .swiper-pagination',
      type: 'fraction',
      formatFractionCurrent: function (number) {
        return number;
      }
    },
    on: {
      init: function (swiper) {
        updatePaginationNum(swiper);
      },
      slideChange: function (swiper) {
        updatePaginationNum(swiper);
        // $('.js-panel-swiper').find('.panel-item').eq(swiper.realIndex).addClass('is-active').siblings().removeClass('is-active');
      },
    }
	});
  function updatePaginationNum(swiper) {
    const idx = swiper.realIndex;
    $('.js-panel-swiper').find('.panel-item').eq(idx).addClass('is-active').siblings().removeClass('is-active');
  }
  // E: Swiper

  var eventScrollKV = function() {
    const tl = gsap.timeline();

    if($('.js-key-visual-main').length) {
      gsap.set('.slide-kv-item:not(:last-child)', { clipPath: 'inset(0 0 0 0)' });

      tl.to('.slide-kv-item:not(:last-child)', {
        ease: 'none',
        clipPath: 'inset(0 0 100% 0)',
        stagger: 1,
        duration: 1
      })

      ScrollTrigger.create({
        trigger: '.slide-kv-list',
        start: 'top top',
        end: '+=500%',
        // end: () => "+=" + document.querySelector(".key-visual").offsetHeight + " bottom",
        scrub: true,
        pin: true,
        markers: true,
        animation: tl
      });

      gsap.set('.slide-kv-item', {
        zIndex: (i, target, targets) => targets.length - i
      });
    }
  };

  var scrollDownBTN = function() {
    $('.btn-scroll-down').on('click', function(e) {
      e.preventDefault();

      const $btn = $(this);
      const $target = $btn.closest('.slide-kv-item').next('.slide-kv-item');
      if ($target.length == 1) {
        const targetPosition = ($target[0].offsetTop +  $('.slide-kv-item').height()) * 5 / 3;
        console.log('hoan: ',  targetPosition);

        $('html, body').animate({
          scrollTop: `+=` +targetPosition
        }, 800);
      } else {
        const sec2Position = $('.sec2')[0].offsetTop;
        $('html, body').animate({
          scrollTop: sec2Position
        }, 800);
      }
    })
  };

  $.fn.rect = function () {
    if (this.length === 0) return null;
    return this.get(0).getBoundingClientRect();
  };

  var enventScaleManagement = function() {
    const $wrap = $('.js-wrap-scale');
    const $aniBox_0 = $wrap.find('.ani-box-scale.step0');
    const $aniBox_1 = $wrap.find('.ani-box-scale.step1');
    const $aniBox_target = $wrap.find('.ani-box-scale.target');
    const $swiperManagement = $wrap.find('.swiper-management');
    const $panelSwiper = $wrap.find('.js-panel-swiper');

    const tl = gsap.timeline();

    tl.set($aniBox_0, {
      width: function () {
        const c = Math.hypot($($wrap).width(), $($wrap).height());
        return `${c}px`;
      },
      height: function () {
        const c = Math.hypot($($wrap).width(), $($wrap).height());
        return `${c}px`;
      },
    });

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

    tl.set($swiperManagement, {
      opacity: 0,
      'pointer-events': 'none',
    });
    tl.set($panelSwiper, {
      opacity: 0,
    });

    tl.to($aniBox_target, {
      duration: 10,
      ease: 'none',
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
    }, '<');

    tl.to($swiperManagement, {
      opacity: 1,
    });

    tl.to($panelSwiper, {
      opacity: 1,
    }, '<');

    tl.set($swiperManagement, {
      'pointer-events': 'auto',
    });

    tl.to($aniBox_target, {
      opacity: 0,
    });

    tl.to({}, {
      duration: 20,
      onUpdate: function () {}
    });

    tl.to({}, {duration: 5});

    const sct = ScrollTrigger.create({
      id: `sustainable-management`,// 마커 표시할때 이름 부여
      animation: tl,// 트윈 연결
      trigger: $wrap,// 트리거 지정
      end: `bottom top`,
      start: `top top`,
      scrub: 1,
      pin: true,
      toggleActions: `play none none reverse`,
      toggleClass: `scroll-trigger-active`,// 트리거 작동 범위에서 클래스 부여
      invalidateOnRefresh: true,// 리사이즈 대응
    });
  };

  var eventZoomSocial = function() {
    const $wrap = $('.js-wrap-zoom-main');
    const $aniBox_0 = $wrap.find('.ani-box-zoom.step0');
    const $aniBox_1 = $wrap.find('.ani-box-zoom.step1');
    const $aniBox_target = $wrap.find('.ani-box-zoom.target');

    const $boxContent = $wrap.find('.box-content');
    const $infoAreaBottom = $wrap.find('.info-area-bottom');
    const $text_1 = $wrap.find('.js-text-ani1');
    const $text_2 = $wrap.find('.js-text-ani2');

    const tl = gsap.timeline();

    // Set the target to exactly match the position and size of step0.
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

    // Move and scale the target to exactly match the position and size of step1.
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

    tl.to($boxContent, {
      opacity: 0,
    }, '<');

    tl.to($text_1, {
      color: 'white',
      x: '-50',
    }, '<');

    tl.to($infoAreaBottom, {
      x: '50',
    }, '<');

    tl.to($text_2, {
      color: 'white',
    }, '<');

    tl.to($boxContent, {
      opacity: 1,
      'z-index': 20,
    });

    tl.to($text_1, {
      x: '0',
    }, '<');

    tl.to($infoAreaBottom, {
      x: '0',
    }, '<');

    const sct = ScrollTrigger.create({
      id: 'social-contribution',// Assign a name when displaying markers
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

  var mouseHoverBusiness = function() {
    $('.js-business-hover')
      .on('mouseenter', function() {
        $('.js-business-hover').parents('.business-item').removeClass('is-hover is-small');
        $(this).parents('.business-item').addClass('is-hover');
        $('.js-business-hover').not(this).parents('.business-item').addClass('is-small');
      })
      .on('mouseleave', function() {
        $('.js-business-hover').parents('.business-item').removeClass('is-hover is-small');
      });
  };

	$(win).on('scroll', function () {
	}).scroll();

	$(win).on('load', function () {
    eventScrollKV();
    scrollDownBTN();
    enventScaleManagement();
    eventZoomSocial();
    // mouseHoverBusiness();
	});

})(window, window.jQuery);
