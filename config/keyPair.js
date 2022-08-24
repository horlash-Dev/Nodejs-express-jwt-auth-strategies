const crypto = require('crypto');
const fs = require('fs');

const generateKeyPairs = () => {

    const pair = crypto.generateKeyPair('rsa',{
        modulusLength: 4096,
        publicKeyEncoding:{
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding:{
            type: 'pkcs8',
            format: 'pem',
            cipher: 'aes-256-cbc',
            passphrase: "app.key"
        }
    }, (err, publicKey, privateKey) => {
        if(err) return err.message
        fs.writeFileSync(__dirname + "/pub_key.rem", publicKey)
        fs.writeFileSync(__dirname + "/priv_key.rem", privateKey)
    })
}

generateKeyPairs()