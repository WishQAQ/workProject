
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
  tab("#tab1 li",'.box1');
  tab("#tab21 li",'.box21');
  tab("#tab91 li",'.box91');
});