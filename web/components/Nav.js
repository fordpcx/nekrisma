import React from "react";
import {
	Text,
	Box,
	Stack,
	Flex,
} from "@chakra-ui/react";
import {
	CloseIcon,
	HamburgerIcon as MenuIcon,
} from "@chakra-ui/icons";
import Link from "next/link";
// import Container from './Container'
// import navStyles from '../styles/Nav.module.css'

const Logo = () => {
	return (
		<Box
			w="100px"
			// color={["white", "white", "primary.500", "primary.500"]}
		>
			<Text fontSize="lg" fontWeight="bold">
				Logo
			</Text>
		</Box>
	);
};

// eslint-disable-next-line no-unused-vars
const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
	return (
		<Link href={to}>
			<a>
				<Text
					display="block"
					cursor="pointer"
					{...rest}
				>
					{children}
				</Text>
			</a>
		</Link>
	);
};

const Nav = (props) => {
	const [isOpen, setIsOpen] = React.useState(false);
	const toggle = () => setIsOpen(!isOpen);

	return (
		<Flex
			as="nav"
			align="center"
			position="fixed"
			justify="space-between"
			wrap="wrap"
			w="100%"
			p={8}
			bg="black"
			// bg={["primary.500", "primary.500", "transparent", "transparent"]}
			color={["white", "white", "primary.700", "primary.700"]}
			{...props.styles}
		>
			<Logo />
			<Box display={{ base: "block", md: "none" }} onClick={toggle}>
				{isOpen ? <CloseIcon /> : <MenuIcon />}
			</Box>
			<Box
				display={{ base: isOpen ? "block" : "none", md: "block" }}
				flexBasis={{ base: "100%", md: "auto" }}
			>
				<Stack
					spacing={8}
					align="center"
					justify={["center", "space-between", "flex-end", "flex-end"]}
					direction={["column", "row", "row", "row"]}
					pt={[4, 4, 0, 0]}
				>
					{/* add menu here */}
					{	props.isLoggedIn ?
						<>
							<MenuItem to="/">Home</MenuItem>
							<MenuItem to="/about">About</MenuItem>
							<MenuItem to="/login"
								onClick={() => props.actions.LogoutUser()}
							>
								Logout
							</MenuItem>
						</> :
						<MenuItem to="/login">Login</MenuItem>
					}
				</Stack>
			</Box>
		</Flex>
	);
};

export default Nav;
