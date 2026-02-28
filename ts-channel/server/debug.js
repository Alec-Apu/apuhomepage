const server = require('./ts-server.js');
// ts-server.js defines initTeamSpeak, getTeamSpeakClient etc
(async () => {
    try {
        console.log('calling initTeamSpeak');
        const ok = await server.initTeamSpeak();
        console.log('init returned', ok);
    } catch(e){
        console.error('init error:', e, e.stack);
    }
})();