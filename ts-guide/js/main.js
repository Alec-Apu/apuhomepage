/**
 * TeamSpeak 使用教程 - 页面交互脚本
 * /ts-guide/js/main.js
 */

$(function () {

    /* ------------------------------------------------
       FAQ 手风琴展开 / 收起
    ------------------------------------------------ */
    window.toggleFaq = function (btn) {
        const item = btn.closest('.faq-item');
        const isOpen = item.classList.contains('open');
        // 关闭所有已展开项
        document.querySelectorAll('.faq-item.open').forEach(function (el) {
            el.classList.remove('open');
        });
        // 若当前项本来是关闭的则打开
        if (!isOpen) {
            item.classList.add('open');
        }
    };

    /* ------------------------------------------------
       复制服务器地址
    ------------------------------------------------ */
    window.copyAddr = function () {
        const addr = document.getElementById('server-addr').innerText.trim();
        const icon = document.getElementById('copy-icon');

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(addr).then(showCopied);
        } else {
            // 兼容旧浏览器
            const ta = document.createElement('textarea');
            ta.value = addr;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            showCopied();
        }

        function showCopied() {
            icon.className = 'fa-solid fa-check';
            icon.style.color = '#7be8a0';
            setTimeout(function () {
                icon.className = 'fa-regular fa-copy';
                icon.style.color = '';
            }, 2000);
        }
    };

});
