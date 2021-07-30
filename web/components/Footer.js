import moment from "moment";
import {
	Text,
	Flex,
} from "@chakra-ui/react";

const Footer = (props) => (
	<Flex as="footer" py="2rem" {...props}>
		<Text>{process.env.appName} | © {+moment().format("YYYY")}</Text>
	</Flex>
);

export default Footer;
