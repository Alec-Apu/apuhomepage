try {
  const ts3 = require('ts3-nodejs-library');
  console.log('module', ts3);
  console.log('keys', Object.keys(ts3));
  if (ts3.TeamSpeakClient) {
    console.log('proto', Object.getOwnPropertyNames(ts3.TeamSpeakClient.prototype));
  }
} catch (e) {
  console.error('error loading library', e);
}
