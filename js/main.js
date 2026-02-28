

//弹窗样式
iziToast.settings({
  timeout: 10000,
  progressBar: false,
  close: false,
  closeOnEscape: true,
  position: "topCenter",
  transitionIn: "bounceInDown",
  transitionOut: "flipOutX",
  displayMode: "replace",
  layout: "1",
  backgroundColor: "#00000040",
  titleColor: "#efefef",
  messageColor: "#efefef",
  icon: "Fontawesome",
  iconColor: "#efefef",
});

/* 鼠标样式 */
const body = document.querySelector("body");
const element = document.getElementById("g-pointer-1");
const element2 = document.getElementById("g-pointer-2");
const halfAlementWidth = element.offsetWidth / 2;
const halfAlementWidth2 = element2.offsetWidth / 2;

function setPosition(x, y) {
  element2.style.transform = `translate(${x - halfAlementWidth2 + 1}px, ${
    y - halfAlementWidth2 + 1
  }px)`;
}

body.addEventListener("mousemove", (e) => {
  window.requestAnimationFrame(function () {
    setPosition(e.clientX, e.clientY);
  });
});

//加载完成后执行
window.addEventListener(
  "load",
  function () {
    // 背景图由 set.js 统一控制
    $("#bg").removeClass("error");
    //载入动画
    $("#loading-box").attr("class", "loaded");
    
    // 显示欢迎界面
    setTimeout(function() {
      $("#welcome-screen").addClass("show");
      // 设置欢迎界面背景图（使用与主页相同的背景）
      const bgSrc = $("#bg").attr("src") || "";
      $("#welcome-bg-img").removeClass("error");
      $("#welcome-bg-img").attr("src", bgSrc);
    }, 800);
    
    // 进入主页按钮点击事件
    $("#enter-site").on("click", function() {
      console.log("进入主页按钮被点击");
      // 隐藏欢迎界面
      $("#welcome-screen").addClass("hide");
      
      setTimeout(function() {
        $("#welcome-screen").css("display", "none");
        
        // 显示主页内容
        $("#bg").css(
          "cssText",
          "transform: scale(1);filter: blur(0px);transition: ease 1.5s;"
        );
        $(".cover").css("cssText", "opacity: 1;transition: ease 1.5s;");
        $("#section").css(
          "cssText",
          "transform: scale(1) !important;opacity: 1 !important;filter: blur(0px) !important"
        );

        //用户欢迎
        setTimeout(function () {
          // 获取问候语
          var hour = new Date().getHours();
          var greeting = "你好";
          if (hour >= 0 && hour < 6) greeting = "凌晨好";
          else if (hour >= 6 && hour < 9) greeting = "早上好";
          else if (hour >= 9 && hour < 12) greeting = "上午好";
          else if (hour >= 12 && hour < 14) greeting = "中午好";
          else if (hour >= 14 && hour < 18) greeting = "下午好";
          else if (hour >= 18 && hour < 19) greeting = "傍晚好";
          else if (hour >= 19 && hour < 24) greeting = "晚上好";
          
          iziToast.show({
            timeout: 2500,
            icon: false,
            title: greeting,
            message: "欢迎来到我的主页",
          });
        }, 500);

        //延迟加载音乐播放器
        let element = document.createElement("script");
        element.src = "./js/music.js";
        document.body.appendChild(element);
      }, 800);
    });

    //中文字体缓加载-此处写入字体源文件 （暂时弃用）
    //先行加载简体中文子集，后续补全字集
    //由于压缩过后的中文字体仍旧过大，可转移至对象存储或 CDN 加载
    // const font = new FontFace(
    //     "MiSans",
    //     "url(" + "./font/MiSans-Regular.woff2" + ")"
    // );
    // document.fonts.add(font);

    //移动端去除鼠标样式
    if (Boolean(window.navigator.userAgent.match(/AppWebKit.*Mobile.*/))) {
      $("#g-pointer-2").css("display", "none");
    }
  },
  false
);

setTimeout(function () {
  $("#loading-text").html("字体及文件加载可能需要一定时间");
}, 3000);

