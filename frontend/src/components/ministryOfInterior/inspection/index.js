import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Grid, Button, Form, Input, Table, Icon } from 'semantic-ui-react';

export class Inspection extends Component {
  render() {
    return (
      <div className="inspection">
        <Grid padded>
          <Grid.Row columns="1" divided className="dashboard-main">
            <Grid.Column className="left-section">
              <Header as="h2" content="Car Inspection" dividing subheader="" />
              <Table striped>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>#</Table.HeaderCell>
                    <Table.HeaderCell>Inspected on</Table.HeaderCell>
                    <Table.HeaderCell>Valid till</Table.HeaderCell>
                    <Table.HeaderCell>Engine (Good or Bad)</Table.HeaderCell>
                    <Table.HeaderCell>Suspension (Good or Bad)</Table.HeaderCell>
                    <Table.HeaderCell>Tire Condition (New or Old)</Table.HeaderCell>
                    <Table.HeaderCell>Transmission</Table.HeaderCell>
                    <Table.HeaderCell>Exterior</Table.HeaderCell>
                    <Table.HeaderCell>Interior</Table.HeaderCell>
                    <Table.HeaderCell>Comments</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>Aug - 28 - 2019</Table.Cell>
                    <Table.Cell>Aug - 28 - 2020</Table.Cell>
                    <Table.Cell>Good</Table.Cell>
                    <Table.Cell>Bad</Table.Cell>
                    <Table.Cell>Old</Table.Cell>
                    <Table.Cell>Good</Table.Cell>
                    <Table.Cell>Good</Table.Cell>
                    <Table.Cell>Bad</Table.Cell>
                    <Table.Cell>Front suspension to be replaced</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>Aug - 28 - 2019</Table.Cell>
                    <Table.Cell>Aug - 28 - 2020</Table.Cell>
                    <Table.Cell>Good</Table.Cell>
                    <Table.Cell>Bad</Table.Cell>
                    <Table.Cell>Old</Table.Cell>
                    <Table.Cell>Good</Table.Cell>
                    <Table.Cell>Good</Table.Cell>
                    <Table.Cell>Bad</Table.Cell>
                    <Table.Cell>Front suspension to be replaced</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>Aug - 28 - 2019</Table.Cell>
                    <Table.Cell>Aug - 28 - 2020</Table.Cell>
                    <Table.Cell>Good</Table.Cell>
                    <Table.Cell>Bad</Table.Cell>
                    <Table.Cell>Old</Table.Cell>
                    <Table.Cell>Good</Table.Cell>
                    <Table.Cell>Good</Table.Cell>
                    <Table.Cell>Bad</Table.Cell>
                    <Table.Cell>Front suspension to be replaced</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>Aug - 28 - 2019</Table.Cell>
                    <Table.Cell>Aug - 28 - 2020</Table.Cell>
                    <Table.Cell>Good</Table.Cell>
                    <Table.Cell>Bad</Table.Cell>
                    <Table.Cell>Old</Table.Cell>
                    <Table.Cell>Good</Table.Cell>
                    <Table.Cell>Good</Table.Cell>
                    <Table.Cell>Bad</Table.Cell>
                    <Table.Cell>Front suspension to be replaced</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Inspection);
