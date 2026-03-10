

// 背景图片 Cookies
function setBgImg(bg_img) {
  if (bg_img) {
    Cookies.set("bg_img", bg_img, {
      expires: 36500,
    });
    return true;
  }
  return false;
}

function getPageDepth() {
  const pathname = (window.location.pathname || "").replace(/\/+$/, "");
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) {
    return 0;
  }
  return parts[parts.length - 1].includes(".") ? parts.length - 1 : parts.length;
}

function getAssetUrl(relativePath) {
  return new URL(relativePath, window.location.href).href;
}

function getBgAsset(fileName) {
  const depth = getPageDepth();
  const prefix = depth === 0 ? "./" : "../".repeat(depth);
  return getAssetUrl(`${prefix}img/${fileName}`);
}

function isHomepage() {
  const pathname = (window.location.pathname || "").replace(/\/+$/, "");
  // 只匹配真正的根主页，避免错误地把 ts-guide/index.html 等子页当成主页
  return pathname === "" || pathname === "/" || pathname === "/index.html";
}

// 获取背景图片 Cookies
function getBgImg() {
  let bg_img_local = Cookies.get("bg_img");
  if (bg_img_local && bg_img_local !== "{}") {
    try {
      return JSON.parse(bg_img_local);
    } catch (error) {
      setBgImg(bg_img_preinstall);
      return { ...bg_img_preinstall };
    }
  } else {
    setBgImg(bg_img_preinstall);
    return { ...bg_img_preinstall };
  }
}

let bg_img_preinstall = {
  type: "1", // 1:默认背景 2:每日一图 3:随机风景 4:随机动漫
  2: "https://api.dujin.org/bing/1920.php", // 每日一图
  3: "https://api.btstu.cn/sjbz/api.php?lx=fengjing&format=images", // 随机风景
  4: "https://www.dmoe.cc/random.php", // 随机动漫
};

// 更改背景图片
function setBgImgInit() {
  let bg_img = getBgImg();
  // onsole.log("Current bg_img on page load", bg_img); 
  $("input[name='wallpaper-type'][value=" + bg_img["type"] + "]").click();

  const $bg = $("#bg");
  $bg.removeClass("error");
  $bg.off("load.bg error.bg");
  $bg.on("load.bg", function () {
    $(this).removeClass("error");
  });
  $bg.on("error.bg", function () {
    const $this = $(this);
    if ($this.data("bgFallback")) {
      return;
    }
    $this.data("bgFallback", true);
    $this.attr("src", getBgAsset("background1.png"));
  });

  switch (bg_img["type"]) {
    case "1":
      if (!bg_img.defaultSrc || isHomepage()) {
        const randomIndex = 1 + Math.floor(Math.random() * 7);
        bg_img.defaultSrc = getBgAsset(`background${randomIndex}.png`);
        setBgImg(bg_img);
      }
      $("#bg").attr("src", bg_img.defaultSrc);
      break;
    case "2":
      $("#bg").attr("src", bg_img_preinstall[2]); //必应每日
      break;
    case "3":
      $("#bg").attr("src", bg_img_preinstall[3]); //随机风景
      break;
    case "4":
      $("#bg").attr("src", bg_img_preinstall[4]); //随机动漫
      break;
  }
}

$(document).ready(function () {
  // 壁纸数据加载
  setBgImgInit();
  // 设置背景图片
  $("#wallpaper").on("click", ".set-wallpaper", function () {
    let type = $(this).val();
    let bg_img = getBgImg();
    bg_img["type"] = type;
    if (type === "1") {
      const randomIndex = 1 + Math.floor(Math.random() * 7);
      bg_img.defaultSrc = getBgAsset(`background${randomIndex}.png`);
    } else {
      delete bg_img.defaultSrc;
    }
    iziToast.show({
      icon: "fa-solid fa-image",
      timeout: 2500,
      message: "壁纸设置成功，刷新后生效",
    });
    setBgImg(bg_img);
  });
});
