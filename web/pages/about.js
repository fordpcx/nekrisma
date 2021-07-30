import { useEffect } from "react";
import { useRouter } from "next/router";
import Meta from "@components/Meta";

const about = (props) => {
	const router = useRouter();
	const { login } = props;

	useEffect(() => {
		if (!login.isLoggedIn) {
			return router.push("/login");
		}

		return;
	}, [login]);

	return (
		<div>
			<Meta title='About' />
			<h1>About</h1>
		</div>
	);
};

export default about;
