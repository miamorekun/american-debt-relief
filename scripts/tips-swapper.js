import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

function updateSwiper() {
    if (window.innerWidth > 780) {
        const swiper = new Swiper('.tips-swiper', {
            slidesPerView: "auto",
            spaceBetween: 52,
            effect: 'coverflow',
        
            pagination: {
                el: '.swiper-pagination',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            coverflowEffect: {
                rotate: 0,
                scale: 1,
                slideShadows: false,
            }
        });
    } else {
        const swiper = new Swiper('.tips-swiper', {
            spaceBetween: 16,
        
            pagination: {
                el: '.swiper-pagination',
            },
        });
    }
}

updateSwiper();
window.addEventListener('resize', updateSwiper);