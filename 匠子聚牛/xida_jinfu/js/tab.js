
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
  tab("#tab11 li",'.box1');
  tab("#tab81 li",'.box8');
  tab("#tab51 li",'.box51');
  tab("#tab5111 li",'.box5111');
  tab("#tab5121 li",'.box5121');
  tab("#tab5211 li",'.box5211');
  tab("#tab5212 li",'.box5122');
});