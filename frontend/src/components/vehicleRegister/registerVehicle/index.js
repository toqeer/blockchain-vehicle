import React, { Component } from "react";
import { Header, Grid, Button, Form, Input } from "semantic-ui-react";
import { connect } from "react-redux";
import { registerVehicle, getAllManufacturer } from "../../../redux/actions";
import Loader from "react-loaders";

const colourOptions = [
  { key: "red", value: "red", text: "Red" },
  { key: "brown", value: "brown", text: "brown" },
  { key: "green", value: "green", text: "green" }
];
class RegisterVehicle extends Component {
  state = {
    vIn: "",
    make: "",
    modelType: "",
    colour: "",
    numberPlate: "",
    modelVersion: "",
    bodyType: "",
    typeOfFuel: "",
    numberOfSeats: 0,
    maxNetPower: 0,
    mfgOptions: []
  };
  componentDidMount() {
    this.props.getAllManufacturer();
  }

  // handleChange = (e) => {
  // 	this.setState({ [e.target.name]: e.target.value });
  // };
  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };
  handlSelect = (e, { value }) => this.setState({ colour: value });
  handlSelectMenufacturer = (e, { value }) => {
    this.setState({ make: value });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.manufacturer && nextProps.manufacturer.length > 0) {
      this.handleOptions(nextProps.manufacturer);
    }
  }

  handleOptions = data => {
    let { options } = this.state;

    if (data) {
      options = data.map((item, index) => {
        return { key: item.title, value: item.companyId, text: item.title };
      });
    }

    this.setState({ mfgOptions: options });
  };

  handleVehicleRegister = () => {
    const {
      vIn,
      make,
      modelType,
      colour,
      numberPlate,
      modelVersion,
      bodyType,
      typeOfFuel,
      numberOfSeats,
      maxNetPower
    } = this.state;
    
    this.props.registerVehicle({
      vIn,
      vehicleDetails: {
        make,
        modelType,
        colour,
        numberPlate,
        modelVersion,
        bodyType,
        typeOfFuel,
        numberOfSeats,
        maxNetPower
      }
    });
  };
  render() {
    const {
      vIn,
      make,
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
    const { loading } = this.props;

    return (
      <div className="register-vehicle">
        <Form>
          <Grid padded>
            <Grid.Row columns="equal" className="dashboard-main">
              <Grid.Column className="left-section">
                {/* {loading && <div className="loader" />} */}
                <Header
                  as="h2"
                  content="Register Old Vehicle"
                  subheader="All Old vehicles registeration"
                  dividing
                />

                <Form.Field>
                  <label>Vehicle Indentitification #</label>
                  <Input
                    onChange={this.handleChange}
                    value={vIn}
                    name="vIn"
                    placeholder="Vehicle Indentitification #"
                  />
                </Form.Field>

                <Form.Field>
                  <label>Manufacturer</label>
                  <Form.Select
                    fluid
                    placeholder="Manufacturer"
                    onChange={this.handlSelectMenufacturer}
                    // value={make}
                    name="make"
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
                    placeholder="Chose your Car Manufacturer"
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
				  disabled={loading}
                  onClick={this.handleVehicleRegister}
                >
                  {loading ? (
                    <Loader type="ball-pulse" active={loading} />
                  ) : (
                    "Register Vehicle"
                  )}
                </Button>
              </Grid.Column>
              <Grid.Column />
            </Grid.Row>
          </Grid>
        </Form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  manufacturer: state.carMenufecturer.allManufacturer,
  loading: state.vehicleRegisteration.vehicles.registerVehicleLoading
});

export default connect(
  mapStateToProps,
  { registerVehicle, getAllManufacturer }
)(RegisterVehicle);
