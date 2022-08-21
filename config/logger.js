const fs = require("fs")
const fsP = require("fs").promises
const path = require("path")
const crypto = require("crypto")

const Logger = async (message,filename) => {

	const Date_time = await new Date().toUTCString();
	const uid = crypto.randomBytes(3).toString('hex');
	const writeData = `__timeStamp ${Date_time}\t${uid} \t ${message} \n`

	try {
		if (!fs.existsSync(path.join(__dirname, "..", "./logs"))) {

		await fsP.mkdir(path.join(__dirname, "..", "logs"));
	}
	write = await fsP.appendFile(path.join(__dirname, "..", "./logs", filename), writeData, "utf8");
	} catch(error) {
		console.error(error.message);
	}
}
const logEvent =  (req,res,next) => {
	Logger(`${req.headers.origin}\t${req.method} \t ${req.path} \n`, "logReq.txt");
	next()
}

module.exports = { logEvent }