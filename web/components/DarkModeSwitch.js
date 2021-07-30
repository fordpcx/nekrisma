import { useColorMode, IconButton } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const DarkModeSwitch = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const iconColor = {
		light: "black",
		dark: "white",
	};


	return (
		<IconButton
			aria-label="Toggle dark mode"
			position="fixed"
			bottom="1rem"
			left="1rem"
			icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
			onClick={toggleColorMode}
			color={iconColor[colorMode]}
		/>
	);
};

export default DarkModeSwitch;