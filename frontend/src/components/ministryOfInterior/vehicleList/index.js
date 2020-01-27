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
  Modal,
  List,
  Table,
  Popup,
  Image,
  Message
} from "semantic-ui-react";
import {
  getAllVehicle,
  getVehicleTransaction,
  getVehicleFahasRecord,
  getVehicleTakafulRecord
} from "../../../redux/actions";
import Loader from "react-loaders";
import VehicleTransactions from "./vehicleTransactions";

export class VehicleList extends Component {
  state = {
    open: false,
    selectedVehicleId: null,
    openVT: false,
    openFahas: false,
    openTakaful: false
  };
  componentDidMount() {
    this.props.getAllVehicle();
  }
  openModal = i => {
    this.setState({ open: true, selectedVehicleId: i });
  };
  handleClose = () =>
    this.setState({ open: false, openFahas: false, openTakaful: false });
  handleVTClose = () => this.setState({ openVT: false });
  viewTransaction = vIn => {
    this.props.getVehicleTransaction(vIn);
    this.setState({ openVT: true });
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
  render() {
    const {
      vehicles,
      loading,
      transactions,
      takafulDetails,
      fahasDetails
    } = this.props;
    const { selectedVehicleId } = this.state;
    let selectedVehicle = null;
    if (selectedVehicleId !== null && vehicles && vehicles.length > 0) {
      selectedVehicle = vehicles[selectedVehicleId];
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
      <div className="car-list">
        <Grid padded>
          <Grid.Row columns="1" divided className="dashboard-main">
            <Grid.Column className="left-section">
              <Header as="h2" dividing subheader="">
                <Header.Content>All Vehicles</Header.Content>
              </Header>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            {vehicles && vehicles.length > 0 ? (
              vehicles.map((vehicle, i) => (
                <Grid.Column width={4}>
                  <Card>
                    <Card.Content textAlign="center" className="header">
                      <Popup
                        content="View Takaful Details"
                        trigger={
                          <Image
                            onClick={() => this.handleFahas(vehicle.vIn, i)}
                            src={require("../../../assets/images/Icons/v1.0.png")}
                          />
                        }
                      />
                      <Popup
                        content="View Fahas Details"
                        trigger={
                          <Image
                            onClick={() => this.handleTakaful(vehicle.vIn, i)}
                            src={require("../../../assets/images/Icons/v2.0.png")}
                          />
                        }
                      />
                      <Popup
                        content="View transations"
                        trigger={
                          <Image
                            onClick={() => this.viewTransaction(vehicle.vIn)}
                            src={require("../../../assets/images/Icons/v3.0.png")}
                          />
                        }
                      />
                    </Card.Content>

                    <Card.Content>
                      <Card.Description>
                        <Header className="customer-name">
                          {vehicle.vIn}
                          <span
                            className="circle"
                            style={{
                              backgroundColor: vehicle.vehicleDetails.colour
                            }}
                          />
                        </Header>
                        <Header.Content>vIn: {vehicle.vIn}</Header.Content>
                        <Header.Content>
                          Make: {vehicle.vehicleDetails.make}
                        </Header.Content>
                        <Header.Content>
                          {" "}
                          Model Type: {vehicle.vehicleDetails.modelType}
                        </Header.Content>
                      </Card.Description>
                      <center>
                        <Button className="" onClick={() => this.openModal(i)}>
                          Full Details
                        </Button>
                      </center>
                    </Card.Content>
                  </Card>
                </Grid.Column>
              ))
            ) : (
              <Grid.Column>
                <Message negative fluid>
                  <Message.Header>No order found</Message.Header>
                </Message>
              </Grid.Column>
            )}
          </Grid.Row>
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
          closeIcon
          open={this.state.open}
          onClose={this.handleClose}
          size="tiny"
        >
          <Modal.Header>Vehicle Details</Modal.Header>
          <Modal.Content>
            {selectedVehicle && (
              <List>
                <List.Item>
                  Make: {selectedVehicle.vehicleDetails.make}
                </List.Item>
                <List.Item>
                  Model Type: {selectedVehicle.vehicleDetails.modelType}
                </List.Item>
                <List.Item>
                  Colour: {selectedVehicle.vehicleDetails.colour}
                </List.Item>
                <List.Item>
                  Number Plate: {selectedVehicle.vehicleDetails.numberPlate}
                </List.Item>
                <List.Item>
                  Model Version: {selectedVehicle.vehicleDetails.modelVersion}
                </List.Item>
                <List.Item>
                  Body Type: {selectedVehicle.vehicleDetails.bodyType}
                </List.Item>
                <List.Item>
                  Number Of Seats:{" "}
                  {selectedVehicle.vehicleDetails.numberOfSeats}
                </List.Item>
                <List.Item>
                  Max Net Power: {selectedVehicle.vehicleDetails.maxNetPower}
                </List.Item>
              </List>
            )}
          </Modal.Content>
        </Modal>
        <Modal
          closeIcon
          open={this.state.openVT}
          onClose={this.handleVTClose}
          size="large"
        >
          <Modal.Header>Vehicle Transaction</Modal.Header>
          <Modal.Content>
            <VehicleTransactions transactions={transactions} />
            {/* {transactions && transactions.length > 0 && (
              <Table striped>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>
                      <Icon name="arrow up" />#
                    </Table.HeaderCell>
                    <Table.HeaderCell>Transaction ID</Table.HeaderCell>
                    <Table.HeaderCell>Transaction Type</Table.HeaderCell>
                    <Table.HeaderCell>Asset Linked</Table.HeaderCell>
                    <Table.HeaderCell>Time Stamp</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                {transactions.map((item, i) => (
                  <Table.Body key={i}>
                    <Table.Row>
                      <Table.Cell>{i + 1}</Table.Cell>
                      <Table.Cell
                        className="transactionId"
                        // onClick={() => viewDetails(item.transactionInvoked)}
                      >
                        {item.transactionId}
                      </Table.Cell>
                      <Table.Cell>{item.transactionType}</Table.Cell>
                      <Table.Cell>{item.assetLinked}</Table.Cell>
                      <Table.Cell>{item.timestamp}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
              </Table>
            )} */}
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  vehicles: state.interiorMinitory.allVehicle,
  transactions: state.vehicleRegisteration.vehicles.vehicleTransaction,
  loading: state.interiorMinitory.allVehicleLoading,
  takafulDetails: state.vehicleRegisteration.vehicles.vehicleTakafulRecord,
  fahasDetails: state.vehicleRegisteration.vehicles.vehicleFahasRecord
});

export default connect(mapStateToProps, {
  getAllVehicle,
  getVehicleTransaction,
  getVehicleFahasRecord,
  getVehicleTakafulRecord
})(VehicleList);
