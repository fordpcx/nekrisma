import axios from "axios";

const URL = "api/users";

const findUser = async(user) => {
	try {
		const result = await axios.get(URL, {
			params: {
				action: "LOGIN",
				where: {
					username: user.username,
					password: user.password,
				},
			},
		});

		return result.data;
	} catch (err) {
		throw new Error(err);
	}
};

const createUser = async(user) => {
	try {
		const result = await axios({
			method: "POST",
			url: URL,
			headers: { "content-type": "application/json" },
			params: {
				action: "CREATE",
			},
			data: JSON.stringify(user),
		});

		return result.data;
	} catch (err) {
		throw new Error(err);
	}
};

export default {
	findUser,
	createUser,
};