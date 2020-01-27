import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Grid, Card, Button, List, Divider, Form, Input } from 'semantic-ui-react';
export class OwnerProfile extends Component {
  render() {
    return (
      <div className="owner-profile">
        <Grid padded>
          <Grid.Row>
            <Grid.Column>
              <Header as="h2" content="Owner Profile" dividing />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="dashboard-main">
            <Grid.Column className="left-section">
              <Form>
                <Form.Field>
                  <label> Name</label>
                  <Input placeholder="Car Owner’s Name" icon="search" size="large" />
                </Form.Field>
                <Form.Field>
                  <label> NIC #</label>
                  <Form.Input fluid placeholder="Car Owner’s NIC/CNIC No" />
                </Form.Field>
                <Form.Field>
                  <label> Email</label>
                  <Form.Input fluid placeholder="Owner’s email" />
                </Form.Field>
                <Form.Field>
                  <label> Phone #</label>
                  <Form.Input fluid placeholder="Owner’s contact no" />
                </Form.Field>
                <Form.Field>
                  <label> Liscense No</label>
                  <Form.Input fluid placeholder="Owner’s Liscense No" />
                </Form.Field>
                <Button fluid className="save">
                  Save Record
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OwnerProfile);
