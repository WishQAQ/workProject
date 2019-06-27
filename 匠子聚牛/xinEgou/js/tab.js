
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
  tab("#tab22 li",'.box2');
});






<!--数量加减-->
var num_jia = document.getElementById("num-jia");
var num_jian = document.getElementById("num-jian");
var input_num = document.getElementById("input-num");
num_jia.onclick = function() {
    input_num.value = parseInt(input_num.value) + 1;
}
num_jian.onclick = function() {
        if(input_num.value <= 0) {
            input_num.value = 0;
        } else {
            input_num.value = parseInt(input_num.value) - 1;
        }
    }