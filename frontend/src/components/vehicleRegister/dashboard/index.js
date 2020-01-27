import React, { Component } from 'react';
import { Header, Grid, Card, Button, List, Divider, Form, Input } from 'semantic-ui-react';

export default class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <Grid padded>
          <Grid.Row columns="equal" divided className="dashboard-main">
            <Grid.Column className="left-section">
              <Header as="h2" content="Register Old Vehicle" subheader="All Old vehicles registeration" />
              <Form>
                <Form.Field>
                  <label>First Name</label>
                  <Input placeholder="First Name" icon="search" size="large" />
                </Form.Field>
                <Form.Field>
                  <label>First Name</label>
                  <Form.Select fluid placeholder="Gender" icon="arrow down" className="icon" size="large" />
                </Form.Field>
                <Form.Field>
                  <label>First Name</label>
                  <Form.Select fluid placeholder="Gender" icon="arrow down" className="icon" size="large" />
                </Form.Field>
                <Form.Field>
                  <label>First Name</label>
                  <Form.Select fluid placeholder="Gender" icon="arrow down" className="icon" size="large" />
                </Form.Field>
                <Form.Field>
                  <label>First Name</label>
                  <Form.Select fluid placeholder="Gender" icon="arrow down" className="icon" size="large" />
                </Form.Field>
                <Button fluid className="register">
                  Register Car
                </Button>
              </Form>
            </Grid.Column>
            <Grid.Column className="right-section">
              <Header as="h2" content="Register Old Vehicle" subheader="All Old vehicles registeration" />
              <Form>
                <Form.Field inline className="toggler">
                  <label>First Name</label>
                  <Form.Radio toggle />
                </Form.Field>
                <Form.Field inline className="toggler">
                  <label>First Name</label>
                  <Form.Radio toggle />
                </Form.Field>
                <Form.Field>
                  <label>First Name</label>
                  <Form.Select fluid placeholder="Gender" icon="arrow down" className="icon" size="large" />
                </Form.Field>
                <Form.Field>
                  <label>First Name</label>
                  <Form.Select fluid placeholder="Gender" icon="arrow down" className="icon" size="large" />
                </Form.Field>
                <Form.Field>
                  <label>First Name</label>
                  <Form.Select fluid placeholder="Gender" icon="arrow down" className="icon" size="large" />
                </Form.Field>
                <Button fluid className="register">
                  Register Car
                </Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
