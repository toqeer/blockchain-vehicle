import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../components/auth/login";
import VehicleRegisteration from "../components/vehicleRegister";
import MinistryOfInterior from "../components/ministryOfInterior";
import Manufacturer from "../components/carManufacturer";
import Takaful from "../components/takaful";
import Fahas from "../components/Fahas";
import Signup from "../components/auth/signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { history } from "../utils/history";
import { connect } from "react-redux";
import { decode } from "jsonwebtoken";
// import { logoutUser } from "../redux/actions";
// import { store } from "../redux/store";
import { setAuthToken } from "../utils/helpingFunctions";

if (localStorage.token) {
  const token = localStorage.getItem("token");
  setAuthToken(token);
  const decoded = decode(token);
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    localStorage.clear();

    // store.dispatch(logoutUser());
  }
}

class MainApp extends Component {
  render() {
    const { userType } = this.props;
    if (userType === "USER") {
      history.push("/vehicle-registeration");
    } else if (userType === "MINISTORY") {
      history.push("/interior-ministory");
    } else if (userType === "MANUFACTURER") {
      history.push("/vehicle-manufacturer");
    } else if (userType === "TAKAFUL") {
      history.push("/takaful");
    } else if (userType === "FAHAS") {
      history.push("/fahas");
    } else {
      history.push("/login");
    }

    return (
      <div>
        <Switch>
          {/* {!this.props.isAuthenticated && <Route path="/login" component={Login} />} */}
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} test={"test"} />
          <Route
            path="/vehicle-registeration"
            component={VehicleRegisteration}
          />
          <Route path="/interior-ministory" component={MinistryOfInterior} />
          <Route path="/vehicle-manufacturer" component={Manufacturer} />
          <Route path="/takaful" component={Takaful} />
          <Route path="/fahas" component={Fahas} />
        </Switch>
        <ToastContainer />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.userAuth.isAuthenticated,
  userType: state.userAuth.userType
});

export default connect(mapStateToProps)(MainApp);
