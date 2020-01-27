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
  List
} from "semantic-ui-react";
import { getAllFahasVehicles } from "../../../redux/fahas/actions";
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
    selectedOrder:{},
  };
  componentDidMount() {
    this.props.getAllFahasVehicles();
  }

  openModal = item => {
    this.setState({ open: true, selectedOrder: item });
  };
  handleClose = () => this.setState({ open: false });
  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };
  handleSubmit = (vIn, i) => {
    this.setState({
      activeButton: i
    });
    const data = {
      vIn: vIn
    };
    // this.props.approveUserTransferRequest(data);
  };

  render() {
    let { fahasVehiclesData, fahasVehiclesLoading } = this.props;
    let {selectedOrder}=this.state;
    if (fahasVehiclesLoading) {
      return (
        <Loader
          className="page-loading"
          type="ball-scale-multiple"
          active={fahasVehiclesLoading}
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
          {fahasVehiclesData && fahasVehiclesData.length > 0 ? (
            <Grid.Row columns="3">
              {fahasVehiclesData.map((item, i) => (
                <Grid.Column>
                       <Card>
                    <Card.Content>
                      <Icon name="circle" size="small" color="brown" />{" "}
                      <span>{item.recordId}</span>
                    </Card.Content>
                    <Card.Content>
                      <Card.Description>
                        {/* <Header className="customer-name">
                          ID:{item.recordId} <span className="circle" />
                        </Header> */}
                        <Header.Content>Fahas: {item.fahas}</Header.Content>
                        <Header.Content>Vehicle: {item.vehicle}</Header.Content>
                        <Header.Content>
                          Description: {item.description}
                        </Header.Content>
                      </Card.Description>

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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fahasVehiclesData: state.fahas.fahasVehiclesData,
  fahasVehiclesLoading: state.fahas.fahasVehiclesLoading
});

export default connect(
  mapStateToProps,
  { getAllFahasVehicles }
)(AddFahas);
