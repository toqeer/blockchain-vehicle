import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Grid, Button, Form, Card, List, Icon, Label } from 'semantic-ui-react';

export class InProcess extends Component {
  render() {
    return (
      <div className="in-process">
        <Grid padded>
          <Grid.Row columns="1" divided className="dashboard-main">
            <Grid.Column className="left-section">
              <Header as="h2" dividing subheader="">
                <Header.Content>
                  In-Process{' '}
                  <Label color="red" size="large">
                    06
                  </Label>
                </Header.Content>
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
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
          <hr />
          <Grid.Row columns="3">
            <Grid.Column>
              <Card>
                <Card.Content>
                  <Icon name="circle" size="small" color="brown" /> <span>In-Process</span>
                </Card.Content>
                <Card.Content>
                  <Card.Description>
                    <Header className="customer-name">
                      Ali Hassan <span className="circle" />
                    </Header>
                    <Header.Content>01 Aug 2019</Header.Content>
                    <Header.Content>S/N 000000000cvfbr...</Header.Content>
                  </Card.Description>
                  <hr />
                  {/* <Header>Manufacturing</Header> */}
                  <List>
                    <List.Item>
                      <List.Header>Manufacturing</List.Header>
                    </List.Item>
                    <List.Item>
                      <Icon name="check" color="green" />
                      <List.Content>
                        Chassis <span>6 Hr</span>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <Icon name="check" color="green" />
                      <List.Content>
                        VIN Issue <span>6 Hr</span>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <Icon name="check" color="green" />
                      <List.Content>
                        Owner assigned <span>6 Hr</span>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <Icon name="check" color="brown" />
                      <List.Content>
                        Interior <span>6 Hr</span>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <Icon name="check" color="brown" />
                      <List.Content>
                        Paint <span>6 Hr</span>
                      </List.Content>
                    </List.Item>
                  </List>
                  <hr />
                  <List>
                    <List.Item>
                      <List.Header>Delivery</List.Header>
                    </List.Item>
                    <List.Item>
                      <Icon name="check" color="brown" />
                      <List.Content>
                        Shipping in <span>6 Hr</span>
                      </List.Content>
                    </List.Item>
                  </List>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card>
                <Card.Content>
                  <Icon name="circle" size="small" color="brown" /> <span>In-Process</span>
                </Card.Content>
                <Card.Content>
                  <Card.Description>
                    <Header className="customer-name">
                      Ali Hassan <span className="circle" />
                    </Header>
                    <Header.Content>01 Aug 2019</Header.Content>
                    <Header.Content>S/N 000000000cvfbr...</Header.Content>
                  </Card.Description>
                  <hr />
                  {/* <Header>Manufacturing</Header> */}
                  <List>
                    <List.Item>
                      <List.Header>Manufacturing</List.Header>
                    </List.Item>
                    <List.Item>
                      <Icon name="check" color="green" />
                      <List.Content>
                        Chassis <span>6 Hr</span>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <Icon name="check" color="green" />
                      <List.Content>
                        VIN Issue <span>6 Hr</span>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <Icon name="check" color="green" />
                      <List.Content>
                        Owner assigned <span>6 Hr</span>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <Icon name="check" color="brown" />
                      <List.Content>
                        Interior <span>6 Hr</span>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <Icon name="check" color="brown" />
                      <List.Content>
                        Paint <span>6 Hr</span>
                      </List.Content>
                    </List.Item>
                  </List>
                  <hr />
                  <List>
                    <List.Item>
                      <List.Header>Delivery</List.Header>
                    </List.Item>
                    <List.Item>
                      <Icon name="check" color="brown" />
                      <List.Content>
                        Shipping in <span>6 Hr</span>
                      </List.Content>
                    </List.Item>
                  </List>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card>
                <Card.Content>
                  <Icon name="circle" size="small" color="brown" /> <span>In-Process</span>
                </Card.Content>
                <Card.Content>
                  <Card.Description>
                    <Header className="customer-name">
                      Ali Hassan <span className="circle" />
                    </Header>
                    <Header.Content>01 Aug 2019</Header.Content>
                    <Header.Content>S/N 000000000cvfbr...</Header.Content>
                  </Card.Description>
                  <hr />
                  {/* <Header>Manufacturing</Header> */}
                  <List>
                    <List.Item>
                      <List.Header>Manufacturing</List.Header>
                    </List.Item>
                    <List.Item>
                      <Icon name="check" color="green" />
                      <List.Content>
                        Chassis <span>6 Hr</span>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <Icon name="check" color="green" />
                      <List.Content>
                        VIN Issue <span>6 Hr</span>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <Icon name="check" color="green" />
                      <List.Content>
                        Owner assigned <span>6 Hr</span>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <Icon name="check" color="brown" />
                      <List.Content>
                        Interior <span>6 Hr</span>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <Icon name="check" color="brown" />
                      <List.Content>
                        Paint <span>6 Hr</span>
                      </List.Content>
                    </List.Item>
                  </List>
                  <hr />
                  <List>
                    <List.Item>
                      <List.Header>Delivery</List.Header>
                    </List.Item>
                    <List.Item>
                      <Icon name="check" color="brown" />
                      <List.Content>
                        Shipping in <span>6 Hr</span>
                      </List.Content>
                    </List.Item>
                  </List>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(InProcess);
