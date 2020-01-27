import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Sidebar, Menu, Icon, Label, Header } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

const menuItems = [
	{
		name: 'Register Old Vehicle',
		link: 'vehicle-registeration/register-old-vehicle',
		icon: 'car'
	},
	{
		name: 'Build Your Vehicle',
		link: 'vehicle-registeration/build-vehicle',
		icon: 'settings'
	},
	{
		name: 'Vehicle Orders',
		link: 'vehicle-registeration/vehicle-orders',
		icon: 'car'
	},
	{
		name: 'Vehicle List',
		link: 'vehicle-registeration/vehicle-list',
		icon: 'car-1'
	},
	// {
	//   name: 'Owner’s Profile',
	//   link: 'vehicle-registeration/owner-profile',
	//   icon: 'user',
	// },
	// {
	//   name: 'Car Profile',
	//   link: 'vehicle-registeration/car-profile',
	//   icon: 'car-1',
	// },
	// {
	//   name: 'Maintanance & Inspection',
	//   link: 'vehicle-registeration/maintanance',
	//   icon: 'clock',
	// },
	{
		name: 'Transfer of Vehicle',
		link: 'vehicle-registeration/transfer-vehicle',
		icon: 'transfer'
	},
	{
		name: 'Issue of Licence ',
		link: 'vehicle-registeration/lisence-issue',
		icon: 'file'
	},
	{
		name: 'All Licence Requests',
		link: 'vehicle-registeration/all-lisence-requests',
		icon: 'file'
	},
	{
		name: 'Transfer Requests ',
		link: 'vehicle-registeration/transfer-requests',
		icon: 'car'
	},
	{
		name: 'Transactions',
		link: 'vehicle-registeration/transactions',
		icon: 'transection'
	}
];

class VerticalSidebar extends Component {
	state = {
		activeItem: 'requests'
	};

	handleItemClick = (e, { name }) => this.setState({ activeItem: name });
	render() {
		const { visible } = this.props;
		const { activeItem } = this.state;
		return (
			<Sidebar as={Menu} vertical visible={visible} className="side-bar" inverted>
				<Menu.Item className="title">
					<img src={require(`../../../assets/images/Logos/logo-4.png`)} alt="logo" />
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
