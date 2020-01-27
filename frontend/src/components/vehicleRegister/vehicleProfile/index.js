import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Grid, Card, Button, List, Divider, Form, Input } from 'semantic-ui-react';

export class CarProfile extends Component {
  render() {
    return (
      <div className="car-profile">
        <Grid padded>
          <Grid.Row>
            <Grid.Column>
              <Header as="h2" content="Car's Profile" subheader="" dividing />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="dashboard-main">
            <Grid.Column className="left-section">
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
                  <Form.Select fluid placeholder="Car Insurance Date from" icon="arrow down" className="icon" />
                </Form.Field>
                <Form.Field>
                  <label>Insured till</label>
                  <Form.Select fluid placeholder="Car Insurance Date till" icon="arrow down" className="icon" />
                </Form.Field>
                <Form.Field>
                  <label>Insurance Compnay</label>
                  <Form.Input fluid placeholder="Insurance Compnay" />
                </Form.Field>
                <Button fluid className="save">
                  Save Car Record
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

export default connect(mapStateToProps, mapDispatchToProps)(CarProfile);
