import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "../../assets/auth/css/style.css";
import { Button, Form, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { loginUser } from "../../redux/actions";
import { history } from "../../utils/history";
import Loader from "react-loaders";

const ActiveViewRenderer = ({ active }) => {
  return active === "USER" ? (
    <Fragment>
      <img
        src={require("../../assets/images/Logos/logo-4.png")}
        className="logo-register"
        alt="Logos"
      />

      <span className="logo-tagline">Vehicle Registration Managment</span>
      <hr />
    </Fragment>
  ) : active === "MINISTORY" ? (
    <Fragment>
      <img
        src={require("../../assets/images/Logos/logo-3.png")}
        className="logo-ministry"
        alt="Logos"
      />

      <span className="logo-tagline">Transport Ministry</span>
      <span className="logo-tagline">Kingdom of Saudi Arabia</span>
      <hr />
    </Fragment>
  ) : active === "MANUFACTURER" ? (
    <Fragment>
      <img
        src={require("../../assets/images/Logos/logo-5.png")}
        className="logo-menufec"
        alt="Logos"
      />

      <span className="logo-tagline">Vehicle Manufactuer</span>
      <hr />
    </Fragment>
  ) : active === "FAHAS" ? (
    <Fragment>
      <img
        src={require("../../assets/images/Logos/fahas.png")}
        className="logo-menufec"
        alt="Logos"
      />

      <span className="logo-tagline">Fahas</span>
      <hr />
    </Fragment>
  ) :
  active === "TAKAFUL" ? (
    <Fragment>
      <img
        src={require("../../assets/images/Logos/takaful.png")}
        className="logo-menufec"
        alt="Logos"
      />

      <span className="logo-tagline">Takaful</span>
      <hr />
    </Fragment>
  ) : null;
};

class Login extends Component {
  state = {
    active: "USER",
    email: "",
    password: "",
    companyId: "",
    mId: ""
  };
  handleToggleScreen = active => {
    this.setState({ active: active });
  };
  handleSubmit = () => {
    const { active, email, password, companyId, mId } = this.state;
    let data = {};
    if (active === "USER") {
      data = {
        email,
        password,
        userType: active
      };
    }
    if (active === "MANUFACTURER") {
      data = {
        companyId,
        password,
        userType: active
      };
    }
    if (active === "MINISTORY") {
      data = {
        mId,
        password,
        userType: active
      };
    }
    if (active === "FAHAS") {
      data = {
        companyId,
        password,
        userType: active
      };
    }
    if (active === "TAKAFUL") {
      data = {
        companyId,
        password,
        userType: active
      };
    }

    this.props.loginUser(data);
  };
  componentWillMount() {
    // if (localStorage.token) {
    // 	history.goBack();
    // }
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { password, email, companyId, active, mId } = this.state;
    const { signInLoading } = this.props;
    // if (localStorage.token) {
    // 	history.goBack();
    // }
    return (
      <div id="auth" className="login">
        <div className="left-section">
          <div className="top-section">
            <ActiveViewRenderer active={this.state.active} />
          </div>
          <div className="bottom-section">
            <h2>Please choose your department</h2>
            <span className="sub-heading">
              {" "}
              *For its specific Sign-In/ Login Menu
            </span>
            <hr />
            <Button
              className={this.state.active === "USER" ? "active" : null}
              onClick={() => this.handleToggleScreen("USER")}
            >
              Vehicle Management
            </Button>
            <Button
              className={this.state.active === "MINISTORY" ? "active" : null}
              onClick={() => this.handleToggleScreen("MINISTORY")}
            >
              Transport Ministry (KSA)
            </Button>
            <Button
              className={this.state.active === "MANUFACTURER" ? "active" : null}
              onClick={() => this.handleToggleScreen("MANUFACTURER")}
            >
              Vehicle Manufacturer
            </Button>
            <Button
              className={this.state.active === "TAKAFUL" ? "active" : null}
              onClick={() => this.handleToggleScreen("TAKAFUL")}
            >
              Takaful
            </Button>
            <Button
              className={this.state.active === "FAHAS" ? "active" : null}
              onClick={() => this.handleToggleScreen("FAHAS")}
            >
              Fahas
            </Button>
          </div>
        </div>
        <div className="right-section">
          <div>
            <h2>Sign In</h2>
            <p>Enter your Username and Password to access account.</p>
            <Form>
              {active === "MANUFACTURER" || active === "TAKAFUL" || active === "FAHAS" ? (
                <Form.Field>
                  <label>CompanyId</label>
                  <Form.Input
                    value={companyId}
                    onChange={this.handleChange}
                    name="companyId"
                    placeholder="Enter your companyId"
                  />
                </Form.Field>
              ):null}
              {active === "USER" && (
                <Form.Field>
                  <label>Email</label>
                  <Form.Input
                    value={email}
                    onChange={this.handleChange}
                    name="email"
                    placeholder="Enter your email"
                  />
                </Form.Field>
              )}
              {active === "MINISTORY" && (
                <Form.Field>
                  <label>mId</label>
                  <Form.Input
                    value={mId}
                    onChange={this.handleChange}
                    name="mId"
                    placeholder="Enter your mId"
                  />
                </Form.Field>
              )}

              <Form.Field>
                <label>Password</label>
                <Form.Input
                  value={password}
                  onChange={this.handleChange}
                  name="password"
                  placeholder="Enter your password"
                  type="password"
                />
                <span className="forget-msg">Forgot your password?</span>
              </Form.Field>
              <Form.Field>
                <Form.Checkbox label="remeber me" />
              </Form.Field>
              <Button
                className="login"
                disabled={signInLoading}
                onClick={this.handleSubmit}
              >
                {signInLoading ? (
                  <Loader type="ball-pulse" active={signInLoading} />
                ) : (
                  "Login"
                )}
              </Button>
            </Form>
          </div>

          <h3 className="divider">or</h3>
          <div>
            <h2>Sign Up</h2>
            <p>
              Don’t have an account? Create your account, it takes less than a
              minute
            </p>
            <Button className="signup" as={Link} to="/signup">
              Create Account
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  signInLoading: state.userAuth.signInLoading
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
