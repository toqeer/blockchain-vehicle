import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Sidebar, Menu, Icon, Label, Header } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

const menuItems = [
	{
		name: 'Add Takaful',
		link: 'takaful/add-takaful',
		icon: 'car'
	},
	// {
	// 	name: 'In-process',
	// 	link: 'vehicle-manufacturer/in-process',
	// 	icon: 'settings'
	// },
	// {
	// 	name: 'Shippings',
	// 	link: 'vehicle-manufacturer/shippings',
	// 	icon: 'user'
	// },
	{
		name: 'All Takaful',
		link: 'takaful/all-takaful',
		icon: 'car-1'
	},
	{
		name: 'Transactions',
		link: 'takaful/transactions',
		icon: 'clock'
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
					<img src={require(`../../../assets/images/Logos/takaful.png`)} alt="logo" />
					Takaful
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
