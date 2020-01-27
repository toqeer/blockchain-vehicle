import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Grid, Button, Form, Card, Icon, Label, Modal, List } from 'semantic-ui-react';
import { getUserVehicleOrders } from '../../../redux/actions';
import Loader from 'react-loaders';

const processess = [
	{ key: 'PLACED', value: 'PLACED', text: 'Placed' },
	{
		key: 'SCHEDULED_FOR_MANUFACTURE',
		value: 'SCHEDULED_FOR_MANUFACTURE',
		text: 'Under Manufacturing'
	},
	{ key: 'VIN_ASSIGNED', value: 'VIN_ASSIGNED', text: 'VIN Issued' },
	{ key: 'OWNER_ASSIGNED', value: 'OWNER_ASSIGNED', text: 'Owner Assigned' },
	{ key: 'DELIVERED', value: 'DELIVERED', text: 'Delivered' }
];
const sequence = [ 'PLACED', 'SCHEDULED_FOR_MANUFACTURE', 'VIN_ASSIGNED', 'OWNER_ASSIGNED', 'DELIVERED' ];
class VehicleOrders extends Component {
	state = { open: false, selectedVehicleId: null };

	openModal = (i) => {
		this.setState({ open: true, selectedVehicleId: i });
	};
	handleClose = () => this.setState({ open: false });

	componentDidMount() {
		this.props.getUserVehicleOrders();
	}

	render() {
		const { selectedVehicleId } = this.state;
		const { orders, loading } = this.props;
		let selectedVehicle = null;
		if (selectedVehicleId !== null && orders && orders.length > 0) {
			selectedVehicle = orders[selectedVehicleId];
		}
		if (loading) {
			return <Loader className="page-loading" type="ball-scale-multiple" active={loading} />;
		}

		return (
			<div className="car-list">
				<Grid padded>
					<Grid.Row columns="1" divided className="dashboard-main">
						<Grid.Column className="left-section">
							<Header as="h2" dividing subheader="">
								<Header.Content>
									Your Orders{' '}
									{/* <Label color="red" size="large">
                    06
                  </Label>
                  <Label color="red" size="large">
                    Manufacture All
                  </Label> */}
								</Header.Content>
							</Header>
						</Grid.Column>
					</Grid.Row>

					<Grid.Row columns="3">
						{// 	true ?

						// <Loader type="ball-scale-multiple" active={true} />
						// :
						orders &&
							orders.map((order, i) => (
								<Grid.Column>
									<Card>
										<Card.Content>
											<Icon name="circle" size="small" color="brown" />{' '}
											<span>{order.orderStatus}</span>
										</Card.Content>
										<Card.Content>
											<Card.Description>
												<Header className="customer-name">
													{order.manufacturer}{' '}
													<span
														className="circle"
														style={{
															backgroundColor: order.vehicleDetails.colour
														}}
													/>
												</Header>
												<Header.Content>OrderId: {order.orderId}</Header.Content>
												<Header.Content>Orderer: {order.orderer}</Header.Content>
											</Card.Description>
											<hr />
											{/* <Header>Manufacturing</Header> */}
											<List>
												<List.Item>
													<List.Header>Manufacturing</List.Header>
												</List.Item>
												{processess.map((item, i) => (
													<List.Item>
														<Icon
															name="check"
															color={
																i < sequence.indexOf(order.orderStatus) + 1 ? (
																	'green'
																) : (
																	'brown'
																)
															}
														/>
														<List.Content>{item.text}</List.Content>
													</List.Item>
												))}
											</List>
											<hr />

											<Button
												className="start"
												onClick={() => this.openModal(i)}
												style={{ margin: '0 auto' }}
											>
												Details
											</Button>
										</Card.Content>
									</Card>
									{/* <Card>
                    <Card.Content>
                      <Icon name="circle" size="small" color="brown" />{" "}
                      <span>Order Id: {order.orderId}</span>
                    </Card.Content>
                    <Card.Content>
                      <Card.Description>
                        <Header className="customer-name">
                          {order.orderStatus}
                          <span
                            className="circle"
                            style={{ backgroundColor: order.colour }}
                          />
                        </Header>
                        <Header.Content>
                          Make: {order.manufacturer}
                        </Header.Content>
                        <Header.Content>
                          Orderer: {order.orderer}
                        </Header.Content>
                      </Card.Description>
                      <Button className="start" onClick={() => this.openModal(i)}>
												Details
											</Button>
                    </Card.Content>
                  </Card> */}
								</Grid.Column>
							))}
					</Grid.Row>
				</Grid>
				<Modal open={this.state.open} onClose={this.handleClose} size="tiny" closeIcon>
					<Modal.Header>Vehicle Details</Modal.Header>
					<Modal.Content>
						{selectedVehicle && (
							<List>
								{/* make: 'gfdgd', modelType: 'gfdgdf', colour: 'green',
                        numberPlate: 'gdfgfdg', modelVersion: 'gfdgd', bodyType:
                        'gfdgfd', typeOfFuel: 'gdfgd', numberOfSeats: 5,
                        maxNetPower: 1500 */}
								<List.Item>Make: {selectedVehicle.vehicleDetails.make}</List.Item>
								<List.Item>Model Type: {selectedVehicle.vehicleDetails.modelType}</List.Item>
								<List.Item>Colour: {selectedVehicle.vehicleDetails.colour}</List.Item>
								<List.Item>Number Plate: {selectedVehicle.vehicleDetails.numberPlate}</List.Item>
								<List.Item>Model Version: {selectedVehicle.vehicleDetails.modelVersion}</List.Item>
								<List.Item>Body Type: {selectedVehicle.vehicleDetails.bodyType}</List.Item>
								<List.Item>Number Of Seats: {selectedVehicle.vehicleDetails.numberOfSeats}</List.Item>
								<List.Item>Max Net Power: {selectedVehicle.vehicleDetails.maxNetPower}</List.Item>
							</List>
						)}
					</Modal.Content>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	orders: state.vehicleRegisteration.vehicles.userVehicleOrders,
	loading: state.vehicleRegisteration.vehicles.userVehicleOrdersLoading
});

export default connect(mapStateToProps, { getUserVehicleOrders })(VehicleOrders);
