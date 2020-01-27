import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Header, Form, Button } from 'semantic-ui-react';
export class VehicleVoilation extends Component {
  render() {
    return (
      <div className="vehicle-voilation">
        <Grid padded>
          <Grid.Row>
            <Grid.Column>
              <Header as="h2" content="Vehicle Violation" subheader="" dividing />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" className="dashboard-main">
            <Grid.Column className="left-section">
              <Form>
                <Form.Field>
                  <label>Fine</label>
                  <Form.Input fluid placeholder="" />
                </Form.Field>
                <Form.Field>
                  <label>Tax</label>
                  <Form.Input fluid placeholder="" />
                </Form.Field>
                <Form.Field>
                  <label>Inspection Report</label>
                  <Form.TextArea fluid placeholder="Inspection Report" />
                </Form.Field>

                <p className="warning">* Please visit Ministry of Interior for recieving your lisense (after 5 business days)</p>
                <Button fluid className="send">
                  Send
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

export default connect(mapStateToProps, mapDispatchToProps)(VehicleVoilation);
