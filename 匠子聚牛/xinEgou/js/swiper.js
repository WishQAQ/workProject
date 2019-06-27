

var swiper = new Swiper('#banner_swiper',{   //banner
    autoplay: true,
})

var swiper = new Swiper('#main_2_swiper', {  //垂直切换广告
    direction: 'vertical',
    autoplay: true,
});






$(function(){
    $(".header_right").click(function(){
        $(".right_flex_nav").slideToggle();
    })
})



$(function(){
    $(".shopping_cart_img").click(function(){
        $(".shopping_cart_list").slideToggle();
    })
})



$(function(){
    $(".num-jia").click(function(){
        $(".num-jian").show();
        $(".input-num").show();
    })
})


$(function(){
    $(".order_main_2_box_bottom").click(function(){
        $(".order_box").show();
        $(".order_box_bg").show();
    })
})

$(function(){
    $(".order_box_list_shut").click(function(){
        $(".order_box").hide();
        $(".order_box_bg").hide();
    })
})
