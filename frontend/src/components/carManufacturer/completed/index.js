import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Header,
  Grid,
  Button,
  Form,
  Card,
  Icon,
  Label,
  Message,
  List,
  Modal
} from "semantic-ui-react";
import {
  getAllVehiclesOrdersManufacturer,
  getAllManufacturer,
  updateVehicleOrderStatus
} from "../../../redux/carMenufecturer/actions";
import Loader from "react-loaders";

const options = [
  {
    key: "SCHEDULED_FOR_MANUFACTURE",
    value: "SCHEDULED_FOR_MANUFACTURE",
    text: "Under Manufacturing"
  },
  { key: "VIN_ASSIGNED", value: "VIN_ASSIGNED", text: "VIN Issued" },
  { key: "OWNER_ASSIGNED", value: "OWNER_ASSIGNED", text: "Owner Assigned" },
  { key: "DELIVERED", value: "DELIVERED", text: "Delivered" }
];
const processess = [
  { key: "PLACED", value: "PLACED", text: "Placed" },
  {
    key: "SCHEDULED_FOR_MANUFACTURE",
    value: "SCHEDULED_FOR_MANUFACTURE",
    text: "Under Manufacturing"
  },
  { key: "VIN_ASSIGNED", value: "VIN_ASSIGNED", text: "VIN Issued" },
  { key: "OWNER_ASSIGNED", value: "OWNER_ASSIGNED", text: "Owner Assigned" },
  { key: "DELIVERED", value: "DELIVERED", text: "Delivered" }
];
const sequence = [
  "PLACED",
  "SCHEDULED_FOR_MANUFACTURE",
  "VIN_ASSIGNED",
  "OWNER_ASSIGNED",
  "DELIVERED"
];
export class Completed extends Component {
  state = {
    open: false,
    orderStatus: "",
    vIn: "",
    orderId: "",
    selectedOrderId: null
  };
  componentDidMount() {
    let params = { orderStatus: "DELIVERED" };
    this.props.getAllVehiclesOrdersManufacturer(params);
  }
  openModal = id => {
    this.setState({ open: true, selectedOrderId: id });
  };
  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value })
    }
  };
  handleSubmit = (orderId, vIn) => {
    const { orderStatus } = this.state;
    let vInu = "";
    if (orderStatus === "OWNER_ASSIGNED" || orderStatus === "DELIVERED") {
      vInu = vIn;
    } else {
      vInu = this.state.vIn;
    }
    const data = {
      orderId,
      vIn: vInu,
      orderStatus
    };
    this.props.updateVehicleOrderStatus(data);
  };
  handleClose = () => this.setState({ open: false });

  render() {
    const { orders, loading } = this.props;
    const { selectedOrderId, vIn, orderStatus } = this.state;
    let selectedOrder = {};
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
      <div className="completed">
        <Grid padded>
          <Grid.Row columns="1" divided className="dashboard-main">
            <Grid.Column className="left-section">
              <Header as="h2" dividing subheader="">
                <Header.Content>
                  Completed Orders
                  <Label color="red" size="large">
                    {orders && orders.length}
                  </Label>
                  <Label color="red" size="large">
                    Manufacture All
                  </Label>
                </Header.Content>
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
          {loading ? (
            <div className="loader" />
          ) : orders && orders.length > 0 ? (
            <Grid.Row columns="3">
              {orders.map((order, i) => {
                return (
                  <Grid.Column>
                    <Card>
                      <Card.Content>
                        <Icon name="circle" size="small" color="brown" />{" "}
                        <span>{order.orderStatus}</span>
                      </Card.Content>
                      <Card.Content>
                        <Card.Description>
                          <Header className="customer-name">
                            {order.manufacturer}{" "}
                            <span
                              className="circle"
                              style={{
                                backgroundColor: order.vehicleDetails.colour
                              }}
                            />
                          </Header>
                          <Header.Content>
                            OrderId: {order.orderId}
                          </Header.Content>
                          <Header.Content>
                            Orderer: {order.orderer}
                          </Header.Content>
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
                                  i < sequence.indexOf(order.orderStatus) + 1
                                    ? "green"
                                    : "brown"
                                }
                              />
                              <List.Content>{item.text}</List.Content>
                            </List.Item>
                          ))}
                        </List>
                        {/* <hr />

                        <Button
                          className="start"
                          onClick={() => this.openModal(i)}
                          style={{ margin: "0 auto" }}
                        >
                          Start Manufacture
                        </Button> */}
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                );
              })}
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
          onClose={this.handleClose}
          open={this.state.open}
          size="mini"
        >
          <Modal.Header>Change Order Status</Modal.Header>
          <Modal.Content>
            {selectedOrder.hasOwnProperty("orderId") && (
              <Form>
                <Form.Select
                  fluid
                  options={options}
                  onChange={this.handleChange}
                  name="orderStatus"
                  placeholder="Order Status"
                />
                {orderStatus === "VIN_ASSIGNED" && (
                  // 	!(
                  //   orderStatus === "OWNER_ASSIGNED" ||
                  //   orderStatus === "DELIVERED"
                  // ) && (
                  <Form.Input
                    name="vIn"
                    value={vIn}
                    onChange={this.handleChange}
                    placeholder="vIn"
                  />
                )
                // )
                }

                <Button
                  primary
                  onClick={() =>
                    this.handleSubmit(selectedOrder.orderId, selectedOrder.vIn)
                  }
                  // onClick={this.modalHandler}
                  style={{ margin: "0 auto" }}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.carMenufecturer.allOrders,
  loading: state.carMenufecturer.allOrdersLoading
});

