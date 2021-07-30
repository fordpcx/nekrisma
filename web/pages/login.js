import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ActionsCreators from "@redux/login/actions";
import Login from "@modules/Login";

const mapStateToProps = ({login}) => ({
	login,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(ActionsCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);