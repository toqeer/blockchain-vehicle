import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Menu, Icon, Search, Image } from "semantic-ui-react";
import { logoutUser } from "../../../redux/actions";

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    const { handleAnimationChange,email } = this.props;
    return (
      <Menu text className="topbar" size="massive">
        <Menu.Item onClick={handleAnimationChange}>
          <Icon name="list" />
        </Menu.Item>
        <Menu.Item className="brand">
          <img
            src={require("../../../assets/images/Icons/brand-icon.png")}
            alt="brand-icon"
          />
          <span>Vehicle Registeration Managment</span>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item className="profile-wraper">
            <Image
              size="mini"
              circular
              src={require("../../../assets/images/Icons/icon-user.png")}
            />
            <span>{email}</span>
          </Menu.Item>
          <Menu.Item className="logout-wraper" onClick={this.handleLogout}>
            <Image
              size="mini"
              circular
              src={require("../../../assets/images/Icons/icon-logout.png")}
            />
            <span>logout</span>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

const mapStateToProps = state => {
  // const { key } = state;
  // return { key };
  return{
    email: state.userAuth.user && state.userAuth.user.data.companyId,
  }
};

export default connect(
  mapStateToProps,
  { logoutUser }
)(TopBar);
