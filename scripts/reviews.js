import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

const swiper = new Swiper('.reviews', {
    slidesPerView: "auto",
    spaceBetween: 16,

    freeMode: {
        enabled: true,
    },
});

function updateSwiperClass() {
    const swiperContainer = document.querySelector('.reviews');
    if (window.innerWidth > 780) {
        swiperContainer.classList.add('swiper-no-swiping');
    } else {
        swiperContainer.classList.remove('swiper-no-swiping');
    }
}

updateSwiperClass();
window.addEventListener('resize', updateSwiperClass);