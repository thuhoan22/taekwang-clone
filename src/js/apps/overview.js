; (function (win, $) {

  var eventZoomSocial = function() {
    const $wrap = $('.js-wrap-zoom-overview');
    const $ani_box_0 = $wrap.find('.ani-box-zoom.step0');
    const $ani_box_1 = $wrap.find('.ani-box-zoom.step1');
    const $ani_box_target = $wrap.find('.ani-box-zoom.target');

    const $box_content = $wrap.find('.box-content');
    const $info_area_bottom = $wrap.find('.info-area-bottom');
    const $text_1 = $wrap.find('.js-text-ani1');

    const tl = gsap.timeline();

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

    tl.to($ani_box_target, {
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
    });

    tl.to($box_content, {
      opacity: 0,
    }, '<');

    tl.to($text_1, {
      // color: 'white',
      x: '-50',
    }, '<');

    tl.to($info_area_bottom, {
      x: '50',
    }, '<');

    tl.to($box_content, {
      opacity: 1,
      'z-index': 20,
    });

    tl.to($text_1, {
      x: '0',
    }, '<');

    tl.to($info_area_bottom, {
      x: '0',
    }, '<');

    const sct = ScrollTrigger.create({
      id: 'kv-overview',// 마커 표시할때 이름 부여
      animation: tl,// 트윈 연결
      trigger: $wrap,// 트리거 지정
      end: 'bottom top',
      start: 'top top',
      scrub: 1,
      pin: true,
      toggleActions: 'play none none reverse',
      toggleClass: 'scroll-trigger-active',// 트리거 작동 범위에서 클래스 부여
      invalidateOnRefresh: true,// 리사이즈 대응
    });
  };

  var eventZoomOverview = function() {
    const $wrap = $('.js-wrap-zoom');
    const $target = $wrap.find('.position-box-target');
    const $from = $wrap.find('.position-box-from');
    const $to = $wrap.find('.position-box-to');

    const tl = gsap.timeline();
    tl.fromTo($target, {
      x: function () {
        const tx = $from.rect().x - $wrap.rect().x;
        return tx;
      },
      y: function () {
        const ty = $from.rect().y - $wrap.rect().y;
        return ty;
      },
      width: function () {
        const tw = $from.outerWidth();
        return tw;
      },
      height: function () {
        const th = $from.outerHeight();
        return th;
      },
      'border-radius': function () {
        return $from.css('border-radius');
      },
    }, {
      x: function () {
        const tx = $to.rect().x - $wrap.rect().x;
        return tx;
      },
      y: function () {
        const ty = $to.rect().y - $wrap.rect().y;
        return ty;
      },
      width: function () {
        const tw = $to.outerWidth();
        return tw;
      },
      height: function () {
        const th = $to.outerHeight();
        return th;
      },
      'border-radius': function () {
        return $to.css('border-radius');
      },
    });

    const sct = ScrollTrigger.create({
      id: 'PositionBoxWrap_24bf017c',
      animation: tl,
      trigger: $wrap,
      end: 'bottom top',
      start: 'top top',
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
    eventZoomSocial();
	});

})(window, window.jQuery);
