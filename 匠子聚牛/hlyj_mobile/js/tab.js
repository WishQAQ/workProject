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
  tab("#tab_a1 li",'.box1');
  tab("#tab_a2 li",'.box2');
  tab("#tab_b2 li",'.box3');
  tab("#tab_c2 li",'.box4');
  tab("#tab_d2 li",'.box5');
  tab("#tab101 li",'.box1011');
});

// 单层tab
window.onload = function(){
  function For(c,d){
    for(var i = 0; i < c.length; i++) {
      c[i].index = i;
      c[i].onclick = function(e) {
        for(var j = 0; j < c.length; j++) {
          c[j].className = "";
          d[j].className = "hide";
        }
        this.className = "tabActive";
        d[this.index].className = "";
      }
    }
  }
  function tab(a,b){
    var aLi = document.getElementById(a).getElementsByTagName('li');
    var aDl = document.getElementById(b).getElementsByTagName('dl');
    For(aLi,aDl)
  };
  tab('tab_title_8','tab_content_8');  //1
  tab('tab_title_11','tab_content_11');  //2
  tab('tab_title_10_1','tab_content_10_1');  //2
}
