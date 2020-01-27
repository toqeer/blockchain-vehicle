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
import { placeVehicleOrder, getAllManufacturer } from "../../../redux/actions";
import Loader from "react-loaders";

const colourOptions = [
  { key: "red", value: "red", text: "Red" },
  { key: "brown", value: "brown", text: "brown" },
  { key: "green", value: "green", text: "green" }
];
export class CarBuild extends Component {
  state = {
    modelType: "",
    colour: "",
    modelVersion: "",
    bodyType: "",
    typeOfFuel: "",
    numberOfSeats: 0,
    maxNetPower: 0,
    make: "",
    mfgOptions: [],
    manufacturer: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handlSelect = (e, { value }) => this.setState({ colour: value });
  handlSelectMenufacturer = (e, { value }) => {
    this.setState({ manufacturer: value });
  };

  handlePlaceOrder = () => {
    const {
      manufacturer,
      modelType,
      colour,
      modelVersion,
      bodyType,
      typeOfFuel,
      numberOfSeats,
      maxNetPower
    } = this.state;
    let values = manufacturer.split("/");
    this.props.placeVehicleOrder({
      vehicleDetails: {
        make: values[0],
        modelType,
        colour,
        modelVersion,
        bodyType,
        typeOfFuel,
        numberOfSeats,
        maxNetPower
      },
      manufacturer: values[1]
    });
  };

  componentDidMount() {
    this.props.getAllManufacturer();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.manufacturer && nextProps.manufacturer.length > 0) {
      this.handleOptions(nextProps.manufacturer);
    }
  }

  handleOptions = data => {
    let options = [];

    if (data) {
      options = data.map((item, index) => {
        return {
          key: item.title,
          value: item.companyId + "/" + item.title,
          text: item.title
        };
      });
    }

    this.setState({ mfgOptions: options });
  };
  render() {
    const {
      manufacturer,
      modelType,
      colour,
      numberPlate,
      modelVersion,
      bodyType,
      typeOfFuel,
      numberOfSeats,
      maxNetPower,
      mfgOptions
    } = this.state;

    const { placeOrderLoading } = this.props;
    return (
      <div className="car-build">
        <Grid padded>
          <Grid.Row columns="equal" divided className="dashboard-main">
            <Grid.Column className="left-section">
              <Header
                as="h2"
                content="Build Your Vehicle"
                subheader="For new Vehicle Order"
                dividing
              />
              <Form>
                <Form.Field>
                  <label>Manufacturer</label>
                  <Form.Select
                    fluid
                    placeholder="Manufacturerr"
                    onChange={this.handlSelectMenufacturer}
                    value={manufacturer}
                    name="manufacturer"
                    options={mfgOptions}
                    icon="arrow down"
                    className="icon"
                  />
                </Form.Field>

                <Form.Field>
                  <label>Model Type</label>
                  <Input
                    onChange={this.handleChange}
                    value={modelType}
                    name="modelType"
                    placeholder="Car Manufacturer"
                  />
                </Form.Field>

                <Form.Field>
                  <label>Color</label>
                  <Form.Select
                    fluid
                    placeholder="Car Color"
                    icon="arrow down"
                    className="icon"
                    options={colourOptions}
                    onChange={this.handlSelect}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Number Plate</label>
                  <Form.Input
                    onChange={this.handleChange}
                    value={numberPlate}
                    name="numberPlate"
                    fluid
                    placeholder="Number Plate"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Model Version</label>
                  <Form.Input
                    onChange={this.handleChange}
                    value={modelVersion}
                    name="modelVersion"
                    fluid
                    placeholder="Model Version"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Body Type</label>
                  <Form.Input
                    onChange={this.handleChange}
                    value={bodyType}
                    name="bodyType"
                    fluid
                    placeholder="Body Type"
                  />
                </Form.Field>
                {/* <Form.Field>
                  <label>Model Name</label>
                  <Form.Input
                    onChange={this.handleChange}
                    value={}
                    name="modelType"
                    fluid
                    placeholder="Car Model Name i.e. Corolla"

                  />
                </Form.Field> */}
                <Form.Field>
                  <label>Type Of Fuel</label>
                  <Form.Input
                    onChange={this.handleChange}
                    value={typeOfFuel}
                    name="typeOfFuel"
                    fluid
                    placeholder="Type Of Fuel"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Number Of Seats</label>
                  <Form.Input
                    onChange={this.handleChange}
                    value={numberOfSeats}
                    name="numberOfSeats"
                    fluid
                    placeholder="Number Of Seats"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Max Net Power</label>
                  <Form.Input
                    onChange={this.handleChange}
                    value={maxNetPower}
                    name="maxNetPower"
                    fluid
                    placeholder="Max Net Power"
                  />
                </Form.Field>
                <Button
                  fluid
                  className="register"
                  disabled={placeOrderLoading}
                  onClick={this.handlePlaceOrder}
                >
                  {placeOrderLoading ? (
                    <Loader type="ball-pulse" active={placeOrderLoading} />
                  ) : (
                    "Register Vehicle"
                  )}
                </Button>
              </Form>
            </Grid.Column>
            <Grid.Column className="right-section">
              {/* <Header as="h2" content="Vehicle Profile" subheader="" dividing />
              <Form>
                <Form.Field inline className="toggler">
                  <label>Fahas </label>
                  <div className="toggle-field">
                    <span>yes</span> <Form.Radio toggle /> <span>no</span>
                  </div>
                </Form.Field>
                <Form.Field inline className="toggler">
                  <label>Insured</label>
                  <div className="toggle-field">
                    <span>yes</span> <Form.Radio toggle /> <span>no</span>
                  </div>
                </Form.Field>

                <Form.Field>
                  <label>Insured from</label>
                  <Form.Select
                    fluid
                    placeholder="Vehicle Insurance Date from"
                    icon="arrow down"
                    className="icon"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Insured till</label>
                  <Form.Select
                    fluid
                    placeholder="Vehicle Insurance Date till"
                    icon="arrow down"
                    className="icon"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Insurance Compnay</label>
                  <Form.Input fluid placeholder="Insurance Compnay" />
                </Form.Field>
                <Button fluid className="save">
                  Save Vehicle Record
                </Button>
              </Form> */}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  manufacturer: state.carMenufecturer.allManufacturer,
  placeOrderLoading: state.vehicleRegisteration.vehicles.placeOrderLoading
});

export default connect(mapStateToProps, {
  placeVehicleOrder,
  getAllManufacturer
})(CarBuild);
