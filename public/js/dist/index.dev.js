"use strict";

//----------//Banner輪播//---------//
//第2層最前面補上(複製)最後一張圖
$('.banner-child').prepend($('.banner-child>img').last().clone()); //第2層最前面補上(複製)第二張圖(其實是第一張)

$('.banner-child').append($('.banner-child>img').eq(1).clone()); // let currentLeftNum = 0 //左邊位移的距離(0/-??)

var currentNum = 1; //當前的數字

var parentWidth = $('.banner-parent').width(); //父層寬

var imgLength = $('.banner-child>img').length; //子層(圖片)個數

var childTotalWidth = parentWidth * imgLength; //父層寬*子層個數

$('.banner-child').css({
  'margin-left': -parentWidth * currentNum
}); //調整第二層一開始位移的位置

$('.banner-child').width(childTotalWidth); //子層寬=父層寬*子層圖片個數(只讀一次)

$('.banner-child>img').width(parentWidth); //子層圖片寬 = 父層寬
//蓋板loading

$(window).on('load', function () {
  $('.loading-overlay').addClass('active');
  parentWidth = $('.banner-parent').width();
  childTotalWidth = parentWidth * imgLength;
  $('.banner-child').css({
    'margin-left': -parentWidth * currentNum
  });
  $('.banner-child').width(childTotalWidth);
  $('.banner-child>img').width(parentWidth);
}); //window loading
// for 迴圈 從0到圖片總數-2 的條件下，i累加1

for (var i = 0; i < imgLength - 3; i++) {
  $('.indicator>li.active').after('<li></li>');
} //縮放時的變化


$(window).resize(function () {
  parentWidth = $('.banner-parent').width();
  childTotalWidth = parentWidth * imgLength;
  $('.banner-child').css({
    'margin-left': -parentWidth * currentNum
  });
  $('.banner-child').width(childTotalWidth);
  $('.banner-child>img').width(parentWidth);
});
$('.right-arrow').on('click', function () {
  // console.log('外',currentNum)
  if (currentNum == imgLength - 1) {//假如當前數字=圖片總數
  } else {
    currentNum = currentNum + 1; //當前數字累加1

    common(); // $('.banner-child').animate({'margin-left':-parentWidth * (currentNum-1)})
    // console.log('內',currentNum)
  }
}); // .right-arrow end

$('.left-arrow').on('click', function () {
  // console.log('外',currentNum)
  if (currentNum == 0) {} else {
    currentNum = currentNum - 1; //當前數字累加1

    common(); // $('.banner-child').animate({'margin-left': -parentWidth * (currentNum-1)})
    // console.log('內',currentNum)
  }
}); // .left-arrow end

$('.indicator>li').on('click', function () {
  // console.log('當前',currentNum)
  // console.log('點擊的',$(this).index())//序列號
  //index()序列號//
  //eq()第幾個元素//
  currentNum = $(this).index() + 1; //當前的數字=點擊序列+1//

  common();
  console.log($('.indicator>li').eq(0)); // $('.indicator>li').eq(currentNum-1).addClass('active')
  // $('.indicator>li').eq(currentNum-1).siblings().removeClass('active')
  //^圓圈按鈕的切換^//
}); //indicator>li END

function common() {
  // $('.banner-child').animate({'margin-left': -parentWidth * (currentNum)},callback)
  $('.banner-child').animate({
    'margin-left': -parentWidth * currentNum
  }, function () {
    //callback函式執行完後執行
    //假如當前數字 = 總數-1
    if (currentNum == imgLength - 1) {
      currentNum = 1;
    }

    if (currentNum == 0) {
      currentNum = imgLength - 2;
    } //動畫結束後執行圓圈跳下一個//


    $('.banner-child').css({
      'margin-left': -parentWidth * currentNum
    });
    console.log(currentNum);
    $('.indicator>li').eq(currentNum - 1).addClass('active');
    $('.indicator>li').eq(currentNum - 1).siblings().removeClass('active');
  }); //callback END
} //common() END


setInterval(function () {
  $('.right-arrow').click();
}, 3000); //---------故事時光 輪播-------//

if ($(window).width() < 767) {
  $('.story-wrapper').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  }); // JavaScript here 
  // 當視窗寬度小於767px時執行
} else {
  // JavaScript here
  // 當視窗寬度不小於767px時執行
  $('.story-wrapper').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000
  });
}