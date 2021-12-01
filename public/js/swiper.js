const swiper1 = new Swiper('.swiper-pads', {
    direction: 'horizontal',
    loop: true,
    autoplay: {
        delay: 4000,
    },
    clickable: true,
    pagination: {
        el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.swiper-button-next-pads',
        prevEl: '.swiper-button-prev-pads',
    },
});

const swiper2 = new Swiper('.swiper-metodos', {
    direction: 'horizontal',
    loop: true,
    autoplay: {
        delay: 4000,
    },
    clickable: true,
    pagination: {
        el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.swiper-button-next-met',
        prevEl: '.swiper-button-prev-met',
    },
});

const swiper3 = new Swiper('.swiper-relatos', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: "auto",
    spaceBetween: 30,
    autoplay: {
        delay: 3000,
    },
    clickable: true,
    pagination: {
        el: '.swiper-pagination-relatos',
    },
    navigation: {
        nextEl: '.swiper-next-relatos',
        prevEl: '.swiper-prev-relatos',
    },
});