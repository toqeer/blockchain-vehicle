import React, { Component } from 'react';
import VerticalSidebar from './sidebar';
import { Sidebar, Container } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';
import TopBar from './topbar';
import '../../assets/menufecturer/css/style.css';
import Footer from './footer';

// import transections from './transections';
import NewOrders from './newOrders';
import InProcess from './inProcess';
import Shippings from './shippings';
import Completed from './completed';
import Transactions from './transactions';
import { history } from '../../utils/history';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, isAuthenticated, userType, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated === true && userType === 'MANUFACTURER' ? (
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
class Manufacturer extends Component {
	state = {
		visible: true
	};

	handleAnimationChange = () => this.setState((prevState) => ({ visible: !prevState.visible }));
	componentDidMount() {
		if (this.props.match.path === '/vehicle-manufacturer') {
			history.push('/vehicle-manufacturer/new-orders');
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
										{/* <PrivateRoute
											exact
											path={`${match.url}/`}
											component={NewOrders}
											isAuthenticated={isAuthenticated}
											userType={userType}
										/> */}
										<PrivateRoute
											exact
											path={`${match.url}/new-orders`}
											component={NewOrders}
											isAuthenticated={isAuthenticated}
											userType={userType}
										/>
										<PrivateRoute
											exact
											path={`${match.url}/in-process`}
											component={InProcess}
											isAuthenticated={isAuthenticated}
											userType={userType}
										/>
										<PrivateRoute
											exact
											path={`${match.url}/shippings`}
											component={Shippings}
											isAuthenticated={isAuthenticated}
											userType={userType}
										/>
										<PrivateRoute
											exact
											path={`${match.url}/completed`}
											component={Completed}
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
export default connect(mapStateToProps)(Manufacturer);
