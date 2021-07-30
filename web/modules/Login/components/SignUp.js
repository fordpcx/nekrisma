import React, { useRef, useState } from "react";
import {
	useDisclosure,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	DrawerHeader,
	DrawerBody,
	DrawerFooter,
	Stack,
	Box,
	FormLabel,
	Input,
	Button,
	Divider,
	FormControl,
	useToast,
	CircularProgress,
} from "@chakra-ui/react";

import API from "@lib/Api";
import Container from "@components/Container";

const SignUp = (props) => {
	const [user, setUser] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();
	const firstField = useRef();

	const handleSubmit = async (event) => {
		event.preventDefault();

		setIsLoading(true);

		try {
			await API.createUser(user);

			setIsLoading(false);

			toast({
				title: "Account created.",
				description: "We've created your account for you.",
				status: "success",
				isClosable: true,
			});
		} catch (error) {
			setIsLoading(false);

			toast({
				title: "Account Network Error.",
				description: "Sorry!, please try creating your account again.",
				status: "error",
				isClosable: true,
			});
		}

		setUser({});
		onClose();
	};

	const InputFormat = (name, id, ref) => (
		<Box>
			<FormControl id={id} isRequired={id === "username" || id === "password"}>
				<FormLabel htmlFor={id}>{name}</FormLabel>
				<Input
					ref={ref ? ref : null}
					id={id}
					type={id === "password" ? "password" : "text"}
					placeholder={`Please enter ${name}`}
					onChange={(e) => setUser({...user, [id]: e.target.value})}
				/>
			</FormControl>
		</Box>
	);

	return (
		<Container
			{...props}
		>
			<Button
				variantcolor="teal"
				variant="outline"
				width="full"
				mt={4}
				onClick={onOpen}
			>
				Create Account
			</Button>
			<Drawer
				isOpen={isOpen}
				placement="right"
				initialFocusRef={firstField}
				onClose={onClose}
				size="md"
			>
				<DrawerOverlay>
					<Container
						{...props}
					>
						<form onSubmit={handleSubmit}>
							<DrawerContent>
								<DrawerCloseButton />
								<DrawerHeader borderBottomWidth="1px">
							Create a new account
								</DrawerHeader>
								<DrawerBody>
									<Stack spacing="24px" margin="25">
										{InputFormat("Username", "username", firstField)}
										{InputFormat("Email Address", "email")}
										{InputFormat("Password", "password")}
										<Divider/>
										{InputFormat("First Name", "firstName")}
										{InputFormat("Middle Name", "middleName")}
										{InputFormat("LastName", "lastName")}
										{InputFormat("Contact Number", "contactNumber")}
									</Stack>
								</DrawerBody>
								<DrawerFooter borderTopWidth="1px">
									<Button variant="outline" mr={3} onClick={onClose}>
									Cancel
									</Button>
									<Button
										colorScheme="blue"
										type="submit"
									>
										{isLoading ? (
											<CircularProgress
												isIndeterminate
												size="24px"
												color="teal"
											/>
										) : (
											"Create"
										)}
									</Button>
								</DrawerFooter>
							</DrawerContent>
						</form>
					</Container>
				</DrawerOverlay>
			</Drawer>
		</Container>
	);
};

export default SignUp;