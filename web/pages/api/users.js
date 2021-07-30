import { PrismaClient } from "@prisma/client";
import Crypto from "@lib/Crypto";
import _ from "lodash";

const prisma = new PrismaClient();

/* eslint-disable */
export default async (req, res) => {
	try {
		const { action } = req.query;

		if ((req.method !== "GET" && (action === "READ")) ||
			(req.method !== "POST" && action !== "READ" && action !== "LOGIN")) {
			return res.status(405).json({ message: "Method not allowed" });
		}

		let { where = "{}", sort = "[]" } = req.query,
			{ skip = 0, limit = 30 } = req.query,
			user = req.body;

		try {
			user = JSON.parse(user);
		} catch (e) {
			// tbd
		}

		where = JSON.parse(where);
		sort = JSON.parse(sort);
		skip = parseInt(skip);
		limit = parseInt(limit);

		switch (action) {
		case "LOGIN":
		case "READ": {
			const {password} = where;

			delete where.password;

			user = await prisma.user.findUnique({ where });

			if (!_.isEmpty(password)) {
				const encryptPassword = await Crypto.encryptPassword(password);
				const isMatched = await Crypto.compare(encryptPassword, user.password);

				user.passwordMatched = isMatched;
			}

			delete user.password;

			if (!user) {
				throw new Error("No results found!");
			}
		}

			break;
		case "CREATE": {
			const { password, firstName = "", middleName = "", lastName = "" } = user;

			if (!password) {
				throw new Error("Password is required!");
			}

			user.fullName = (`${firstName} ${middleName} ${lastName}`).replace(/\s+/g, " ");
			user.password = await Crypto.hash(password);
			user = await prisma.user.create({ data: user });
		}

			break;
		case "UPDATE": {
			user = await prisma.user.update({
				where,
				data: user,
			});
		}

			break;
		case "DELETE": {
			user = await prisma.user.delete({ where });
		}

			break;
		default:
			user = await prisma.user.findMany({ take: limit });
		}

		return res.status(200).json(user);
	} catch (err) {
		console.log("error:", err);

		return res.status(400).json({ message: "Something went wrong" });
	}
};