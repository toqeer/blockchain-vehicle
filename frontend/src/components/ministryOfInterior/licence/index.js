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
  Message
} from "semantic-ui-react";
import {
  getAllLiscence,
  cancleLiscence,
  unRevokeLiscence
} from "../../../redux/ministoryOfInterior/actions";
import Loader from "react-loaders";

export class Liscence extends Component {
  componentDidMount() {
    this.props.getAllLiscence();
  }
  handleSubmit = licenseNumber => {
    const data = {
      licenseNumber: licenseNumber
    };
    this.props.cancleLiscence(data);
  };
  unRevokeSubmit = licenseNumber => {
    const data = {
      licenseNumber: licenseNumber
    };
    this.props.unRevokeLiscence(data);
  };
  render() {
    let { Liscence, loading } = this.props;
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
                <Header.Content>Transfer Requests</Header.Content>
              </Header>
            </Grid.Column>
          </Grid.Row>
          {/* <Grid.Row>
            <Grid.Column>
              <Form>
                <Form.Group widths="equal">
                  <Form.Field>
                    <label> Arrange by Date</label>
                    <Form.Select fluid placeholder="Old Orders" icon="arrow down" className="icon" size="large" />
                  </Form.Field>
                  <Form.Field>
                    <label> Specific Date</label>
                    <Form.Select
                      fluid
                      placeholder="- - / - - / --   "
                      icon="arrow down"
                      className="icon"
                      size="large"
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Specific Name/Order No</label>
                    <Form.Input icon="search" placeholder="Please enter name/ order no" />
                  </Form.Field>
                </Form.Group>
              </Form>
            </Grid.Column>
          </Grid.Row>
		  <hr /> */}
          {// 	loading ? (
          // 	<div className="loader" />
          // ) :
          Liscence && Liscence.length > 0 ? (
            <Grid.Row columns="3">
              {Liscence.map((item, i) => (
                <Grid.Column>
                  <Card>
                    <Card.Content>
                      <Icon name="circle" size="small" color="brown" />{" "}
                      <span>New Request</span>
                    </Card.Content>
                    <Card.Content>
                      <Card.Description>
                        <Header className="customer-name">
                          {item.licenseStatus} <span className="circle" />
                        </Header>
                        <Header.Content>
                          issueDate: {item.issueDate}
                        </Header.Content>
                        <Header.Content>
                          expiryDate: {item.expiryDate}
                        </Header.Content>
                        <Header.Content>Owner: {item.owner}</Header.Content>
                        <Header.Content>Owner: {item.owner}</Header.Content>
                        <Header.Content>issuer: {item.issuer}</Header.Content>
                      </Card.Description>
                      {item.licenseStatus === "ACTIVE" ? (
                        <Button
                          className="start"
                          onClick={() => this.handleSubmit(item.licenseNumber)}
                        >
                          Revoke
                        </Button>
                      ):
                      <Button
                          className="start"
                          onClick={() => this.unRevokeSubmit(item.licenseNumber)}
                        >
                          UnRevoke
                        </Button>
                      }
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
  Liscence: state.interiorMinitory.allLiscence,
  loading: state.interiorMinitory.allLiscenceLoading
});

export default connect(
  mapStateToProps,
  { getAllLiscence, cancleLiscence,unRevokeLiscence }
)(Liscence);
