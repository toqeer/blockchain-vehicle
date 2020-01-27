import React, { Component } from 'react';
import VerticalSidebar from './sidebar';
import { Sidebar, Container, Transition } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';
import TopBar from './topbar';
import '../../assets/menufecturer/css/style.css';
import Footer from './footer';

// import transections from './transections';
import AllFahas from './AllFahas';
import AddFahas from './AddFahas';
import { history } from '../../utils/history';
import { connect } from 'react-redux';
import transations from './transations';

const PrivateRoute = ({ component: Component, isAuthenticated, userType, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated === true && userType === 'FAHAS' ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: props.location }
						}}
					/>
				)}
		/>
	);
};
class Fahas extends Component {
	state = {
		visible: true
	};

	handleAnimationChange = () => this.setState((prevState) => ({ visible: !prevState.visible }));
	componentDidMount() {
		if (this.props.match.path === '/fahas') {
			history.push('/fahas/add-fahas');
		}
	}
	render() {
		const { visible } = this.state;
		const { match, isAuthenticated, userType } = this.props;
		return (
			<div id="menufecturer">
				<Sidebar.Pushable>
					<VerticalSidebar visible={visible} />

					<Sidebar.Pusher>
						<main className="main-app">
							<Container fluid>
								<TopBar handleAnimationChange={this.handleAnimationChange} />
								<div className="components">
									<Switch>
										<Route
											exact
											path={`${match.url}/add-fahas`}
											component={AddFahas}
											isAuthenticated={isAuthenticated}
											userType={userType}
										/>

										<Route
											exact
											path={`${match.url}/all-fahas`}
											component={AllFahas}
											isAuthenticated={isAuthenticated}
											userType={userType}
										/>
										<Route
											exact
											path={`${match.url}/transactions`}
											component={transations}
											isAuthenticated={isAuthenticated}
											userType={userType}
										/>
									</Switch>
								</div>

								<Footer />
							</Container>
						</main>
					</Sidebar.Pusher>
				</Sidebar.Pushable>
			</div>
		);
	}
}
const mapStateToProps = (state) => ({
	isAuthenticated: state.userAuth.isAuthenticated,
	userType: state.userAuth.userType
});
export default connect(mapStateToProps)(Fahas);
