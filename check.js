const axios = require('axios');
const fs = require('fs');

const subscriptionKey = 'decd314e6224476d88d8c005855115ff';
const endpoint = 'https://eastus.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US';

const audioFile = '/Users/jithendran/Downloads/OSR_us_000_0010_8k.wav';

const audio = fs.readFileSync(audioFile);

axios.post(endpoint, audio, {
    headers: {
        'Content-Type': 'audio/wav',
        'Ocp-Apim-Subscription-Key': subscriptionKey
    }
}).then(response => {
    console.log(response.data);
    let res = response.data;
}).catch(error => {
    console.log(error);
});