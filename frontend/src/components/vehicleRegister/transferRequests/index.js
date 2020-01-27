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
  Modal,
  Table,
  List,
  Image,
  Popup
} from "semantic-ui-react";
import {
  getAllUserTransferRequests,
  approveUserTransferRequest,
  rejectUserTransferRequest,
  getVehicleFahasRecord,
  getVehicleTakafulRecord
} from "../../../redux/vehicleRegisteration/vehicles/actions";
import Loader from "react-loaders";

export class TransferRequests extends Component {
  state = {
    activeButton: "",
    openTakaful: false,
    openFahas: false,
    openDetail: false,
    seletedDetails: null
  };
  componentDidMount() {
    this.props.getAllUserTransferRequests();
  }
  handleSubmit = (vIn, i) => {
    this.setState({
      activeButton: i
    });
    const data = {
      vIn: vIn
    };
    this.props.approveUserTransferRequest(data);
  };
  rejectHandleSubmit = (vIn, i) => {
    this.setState({
      activeButton: i
    });
    const data = {
      vIn: vIn
    };
    this.props.rejectUserTransferRequest(vIn);
  };
  handleTakaful = (vIn, i) => {
    this.props.getVehicleTakafulRecord(vIn);
    this.setState({
      openTakaful: true
    });
  };
  handleFahas = (vIn, i) => {
    this.props.getVehicleFahasRecord(vIn);
    this.setState({
      openFahas: true
    });
  };
  handleDetails = i => {
    this.setState({
      openDetail: true,
      seletedDetails: i
    });
  };
  handleClose = (vIn, i) => {
    this.setState({
      openTakaful: false,
      openFahas: false
    });
  };
  render() {
    let {
      userTrasferRequests,
      loading,
      approveUserTransferLoading,
      rejectUserTransferLoading,
      user,
      takafulDetails,
      fahasDetails
    } = this.props;
    let details = null;
    if (this.state.seletedDetails !== null) {
      details =
        userTrasferRequests && userTrasferRequests[this.state.seletedDetails];
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
      <div className="transfer-requests">
        <Grid padded>
          <Grid.Row columns="1" divided className="dashboard-main">
            <Grid.Column className="left-section">
              <Header as="h2" dividing subheader="">
                <Header.Content>Transfer Requests</Header.Content>
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
          {// 	  loading ? (
          //     <div className="loader" />
          //   ) :
          userTrasferRequests && userTrasferRequests.length > 0 ? (
            <Grid.Row columns="4">
              {userTrasferRequests.map((item, i) => (
                <Grid.Column>
                  <Card>
                    <Card.Content textAlign="center" className="header">
                      <Popup
                        content="View Takaful Details"
                        trigger={
                          <Image
                            onClick={() => this.handleFahas(item.vIn, i)}
                            src={require("../../../assets/images/Icons/v1.0.png")}
                          />
                        }
                      />
                      <Popup
                        content="View Fahas Details"
                        trigger={
                          <Image
                            onClick={() => this.handleTakaful(item.vIn, i)}
                            src={require("../../../assets/images/Icons/v2.0.png")}
                          />
                        }
                      />
                      <Popup
                        content="View Transfer details"
                        trigger={
                          <Image
                            onClick={() => this.handleDetails(i)}
                            src={require("../../../assets/images/Icons/v3.0.png")}
                          />
                        }
                      />
                    </Card.Content>
                    <Card.Content>
                      <Card.Description>
                        <Header className="customer-name">
                          {item.vIn} <span className="circle" />
                        </Header>
                        <Header.Content>Owner: {item.owner}</Header.Content>
                        <Header.Content>
                          Seller: {item.transferDetails.seller}
                        </Header.Content>
                        <Header.Content>
                          Buyer: {item.transferDetails.buyer}
                        </Header.Content>
                        <Header.Content>
                          Status: {item.transferDetails.transferStatus}
                        </Header.Content>
                      </Card.Description>
                      {item.transferDetails.transferStatus ===
                      "BUYER_ACCEPTED" ? (
                        <Button
                          className="start"
                          onClick={() => this.rejectHandleSubmit(item.vIn, i)}
                        >
                          {rejectUserTransferLoading &&
                          this.state.activeButton === i ? (
                            <Loader
                              type="ball-pulse"
                              active={rejectUserTransferLoading}
                            />
                          ) : (
                            "Reject"
                          )}
                        </Button>
                      ) : item.transferDetails.transferStatus ===
                          "SELLER_INITIATED" &&
                        item.transferDetails.buyer == user ? (
                        <Button
                          className="start"
                          onClick={() => this.handleSubmit(item.vIn, i)}
                        >
                          {approveUserTransferLoading &&
                          this.state.activeButton === i ? (
                            <Loader
                              type="ball-pulse"
                              active={approveUserTransferLoading}
                            />
                          ) : (
                            "Approve"
                          )}
                        </Button>
                      ) : item.transferDetails.transferStatus ===
                          "SELLER_INITIATED" &&
                        item.transferDetails.buyer !== user ? (
                        <Button
                          className="start"
                          onClick={() => this.rejectHandleSubmit(item.vIn, i)}
                        >
                          {rejectUserTransferLoading &&
                          this.state.activeButton === i ? (
                            <Loader
                              type="ball-pulse"
                              active={rejectUserTransferLoading}
                            />
                          ) : (
                            "Reject"
                          )}
                        </Button>
                      ) : null}
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
        <Modal open={this.state.openTakaful} onClose={this.handleClose}>
          <Modal.Content>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>ID</Table.HeaderCell>
                  <Table.HeaderCell>Description</Table.HeaderCell>
                  <Table.HeaderCell>Takaful Type</Table.HeaderCell>
                  <Table.HeaderCell>Start Date </Table.HeaderCell>
                  <Table.HeaderCell>End Date </Table.HeaderCell>
                  <Table.HeaderCell>Takaful </Table.HeaderCell>
                  <Table.HeaderCell>vehicle </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {takafulDetails &&
                  takafulDetails.length > 0 &&
                  takafulDetails.map((item, i) => (
                    <Table.Row>
                      <Table.Cell>{item.recordId}</Table.Cell>
                      <Table.Cell>{item.description}</Table.Cell>
                      <Table.Cell>{item.takafulType}</Table.Cell>
                      <Table.Cell>{item.startDate}</Table.Cell>
                      <Table.Cell>{item.endDate}</Table.Cell>
                      <Table.Cell>{item.takaful}</Table.Cell>
                      <Table.Cell>{item.vehicle}</Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </Modal.Content>
        </Modal>
        <Modal open={this.state.openFahas} onClose={this.handleClose}>
          <Modal.Content>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>ID</Table.HeaderCell>
                  <Table.HeaderCell>Description</Table.HeaderCell>
                  <Table.HeaderCell>fahas</Table.HeaderCell>
                  {/* <Table.HeaderCell>Start Date </Table.HeaderCell>
                  <Table.HeaderCell>End Date </Table.HeaderCell> */}
                  <Table.HeaderCell>vehicle </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {fahasDetails &&
                  fahasDetails.length > 0 &&
                  fahasDetails.map((item, i) => (
                    <Table.Row>
                      <Table.Cell>{item.recordId}</Table.Cell>
                      <Table.Cell>{item.description}</Table.Cell>
                      <Table.Cell>{item.fahas}</Table.Cell>
                      {/* <Table.Cell>{item.startDate}</Table.Cell>
                      <Table.Cell>{item.endDate}</Table.Cell> */}
                      <Table.Cell>{item.vehicle}</Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </Modal.Content>
        </Modal>
        <Modal
          size="mini"
          open={this.state.openDetail}
          onClose={this.handleClose}
        >
          <Modal.Header>Transfer Details</Modal.Header>
          <Modal.Content>
            {details && (
              <List>
                <List.Item>buyer:{details.transferDetails.buyer}</List.Item>
                <List.Item>seller:{details.transferDetails.seller}</List.Item>
                <List.Item>
                  transferStatus:{details.transferDetails.transferStatus}
                </List.Item>
                <List.Item>vehicle:{details.transferDetails.vehicle}</List.Item>
              </List>
            )}
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userTrasferRequests: state.vehicleRegisteration.vehicles.userTrasferRequests,
  takafulDetails: state.vehicleRegisteration.vehicles.vehicleTakafulRecord,
  fahasDetails: state.vehicleRegisteration.vehicles.vehicleFahasRecord,
  approveUserTransferLoading:
    state.vehicleRegisteration.vehicles.approveUserTransferLoading,
  rejectUserTransferLoading:
    state.vehicleRegisteration.vehicles.rejectUserTransferLoading,

  loading: state.vehicleRegisteration.vehicles.userTrasferRequestsLoading,
  user: state.userAuth.user && state.userAuth.user.data.email
});

export default connect(mapStateToProps, {
  getAllUserTransferRequests,
  approveUserTransferRequest,
  rejectUserTransferRequest,
  getVehicleTakafulRecord,
  getVehicleFahasRecord
})(TransferRequests);