export default connect(
  mapStateToProps,
  { getAllVehiclesOrdersManufacturer, updateVehicleOrderStatus }
)(Completed);

// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Header, Grid, Button, Form, Card, List, Icon, Label } from 'semantic-ui-react';
// import {
// 	getAllVehiclesOrdersManufacturer,
// 	getAllManufacturer,
// 	updateVehicleOrderStatus
// } from '../../../redux/carMenufecturer/actions';

// export class Completed extends Component {
// 	componentDidMount() {
// 		this.props.getAllVehiclesOrdersManufacturer('PLACED');
// 	}
// 	render() {
// 		return (
// 			<div className="completed">
// 				<Grid padded>
// 					<Grid.Row columns="1" divided className="dashboard-main">
// 						<Grid.Column className="left-section">
// 							<Header as="h2" dividing subheader="">
// 								<Header.Content>Completed</Header.Content>
// 							</Header>
// 						</Grid.Column>
// 					</Grid.Row>
// 					<Grid.Row>
// 						<Grid.Column>
// 							<Form>
// 								<Form.Group widths="equal">
// 									<Form.Field>
// 										<label> Arrange by Date</label>
// 										<Form.Select
// 											fluid
// 											placeholder="Old Orders"
// 											icon="arrow down"
// 											className="icon"
// 											size="large"
// 										/>
// 									</Form.Field>
// 									<Form.Field>
// 										<label> Specific Date</label>
// 										<Form.Select
// 											fluid
// 											placeholder="- - / - - / --   "
// 											icon="arrow down"
// 											className="icon"
// 											size="large"
// 										/>
// 									</Form.Field>
// 									<Form.Field>
// 										<label>Specific Name/Order No</label>
// 										<Form.Input icon="search" placeholder="Please enter name/ order no" />
// 									</Form.Field>
// 								</Form.Group>
// 							</Form>
// 						</Grid.Column>
// 					</Grid.Row>
// 					<hr />
// 					<Grid.Row columns="3">
// 						<Grid.Column>
// 							<Card>
// 								<Card.Content>
// 									<Icon name="circle" size="small" color="green" /> <span>Shippings</span>
// 								</Card.Content>
// 								<Card.Content>
// 									<Card.Description>
// 										<Header className="customer-name">
// 											Ali Hassan <span className="circle" />
// 										</Header>
// 										<Header.Content>01 Aug 2019</Header.Content>
// 										<Header.Content>S/N 000000000cvfbr...</Header.Content>
// 									</Card.Description>
// 									<hr />
// 									{/* <Header>Manufacturing</Header> */}
// 									<List>
// 										<List.Item>
// 											<List.Header>Manufacturing</List.Header>
// 										</List.Item>
// 										<List.Item>
// 											<Icon name="check" color="green" />
// 											<List.Content>
// 												Chassis <span>6 Hr</span>
// 											</List.Content>
// 										</List.Item>
// 										<List.Item>
// 											<Icon name="check" color="green" />
// 											<List.Content>
// 												VIN Issue <span>6 Hr</span>
// 											</List.Content>
// 										</List.Item>
// 										<List.Item>
// 											<Icon name="check" color="green" />
// 											<List.Content>
// 												Owner assigned <span>6 Hr</span>
// 											</List.Content>
// 										</List.Item>
// 										<List.Item>
// 											<Icon name="check" color="brown" />
// 											<List.Content>
// 												Interior <span>6 Hr</span>
// 											</List.Content>
// 										</List.Item>
// 										<List.Item>
// 											<Icon name="check" color="brown" />
// 											<List.Content>
// 												Paint <span>6 Hr</span>
// 											</List.Content>
// 										</List.Item>
// 									</List>
// 									<hr />
// 									<List>
// 										<List.Item>
// 											<List.Header>Delivery</List.Header>
// 										</List.Item>
// 										<List.Item>
// 											<Icon name="check" color="brown" />
// 											<List.Content>
// 												Shipping in <span>6 Hr</span>
// 											</List.Content>
// 										</List.Item>
// 									</List>
// 								</Card.Content>
// 							</Card>
// 						</Grid.Column>
// 						<Grid.Column>
// 							<Card>
// 								<Card.Content>
// 									<Icon name="circle" size="small" color="green" /> <span>Shippings</span>
// 								</Card.Content>
// 								<Card.Content>
// 									<Card.Description>
// 										<Header className="customer-name">
// 											Ali Hassan <span className="circle" />
// 										</Header>
// 										<Header.Content>01 Aug 2019</Header.Content>
// 										<Header.Content>S/N 000000000cvfbr...</Header.Content>
// 									</Card.Description>
// 									<hr />
// 									{/* <Header>Manufacturing</Header> */}
// 									<List>
// 										<List.Item>
// 											<List.Header>Manufacturing</List.Header>
// 										</List.Item>
// 										<List.Item>
// 											<Icon name="check" color="green" />
// 											<List.Content>
// 												Chassis <span>6 Hr</span>
// 											</List.Content>
// 										</List.Item>
// 										<List.Item>
// 											<Icon name="check" color="green" />
// 											<List.Content>
// 												VIN Issue <span>6 Hr</span>
// 											</List.Content>
// 										</List.Item>
// 										<List.Item>
// 											<Icon name="check" color="green" />
// 											<List.Content>
// 												Owner assigned <span>6 Hr</span>
// 											</List.Content>
// 										</List.Item>
// 										<List.Item>
// 											<Icon name="check" color="brown" />
// 											<List.Content>
// 												Interior <span>6 Hr</span>
// 											</List.Content>
// 										</List.Item>
// 										<List.Item>
// 											<Icon name="check" color="brown" />
// 											<List.Content>
// 												Paint <span>6 Hr</span>
// 											</List.Content>
// 										</List.Item>
// 									</List>
// 									<hr />
// 									<List>
// 										<List.Item>
// 											<List.Header>Delivery</List.Header>
// 										</List.Item>
// 										<List.Item>
// 											<Icon name="check" color="brown" />
// 											<List.Content>
// 												Shipping in <span>6 Hr</span>
// 											</List.Content>
// 										</List.Item>
// 									</List>
// 								</Card.Content>
// 							</Card>
// 						</Grid.Column>
// 						<Grid.Column>
// 							<Card>
// 								<Card.Content>
// 									<Icon name="circle" size="small" color="green" /> <span>Shippings</span>
// 								</Card.Content>
// 								<Card.Content>
// 									<Card.Description>
// 										<Header className="customer-name">
// 											Ali Hassan <span className="circle" />
// 										</Header>
// 										<Header.Content>01 Aug 2019</Header.Content>
// 										<Header.Content>S/N 000000000cvfbr...</Header.Content>
// 									</Card.Description>
// 									<hr />
// 									{/* <Header>Manufacturing</Header> */}
// 									<List>
// 										<List.Item>
// 											<List.Header>Manufacturing</List.Header>
// 										</List.Item>
// 										<List.Item>
// 											<Icon name="check" color="green" />
// 											<List.Content>
// 												Chassis <span>6 Hr</span>
// 											</List.Content>
// 										</List.Item>
// 										<List.Item>
// 											<Icon name="check" color="green" />
// 											<List.Content>
// 												VIN Issue <span>6 Hr</span>
// 											</List.Content>
// 										</List.Item>
// 										<List.Item>
// 											<Icon name="check" color="green" />
// 											<List.Content>
// 												Owner assigned <span>6 Hr</span>
// 											</List.Content>
// 										</List.Item>
// 										<List.Item>
// 											<Icon name="check" color="brown" />
// 											<List.Content>
// 												Interior <span>6 Hr</span>
// 											</List.Content>
// 										</List.Item>
// 										<List.Item>
// 											<Icon name="check" color="brown" />
// 											<List.Content>
// 												Paint <span>6 Hr</span>
// 											</List.Content>
// 										</List.Item>
// 									</List>
// 									<hr />
// 									<List>
// 										<List.Item>
// 											<List.Header>Delivery</List.Header>
// 										</List.Item>
// 										<List.Item>
// 											<Icon name="check" color="brown" />
// 											<List.Content>
// 												Shipping in <span>6 Hr</span>
// 											</List.Content>
// 										</List.Item>
// 									</List>
// 								</Card.Content>
// 							</Card>
// 						</Grid.Column>
// 					</Grid.Row>
// 				</Grid>
// 			</div>
// 		);
// 	}
// }

// const mapStateToProps = (state) => ({});

// export default connect(mapStateToProps, { getAllVehiclesOrdersManufacturer })(Completed);
