import React, { Component } from "react";
import VerticalSidebar from "./sidebar";
import { Sidebar, Container } from "semantic-ui-react";
import { Switch, Route, Redirect } from "react-router-dom";
import TopBar from "./topbar";
import Footer from "./footer";
// import licenseIssue from './licenseIssue';
import Transactions from "./transactions";
// import inspection from './inspection';
// import VehicleVoilation from './vehicleVoilation';
import { setAuthToken } from "../../utils/helpingFunctions";
import { decode } from "jsonwebtoken";
import { logoutUser } from "../../redux/actions";
import { connect } from "react-redux";
import { store } from "../../redux/store";
import "../../assets/ministry/css/style.css";
import TransferRequests from "./transferRequests";
import licenceOrders from "./licenceOrders";
import Licence from "./licence";
import ApproveVehicleRegisteration from "./approveVehicleRegisteration";
import VehicleList from "./vehicleList";

if (localStorage.token) {
  const token = localStorage.getItem("token");
  setAuthToken(token);
  const decoded = decode(token);
  const currentTime = Date.now() / 3600000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
  }
}

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  userType,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated && userType === "MINISTORY" ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

class MinistryOfInterior extends Component {
  state = {
    visible: true
  };

  handleAnimationChange = () =>
    this.setState(prevState => ({ visible: !prevState.visible }));
  componentDidMount() {
    if (this.props.match.path === "/interior-ministory") {
      this.props.history.push("/interior-ministory/transfer-requests");
    }
  }
  render() {
    const { visible } = this.state;
    const { match, isAuthenticated, userType } = this.props;

    return (
      <div id="ministry">
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
											component={liscenseIssue}
											// isAuthenticated={isAuthenticated}
											// userType={userType}
										/> */}
                    <PrivateRoute
                      exact
                      path={`${match.url}/transfer-requests`}
                      component={TransferRequests}
                      isAuthenticated={isAuthenticated}
                      userType={userType}
                    />
                    <PrivateRoute
                      exact
                      path={`${match.url}/license-orders`}
                      component={licenceOrders}
                      isAuthenticated={isAuthenticated}
                      userType={userType}
                    />
                    <PrivateRoute
                      exact
                      path={`${match.url}/all-licences`}
                      component={Licence}
                      isAuthenticated={isAuthenticated}
                      userType={userType}
                    />
                    <PrivateRoute
                      exact
                      path={`${match.url}/approve-vehicle-registeration`}
                      component={ApproveVehicleRegisteration}
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
                    <PrivateRoute
                      exact
                      path={`${match.url}/vehicle-list`}
                      component={VehicleList}
                      isAuthenticated={isAuthenticated}
                      userType={userType}
                    />
                    {/* <PrivateRoute
											exact
											path={`${match.url}/vehicle-voilation`}
											component={VehicleVoilation}
											isAuthenticated={isAuthenticated}
											userType={userType}
										/>
										<PrivateRoute
											exact
											path={`${match.url}/inspection`}
											component={inspection}
											isAuthenticated={isAuthenticated}
											userType={userType}
										/>
									 */}
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

const mapStateToProps = state => ({
  isAuthenticated: state.userAuth.isAuthenticated,
  userType: state.userAuth.userType
});
export default connect(mapStateToProps)(MinistryOfInterior);
