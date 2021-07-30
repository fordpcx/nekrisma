import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import Layout from "@components/Layout";
import "../styles/globals.css";

import { ConnectedRouter } from "connected-next-router";
import { wrapper, store } from "@redux/index";
import theme from "../styles/theme";

const MyApp = (props) => {
	const { Component, pageProps } = props;
	const allProps = { ...pageProps, ...store.getState() };

	return (
		<ConnectedRouter>
			<ChakraProvider resetCSS theme={theme}>
				<ColorModeProvider
					options={{
						useSystemColorMode: true,
					}}
				>
					<Layout {...allProps}>
						<Component {...allProps}/>
					</Layout>
				</ColorModeProvider>
			</ChakraProvider>
		</ConnectedRouter>
	);
};

export default wrapper.withRedux(MyApp);
