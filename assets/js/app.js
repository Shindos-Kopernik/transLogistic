$(document).ready(function () {
  let intro = $("#intro");
  let header = $("#header");
  let introH = intro.innerHeight(); // Получаем высоту с учетом padding.
  let headerH = header.innerHeight();
  let scrollTop = $(window).scrollTop();

  let introSlider = $("#introSlider");

  /* Header class on scroll
 ========================================== */

  headerScroll();

  $(window).on("scroll resize", function () {
    // Событие скрола страницы
    headerScroll();
  });

  function headerScroll() {
    introH = intro.innerHeight();
    headerH = header.innerHeight();

    let scrollTop = $(this).scrollTop();

    if (scrollTop >= introH - headerH) {
      // Отняли высоту блока с шапкой
      header.addClass("header--dark");
    } else {
      header.removeClass("header--dark");
    }
  }

  /* Smooth scroll to sections
   ========================================== */
  /* Отменяем стандартные переходы по ссылкам */
  $("[data-scroll]").on("click", function (event) {
    event.preventDefault();
    /* Делаем переходы согласно нашим атрибутам  */

    let scrollEl = $(this).data("scroll");

    /* Получаем позицию элемента от верха страницы */

    let scroolElPos = $(scrollEl).offset().top;

    /* Делаем плавный скролл */

    $("html, body").animate(
      {
        scrollTop: scroolElPos - headerH,
      },
      500,
    );
    console.log(scroolElPos);
  });

  /* ScrollSpy
   ========================================== */
  // Сохраним в переменную высоту окна
  let windowH = $(window).height();

  scrollSpy(scrollTop);

  $(window).on("scroll", function () {
    scrollTop = $(this).scrollTop();

    scrollSpy(scrollTop);
  });
  function scrollSpy(scrollTop) {
    //  Проходим по всем которые будут иметь атрибут data-scrollspy;
    $("[data-scrollspy]").each(function () {
      let $this = $(this);
      let sectionId = $this.data("scrollspy");
      // Сравниваем позицию элемента с позицией скролла.
      let sectionOffset = $this.offset().top;
      sectionOffset = sectionOffset - windowH * 0.3;

      if (scrollTop >= sectionOffset - headerH) {
        $("#nav [data-scroll]").removeClass("active");

        $('#nav [data-scroll="' + sectionId + '"]').addClass("active");
      }
      if (scrollTop == 0) {
        $("#nav [data-scroll]").removeClass("active");
      }
    });
  }

  /* Modal window
   ========================================== */

  $("[data-modal]").on("click", function (event) {
    event.preventDefault(); /* Отменяем стандартное повидение элемента на который мы нажимаем */

    let modal = $(this).data("modal");

    /* Убираем скролл у <body> */

    $("body").addClass("no-scroll");
    $(modal).addClass("show");

    setTimeout(function () {
      $(modal).find(".modal__content").css({
        transform: "scale(1)",
        opacity: "1",
      });
    }, 200);
  });
  /* Если мы нажимаем на атрибут, то мы хотим закрыть модальное окно, а вообще любое имеющее этот атрибут */

  $("[data-modal-close]").on("click", function (event) {
    event.preventDefault();
    let modal = $(this).parents(".modal");
    modalClose(modal);
  });

  /* Ищем родителя этой кнопки */

  /* Закрытие модального окна по клику на пустом месте (на маске) */

  $(".modal").on("click", function () {
    let modal = $(this);
    modalClose(modal);
  });

  /* Отменяем срабатывание клика по самой форме модального окна */

  $(".modal__content").on("click", function (event) {
    event.stopPropagation();
  });

  function modalClose(modal) {
    modal.find(".modal__content").css({
      transform: "scale(0.5)",
      opacity: "0",
    });

    setTimeout(function () {
      $("body").removeClass("no-scroll");
      modal.removeClass("show");
    }, 200);
  }

  /* Slick slider  15-00 */

  introSlider.slick({
    infinite: true,
    /* Бесконечный слайдер */
    slidesToShow: 1,
    /* Количество слайдов на показ */
    slidesToScroll: 1,
    /* Количество слайдов на скроле */
    arrows: false /*  false Убрать навигацию слайдера */,
    fade: true /* Слайдер сам перелистывается */,
    autoplay: false,
    autoplaySpeed: 4000,
    speed: 500,
  });

  /* Стрелки для слайдера */

  $("#introSliderPrev").on("click", function () {
    introSlider.slick("slickPrev");
  });

  $("#introSliderNext").on("click", function () {
    introSlider.slick("slickNext");
  });
});
