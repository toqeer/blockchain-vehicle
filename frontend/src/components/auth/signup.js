import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
// import { withRouter } from 'react-router-dom';
import "../../assets/auth/css/style.css";
import { Button, Form, Icon } from "semantic-ui-react";
import { registerUser } from "../../redux/actions";
import { history } from "../../utils/history";
import UserSignup from "./userSignup";
import ManufacturerSignUp from "./manufacturerSignUp";
import SignupTakaful from "./signupTakaful";
import validate, { isEmpty } from "validate.js";
import { signUpUser } from "../../validations";

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
  ) : active === "TAKAFUL" ? (
    <Fragment>
      <img
        src={require("../../assets/images/Logos/fahas.png")}
        className="logo-menufec"
        alt="Logos"
      />

      <span className="logo-tagline">Takaful</span>
      <hr />
    </Fragment>
  ) : active === "FAHAS" ? (
    <Fragment>
      <img
        src={require("../../assets/images/Logos/takaful.png")}
        className="logo-menufec"
        alt="Logos"
      />

      <span className="logo-tagline">Fahas</span>
      <hr />
    </Fragment>
  ) : null;
};

class Signup extends Component {
  state = {
    active: "USER",
    email: "",
    password: "",
    title: "",
    firstName: "",
    lastName: "",
    nic: "",
    gender: "",
    mobilePhone: "",
    homePhone: "",
    city: "",
    country: "",
    region: "",
    street: "",
    postalCode: "",
    companyId: "",
    touched: {}
  };
  handleToggleScreen = active => {
    this.setState({ active: active });
  };
  // handleChange = (e) => {
  // 	this.setState({ [e.target.name]: e.target.value });
  // };
  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };

  handleBlur = e => {
    e.persist();
    this.setState({
      touched: { ...this.state.touched, [e.target.name]: true }
    });
  };
  hadleSubmit = () => {
    const {
      active,
      email,
      password,
      title,
      firstName,
      lastName,
      nic,
      gender,
      mobilePhone,
      homePhone,
      city,
      country,
      region,
      street,
      postalCode,
      companyId
    } = this.state;
    let data = {};
    if (active === "USER") {
      data = {
        email,
        password,
        title,
        firstName,
        lastName,
        nic,
        gender,
        contactDetails: {
          email,
          mobilePhone,
          homePhone,
          address: {
            city,
            country,
            region,
            street,
            postalCode
          }
        },
        userType: active
      };
    }
    if (active === "MANUFACTURER") {
      data = {
        companyId,
        password,
        title,
        contactDetails: {
          mobilePhone,
          address: {
            city,
            country,
            region,
            street,
            postalCode
          }
        },
        userType: active
      };
    }
    if (active === "TAKAFUL") {
      data = {
        companyId,
        password,
        title,
        contactDetails: {
          mobilePhone,
          address: {
            city,
            country,
            region,
            street,
            postalCode
          }
        },
        userType: active
      };
    }
    if (active === "FAHAS") {
      data = {
        companyId,
        password,
        title,
        contactDetails: {
          mobilePhone,
          address: {
            city,
            country,
            region,
            street,
            postalCode
          }
        },
        userType: active
      };
    }
    this.props.registerUser(data);
  };
  componentWillMount() {
    if (localStorage.token) {
      history.goBack();
    }
  }
  render() {
    const { signUpLoading } = this.props;
    const {
      active,
      email,
      password,
      title,
      firstName,
      lastName,
      nic,
      gender,
      mobilePhone,
      homePhone,
      city,
      country,
      region,
      street,
      postalCode,
      companyId,
      touched
    } = this.state;
    return (
      <div id="auth" className="signup">
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
            {/* <Button
							className={this.state.active === 'ministry' ? 'active' : null}
							onClick={() => this.handleToggleScreen('ministry')}
						>
							Ministry of Interior (KSA)
						</Button> */}
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
          <div
            className="go-back"
            onClick={() => {
              history.goBack();
            }}
          >
            <Icon name="arrow left" />
            Go back
          </div>
          <h2>Create Your Account</h2>
          {active === "USER" && (
            <UserSignup
              email={email}
              password={password}
              title={title}
              firstName={firstName}
              lastName={lastName}
              nic={nic}
              gender={gender}
              mobilePhone={mobilePhone}
              homePhone={homePhone}
              city={city}
              country={country}
              region={region}
              street={street}
              postalCode={postalCode}
              handleChange={this.handleChange}
              hadleSubmit={this.hadleSubmit}
              handleBlur={this.handleBlur}
              touched={touched}
              loading={signUpLoading}
            />
          )}
          {active === "MANUFACTURER" && (
            <ManufacturerSignUp
              email={email}
              title={title}
              companyId={companyId}
              mobilePhone={mobilePhone}
              street={street}
              country={country}
              city={city}
              region={region}
              postalCode={postalCode}
              password={password}
              handleChange={this.handleChange}
              hadleSubmit={this.hadleSubmit}
              handleBlur={this.handleBlur}
              touched={touched}
              loading={signUpLoading}
            />
          )}

          {active === "TAKAFUL" && (
            <SignupTakaful
              title={title}
              companyId={companyId}
              password={password}
              mobilePhone={mobilePhone}
              street={street}
              country={country}
              city={city}
              region={region}
              postalCode={postalCode}
              handleChange={this.handleChange}
              hadleSubmit={this.hadleSubmit}
              handleBlur={this.handleBlur}
              touched={touched}
              loading={signUpLoading}
            />
          )}
          {active === "FAHAS" && (
            <SignupTakaful
              title={title}
              companyId={companyId}
              password={password}
              mobilePhone={mobilePhone}
              street={street}
              country={country}
              city={city}
              region={region}
              postalCode={postalCode}
              handleChange={this.handleChange}
              hadleSubmit={this.hadleSubmit}
              handleBlur={this.handleBlur}
              touched={touched}
              loading={signUpLoading}
            />
          )}
          {/* <Form>
            <Form.Field>
              <label>First Name</label>
              <Form.Input
                placeholder="Enter your first name"
                value={firstName}
                name="firstName"
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <Form.Input
                value={lastName}
                name="lastName"
                onChange={this.handleChange}
                placeholder="Enter your last name"
              />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <Form.Input
                value={email}
                name="email"
                onChange={this.handleChange}
                placeholder="Enter your email"
              />
            </Form.Field>
            <Form.Field>
              <label>Title</label>
              <Form.Input
                value={title}
                name="title"
                onChange={this.handleChange}
                placeholder="Enter your username"
              />
            </Form.Field>
            <Form.Field>
              <label>CNIC / ID</label>
              <Form.Input
                value={nic}
                name="nic"
                onChange={this.handleChange}
                placeholder="Enter your ID number"
              />
            </Form.Field>
            <Form.Field>
              <label>Gender</label>
              <Form.Input
                value={gender}
                name="gender"
                onChange={this.handleChange}
                placeholder="Enter your ID number"
              />
            </Form.Field>
            <Form.Field>
              <label>Street #</label>
              <Form.Input
                value={street}
                name="street"
                onChange={this.handleChange}
                placeholder="Enter your ID number"
              />
            </Form.Field>
            <Form.Field>
              <label>Zip Code</label>
              <Form.Input
                value={postalCode}
                name="postalCode"
                onChange={this.handleChange}
                placeholder="Enter your ID number"
              />
            </Form.Field>
            <Form.Field>
              <label>City</label>
              <Form.Input
                value={city}
                name="city"
                onChange={this.handleChange}
                placeholder="Enter your ID number"
              />
            </Form.Field>
            <Form.Field>
              <label>State</label>
              <Form.Input
                value={region}
                name="region"
                onChange={this.handleChange}
                placeholder="Enter your ID number"
              />
            </Form.Field>
            <Form.Field>
              <label>Country</label>
              <Form.Input
                value={country}
                name="country"
                onChange={this.handleChange}
                placeholder="Enter your ID number"
              />
            </Form.Field>

            <Form.Field>
              <label>Password</label>
              <Form.Input
                value={password}
                name="password"
                onChange={this.handleChange}
                placeholder="Enter your passwoord"
              />
            </Form.Field>

            <Form.Field>
              <Form.Checkbox label="I agree to the terms and conditions and policy." />
            </Form.Field>
            <Button className="signup" onClick={this.hadleSubmit}>
              Create
            </Button>
          </Form> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authUser: state,
  signUpLoading: state.userAuth.signUpLoading
});

export default connect(
  mapStateToProps,
  { registerUser }
)(Signup);
