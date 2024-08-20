const swiperThumb = new Swiper(".gift__swiper_thumb", {
  spaceBetween: 12,
  slidesPerView: 5,
  freeMode: true,
  breakpoints: {
    320: {
      slidesPerView: 5,
      spaceBetween: 12,
    },
    1141: {
      spaceBetween: 16,
      slidesPerView: 6,
    },
  },
});

const swiperNain = new Swiper(".gift__swiper_card", {
  spaceBetween: 16,
  thumbs: {
    swiper: swiperThumb,
  },
});
