// TeamSpeak 频道管理 - 前端脚本

const API_BASE = '/api'; // 后端 API 地址，需要配置

// 显示消息
function showMessage(message, type = 'success') {
    iziToast[type]({
        title: type === 'success' ? '成功' : '错误',
        message: message,
        position: 'topRight',
        timeout: 3000,
    });
}

// 创建频道表单提交
$('#createChannelForm').on('submit', async function(e) {
    e.preventDefault();

    const channelName = $('#channelName').val().trim();
    const password = $('#password').val().trim();
    const maxUsers = parseInt($('#maxUsers').val());
    const description = $('#description').val().trim();

    if (!channelName) {
        showMessage('请输入频道名称', 'error');
        return;
    }

    if (channelName.length > 40) {
        showMessage('频道名称不能超过 40 个字符', 'error');
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
            loadMyChannels(); // 刷新频道列表
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

// 加载我的频道
async function loadMyChannels() {
    try {
        const response = await fetch(`${API_BASE}/channels/list`);
        const data = await response.json();

        if (response.ok && data.channels.length > 0) {
            let html = '';
            data.channels.forEach(channel => {
                html += `
                    <div class="channel-item">
                        <div class="channel-info">
                            <div class="channel-name"><i class="fa-solid fa-microphone"></i> ${escapeHtml(channel.name)}</div>
                            <div class="channel-detail">
                                最大用户: ${channel.maxClients} 
                                ${channel.description ? ' | ' + escapeHtml(channel.description) : ''}
                            </div>
                        </div>
                        <div>
                            ${channel.password ? '<span class="badge-custom"><i class="fa-solid fa-lock"></i> 有密码</span>' : ''}
                            <button class="btn btn-sm btn-danger" onclick="deleteChannel(${channel.cid})" style="margin-left: 0.5rem;">删除</button>
                        </div>
                    </div>
                `;
            });
            $('#myChannelsContainer').html(html);
        } else {
            $('#myChannelsContainer').html(`
                <div class="text-center text-muted py-5">
                    <i class="fa-solid fa-inbox" style="font-size: 2rem; margin-bottom: 1rem; display: block;"></i>
                    <p>暂无频道，<a href="#" onclick="document.getElementById('createChannelForm').scrollIntoView(true);">立即创建一个</a></p>
                </div>
            `);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// 删除频道
async function deleteChannel(cid) {
    if (!confirm('确认删除此频道吗？')) return;

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

// HTML 转义
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

// 页面加载时获取频道列表
$(document).ready(function() {
    loadMyChannels();
});
