



/////


// Load the SDK
const AWS = require('aws-sdk')
const Fs = require('fs')
const translate = require('google-translate-api')

// Create an Polly client
const Polly = new AWS.Polly({
    signatureVersion: 'v4',
    region: 'us-east-1'
})

let translateText = "I want to be a millionaire because I think that is the solution to all my problems but what I don't realize is that more money more problems"

translate(translateText, {to: 'es'}).then(res => {

    let params = {
        'Text': res.text,
        'OutputFormat': 'mp3',
        'VoiceId': 'Joey'
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




