// 背景图片配置（与主站 wallpaper store 保持一致）
var bg_img_preinstall = {
  type: "1",
  2: "https://api.dujin.org/bing/1920.php",
  3: "https://api.btstu.cn/sjbz/api.php?lx=fengjing&format=images",
  4: "https://www.dmoe.cc/random.php",
};

// 从 cookie 读取背景偏好，设置 #bg 图片
function setBgImgInit() {
  var bg_img = null;
  try {
    var raw = Cookies.get("bg_img");
    if (raw) bg_img = JSON.parse(raw);
  } catch (e) {}

  if (!bg_img || !bg_img.type) {
    bg_img = { type: "1" };
  }

  var src = "";
  switch (bg_img.type) {
    case "2": src = bg_img_preinstall[2]; break;
    case "3": src = bg_img_preinstall[3]; break;
    case "4": src = bg_img_preinstall[4]; break;
    default:  src = "/img/alec-background" + (1 + ~~(Math.random() * 6)) + ".jpg"; break;
  }

  var el = document.getElementById("bg");
  if (el) el.src = src;
}

// 页面加载时执行
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setBgImgInit);
} else {
  setBgImgInit();
}
