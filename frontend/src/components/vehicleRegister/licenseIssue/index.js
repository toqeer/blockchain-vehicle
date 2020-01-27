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
import Loader from "react-loaders";
import { placeLiscenceOrder, getAllMinistory } from "../../../redux/actions";

export class LiscenseIssue extends Component {
  state = {
    picture: "abc",
    ministory: "",
    ministoryOptions: []
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handlSelectMenufacturer = (e, { value }) => {
    this.setState({ ministory: value });
  };
  handleSubmit = () => {
    const { picture, ministory } = this.state;
    const data = {
      licenseDetails: {
        picture
      },
      ministory
    };

    this.props.placeLiscenceOrder(data);
  };
  componentDidMount() {
    this.props.getAllMinistory();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.allMinistory && nextProps.allMinistory.length > 0) {
      this.handleOptions(nextProps.allMinistory);
    }
  }
  handleOptions = data => {
    let options = [];

    if (data) {
      options = data.map((item, index) => {
        return {
          key: item.title,
          value: item.mId,
          text: item.title
        };
      });
    }

    this.setState({ ministoryOptions: options });
  };
  render() {
    const { ministoryOptions, ministory } = this.state;
    const { loading } = this.props;

    return (
      <div className="liscense-issue">
        {" "}
        <Grid padded>
          <Grid.Row>
            <Grid.Column>
              <Header as="h2" content="Liscence Order" dividing />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="dashboard-main">
            <Grid.Column className="left-section">
              <Form>
                <Form.Field>
                  <label>Please upload your Photograph</label>
                  <Input
                    label={<Button className="browse">Browse</Button>}
                    labelPosition="right"
                    placeholder="Chose a file - Max Size 2 MB"
                  />
                </Form.Field>

                {/* <Form.Field>
                  <label>Ministory</label>
                  <Form.Input
                    fluid
                    placeholder="Ministory"
                    onChange={this.handleChange}
                    value={ministory}
                    name="ministory"
                  />
                </Form.Field> */}
                <Form.Field>
                  <label>Ministory</label>
                  <Form.Select
                    fluid
                    placeholder="Ministory"
                    onChange={this.handlSelectMenufacturer}
                    value={ministory}
                    name="ministory"
                    options={ministoryOptions}
                    icon="arrow down"
                    className="icon"
                  />
                </Form.Field>

                <Button
                  fluid
                  disabled={loading}
                  className="confirm"
                  onClick={this.handleSubmit}
                >
                  {loading ? (
                    <Loader type="ball-pulse" active={loading} />
                  ) : (
                    "Submit"
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
  loading: state.vehicleRegisteration.vehicles.placeLiscenceOrderLoading,
  allMinistory: state.interiorMinitory.allMinistory
});

export default connect(mapStateToProps, {
  placeLiscenceOrder,
  getAllMinistory
})(LiscenseIssue);
