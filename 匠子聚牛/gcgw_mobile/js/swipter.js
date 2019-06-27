var swiper1 = new Swiper('#banner_swipter', {  //banner 轮播 banner
  autoplay:true,
  pagination: {
    el: '.swiper-pagination',
  },
});
var swiper2 = new Swiper('#main_3_swipter', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});


var certifySwiper1 = new Swiper('#swiper_main_5',{
  watchSlidesProgress: true,
  slidesPerView: 'auto',
  centeredSlides: true,
  loop: true,
  loopedSlides: 5,
  observer:true,
  observeParents:true,
  navigation: {
    nextEl: '#main_5_next',
    prevEl: '#main_5_prev',
  },
  on: {
    progress: function(progress) {
      for (i = 0; i < this.slides.length; i++) {
        var slide = this.slides.eq(i);
        var slideProgress = this.slides[i].progress;
        modify = 1;
        if (Math.abs(slideProgress) > 1) {
          modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
        }
        translate = slideProgress * modify * 2.6 + 'rem';
        scale = 1 - Math.abs(slideProgress) / 5;
        zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
        slide.transform('translateX(' + translate + ') scale(' + scale + ')');
        slide.css('zIndex', zIndex);
        slide.css('opacity', 1);
        if (Math.abs(slideProgress) > 3) {
          slide.css('opacity', 0);
        }
      }
    },
    setTransition: function(transition) {
      for (var i = 0; i < this.slides.length; i++) {
        var slide = this.slides.eq(i)
        slide.transition(transition);
      }

    }
  }
});


var swiper3 = new Swiper('.swiper_main_6', {
  observer:true,
  observeParents:true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});