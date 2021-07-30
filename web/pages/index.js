// import { server } from '@config'
// import ArticleList from '@components/ArticleList'
import { useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ActionsCreators from "@redux/home/actions";
import Container from "@components/Container";

const Home = (props) => {
	const router = useRouter();
	const { login } = props;

	useEffect(() => {
		if (!login.isLoggedIn) {
			return router.push("/login");
		}

		return;
	}, [login]);

	return (
		<Container>
			<span>Hello</span>
		</Container>
	);
};

const mapStateToProps = ({home, login}) => ({
	home,
	login,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(ActionsCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

// export const getStaticProps = async () => {
// 	const res = await fetch(`${server}/api/articles`)
// 	const articles = await res.json()

// 	return {
// 		props: {
// 			articles,
// 		},
// 	}
// }

// export const getStaticProps = async () => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=6`)
//   const articles = await res.json()

//   return {
//     props: {
//       articles,
//     },
//   }
// }
