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
  List,
  Table,
  Popup,
  Image
} from "semantic-ui-react";
import {
  getAllTransferRequests,
  approveVehicle,
  getUnApprovedVehivles,
  getVehicleTakafulRecord,
  getVehicleFahasRecord
} from "../../../redux/actions";
import Loader from "react-loaders";

export class ApproveVehicleRegisteration extends Component {
  state = {
    openTakaful: false,
    openFahas: false,
    openDetail: false,
    seletedDetails: null
  };
  componentDidMount() {
    this.props.getUnApprovedVehivles();
  }
  handleSubmit = vIn => {
    const data = {
      vIn: vIn
    };
    this.props.approveVehicle(data);
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
      openFahas: false,
      openDetail: false
    });
  };
  render() {
    let {
      vehicles,
      loading,
      approveLoading,
      takafulDetails,
      fahasDetails
    } = this.props;
    let details = null;
    if (this.state.seletedDetails !== null) {
      details = vehicles && vehicles[this.state.seletedDetails];
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
                <Header.Content>Approve Vehicle Registeration</Header.Content>
              </Header>
            </Grid.Column>
          </Grid.Row>

          {vehicles && vehicles.length > 0 ? (
            <Grid.Row columns="3">
              {vehicles.map((item, i) => (
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
                        content="View full details"
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
                          {item.vIn}{" "}
                          <span
                            className="circle"
                            style={{
                              backgroundColor: item.vehicleDetails.colour
                            }}
                          />
                        </Header>
                        <Header.Content>
                          Make: {item.vehicleDetails.make}
                        </Header.Content>
                        <Header.Content>
                          Modal Type: {item.vehicleDetails.modelType}
                        </Header.Content>
                        <Header.Content>
                          Seats: {item.vehicleDetails.numberOfSeats}
                        </Header.Content>
                        <Header.Content>
                          Power: {item.vehicleDetails.maxNetPower}
                        </Header.Content>
                      </Card.Description>
                      <Button
                        className="start"
                        onClick={() => this.handleSubmit(item.vIn)}
                      >
                        Approve
                        {/* {approveLoading ? <Loader type="ball-clip-rotate" /> : 'Approve'} */}
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
          <Modal.Header>Vehicle Details</Modal.Header>
          <Modal.Content>
            {details && (
              <List>
                <List.Item>make:{details.vehicleDetails.make}</List.Item>
                <List.Item>
                  modelType:{details.vehicleDetails.modelType}
                </List.Item>
                <List.Item>colour:{details.vehicleDetails.colour}</List.Item>
                <List.Item>
                  modelVersion:{details.vehicleDetails.modelVersion}
                </List.Item>
                <List.Item>
                  bodyType:{details.vehicleDetails.bodyType}
                </List.Item>
                <List.Item>
                  typeOfFuel:{details.vehicleDetails.typeOfFuel}
                </List.Item>
                <List.Item>
                  numberOfSeats:{details.vehicleDetails.numberOfSeats}
                </List.Item>
                <List.Item>
                  maxNetPower:{details.vehicleDetails.maxNetPower}
                </List.Item>
              </List>
            )}
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  vehicles: state.interiorMinitory.allUnApprovedVehicles,
  loading: state.interiorMinitory.allUnApprovedVehiclesLoading,
  approveLoading: state.interiorMinitory.approveVehicleLoading,
  takafulDetails: state.vehicleRegisteration.vehicles.vehicleTakafulRecord,
  fahasDetails: state.vehicleRegisteration.vehicles.vehicleFahasRecord
});

export default connect(mapStateToProps, {
  getUnApprovedVehivles,
  approveVehicle,
  getVehicleTakafulRecord,
  getVehicleFahasRecord
})(ApproveVehicleRegisteration);
