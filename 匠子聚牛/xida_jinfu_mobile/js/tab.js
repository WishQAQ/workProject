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
  tab("#tab1 li",'.box1');
  tab("#tab51 li",'.box511');
  tab("#tab51111 li",'.box51111');
  tab("#tab51112 li",'.box51112');
  tab("#tab51113 li",'.box51113');
  tab("#tab51121 li",'.box51121');
  tab("#tab51122 li",'.box51122');
  tab("#tab51123 li",'.box51123');
  tab("#tab81 li",'.box811');
});

