import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

const swiper = new Swiper('.hiw-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 20,

    // Navigation arrows
    pagination: {
        el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    autoplay: {
        delay: '5000',
        disableOnInteraction: true,
    }
});
