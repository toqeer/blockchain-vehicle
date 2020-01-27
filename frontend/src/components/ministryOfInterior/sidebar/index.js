import React, { Component } from "react";
import PropTypes from "prop-types";
import { Sidebar, Menu, Icon, Label, Header } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

const menuItems = [
  {
    name: "Transfer Requests",
    link: "interior-ministory/transfer-requests",
    icon: "car"
  },
  {
    name: "License orders ",
    link: "interior-ministory/license-orders",
    icon: "car"
  },
  {
    name: "All Licences",
    link: "interior-ministory/all-licences",
    icon: "car"
  },
  {
    name: "Approve Vehicle Registeration",
    link: "interior-ministory/approve-vehicle-registeration",
    icon: "car"
  },
  {
    name: "Vehicle List",
    link: "interior-ministory/vehicle-list",
    icon: "car"
  },
  // {
  // 	name: 'Issue of Liscense ',
  // 	link: 'interior-ministory/license-issue',
  // 	icon: 'car'
  // },
  // {
  // 	name: 'Vehicle Violation',
  // 	link: 'interior-ministory/vehicle-voilation',
  // 	icon: 'settings'
  // },
  // {
  // 	name: 'Inspection',
  // 	link: 'interior-ministory/inspection',
  // 	icon: 'user'
  // },
  {
    name: "Transactions",
    link: "interior-ministory/transactions",
    icon: "car-1"
  }
];

class VerticalSidebar extends Component {
  state = {
    activeItem: "requests"
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { visible } = this.props;
    return (
      <Sidebar
        as={Menu}
        vertical
        visible={visible}
        className="side-bar"
        inverted
      >
        <Menu.Item className="title">
          <img
            src={require(`../../../assets/images/Logos/logo-1.png`)}
            alt="logo"
          />
        </Menu.Item>
        {menuItems.map((item, key) => {
          return (
            <Menu.Item
              key={key}
              as={Link}
              to={`/${item.link}`}
              name={item.name}
              active={item.link === this.props.location.pathname.slice(1)}
              onClick={this.handleItemClick}
              className="nav-items"
            >
              <img
                src={require(`../../../assets/images/Icons/${item.icon}.png`)}
                alt="icon"
                className="sidebar-icon"
              />
              {/* <Icon color="blue" name={item.icon} floated="left" /> */}
              {item.name}
            </Menu.Item>
          );
        })}
      </Sidebar>
    );
  }
}
VerticalSidebar.propTypes = {
  animation: PropTypes.string,
  visible: PropTypes.bool
};
export default withRouter(VerticalSidebar);
