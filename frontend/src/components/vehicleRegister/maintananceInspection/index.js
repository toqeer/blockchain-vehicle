import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Grid, Button, Form, Input, Table } from 'semantic-ui-react';

export class Mantanance extends Component {
  render() {
    return (
      <div className="maintanance">
        <Grid padded>
          <Grid.Row columns="equal" divided className="dashboard-main">
            <Grid.Column className="left-section">
              <Header as="h2" content="Maintenance" subheader="" />
              <Form>
                <Form.Field>
                  <label>Name</label>
                  <Input placeholder="Car Owner’s Name" />
                </Form.Field>{' '}
                <Form.Field>
                  <label>Phone #</label>
                  <Input placeholder="Owner’s contact no" />
                </Form.Field>
                <Form.Field>
                  <label>Address</label>
                  <Input placeholder="Owner’s email" />
                </Form.Field>
                <Form.Field>
                  <label>Appointment Date</label>
                  <Form.Select fluid placeholder="Date" icon="arrow down" className="icon" size="large" />
                </Form.Field>
                <Button fluid className="register">
                  Call for Maintenance
                </Button>
              </Form>
            </Grid.Column>
            <Grid.Column className="right-section">
              <Header as="h2" content="Car Inspection" subheader="" />
              <Table striped>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>#</Table.HeaderCell>
                    <Table.HeaderCell>Inspected on</Table.HeaderCell>
                    <Table.HeaderCell>Valid till</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>Aug - 28 - 2019</Table.Cell>
                    <Table.Cell>Aug - 28 - 2019</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>Aug - 28 - 2019</Table.Cell>
                    <Table.Cell>Aug - 28 - 2019</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>Aug - 28 - 2019</Table.Cell>
                    <Table.Cell>Aug - 28 - 2019</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>Aug - 28 - 2019</Table.Cell>
                    <Table.Cell>Aug - 28 - 2019</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>Aug - 28 - 2019</Table.Cell>
                    <Table.Cell>Aug - 28 - 2019</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>Aug - 28 - 2019</Table.Cell>
                    <Table.Cell>Aug - 28 - 2019</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>Aug - 28 - 2019</Table.Cell>
                    <Table.Cell>Aug - 28 - 2019</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
              <Button fluid className="view-record">
                View Complete Record
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Mantanance);
