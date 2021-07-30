import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints, mode } from "@chakra-ui/theme-tools";

const fonts = {
	mono: "'Menlo', monospace",
};

const colors = {
	black: "#16161D",
};

const breakpoints = createBreakpoints({
	sm: "40em",
	md: "52em",
	lg: "64em",
	xl: "80em",
});

const theme = extendTheme({
	colors,
	fonts,
	breakpoints,
	styles: {
		global: (props) => ({
			body: {
				bg: mode("white", "black")(props),
				color: mode("black", "white")(props),
			},
		}),
	},
});

export default theme;
