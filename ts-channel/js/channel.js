// TeamSpeak 频道管理 - 前端 JavaScript

const API_BASE = '/api'; // 后端 API 地址，需要配置

// ============ 标签页切换 ============
function initTabSwitch() {
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    
    sidebarItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 移除所有 active 状态
            sidebarItems.forEach(i => i.classList.remove('active'));
            
            // 添加当前 active 状态
            item.classList.add('active');
            
            // 获取对应的标签页
            const tabName = item.getAttribute('data-tab');
            const targetSection = document.getElementById(`${tabName}-section`);
            
            // 隐藏所有标签页
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // 显示目标标签页
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
}

// ============ 显示消息 ============
function showMessage(message, type = 'success') {
    iziToast[type]({
        title: type === 'success' ? '✓ 成功' : '✗ 错误',
        message: message,
        position: 'topRight',
        timeout: 3000,
        transitionIn: 'fadeIn',
        transitionOut: 'fadeOut',
    });
}

// ============ 创建频道表单 ============
function initChannelForm() {
    $('#createChannelForm').on('submit', async function(e) {
        e.preventDefault();

        const channelName = $('#channelName').val().trim();
        const password = $('#password').val().trim();
        const maxUsers = parseInt($('#maxUsers').val());
        const description = $('#description').val().trim();

        // 验证
        if (!channelName) {
            showMessage('请输入频道名称', 'error');
            return;
        }

        if (channelName.length > 40) {
            showMessage('频道名称不能超过 40 个字符', 'error');
            return;
        }

        if (maxUsers < 1 || maxUsers > 100) {
            showMessage('最大用户数必须在 1 到 100 之间', 'error');
            return;
        }

        // 显示加载状态
        $('#loadingSpinner').show();
        $('#submitBtn').prop('disabled', true);

        try {
            const response = await fetch(`${API_BASE}/channels/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: channelName,
                    password: password || null,
                    maxUsers: maxUsers,
                    description: description || null,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                showMessage('频道创建成功！', 'success');
                $('#createChannelForm')[0].reset();
                loadMyChannels();
                
                // 自动切换到"我的频道"标签页
                setTimeout(() => {
                    document.querySelector('[data-tab="channels"]').click();
                }, 500);
            } else {
                showMessage(data.message || '创建失败', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('请求失败，请检查后端服务是否运行', 'error');
        } finally {
            $('#loadingSpinner').hide();
            $('#submitBtn').prop('disabled', false);
        }
    });
}

// ============ 加载频道列表 ============
async function loadMyChannels() {
    try {
        const response = await fetch(`${API_BASE}/channels/list`);
        const data = await response.json();

        const container = $('#myChannelsContainer');

        if (response.ok && data.channels && data.channels.length > 0) {
            let html = '';
            data.channels.forEach(channel => {
                const passwordBadge = channel.password 
                    ? `<span class="badge-password"><i class="fa-solid fa-lock"></i> 有密码</span>` 
                    : '';
                
                html += `
                    <div class="channel-card">
                        <div class="channel-info">
                            <div class="channel-name">
                                <i class="fa-solid fa-microphone" style="margin-right: 0.5rem;"></i>
                                ${escapeHtml(channel.name)}
                            </div>
                            <div class="channel-detail">
                                <i class="fa-solid fa-users" style="margin-right: 0.3rem;"></i>
                                最大用户: ${channel.maxClients}
                                ${channel.description ? ' | ' + escapeHtml(channel.description) : ''}
                            </div>
                        </div>
                        <div class="channel-actions">
                            ${passwordBadge}
                            <button class="btn-delete" onclick="deleteChannel(${channel.cid})">
                                <i class="fa-solid fa-trash"></i> 删除
                            </button>
                        </div>
                    </div>
                `;
            });
            container.html(html);
        } else {
            container.html(`
                <div class="empty-state">
                    <i class="fa-solid fa-inbox"></i>
                    <p>暂无频道</p>
                    <small>点击左侧"创建频道"创建你的第一个频道</small>
                </div>
            `);
        }
    } catch (error) {
        console.error('Error:', error);
        $('#myChannelsContainer').html(`
            <div class="empty-state">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <p>后端服务未连接</p>
                <small>请启动服务器后重新尝试</small>
            </div>
        `);
    }
}

// ============ 删除频道 ============
async function deleteChannel(cid) {
    if (!confirm('确认删除此频道吗？此操作无法撤销。')) return;

    try {
        const response = await fetch(`${API_BASE}/channels/${cid}`, {
            method: 'DELETE',
        });

        const data = await response.json();

        if (response.ok) {
            showMessage('频道已删除', 'success');
            loadMyChannels();
        } else {
            showMessage(data.message || '删除失败', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('请求失败', 'error');
    }
}

// ============ HTML 转义 ============
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// ============ 页面初始化 ============
$(document).ready(function() {
    // 初始化标签页切换
    initTabSwitch();
    
    // 初始化表单
    initChannelForm();
    
    // 加载频道列表
    loadMyChannels();
    
    // 每 30 秒自动刷新频道列表
    setInterval(loadMyChannels, 30000);
});
