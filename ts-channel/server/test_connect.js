const { TeamSpeak } = require('ts3-nodejs-library');
console.log('TeamSpeak.connect is', TeamSpeak.connect ? 'available' : 'missing');
(async () => {
    try {
        const ts = await TeamSpeak.connect({
            host: process.env.TS_HOST || 'alecapu.top',
            queryport: parseInt(process.env.TS_QUERY_PORT || '10011'),
            serverport: parseInt(process.env.TS_SERVER_PORT || '9987'),
            username: process.env.TS_USERNAME || '',
            password: process.env.TS_PASSWORD || '',
            nickname: process.env.TS_NICKNAME || 'ChannelBot',
        });
        console.log('connected', ts);
    } catch (e) {
        console.error('connect error', e, e.stack);
    }
})();