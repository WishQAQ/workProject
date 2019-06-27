// 多层嵌套
function tab(tabID,box){
  $(tabID).click(function(){
    $(tabID).removeClass('active');
    $(box).hide();
    $(this).addClass('active');
    $(box).eq($(this).index()).show();
  });
}
$(document).ready(function(){
  //选项卡
  tab("#tab61 li",'.box611');
  tab("#tab_news1 li",'.box_news_1');
  tab("#tab_product1 li",'.box_product_1');
});
