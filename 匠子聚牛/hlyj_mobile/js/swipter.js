var swiper1 = new Swiper('.swiper-container_banner', {  //banner 轮播 banner
  autoplay:true,
  pagination: {
    el: '.swiper-pagination',
  },
});
var swiper2 = new Swiper('.swiper-container_main_2', {  //认证 轮播 main_2
  observer:true,
  observeParents:true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});


var certifySwiper1 = new Swiper('.main_6_box .swiper-container_main_6',{
  watchSlidesProgress: true,
  slidesPerView: 'auto',
  centeredSlides: true,
  loop: true,
  loopedSlides: 5,
  observer:true,
  observeParents:true,
  navigation: {
    nextEl: '.swiper-button-next_main_6',
    prevEl: '.swiper-button-prev_main_6',
  },
  pagination: {
    el: '.swiper-pagination_main_6',
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


var certifySwiper2 = new Swiper('.main_8_box .swiper-container_main_8',{
  watchSlidesProgress: true,
  slidesPerView: 'auto',
  centeredSlides: true,
  observer:true,
  observeParents:true,
  pagination: {
    el: '.swiper-pagination_main_8',
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

var certifySwiper3 = new Swiper('.main_1_box .swiper-container_main_1',{
  watchSlidesProgress: true,
  slidesPerView: 'auto',
  centeredSlides: true,
  loop: true,
  loopedSlides: 5,
  observer:true,
  observeParents:true,
  navigation: {
    nextEl: '.swiper-button-next_main_1',
    prevEl: '.swiper-button-prev_main_1',
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

