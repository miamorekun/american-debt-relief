import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

function updateSwiperClass() {
    const swiperContainer = document.querySelector('.reviews');
    if (window.innerWidth > 780) {
        swiperContainer.classList.add('swiper-no-swiping');
        const swiper = new Swiper('.reviews', {
            spaceBetween: 52,
        });
    } else {
        swiperContainer.classList.remove('swiper-no-swiping');
        const swiper = new Swiper('.reviews', {
            spaceBetween: 16,
            freeMode: true,
            loop: true,
            slidesPerView: 'auto',
            speed: 5000,
            effect: 'slide',
            autoplay: {
                delay: 0,
                pauseOnMouseEnter: false,
                disableOnInteraction: false,
            },
        });
    }
}

updateSwiperClass();
window.addEventListener('resize', updateSwiperClass);

