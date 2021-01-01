var web_style = jQuery("#web_style").val();

function setCookie(key, value) {
  localStorage.setItem(key, value);
}
function getCookie(key) {
  var data = localStorage.getItem(key);
  return data
}

function updateStyle() {
  //jQuery('#theme').remove();
  if (getCookie("style") == "white") {
    jQuery("#footer").attr("style", "color: #51525d;");
    jQuery("#content-area blockquote").removeClass("blockquoteWhileBgBlack");
    jQuery(document.body).removeClass("bg_black");
    jQuery("#content-area h2,h3,h4,h5,strong,p,a").removeClass("fontColorWhileBgBlack");
    jQuery("#content-area h1").removeClass("h1WhileBgBlack");
    jQuery("blockquote p").attr("style", "color: #666;");
    jQuery("#emotional_img").addClass("focus").css("pointer-events","auto"); //hover选择器
    jQuery("#wpdcom *").removeClass("wpdiscuzWhileBgBlack");
    jQuery("#update_style").attr('checked', false);
  } else {
    jQuery("#footer").attr("style", "");
    jQuery("#content-area blockquote").addClass("blockquoteWhileBgBlack");
    jQuery(document.body).addClass("bg_black");
    jQuery("#content-area h2,h3,h4,h5,strong,p,a").addClass("fontColorWhileBgBlack");
    jQuery("#content-area h1").addClass("h1WhileBgBlack");
    jQuery("blockquote p").attr("style", "color: #798ba9;");
    jQuery("#emotional_img").addClass("focus").css("pointer-events","none"); //hover选择器
    jQuery("#wpdcom *").addClass("wpdiscuzWhileBgBlack");
    jQuery("#update_style").attr('checked', true);
  }
}

if (getCookie("style") == null) {
  setCookie("style", web_style)
  updateStyle();
} else if (getCookie("style") == "white") {
  setCookie("style", "white")
  updateStyle();
} else if (getCookie("style") == "black") {
  setCookie("style", "black")
  updateStyle();
}

jQuery("#update_style").change(function () {
  var style = jQuery("#update_style").is(':checked');
  if (style) {
    setCookie("style", "black")
    updateStyle();
  } else {
    setCookie("style", "white")
    updateStyle();
  }
});