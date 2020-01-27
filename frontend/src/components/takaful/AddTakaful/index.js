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
  getAllTakafulRecord,
  updateTakafulVehicleOrderStatus
} from "../../../redux/takaful/actions";
import Loader from "react-loaders";

const options = [
  { key: "LIMITED", value: "LIMITED", text: "Limited" },
  { key: "LIFETIME", value: "LIFETIME", text: "Life Time" }
];
export class AddTakaful extends Component {
  state = {
    activeButton: "",
    open: false,
    recordId: "",
    description: "",
    vIn: "",
    takafulType: "",
    startDate: "",
    endDate: ""
  };
  componentDidMount() {
    this.props.getAllTakafulRecord();
  }

  openModal = (id, vin) => {
    this.setState({ open: true, selectedOrderId: id, vIn: vin });
  };
  handleClose = () =>
    this.setState({
      open: false,
      recordId: "",
      description: "",
      vIn: "",
      takafulType: "",
      startDate: "",
      endDate: ""
    });
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
      vIn: this.state.vIn,
      takafulType: this.state.takafulType,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    };

    this.props.updateTakafulVehicleOrderStatus(data, this.handleClose);
  };

  render() {
    let { takafulData, takafulLoading, addTakafulLoading } = this.props;

    let { recordId, description, takafulType, startDate, endDate } = this.state;
    if (takafulLoading) {
      return (
        <Loader
          className="page-loading"
          type="ball-scale-multiple"
          active={takafulLoading}
        />
      );
    }
    return (
      <div className="new-requests fahas">
        <Grid padded>
          <Grid.Row columns="1" divided className="dashboard-main">
            <Grid.Column className="left-section">
              <Header as="h2" dividing subheader="">
                <Header.Content>Show Takaful Records</Header.Content>
              </Header>
            </Grid.Column>
          </Grid.Row>
          {takafulData && takafulData.length > 0 ? (
            <Grid.Row columns="3">
              {takafulData.map((item, i) => (
                <Grid.Column key={i}>
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
                        Add Takaful
                      </Button>
                    </Card.Content>
                  </Card>
                </Grid.Column>
              ))}
            </Grid.Row>
          ) : (
            <Grid.Row>
              <Grid.Column>
                <Message negative fluid={'true'}>
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
              <Form.Input
                name="recordId"
                value={recordId}
                onChange={this.handleChange}
                placeholder="ID"
              />
              <Form.Select
                fluid={'true'}
                options={options}
                onChange={this.handleChange}
                value={takafulType}
                name="takafulType"
                placeholder="select takaful type"
              />
              {this.state.takafulType === "LIMITED" && (
                <React.Fragment>
                  <Form.Input
                    type="date"
                    name="startDate"
                    value={startDate}
                    onChange={this.handleChange}
                    placeholder="Start date"
                  />
                  <Form.Input
                    type="date"
                    name="endDate"
                    value={endDate}
                    onChange={this.handleChange}
                    placeholder="End date"
                  />
                </React.Fragment>
              )}

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
                {addTakafulLoading ? (
                  <Loader type="ball-pulse" active={addTakafulLoading} />
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
  takafulData: state.takaful.takafulData,
  takafulLoading: state.takaful.takafulLoading,
  addTakafulLoading: state.takaful.addTakafulLoading
});

export default connect(
  mapStateToProps,
  { getAllTakafulRecord, updateTakafulVehicleOrderStatus }
)(AddTakaful);
