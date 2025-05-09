; (function (win, $) {
	var secSwiperProduct = new Swiper('.swiper-product', {
		slidesPerView: 4,
    loop: true,
    navigation: {
      nextEl: ".swiper-product .rotate-btn.next",
      prevEl: ".swiper-product .rotate-btn.prev",
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
	});

  var eventScrollKV = function() {
    const tl = gsap.timeline();
  
    gsap.set('.slide-item:not(:last-child)', { clipPath: 'inset(0 0 0 0)' });
  
    tl.to('.slide-item:not(:last-child)', {
      ease: 'none',
      clipPath: 'inset(0 0 100% 0)',
      stagger: 1,
      duration: 1
    })
  
    ScrollTrigger.create({
      trigger: '.slide-list',
      start: 'top top',
      end: '+=500%',
      scrub: true,
      pin: true,
      animation: tl
    });
    
    gsap.set('.slide-item', {
      zIndex: (i, target, targets) => targets.length - i
    });
  };
  
  var scrollDownBTN = function() {
    var heightSlide = $('.slide-item').height() + $('.slide-item').offset().top;
    console.log($('.slide-item').offset().top);
    
    
    $('.btn-scroll-down').on('click', function(e) {
      e.preventDefault();

      
      // var currentSection = $(this).closest('.slide-item'),
      //     nextSection = currentSection.next('.slide-item');
      
      // console.log('aa',currentSection);
      // console.log('bb',nextSection);
      // if (nextSection.length) {
      //   $('html, body').animate({
      //     scrollTop: nextSection.height()
      //   }, 1000);
      // }
      
      $('html, body').animate({
        scrollTop: `+=` + heightSlide
      }, 800);
    })
  };




	$(win).on('scroll', function () {
	}).scroll();

	$(win).on('load', function () {
    eventScrollKV();
    scrollDownBTN();
	});

})(window, window.jQuery);
