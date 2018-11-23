import $ from 'jquery';
import '../../node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min';
import Swiper from 'swiper';
import '../../node_modules/jquery-popup-overlay/jquery.popupoverlay';
import '../../node_modules/jquery-mask-plugin/dist/jquery.mask.min';
import '../../node_modules/jquery-validation/dist/jquery.validate.min';
import '../../node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min';

$('.scroll').mCustomScrollbar();

function readMore() {
  var elem = $('.country__wrapper');
  var fullHeight = $('.country__wrapper_flags').innerHeight();
  var maxHeight = 240;
  var moreText = 'Показать больше';
  var lessText = 'Спрятать';
  var btn = $('.button__reverse');

  $(window).resize(function(event) {
    if (parseInt(elem.css('height'), 10) !== fullHeight && parseInt(elem.css('height'), 10) !== maxHeight) {
      elem.css('height', maxHeight).animate({
        height: fullHeight,
      },
      1000, function() {
      });
    }
  });
  elem.css({
    height: maxHeight
  });

  btn.click(function(e) {
    e.preventDefault();

    if (parseInt(elem.css('height'), 10) !== fullHeight) {
      elem.css('height', maxHeight).animate({
        height: fullHeight,
      },
      1000, function() {
        elem.addClass('active');
        btn.html(lessText);
      });
    }
    else {
      elem.animate({
        height: maxHeight,
      },
      1000, function() {
        elem.css('height', maxHeight);
        elem.removeClass('active');
        btn.html(moreText);
      });
    }

  });
}
readMore();
function readMoreTwo() {
  var elem = $('.cause__wrapper');
  var fullHeight = $('.cause__wrapper_info').innerHeight();
  var maxHeight = 240;
  var moreText = 'Показать больше';
  var lessText = 'Спрятать';
  var btn = $('.button__cause');

  $(window).resize(function(event) {
    if (parseInt(elem.css('height'), 10) !== fullHeight && parseInt(elem.css('height'), 10) !== maxHeight) {
      elem.css('height', maxHeight).animate({
        height: fullHeight,
      },
      1000, function() {
      });
    }
  });
  elem.css({
    height: maxHeight
  });

  btn.click(function(e) {
    e.preventDefault();

    if (parseInt(elem.css('height'), 10) !== fullHeight) {
      elem.css('height', maxHeight).animate({
        height: fullHeight,
      },
      1000, function() {
        elem.addClass('active');
        btn.html(lessText);
      });
    }
    else {
      elem.animate({
        height: maxHeight,
      },
      1000, function() {
        elem.css('height', maxHeight);
        elem.removeClass('active');
        btn.html(moreText);
      });
    }

  });
}
readMoreTwo();
//---- ADD SLIDER - SWIPER ----
var swiper = new Swiper('.reviews__slider .swiper-container', {
  slidesPerView: 2,
  centeredSlides: true,
  spaceBetween: 120,
  autoHeight: true,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    992: {
      slidesPerView: 1,
      spaceBetween: 20,
      centeredSlides: false,
      loop: true
    },
  }
});
//---- SCROOLL ----
$(window).scroll(function() {
  if($(this).scrollTop() > 650) {
    $('.nav').addClass('scroll');
  }
  else {
    $('.nav').removeClass('scroll');
  }
});

$(document).ready(function() {
  //---- POPUP ----
  $('.modal').popup({
    transition: 'all 0.3s',
    outline: true, // optional
    focusdelay: 400, // optional
    vertical: 'top', //optional
    // onclose: function() {
    //   $(this).find('label.error').remove();
    // }
  });


  //---- FLAGS ----
  let modalDataContry;
  let modalDataTime;
  let modalDataPrice;
  let modalDataMoreInform;
  let modalDataBgImage;


  $('.country__block').click(function() {
    modalDataContry = $(this).attr('data-country');
    modalDataTime = $(this).attr('data-time');
    modalDataPrice = $(this).attr('data-price');
    modalDataMoreInform = $(this).attr('data-more-inform');
    modalDataBgImage = $(this).attr('data-bg-image');
  });

  $('.modal-flag').popup({
    transition: 'all 0.3s',
    outline: true, 
    focusdelay: 400,
    vertical: 'top',
    beforeopen: function() {
      $('.js-data-country').html(modalDataContry);
      $('.js-data-time').html(modalDataTime);
      $('.js-data-price').html(modalDataPrice);
      $('.js-data-more-inform').html(modalDataMoreInform);
      $('img[src].js-data-bg-image').attr('src', modalDataBgImage);
      $('input[name="country"]').val(modalDataContry);
    }
  });

  //---- TABS ----
  $('.what-need__tabs_item').not(':first').hide();
  $('.what-need__tabs_tab').click(function() {
    $('.what-need__tabs_tab').removeClass('active').eq($(this).index()).addClass('active');
    $('.what-need__tabs_item').hide().eq($(this).index()).fadeIn();
  }).eq(0).addClass('active');
  //---- NAV HAMBURGER ----
  $('.nav__button').click(function() {
    $('.nav__adaptive').toggleClass('active');
    $('.nav__button').toggleClass('active');
    $('.nav').toggleClass('active');
  });
  $('.nav a').click(function() {
    $('.nav__adaptive').removeClass('active');
    $('.nav__button').removeClass('active');
    $('.nav').removeClass('active');
  });
  //---ANCHORN---
  $('.menu a').on('click', function(event) {
    var target = $(this.getAttribute('href'));

    if (target.length) {
      event.preventDefault();
      $('html, body').stop().animate({
        scrollTop: target.offset().top
      }, 1000);
    }
  });

  // --- jQuery Mask + jquery VALIDATION ---
  $('input[type="tel"]').mask('+7 (000) 000-00-00');
  jQuery.validator.addMethod('phoneno', function(phone_number, element) {
    return this.optional(element) || phone_number.match(/\+[0-9]{1}\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}/);
  }, 'Введите Ваш телефон');

  $('.form').each(function(index, el) {
    $(el).addClass('form-' + index);

    $('.form-' + index).validate({
      rules: {
        name: 'required',
        agree: 'required',
        country: 'required',
        formName: 'required',
        tel: {
          required: true,
          phoneno: true
        }
      },
      messages: {
        name: 'Введите Ваше имя',
        tel: 'Введите Ваш телефон',
        agree: 'Нужно соглашение на обработку данных',
        country: 'Старана',
      },
      submitHandler: function(form) {
        var t = $('.form-' + index).serialize();
        console.log(t);
        ajaxSend('.form-' + index, t);
      }
    });
  });
  function ajaxSend(formName, data) {
    jQuery.ajax({
      type: 'POST',
      url: 'sendmail.php',
      data: data,
      success: function() {
        $('.modal, .modal-flag').popup('hide');
        $('#thanks').popup('show');
        setTimeout(function() {
          $(formName).trigger('reset');
        }, 2000);
      }
    });
  };
});
