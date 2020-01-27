import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Header,
  Grid,
  Card,
  Button,
  List,
  Divider,
  Form,
  Input
} from "semantic-ui-react";
import {
  transferVehicle,
  getAllVehicles
} from "../../../redux/vehicleRegisteration/vehicles/actions";
import Loader from "react-loaders";

export class VehicleTransfer extends Component {
  state = {
    options: [],
    buyer: "",
    vIn: ""
  };
  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };
  componentDidMount() {
    this.props.getAllVehicles();
  }

  handleTransferVehicle = () => {
    const { buyer, vIn } = this.state;
    const data = { buyer, vIn };
    this.props.transferVehicle(data);
  };

  handleOptions = data => {
    let { options } = this.state;

    if (data) {
      options = data.map((item, index) => {
        return { key: item.vIn, value: item.vIn, text: item.vIn };
      });
    }

    this.setState({ options });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.vehicles && nextProps.vehicles.length > 0) {
      this.handleOptions(nextProps.vehicles);
    }
  }

  render() {
    const { vehicles, loading } = this.props;
    const { options, buyer, vIn } = this.state;

    return (
      <div className="vehicle-transfer">
        <Grid padded>
          <Grid.Row>
            <Grid.Column>
              <Header
                as="h2"
                content="Transfer of Vehicle"
                dividing
                subheader=""
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="dashboard-main">
            <Grid.Column className="left-section">
              <Form>
                <Form.Field>
                  <label>Vehicle Identification #</label>
                  <Form.Select
                    fluid
                    placeholder="Vehicle Identification #"
                    icon="arrow down"
                    className="icon"
                    size="large"
                    options={options}
                    name="vIn"
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Buyer Name</label>
                  <Form.Input
                    name="buyer"
                    fluid
                    placeholder="Buyer Name"
                    value={buyer}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Button
                  fluid
                  className="confirm"
                  disabled={loading}
                  onClick={this.handleTransferVehicle}
                >
                  {loading ? (
                    <Loader type="ball-pulse" active={loading} />
                  ) : (
                    "Confirm"
                  )}
                </Button>
              </Form>
            </Grid.Column>
            <Grid.Column className="section left" />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  vehicles: state.vehicleRegisteration.vehicles.allVehicles,
  loading: state.vehicleRegisteration.vehicles.transferVehicleLoading
});

export default connect(
  mapStateToProps,
  { transferVehicle, getAllVehicles }
)(VehicleTransfer);
