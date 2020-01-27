import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Grid, Button, Form, Card, Icon, Label, Message, Modal, Dropdown, Select } from 'semantic-ui-react';
import { getAllLiscenceOrders, updateLicenseOrderStatus } from '../../../redux/ministoryOfInterior/actions';
import { DateInput } from 'semantic-ui-calendar-react';
import Loader from "react-loaders";

const options = [
	{ key: 'ass', value: 'ASSIGNED', text: 'ASSIGNED' },
	{ key: 'rej', value: 'REJECTED', text: 'REJECTED' }
];
export class LiscenceOrders extends Component {
	state = {
		licenseNumber: '',
		issueDate: '',
		expiryDate: '',
		licenseOrderStatus: '',
		isOpen: false,
		selectedOrderId: null
	};
	componentDidMount() {
		this.props.getAllLiscenceOrders();
	}
	modalOpen = (i) => {
		this.setState({
			isOpen: true,
			selectedOrderId: i
		});
	};
	modalClose = () => {
		this.setState({
			isOpen: false
		});
	};
	handleSubmit = (orderId) => {
		const { licenseNumber, issueDate, expiryDate, licenseOrderStatus } = this.state;
		let data = {};
		if (licenseOrderStatus === 'REJECTED') {
			data = {
				orderId: orderId,
				licenseOrderStatus: 'REJECTED'
			};
		}
		if (licenseOrderStatus === 'ASSIGNED') {
			data = {
				orderId,
				licenseNumber,
				issueDate,
				expiryDate,
				licenseOrderStatus
			};
		}
		this.props.updateLicenseOrderStatus(data);
		// this.modalClose();
		// this.setState({ isOpen: false });
	};
	handleChange = (event, { name, value }) => {
		if (this.state.hasOwnProperty(name)) {
			this.setState({ [name]: value });
		}
	};
	render() {
		const { orders, loading } = this.props;
		const { licenseNumber, issueDate, expiryDate, licenseOrderStatus, selectedOrderId } = this.state;
		let selectedOrder = null;
		if (selectedOrderId !== null) {
			selectedOrder = orders[selectedOrderId];
		}
		if (loading) {
			return (
			  <Loader
				className="page-loading"
				type="ball-scale-multiple"
				active={loading}
			  />
			);
		  }
		return (
			<div className="new-requests">
				<Grid padded>
					<Grid.Row columns="1" divided className="dashboard-main">
						<Grid.Column className="left-section">
							<Header as="h2" dividing subheader="">
								<Header.Content>Liscence orders</Header.Content>
							</Header>
						</Grid.Column>
					</Grid.Row>
					{/* <Grid.Row>
            <Grid.Column>
              <Form>
                <Form.Group widths="equal">
                  <Form.Field>
                    <label> Arrange by Date</label>
                    <Form.Select fluid placeholder="Old Orders" icon="arrow down" className="icon" size="large" />
                  </Form.Field>
                  <Form.Field>
                    <label> Specific Date</label>
                    <Form.Select
                      fluid
                      placeholder="- - / - - / --   "
                      icon="arrow down"
                      className="icon"
                      size="large"
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Specific Name/Order No</label>
                    <Form.Input icon="search" placeholder="Please enter name/ order no" />
                  </Form.Field>
                </Form.Group>
              </Form>
            </Grid.Column>
          </Grid.Row>
		  <hr /> */}
					{
					// 	loading ? (
					// 	<div className="loader" />
					// ) : 
					orders && orders.length > 0 ? (
						<Grid.Row columns="3">
							{orders.map((item, i) => (
								<Grid.Column>
									<Card>
										<Card.Content>
											<Icon name="circle" size="small" color="brown" /> <span>New Request</span>
										</Card.Content>
										<Card.Content>
											<Card.Description>
												<Header className="customer-name">
													{item.licenseOrderStatus} <span className="circle" />
												</Header>
												<Header.Content>Ministory: {item.ministory}</Header.Content>
												<Header.Content>OrderId: {item.orderId}</Header.Content>
												<Header.Content>Orderer: {item.orderer}</Header.Content>
											</Card.Description>
											<Button
												className="start"
												// onClick={() => this.handleSubmit(item.orderId)}
												onClick={() => this.modalOpen(i)}
											>
												Change Status
											</Button>
										</Card.Content>
									</Card>
								</Grid.Column>
							))}
						</Grid.Row>
					) : (
						<Grid.Row>
							<Grid.Column>
								<Message negative fluid>
									<Message.Header>No order found</Message.Header>
								</Message>
							</Grid.Column>
						</Grid.Row>
					)}
				</Grid>
				<Modal
					closeIcon
					onClose={this.modalClose}
					open={this.state.isOpen}
					size="mini"
					// dimmer="inverted"
					style={{ backgroundColor: 'transparent' }}
				>
					<Modal.Header>Change Order Status</Modal.Header>
					{selectedOrder && (
						<Modal.Content>
							<Form>
								<Form.Select
									fluid
									options={options}
									onChange={this.handleChange}
									name="licenseOrderStatus"
									placeholder="Order Status"
								/>
								{licenseOrderStatus === 'ASSIGNED' && (
									<div>
										<DateInput
											name="issueDate"
											placeholder="Date"
											value={this.state.issueDate}
											iconPosition="left"
											onChange={this.handleChange}
										/>
										<DateInput
											name="expiryDate"
											placeholder="Date"
											value={expiryDate}
											iconPosition="left"
											onChange={this.handleChange}
										/>

										<Form.Input
											onChange={this.handleChange}
											name="licenseNumber"
											value={licenseNumber}
											placeholder="License Number"
											style={{ marginBottom: '1rem' }}
										/>
									</div>
								)}

								<Button
									primary
									onClick={() => this.handleSubmit(selectedOrder.orderId)}
									// onClick={this.modalOpen}
									style={{ margin: '0 auto' }}
								>
									Submit
								</Button>
							</Form>
						</Modal.Content>
					)}
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	orders: state.interiorMinitory.allLiscenceOrders,
	loading: state.interiorMinitory.allLiscenceOrdersLoading
});

export default connect(mapStateToProps, { getAllLiscenceOrders, updateLicenseOrderStatus })(LiscenceOrders);
