
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
  tab("#tab2 li",'.box2');
  tab("#tab221 li",'.box21');
  tab("#tab2221 li",'.box22');
  tab("#tab2222 li",'.box223');
  tab("#tab2223 li",'.box2231');
  tab("#tab2224 li",'.box224');
  tab("#tab2225 li",'.box225');
  tab("#tab2226 li",'.box226');
  tab("#tab2227 li",'.box227');
  tab("#tab2228 li",'.box228');
  tab("#tab2229 li",'.box229');
  tab("#tab2230 li",'.box230');
  tab("#tab2233 li",'.box231');
  tab("#tab2232 li",'.box232');
  tab("#tab2234 li",'.box234');
  tab("#tab2235 li",'.box235');
  tab("#tab2236 li",'.box236');
  tab("#tab2237 li",'.box237');
  tab("#tab2238 li",'.box238');
  tab("#tab2239 li",'.box239');
});