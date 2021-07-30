import React, { useState, useEffect } from "react";
import {
	Flex,
	Box,
	Heading,
	FormControl,
	FormLabel,
	Input,
	Button,
	CircularProgress,
	InputGroup,
	InputRightElement,
	Icon,
} from "@chakra-ui/react";
import _ from "lodash";

import Container from "@components/Container";
import ErrorMessage from "./components/ErrorMessage";
import SignUp from "./components/SignUp";

const Login = ({login, actions}) => {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const { isLoginLoading, user} = login;

	const handlePasswordVisibility = () => setShowPassword(!showPassword);

	useEffect(() => {
		if (!_.isEmpty(user) && !user.passwordMatched) {
			setError("Invalid username or password");
			setEmail("");
			setPassword("");
			setShowPassword(false);
			actions.ResetUser();
		}

		return;
	}, [login]);

	return (
		<Container
			margin="2rem"
		>
			<Flex width="full" align="center" justifyContent="center">
				<Box
					p={8}
					maxWidth="500px"
					borderWidth={1}
					borderRadius={8}
					boxShadow="lg"
				>
					<Box textAlign="center">
						<Heading>Login</Heading>
					</Box>
					<Box my={4} textAlign="left">
						<form>
							{error && <ErrorMessage message={error} />}
							<FormControl isRequired>
								<FormLabel>Username</FormLabel>
								<Input
									id="username"
									type="username"
									placeholder="username"
									size="lg"
									value={username}
									onChange={(event) => setUsername(event.currentTarget.value)}
								/>
							</FormControl>
							<FormControl isRequired mt={6}>
								<FormLabel>Password</FormLabel>
								<InputGroup>
									<Input
										id="password"
										type={showPassword ? "text" : "password"}
										placeholder="*******"
										size="lg"
										value={password}
										onChange={(event) => setPassword(event.currentTarget.value)}
									/>
									<InputRightElement width="3rem">
										<Button
											h="1.5rem"
											size="sm"
											onClick={handlePasswordVisibility}
										>
											{showPassword ? (
												<Icon name="view-off" />
											) : (
												<Icon name="view" />
											)}
										</Button>
									</InputRightElement>
								</InputGroup>
							</FormControl>
							<Button
								variantcolor="teal"
								variant="outline"
								width="full"
								mt={4}
								onClick={() => {
									actions.LoginUser({ email, password, username });
									setShowPassword(false);
								}}
							>
								{isLoginLoading ? (
									<CircularProgress
										isIndeterminate
										size="24px"
										color="teal"
									/>
								) : (
									"Sign In"
								)}
							</Button>
						</form>
						<SignUp />
					</Box>
				</Box>
			</Flex>
		</Container>
	);
};

export default Login;