const swiper = new Swiper('.mySwiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
      // spaceBetween: 10,
  
    // If we need pagination
    // pagination: {
    //   el: '.swiper-pagination',
    // },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    // },


  });

  


   var swiper1 = new swiper1(".movie-Swiper", {
            slidesPerView: 4,
            centeredSlides: true,
            spaceBetween: 30,
            grabCursor: true,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
          });