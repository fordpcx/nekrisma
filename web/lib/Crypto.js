import moment from "moment";
import crypto from "crypto-js";
import bcrypt from "bcryptjs";
import { isBase64 } from "validator";
import { Base64 } from "js-base64";
import _ from "lodash";

class Crypto {
	generateCode = () => +(Math.floor(1000 + (Math.random() * 9000)))

	generateToken = () => `${crypto.SHA256(`${Math.floor(Math.random() * 1000)}${+moment()}`)}`

	parseBase64 = (context) => {
		if (isBase64(context)) {
			context = Base64.decode(context);
		}

		return context;
	}

	toBase64 = (context) => {
		if (!_.isString(context)) {
			context = `${context}`;
		}

		return Base64.encode(context);
	}

	hash = async (str) => {
		const saltRounds = 10;
		const salt = await bcrypt.genSalt(saltRounds);

		str = this.encryptPassword(str);
		str = this.parseBase64(str);

		if (str.length < 8) {
			throw new Error("Password length must be >= 8");
		}

		str = await bcrypt.hash(`${str}`, salt);

		return str;
	}

	compare = async (str, hash) => await bcrypt.compare(this.parseBase64(str), hash)

	encryptPassword = (password) => {
		const utf8newPass = crypto.enc.Utf8.parse(password);
		const encryptednewPass = crypto.enc.Base64.stringify(utf8newPass);

		return encryptednewPass;
	};
}

export default new Crypto();