// 新春灯笼 （ 需要时可取消注释 ）
// new_element=document.createElement("link");
// new_element.setAttribute("rel","stylesheet");
// new_element.setAttribute("type","text/css");
// new_element.setAttribute("href","./css/lantern.css");
// document.body.appendChild(new_element);

// new_element=document.createElement("script");
// new_element.setAttribute("type","text/javascript");
// new_element.setAttribute("src","./js/lantern.js");
// document.body.appendChild(new_element);

//获取一言
fetch("https://v1.hitokoto.cn?max_length=24")
  .then((response) => response.json())
  .then((data) => {
    $("#hitokoto_text").html(data.hitokoto);
    $("#from_text").html(data.from);
  })
  .catch(console.error);

let times = 0;
$("#hitokoto").click(function () {
  if (times == 0) {
    times = 1;
    let index = setInterval(function () {
      times--;
      if (times == 0) {
        clearInterval(index);
      }
    }, 1000);
    fetch("https://v1.hitokoto.cn?max_length=24")
      .then((response) => response.json())
      .then((data) => {
        $("#hitokoto_text").html(data.hitokoto);
        $("#from_text").html(data.from);
      })
      .catch(console.error);
  } else {
    iziToast.show({
      timeout: 1000,
      icon: "fa-solid fa-circle-exclamation",
      message: "你点太快了吧",
    });
  }
});

const mainKey = "57eaea5833ff1616cfd1ff2c4cf9b58a"; // 高德开发者 Key

// 城市英文 -> 中文 显示映射
const cityNameMap = {
  "Zhengzhou": "郑州",
  "Beijing": "北京",
  "Shanghai": "上海",
  "Guangzhou": "广州",
  "Shenzhen": "深圳",
  // 可继续添加更多城市
};

