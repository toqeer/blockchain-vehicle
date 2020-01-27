import React, { Component } from 'react';
import { Container, Grid, Menu } from 'semantic-ui-react';

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <Grid padded>
          <Grid.Row>
            <Grid.Column width={8} floated="right">
              <Menu text>
                <Menu.Item>Sort By</Menu.Item>
                <Menu.Item name="closest" />
                <Menu.Item name="mostComments" />
                <Menu.Item name="mostPopular" />
              </Menu>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
