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
import { getAllTakafulVehicles } from "../../../redux/takaful/actions";
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
export class AllTakaful extends Component {
  state = {
    activeButton: "",
    open: false,
    selectedOrder:{},
  };
  componentDidMount() {
    this.props.getAllTakafulVehicles();
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
    let { takafulVehiclesData, takafulVehiclesLoading } = this.props;
    let {selectedOrder}=this.state;
    if (takafulVehiclesLoading) {
      return (
        <Loader
          className="page-loading"
          type="ball-scale-multiple"
          active={takafulVehiclesLoading}
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
          {takafulVehiclesData && takafulVehiclesData.length > 0 ? (
            <Grid.Row columns="3">
              {takafulVehiclesData.map((item, i) => (
                <Grid.Column key={i}>
                       <Card>
                    <Card.Content>
                      <Icon name="circle" size="small" color="brown" />{" "}
                      <span>id: {item.recordId}</span>
                    </Card.Content>
                    <Card.Content>
                      <Card.Description>
                        {/* <Header className="customer-name">
                          ID:{item.recordId} <span className="circle" />
                        </Header> */}
                        <Header.Content>Takaful Type: {item.takafulType}</Header.Content>
                        <Header.Content>Start Date: {item.startDate}</Header.Content>
                        <Header.Content>Takaful: {item.takaful}</Header.Content>
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
                <Message negative fluid={'true'}>
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
  takafulVehiclesData: state.takaful.takafulVehiclesData,
  takafulVehiclesLoading: state.takaful.takafulVehiclesLoading
});

export default connect(
  mapStateToProps,
  { getAllTakafulVehicles }
)(AllTakaful);