// 获取天气信息
const getWeather = async (city = "郑州", displayCity = null) => {
  try {
    let response = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=%C+%t+%w`);
    let weatherData = await response.text();
    let [weather, temperature, wind] = weatherData.split(" ");

    $("#city_text").html(displayCity || city);
    $("#wea_text").html(weather);
    $("#tem_text").html(temperature);
    $("#win_text").html(wind);
    $("#win_speed").html("N/A"); // wttr.in 不提供风速级别

    iziToast.show({
      timeout: 2000,
      icon: "fa-solid fa-cloud-sun",
      message: "天气更新成功",
    });
  } catch (error) {
    console.error("天气信息获取失败：", error);
    iziToast.show({
      timeout: 2000,
      icon: "fa-solid fa-cloud-sun",
      message: "天气信息获取失败",
    });
  }
};

// 获取用户地理位置并请求天气
const getLocationAndWeather = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      try {
        let geoResponse = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        let geoData = await geoResponse.json();
        let city = geoData.address.city || geoData.address.town || geoData.address.village || "郑州";
        
        // 显示中文城市名
        let displayCity = cityNameMap[city] || city;

        getWeather(city, displayCity);
      } catch (error) {
        console.error("定位失败，使用默认城市：", error);
        getWeather("郑州", "郑州");
      }
    }, () => {
      console.error("无法获取定位，使用默认城市");
      getWeather("郑州", "郑州");
    });
  } else {
    console.error("浏览器不支持地理定位，使用默认城市");
    getWeather("郑州", "郑州");
  }
};

// 初次加载天气信息
getLocationAndWeather();

let wea = 0;
$("#upWeather").click(function () {
  if (wea === 0) {
    wea = 1;
    getLocationAndWeather();
    setTimeout(() => {
      wea = 0;
    }, 60000);
  } else {
    iziToast.show({
      timeout: 1000,
      icon: "fa-solid fa-circle-exclamation",
      message: "请稍后再更新哦",
    });
  }
});

//获取时间
let t = null;
t = setTimeout(time, 1000);

function time() {
  clearTimeout(t);
  dt = new Date();
  let y = dt.getYear() + 1900;
  let mm = dt.getMonth() + 1;
  let d = dt.getDate();
  let weekday = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  let day = dt.getDay();
  let h = dt.getHours();
  let m = dt.getMinutes();
  let s = dt.getSeconds();
  if (h < 10) {
    h = "0" + h;
  }
  if (m < 10) {
    m = "0" + m;
  }
  if (s < 10) {
    s = "0" + s;
  }
  $("#time").html(
    y +
      "&nbsp;年&nbsp;" +
      mm +
      "&nbsp;月&nbsp;" +
      d +
      "&nbsp;日&nbsp;" +
      "<span class='weekday'>" +
      weekday[day] +
      "</span><br>" +
      "<span class='time-text'>" +
      h +
      ":" +
      m +
      ":" +
      s +
      "</span>"
  );
  t = setTimeout(time, 1000);
}

//链接提示文字
$("#social")
  .mouseover(function () {
    $("#social").css({
      background: "rgb(0 0 0 / 25%)",
      "border-radius": "6px",
      "backdrop-filter": "blur(5px)",
    });
    $("#link-text").css({
      display: "block",
    });
  })
  .mouseout(function () {
    $("#social").css({
      background: "none",
      "border-radius": "6px",
      "backdrop-filter": "none",
    });
    $("#link-text").css({
      display: "none",
    });
  });

$("#github")
  .mouseover(function () {
    $("#link-text").html("去 Github 看看");
  })
  .mouseout(function () {
    $("#link-text").html("通过这里联系我");
  });
$("#qq")
  .mouseover(function () {
    $("#link-text").html("有什么事吗");
  })
  .mouseout(function () {
    $("#link-text").html("通过这里联系我");
  });
$("#email")
  .mouseover(function () {
    $("#link-text").html("来封 Email");
  })
  .mouseout(function () {
    $("#link-text").html("通过这里联系我");
  });
$("#bilibili")
  .mouseover(function () {
    $("#link-text").html("来 B 站看看 ~");
  })
  .mouseout(function () {
    $("#link-text").html("通过这里联系我");
  });
$("#telegram")
  .mouseover(function () {
    $("#link-text").html("你懂的 ~");
  })
  .mouseout(function () {
    $("#link-text").html("通过这里联系我");
  });

//自动变灰
let myDate = new Date();
let mon = myDate.getMonth() + 1;
let date = myDate.getDate();
let days = ["4.4", "5.12", "7.7", "9.9", "9.18", "12.13"];
for (let day of days) {
  let d = day.split(".");
  if (mon == d[0] && date == d[1]) {
    document.write(
      "<style>html{-webkit-filter:grayscale(100%);-moz-filter:grayscale(100%);-ms-filter:grayscale(100%);-o-filter:grayscale(100%);filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);_filter:none}</style>"
    );
    $("#change").html("Silence&nbsp;in&nbsp;silence");
    $("#change1").html("今天是中国国家纪念日，全站已切换为黑白模式");
    window.addEventListener(
      "load",
      function () {
        setTimeout(function () {
          iziToast.show({
            timeout: 14000,
            icon: "fa-solid fa-clock",
            message: "今天是中国国家纪念日",
          });
        }, 3800);
      },
      false
    );
  }
}

//更多页面切换
let shoemore = false;
$("#switchmore").on("click", function () {
  shoemore = !shoemore;
  if (shoemore && $(document).width() >= 990) {
    $("#container").attr("class", "container mores");
    $("#change").html("Oops&nbsp;!");
    $("#change1").html("哎呀，这都被你发现了（ 再点击一次可关闭 ）");
 } else {
    $("#container").attr("class", "container");
    $("#change").html("Hello&nbsp;World&nbsp;!");
    $("#change1").html(
      "<p>teamspeak地址：alecapu.top</p>" +
      "<p>邮箱：alecapu@alecapu.top</p>" 
    );
  }
});

//更多页面关闭按钮
$("#close").on("click", function () {
  $("#switchmore").click();
});

//移动端菜单栏切换
let switchmenu = false;
$("#switchmenu").on("click", function () {
  switchmenu = !switchmenu;
  if (switchmenu) {
    $("#row").attr("class", "row menus");
    $("#menu").html("<i class='fa-solid fa-xmark'></i>");
  } else {
    $("#row").attr("class", "row");
    $("#menu").html("<i class='fa-solid fa-bars'></i>");
  }
});

//更多弹窗页面
$("#openmore").on("click", function () {
  $("#box").css("display", "block");
  $("#row").css("display", "none");
  $("#more").css("cssText", "display:none !important");
});
$("#closemore").on("click", function () {
  $("#box").css("display", "none");
  $("#row").css("display", "flex");
  $("#more").css("display", "flex");
});

//监听网页宽度
window.addEventListener("load", function () {
  window.addEventListener("resize", function () {
    //关闭移动端样式
    if (window.innerWidth >= 600) {
      $("#row").attr("class", "row");
      $("#menu").html("<i class='fa-solid fa-bars'></i>");
      //移除移动端切换功能区
      $("#rightone").attr("class", "row rightone");
    }

    if (window.innerWidth <= 990) {
      //移动端隐藏更多页面
      $("#container").attr("class", "container");
      $("#change").html("Hello&nbsp;World&nbsp;!");
      $("#change1").html(
        "<p>teamspeak地址：alecapu.top</p>" +
        "<p>邮箱：alecapu@alecapu.top</p>" 
      );
    }
  });
});
//移动端切换功能区
let changemore = false;
$("#changemore").on("click", function () {
  changemore = !changemore;
  if (changemore) {
    $("#rightone").attr("class", "row menus mobile");
  } else {
    $("#rightone").attr("class", "row menus");
  }
});

//更多页面显示关闭按钮
$("#more").hover(
  function () {
    $("#close").css("display", "block");
  },
  function () {
    $("#close").css("display", "none");
  }
);

//屏蔽右键
// document.oncontextmenu = function () {
  // iziToast.show({
    // timeout: 2000,
    // icon: "fa-solid fa-circle-exclamation",
    // message: "为了浏览体验，本站禁用右键",
  // });
  // return false;
// };

//控制台输出
//console.clear();
let styleTitle1 = `
font-size: 20px;
font-weight: 600;
color: rgb(244,167,89);
`;
let styleTitle2 = `
font-size:12px;
color: rgb(244,167,89);
`;
let styleContent = `
color: rgb(30,152,255);
`;
let title1 = "Alec-Apu";
let title2 = `
⣿⣿⡿⣿⡿⣿⡿⣿⡿⣿⡿⣿⡿⣿⣿⢿⣿⢿⣿⡿⢟⠱⢨⣴⣿⣿⡿⣿⢨⢸⣿⣿⢿⣿⢿⣿⡿⣿⡿⣿⡿⣿⡿⣿⣿⢿⣿⢿⣿⠿⢛⠍⡆⢽⣿⡿⣿⡿⣿⡿⣿⣿
⣿⣯⣿⣟⣿⣟⣿⣟⣿⣟⣿⣟⣿⡿⣾⣿⢿⡿⡷⢣⢣⠵⠿⠿⡯⡷⠿⣿⡇⣣⡿⠻⢟⢛⢛⢳⠿⠿⣟⣿⣟⣿⣟⣿⣽⣿⣻⣿⠫⡨⡪⠸⢨⠢⡢⢢⠂⣿⣿⣻⣿⣽
⣿⣯⣷⣿⣿⣽⣿⣽⣯⣿⣯⣿⣯⣿⣟⣿⣟⢟⢡⠣⡢⡣⡣⡣⣓⢜⢜⢔⢬⠰⡸⡸⡸⡸⡸⡸⡸⡸⡰⡨⣙⠫⢿⣯⣿⣽⣿⡝⡸⡐⡅⢇⢕⠱⣘⢤⠞⣿⣯⣿⣽⣿
⣿⣿⣽⣷⡿⣷⡿⣷⡿⣷⡿⣷⡿⣷⢟⢩⢢⠣⡊⡎⡎⡊⡎⡎⡆⡇⡇⡇⡅⡇⡇⡇⡇⡇⡇⡇⡇⡇⡇⡇⡇⡏⡆⡝⡹⣿⣾⢐⠡⡪⡘⣔⢥⣳⢽⢽⡅⣿⣷⢿⣻⣾
⣿⣷⡿⣷⣿⢿⣻⣿⣻⣿⣻⡟⡫⡱⡸⡸⢨⢊⡢⡣⡣⡣⡣⡣⡣⡣⡣⡣⡣⡣⡣⡣⡣⡣⡣⡣⡣⡣⡣⡣⡣⡣⡣⡣⡣⡢⡫⡘⣞⡼⡽⡽⣝⢾⣝⣗⠇⣿⣻⣿⢿⣻
⣿⣷⣿⢿⣻⣿⣟⣿⣽⡿⡩⡪⡪⡪⡪⡒⡌⡆⡇⡇⡇⡇⡇⡇⡇⡇⡇⡇⡇⡇⡇⡇⣕⠈⡎⡎⡪⡪⡪⡪⡪⡪⡪⡪⡪⡪⡪⡪⣕⠫⡫⢫⢚⠳⡳⣽⢉⢿⣟⣿⢿⣿
⣿⣷⡿⣿⡿⣷⡿⣟⢧⢮⢧⣣⡣⡣⡣⡣⡣⡣⡣⡣⡣⡣⡣⡣⢃⢪⢪⠪⡪⡪⡪⡪⡢⡣⠈⢎⢎⢎⢎⢪⢪⠪⡪⣪⣪⡺⡪⡻⡸⡱⡜⡌⣪⢺⡺⡑⡕⡅⢻⣿⣟⣿
⣿⣷⣿⡿⣟⣿⡛⡕⡕⡕⡝⡜⡹⡹⢮⡳⡧⣳⢵⢼⣸⢨⡪⠂⡜⡜⡜⡜⡜⡜⡌⡎⣎⢎⠎⠈⡪⡚⡜⡳⡩⡍⡇⡇⡆⡇⡇⡇⡕⡕⡕⡕⡳⡫⣒⡀⠱⡩⡢⣿⣯⣿
⣿⣷⢿⡿⡿⡋⡆⡇⡇⡇⡇⡣⡣⡣⡣⡣⡣⡣⡫⡱⢡⢛⠂⡅⡏⡏⡞⡕⡏⡎⢪⢣⢪⢪⢢⠁⢘⢜⢜⢜⢜⢜⢜⢜⢜⢜⢜⢜⢜⢌⢪⢪⡪⢜⢔⢕⡀⠘⡜⡸⣿⣾
⣿⡟⢿⢱⢰⢱⢱⢱⢱⢱⢡⢣⠣⡣⡣⡣⡣⡣⠃⡁⡎⠎⣰⢇⢇⢇⢇⢇⢇⠇⢨⢪⢪⠄⢣⠐⠘⡜⡜⡜⡜⡜⡜⡔⡑⡕⡕⡕⡕⡕⡕⡕⡜⡕⡱⡑⣆⡁⠘⡄⢿⣿
⢕⢜⢜⢜⢜⢜⢜⢜⢜⢜⢜⢜⢜⢜⢜⢌⢎⠂⢤⢎⠎⢠⣟⢨⢪⢪⢪⢪⢪⢪⠈⡎⡎⡎⠄⢅⢸⡪⡪⡪⡪⡪⡪⡪⡢⠘⡌⡎⡎⡪⡪⡪⡪⡪⡪⡸⡰⣑⠄⢱⡘⣿
⣥⣥⢅⢣⢣⢣⢣⢣⢣⢣⢱⢱⢑⢕⢕⠕⢁⡰⣯⢢⠃⣼⢽⡜⡜⡌⢎⢎⢎⢎⠄⡇⡇⡇⠄⢂⢸⣳⡸⡸⡰⠘⡜⡜⡌⡇⢑⢕⢕⢕⢕⢕⢜⢔⢱⢑⠕⡜⡔⠄⢢⢿
⣿⡟⢌⢎⠎⡜⡜⡜⡌⡎⡎⢎⢎⢎⠎⠊⣰⢯⣻⢸⢠⣟⣽⡎⡎⣆⠱⡱⡱⡱⠄⢇⢇⢇⠈⠄⢸⣿⡵⣕⢕⢥⠸⡸⡸⡸⡀⢕⢕⢕⢕⢕⢕⢕⢅⢇⢇⢣⢣⠈⠐⣸
⡿⢨⢪⢪⠰⡱⡱⡱⡱⡱⡡⡱⡱⡱⠁⣜⣯⣿⢽⢸⢼⣺⣿⣷⢱⢱⢂⢣⢣⢣⢣⠘⡜⡜⠠⢁⢪⣙⣿⣤⢮⢪⠲⣌⢪⢪⢢⠈⡎⡎⡎⡎⡎⡎⡎⡆⡇⡇⡕⡄⠁⡈
⢇⢕⢕⠅⢸⢸⢸⢨⢪⢪⢪⠪⡪⡪⡰⢯⣛⣯⣭⢪⣯⣭⣽⣻⢎⢎⢎⠄⢇⢗⢕⠡⠱⡩⠨⠄⣾⣿⠿⢛⠋⠓⢑⠗⢧⡑⡕⠄⡇⡇⡇⡇⡇⡇⢱⠱⡘⡜⡌⡆⡐⠄
⡰⡱⢑⠅⢘⢌⢎⢎⢪⢢⠣⡪⢪⠂⣿⣻⣽⣿⣤⠼⡿⠿⣿⡿⣿⣜⢜⢕⢅⠣⡳⡡⠡⡃⢕⢈⣿⡫⠐⣠⠄⡁⠠⠅⡀⠈⠈⢂⠸⡸⡸⡸⡸⡸⠐⡍⡎⡪⡪⡸⡀⠄
⡪⡊⢔⠐⢨⠪⡊⡎⡪⡪⣺⣿⣑⢑⣻⣽⣷⣾⣿⣿⣿⣿⣷⡟⣿⣷⣏⣷⣧⢣⠱⡹⡨⡊⡢⣸⣿⡧⣞⢁⣄⠐⡀⠡⠈⠳⣌⢀⠑⡎⡎⢎⢆⢇⠁⡕⢕⢨⠢⡣⡂⠄
⡪⠂⢕⠈⡐⢕⢱⢑⠕⡌⣿⣏⣷⣼⣿⣿⣿⣯⣷⣿⣯⣿⡿⣿⢿⣿⢿⢿⣿⣷⣕⢹⢸⢨⢪⣿⣿⣯⣏⠛⠛⠓⢀⠂⡁⠄⠹⣵⡀⢣⠣⡣⠣⠅⡂⢕⠕⠅⡣⠅⠈⠄
⠌⢠⢃⠂⠄⡑⡅⡕⢅⠂⣯⣿⣿⢿⣟⣿⣾⣿⢿⣻⣿⣻⣿⣿⣸⣿⣿⢼⣿⣟⣿⣷⣷⣡⣿⣿⣟⣿⣿⡄⡣⣧⠄⢱⣲⢔⡐⢵⣟⠰⡱⡑⡍⡅⠄⡣⡑⠕⡌⡊⠠⠁
⠊⢠⠣⢈⢀⢂⠪⡘⡄⠅⣷⣣⣿⣿⣿⣿⣟⣿⣿⣿⣿⢿⣿⣝⣿⣟⣿⢹⣿⡿⣿⣻⣿⡿⣿⣻⣿⣯⣿⢿⣎⢯⢷⣳⢿⡽⣮⠄⣿⡪⡪⡸⡨⡠⢁⠪⡨⢊⠂⡂⠌⢐
⠈⢄⢕⢀⢂⠐⡈⡪⡘⡄⡷⡷⣝⢿⣽⣾⣿⣿⣯⣷⠿⣟⣯⣾⣿⡿⡯⣤⣼⣿⣿⣿⣯⣧⣤⣴⣿⣍⣨⣿⡯⢛⣟⠮⢽⢯⣻⢬⢇⢪⠢⣣⣾⡇⠄⡣⢊⢌⠪⡀⢂⠐
⠄⢕⠰⠄⡂⠌⠄⠌⡊⡆⡺⡽⡯⣷⣿⣿⣟⣗⣳⢮⣿⣻⣿⢿⢷⣫⣿⣿⢿⣻⣽⣾⣿⣿⣿⡿⣿⣻⣯⣷⣿⣻⣞⣶⣻⢯⠶⢻⣬⢾⣊⣹⣾⠃⡂⡊⡢⢂⠰⠐⢀⠈
⠈⠢⡑⡁⠄⠅⠅⢕⠈⡜⢔⠹⣽⡳⠽⠯⢿⡾⣿⣛⣿⣭⢷⣟⣿⣽⣿⣽⣟⣿⣿⢿⣻⣳⠿⣟⣿⡿⣯⣷⡿⣞⣷⣗⣯⢿⣽⣻⣞⣯⣿⣽⣾⠐⡠⡑⢌⠂⠨⠐⠄⠂
⢀⠨⢂⠂⠌⠌⠌⡂⢽⣿⣷⣧⣽⣟⣿⣻⣗⣿⢽⣳⣷⣻⣽⣯⣷⣿⣯⣿⡿⣿⣾⣿⣿⣿⣿⣿⢿⣿⢿⣻⣿⣻⡷⣟⣾⣟⣾⣳⣟⣾⢷⣿⢂⠊⠄⡪⢐⠁⡡⠁⠌⡀
⣿⡇⠅⠕⡈⠌⢌⢐⢉⢿⣽⣯⣷⣿⢷⡿⣞⣯⣿⣽⣾⣻⣾⢿⣾⣷⣿⢿⣿⢿⣻⣽⣿⣽⣿⣾⣿⣿⣿⣿⢿⣻⣿⡿⣯⣿⣽⣯⣿⡟⡋⠔⡠⠡⢁⠢⡁⠂⡂⠁⠠⠐
⣿⣷⢈⠪⠄⠅⡂⡂⠢⢈⢿⣿⣻⣽⣿⢿⣟⣯⣷⣿⣾⣿⣽⣿⣿⣾⣿⣿⣿⣿⣿⣿⡿⣟⣯⣿⣿⣽⣾⣿⣿⣿⡿⣿⣿⣟⣿⡽⢑⡄⠌⡂⡂⠅⢂⠅⡂⠡⢀⢱⠄⠌
⣿⡿⣆⠌⡂⠡⢐⠠⢑⠐⡠⠙⠿⣿⡿⣿⡿⣿⣻⣽⣾⣿⣽⣿⣾⣿⣷⣿⣷⣿⣯⣷⣿⣿⣿⣿⣟⣿⣿⣻⣽⣷⣿⠿⠯⠛⣅⣴⣿⣇⠌⡐⠄⡁⡂⠅⠄⠐⡀⣾⠄⣰
⣿⡿⣿⠐⡨⠐⡀⢂⠂⡂⢷⡌⠐⡈⡛⠿⣿⣿⣿⣿⡿⣟⣿⣯⣿⣾⣿⣾⣿⣯⣿⣿⢿⣿⣻⣽⣿⣿⡻⠿⢛⠋⡑⢌⣴⣿⣿⣟⣯⣿⠄⠄⠡⠐⡠⠁⠂⠁⣰⡏⣰⣿
⣿⡿⣿⣧⠐⡁⡐⢀⠂⡐⢸⣿⣾⣶⣄⡂⠐⡈⡉⢚⠛⠻⠿⠿⠟⠿⣽⡿⣾⢿⣯⡿⣿⣻⣟⣿⣽⡎⡐⢁⣴⡇⢰⣿⣿⣯⣷⣿⣟⣿⠄⠡⠁⡂⠂⡈⢀⣼⣿⢿⣻⣿
⣿⡿⣿⣽⣷⣔⠄⢂⠐⢀⠂⢿⡿⣾⡿⣿⣿⣶⣦⡄⢢⣥⣴⣤⣌⣐⡘⣟⣯⣿⣳⣟⣯⡷⣟⣷⢯⡧⣴⡻⣿⣷⡿⣿⢷⣿⣽⣾⣿⡛⠄⠅⠂⢤⡆⢠⣿⣿⣻⡿⣟⣿
⣿⡿⣿⣽⣾⡿⣧⣄⢣⡀⠂⠸⣿⣟⣿⡿⣾⣯⣿⣻⡿⣟⣿⣯⢟⣜⣷⢿⣽⢾⣽⢾⡯⣟⣯⡿⣽⡻⣻⣿⣮⡳⣿⣿⢿⣯⣿⢷⣿⠁⠈⣠⣶⣿⠁⣾⣿⣯⣿⢿⣿⣻
                                     
`;
let content = `
版 本 号：1145.15
更新日期：2025-11-27
作者昵称：Alec-Apu

主页:  https://apupu.top
Github:  https://github.com/Alec-Apu
`;
console.log(
  `%c${title1} %c${title2}
%c${content}`,
  styleTitle1,
  styleTitle2,
  styleContent
);
