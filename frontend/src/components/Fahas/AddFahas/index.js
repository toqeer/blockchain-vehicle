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
  TextArea
} from "semantic-ui-react";
import {
  getAllFahasRecord,
  updateFahasVehicleOrderStatus
} from "../../../redux/fahas/actions";
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
export class AddFahas extends Component {
  state = {
    activeButton: "",
    open: false,
    recordId: "",
    description: "",
    vIn: ""
  };
  componentDidMount() {
    this.props.getAllFahasRecord();
  }

  openModal = (id, vin) => {
    this.setState({ open: true, selectedOrderId: id, vIn: vin });
  };
  handleClose = () =>
    this.setState({ open: false, recordId: "", description: "", vIn: "" });
  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value }, () => {
      });
    }
  };
  handleSubmit = () => {
    const data = {
      recordId: this.state.recordId,
      description: this.state.description,
      vIn: this.state.vIn
    };
    this.props.updateFahasVehicleOrderStatus(data, this.handleClose);
  };

  render() {
    let { fahasData, fahasLoading, addFahasLoading } = this.props;
    let { recordId, description } = this.state;
    if (fahasLoading) {
      return (
        <Loader
          className="page-loading"
          type="ball-scale-multiple"
          active={fahasLoading}
        />
      );
    }
    return (
      <div className="new-requests fahas">
        <Grid padded>
          <Grid.Row columns="1" divided className="dashboard-main">
            <Grid.Column className="left-section">
              <Header as="h2" dividing subheader="">
                <Header.Content>Show Fahas Records</Header.Content>
              </Header>
            </Grid.Column>
          </Grid.Row>
          {fahasData && fahasData.length > 0 ? (
            <Grid.Row columns="3">
              {fahasData.map((item, i) => (
                <Grid.Column>
                  <Card>
                    <Card.Content>
                      <Icon name="circle" size="small" color="brown" />{" "}
                      <span>vIn: {item.vIn}</span>
                    </Card.Content>
                    <Card.Content>
                      <Card.Description>
                        {/* <Header className="customer-name">
                          ID:{item.recordId} <span className="circle" />
                        </Header> */}
                        <Header.Content>Owner: {item.owner}</Header.Content>
                        <Header.Content>
                          Transfer Flag: {item.transferFlag}
                        </Header.Content>
                        <Header.Content>
                          Make: {item.vehicleDetails.make}
                        </Header.Content>
                        <Header.Content>
                          Model Type: {item.vehicleDetails.modelType}
                        </Header.Content>
                        <Header.Content>
                          Number Of Seats: {item.vehicleDetails.numberOfSeats}
                        </Header.Content>
                      </Card.Description>

                      <Button
                        className="start"
                        onClick={() => {
                          this.openModal(i, item.vIn);
                        }}
                      >
                        Add Fahas
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
          onClose={this.handleClose}
          open={this.state.open}
          size="mini"
        >
          <Modal.Header>Change Order Status</Modal.Header>
          <Modal.Content>
            <Form>
              {/* <Form.Select
                fluid
                options={options}
                onChange={this.handleChange}
                name="orderStatus"
                placeholder="Order Status"
              /> */}
              <Form.Input
                name="recordId"
                value={recordId}
                onChange={this.handleChange}
                placeholder="ID"
              />
              {/* <Form.Input
                name="description"
                value={description}
                onChange={this.handleChange}
                placeholder="Description"
              /> */}
              <TextArea
                name="description"
                placeholder="Description"
                onChange={this.handleChange}
                value={description}
              />
              <Button
                className="modalbtn"
                onClick={() => this.handleSubmit()}
                // onClick={this.modalHandler}
                primary
                style={{ margin: "0 auto" }}
              >
                {addFahasLoading ? (
                  <Loader type="ball-pulse" active={addFahasLoading} />
                ) : (
                  "Submit"
                )}
              </Button>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fahasData: state.fahas.fahasData,
  fahasLoading: state.fahas.fahasLoading,
  addFahasLoading: state.fahas.addFahasLoading
});

export default connect(
  mapStateToProps,
  { getAllFahasRecord, updateFahasVehicleOrderStatus }
)(AddFahas);
