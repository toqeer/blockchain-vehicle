import React, { Component } from 'react';
import VerticalSidebar from './sidebar';
import { Sidebar, Container } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';
import TopBar from './topbar';
import '../../assets/registeration/css/style.css';
import Footer from './footer';
import RegisterVehicle from './registerVehicle';
import CarBuild from './vehicleBuild';
import OwnerProfile from './ownerProfile';
import CarProfile from './vehicleProfile';
import Mantanance from './maintananceInspection';
import VehicleTransfer from './vehicleTransfer';
import VehicleOrders from './vehicleOrders';
import LiscenseIssue from './licenseIssue';
import Transactions from './transactions';
import CarList from './vehicleList';
import TransferRequests from './transferRequests';
import { setAuthToken } from '../../utils/helpingFunctions';
import { decode } from 'jsonwebtoken';
import { logoutUser } from '../../redux/actions';
import { connect } from 'react-redux';
import { store } from '../../redux/store';

if (localStorage.token) {
	const token = localStorage.getItem('token');
	setAuthToken(token);
	const decoded = decode(token);
	const currentTime = Date.now() / 3600000;
	if (Date.now() >= decoded.exp * 1000) {
		store.dispatch(logoutUser());
	}
}

const PrivateRoute = ({ component: Component, isAuthenticated, userType, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated === true && userType === 'USER' ? (
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

class VehicleRegisteration extends Component {
	state = {
		visible: true
	};

	handleAnimationChange = () => this.setState((prevState) => ({ visible: !prevState.visible }));
	componentDidMount() {
		if (this.props.match.path === '/vehicle-registeration') {
			this.props.history.push('/vehicle-registeration/register-old-vehicle');
		}
	}

	render() {
		const { visible } = this.state;
		const { match, isAuthenticated, userType } = this.props;

		return (
			<div id="regulator">
				<Sidebar.Pushable>
					<VerticalSidebar visible={visible} />

					<Sidebar.Pusher>
						<main className="main-app">
							<Container fluid>
								<TopBar handleAnimationChange={this.handleAnimationChange} />
								<div className="components">
									<Switch>
										{/* <PrivateRoute
                      exact
                      path={`${match.url}/`}
                      component={RegisterVehicle}
                      isAuthenticated={isAuthenticated}
                      userType={userType}
                    /> */}
										<PrivateRoute
											exact
											path={`${match.url}/register-old-vehicle`}
											component={RegisterVehicle}
											isAuthenticated={isAuthenticated}
											userType={userType}
										/>
										<PrivateRoute
											exact
											path={`${match.url}/vehicle-orders`}
											component={VehicleOrders}
											isAuthenticated={isAuthenticated}
											userType={userType}
										/>
										<PrivateRoute
											exact
											path={`${match.url}/build-vehicle`}
											component={CarBuild}
											isAuthenticated={isAuthenticated}
											userType={userType}
										/>
										<PrivateRoute
											exact
											path={`${match.url}/vehicle-list`}
											component={CarList}
											isAuthenticated={isAuthenticated}
											userType={userType}
										/>
										<PrivateRoute
											exact
											path={`${match.url}/owner-profile`}
											component={OwnerProfile}
											isAuthenticated={isAuthenticated}
											userType={userType}
										/>
										<PrivateRoute
											exact
											path={`${match.url}/vehicle-profile`}
											component={CarProfile}
											isAuthenticated={isAuthenticated}
											userType={userType}
										/>
										<PrivateRoute
											exact
											path={`${match.url}/maintanance`}
											component={Mantanance}
											isAuthenticated={isAuthenticated}
											userType={userType}
										/>
										<PrivateRoute
											exact
											path={`${match.url}/transfer-vehicle`}
											component={VehicleTransfer}
											isAuthenticated={isAuthenticated}
											userType={userType}
										/>
										<PrivateRoute
											exact
											path={`${match.url}/lisence-issue`}
											component={LiscenseIssue}
											isAuthenticated={isAuthenticated}
											userType={userType}
										/>

										<PrivateRoute
											exact
											path={`${match.url}/transfer-requests`}
											component={TransferRequests}
											isAuthenticated={isAuthenticated}
											userType={userType}
										/>
										<PrivateRoute
											exact
											path={`${match.url}/transactions`}
											component={Transactions}
											isAuthenticated={isAuthenticated}
											userType={userType}
										/>
										{/* <Route exact path={`${match.url}/`} component={Dashboard} /> */}
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
export default connect(mapStateToProps)(VehicleRegisteration);
