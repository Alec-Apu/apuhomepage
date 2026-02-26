// 欢迎界面时间问候
function getTimeGreeting() {
    const hour = new Date().getHours();
    let greeting = "你好~";
    
    if (hour >= 0 && hour < 6) {
        greeting = "深夜好~";
    } else if (hour >= 6 && hour < 9) {
        greeting = "早上好~";
    } else if (hour >= 9 && hour < 12) {
        greeting = "上午好~";
    } else if (hour >= 12 && hour < 14) {
        greeting = "中午好~";
    } else if (hour >= 14 && hour < 18) {
        greeting = "下午好~";
    } else if (hour >= 18 && hour < 24) {
        greeting = "晚上好~";
    }
    
    return greeting;
}

// 更新问候语
document.addEventListener("DOMContentLoaded", function() {
    const dateEl = document.getElementById("welcome-date");
    const timeEl = document.getElementById("welcome-time");

    function updateTime() {
        const now = new Date();
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, "0");
        const dd = String(now.getDate()).padStart(2, "0");
        const hh = String(now.getHours()).padStart(2, "0");
        const min = String(now.getMinutes()).padStart(2, "0");
        const ss = String(now.getSeconds()).padStart(2, "0");

        if (dateEl) {
            dateEl.textContent = `${yyyy}-${mm}-${dd}`;
        }
        if (timeEl) {
            timeEl.textContent = `${hh}:${min}:${ss}`;
        }
    }

    updateTime();
    setInterval(updateTime, 1000);
});
