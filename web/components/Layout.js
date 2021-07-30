import Router from "next/router";
import NProgress from "nprogress";
import Nav from "./Nav";
import Meta from "./Meta";
import Header from "./Header";
import Footer from "./Footer";
import DarkModeSwitch from "./DarkModeSwitch";
import Container from "./Container";
import styles from "../styles/Layout.module.css";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions } from "@redux/index";

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const Layout = (props) => {
	const { children, login, actions } = props;

	return (
		<Container height="100%">
			<Meta />
			<Nav isLoggedIn={login.isLoggedIn} actions={actions}/>
			<Container className={styles.container}>
				<main className={styles.main}>
					<Header />
					{children}
				</main>
			</Container>
			<Footer />
			<DarkModeSwitch />
		</Container>
	);
};

const mapStateToProps = ({home, login}) => ({
	home,
	login,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
