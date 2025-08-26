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
  
    gsap.set('.slide-kv-item:not(:last-child)', { clipPath: 'inset(0 0 0 0)' });
  
    tl.to('.slide-kv-item:not(:last-child)', {
      ease: 'none',
      clipPath: 'inset(0 0 100% 0)',
      stagger: 1,
      duration: 1
    })
  
    ScrollTrigger.create({
      trigger: '.key-visual',
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

  // gsap.registerPlugin(ScrollTrigger);
  var scaleImage = function() {
    const bgFull = document.querySelector('.bg-full');
    const target = document.querySelector('.swiper-slide-active .item-management');
    const sectionContent = document.querySelector('.section-content');
    if (!bgFull || !target || !sectionContent) return;

    const bgFullRect = bgFull.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const sectionContentRect = sectionContent.getBoundingClientRect();

    const bgFullHeightStart = bgFullRect.height;
    const bgFullHeightEnd = Math.min(targetRect.width, targetRect.height);
    const bgFullResizeDistance = Math.abs(bgFullHeightStart - bgFullHeightEnd);
    const sectionContentHeight = sectionContentRect.height;

    const sec2Height = bgFullResizeDistance + sectionContentHeight;
    $('.sec2').css('height', sec2Height + 'px');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.ani-box',
        start: 'top top',
        end: '+=200%', // Kéo dài hiệu ứng trong 2 lần chiều cao màn hình
        scrub: true,
        pin: true,
      }
    });

    const slideActive = document.querySelector('.slide-management.swiper-slide-active');

    if (!bgFull || !target) return;

    const slideRect = slideActive.getBoundingClientRect();

    // Lấy cạnh nhỏ nhất của target để làm hình vuông
    const squareSize = Math.min(targetRect.width, targetRect.height);

    // Tính center của .slide-management.swiper-slide-active
    const slideCenterX = slideRect.left + slideRect.width / 2;
    const slideCenterY = slideRect.top + slideRect.height / 2;

    // Tính center của .bg-full (sau khi scale về squareSize)
    const bgFullCenterX = bgFullRect.left + bgFullRect.width / 2;
    const bgFullCenterY = bgFullRect.top + bgFullRect.height / 2;

    // Tính offset cần di chuyển
    const deltaX = slideCenterX - bgFullCenterX;
    const deltaY = slideCenterY - bgFullCenterY;
        

    // Thu nhỏ ảnh và di chuyển đến vị trí của vòng tròn trong swiper
    tl.to('.bg-full', {
      borderRadius: '100%',
      width: squareSize,
      height: squareSize,
      // x: deltaX,
      // y: deltaY,
      ease: 'power2.out',
    }, 0);

    // Khi đã trùng khớp vị trí, mới fade in section-content
    tl.to('.section-content', {
      opacity: 1,
      duration: 0,
      ease: 'power1.inOut',
    });
  };

  $.fn.rect = function () {
    if (this.length === 0) return null;
    return this.get(0).getBoundingClientRect();
  };

  var sectionScale = function() {
    const $wrap = $('.js-wrap-scale');
    const $ani_box_0 = $wrap.find('.ani-box-scale.step0');
    const $ani_box_1 = $wrap.find('.ani-box-scale.step1');
    const $ani_box_target = $wrap.find('.ani-box-scale.target');
    const $swiper_management = $wrap.find('.swiper-management');
    const $panel_swiper = $wrap.find('.js-panel-swiper');

    const tl = gsap.timeline();

    tl.set($ani_box_0, {
      width: function () {
        const c = Math.hypot($($wrap).width(), $($wrap).height());
        return `${c}px`;
      },
      height: function () {
        const c = Math.hypot($($wrap).width(), $($wrap).height());
        return `${c}px`;
      },
    });
    
    tl.set($ani_box_target, {
      x: function () {
        return $ani_box_0.rect().x;
      },
      y: function () {
        return $ani_box_0.rect().y - $wrap.rect().y;
      },
      width: function () {
        return $ani_box_0.width();
      },
      height: function () {
        return $ani_box_0.height();
      },
    });
    
    tl.set($swiper_management, {
      opacity: 0,
      'pointer-events': 'none',
      
    });
    tl.set($panel_swiper, {
      opacity: 0,
    });
    
    tl.to($ani_box_target, {
      duration: 10,
      ease: 'none',
      x: function () {
        return $ani_box_1.rect().x;
      },
      y: function () {
        return $ani_box_1.rect().y - $wrap.rect().y;
      },
      width: function () {
        return $ani_box_1.width();
      },
      height: function () {
        return $ani_box_1.height();
      },
    }, '<');
    
    tl.to($swiper_management, {
      opacity: 1,
    });
    
    tl.to($panel_swiper, {
      opacity: 1,
    }, '<');
    
    tl.set($swiper_management, {
      'pointer-events': 'auto',
    });
    
    tl.to($ani_box_target, {
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


	$(win).on('scroll', function () {

	}).scroll();

	$(win).on('load', function () {
    eventScrollKV();
    scrollDownBTN();
    sectionScale();
	});

})(window, window.jQuery);


  /* START :: PageManager */
  // const PageManager = {};

  // PageManager.scrollTo = function (target, offsetY = 0, complete_callbak = null, smooth = true) {
  //   if (window.lenis) {
  //     window.lenis.scrollTo(target, {
  //       offset: offsetY,
  //       onComplete: complete_callbak,
  //       ...(smooth === false && {immediate: true}),
  //     });
  //   } else {
  //     gsap.to(window, {
  //       scrollTo: {
  //         y: target,
  //         offsetY: -1 * offsetY,
  //       },
  //       onComplete: complete_callbak,
  //       ...(smooth === false && {duration: 0}),
  //     });
  //   }
  // }
  /* // END :: PageManager */

  // const Btn_f8525c3c = {};
  // Btn_f8525c3c.scrollNext = function (btn) {
  //   const $btn = $(btn);
  //   const $target = $btn.closest('.slide-kv-item').next('.slide-kv-item');
    
  //   if ($target.length == 1) {
  //     PageManager.scrollTo($target[0]);
  //   } else {
  //     PageManager.scrollTo($(`.sec2`)[0]);
  //   }
    
  // }
