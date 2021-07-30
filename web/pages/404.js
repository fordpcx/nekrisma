import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
	Text,
} from "@chakra-ui/react";
import Container from "@components/Container";

const ErrorPage = () => {
	const router = useRouter();
	const [count, setCount] = useState(3);

	useEffect(() => {
		if (!count) {
			return router.push("/");
		}

		const intervalId = setInterval(() => {
			setCount(count - 1);

		}, 1000);

		return () => clearInterval(intervalId);
	}, [count]);

	return (
		<Container
			height="70vh"
			placeContent="center"
		>
			<Text fontSize="4xl">404 | This page could not be found.</Text>
			<Text>Redirecting in {count} seconds...</Text>
		</Container>
	);
};

export default ErrorPage;