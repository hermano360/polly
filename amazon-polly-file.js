

// Load the SDK
const AWS = require('aws-sdk')
const Fs = require('fs')
const translate = require('google-translate-api')

// Create an Polly client
const Polly = new AWS.Polly({
    signatureVersion: 'v4',
    region: 'us-east-1'
})

let translateText = `Hello Pierre, I hope everything has been going well. The api returns a mp3 
                        file that would just need to get linked to the alexa audio. For some reason it wasn't
                        working. Hopefully you hear back from Jaguar soon.`

translate(translateText, {to: 'fr'}).then(res => {

    let params = {
        'Text': res.text,
        'OutputFormat': 'mp3',
        'VoiceId': 'Mathieu'
    }

    Polly.synthesizeSpeech(params, (err, data) => {
        if (err) {
            console.log(err.code)
        } else if (data) {
            if (data.AudioStream instanceof Buffer) {
                Fs.writeFile("./speech.mp3", data.AudioStream, function(err) {
                    if (err) {
                        return console.log(err)
                    }
                    console.log("The file was saved!")
                })
            }
        }
    })
    //=> false 
}).catch(err => {
    console.error('there is an error',err);
});




