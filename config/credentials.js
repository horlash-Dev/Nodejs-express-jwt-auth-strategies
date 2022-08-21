const whiteList = require("./whitelist").whiteList

exports.corsOptions = {
	origin: (origin,callback) => {
		if (whiteList.indexOf(origin) !== -1 || !origin) {
			callback(null,true)
		}else {
			callback(new Error("CORS BLOCKED THIS REQUEST!!"));
		}
	},
	OptionsSucessStatus: 200
}
exports.credentials = (req, res, next) => {
	if (whiteList.includes(req.headers.origin)) {
		res.header("Access-Control-Allow-Credentials", true)
	}
	next()
}
