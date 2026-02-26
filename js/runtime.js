function runtime() {
    var start = new Date("05/20/2023 00:00:00");
    var now = new Date();
    var diff = now.getTime() - start.getTime();

    var days = Math.floor(diff / (24 * 60 * 60 * 1000));
    var hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    var minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
    var seconds = Math.floor((diff % (60 * 1000)) / 1000);

    document.getElementById("runtime").innerHTML =
        days + "天 " + hours + "小时 " + minutes + "分 " + seconds + "秒";
}

setInterval(runtime, 1000);
runtime();
