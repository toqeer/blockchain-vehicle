import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Grid, Card, Button, List, Divider, Form, Input } from 'semantic-ui-react';
export class LiscenseIssue extends Component {
	render() {

		return (
			<div className="liscense-issue">
				{' '}
				<Grid padded>
					<Grid.Row>
						<Grid.Column>
							<Header as="h2" content="Issue of Liscense" dividing />
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
								<Form.Field>
									<label>Test Time </label>
									<Form.Select
										fluid
										placeholder="- - / - - / --   00:00"
										icon="arrow down"
										className="icon"
										size="large"
									/>
								</Form.Field>
								<Form.Field>
									<label>NIC / CNIC No</label>
									<Form.Input fluid placeholder="Please enter your NIC/CNIC No" />
								</Form.Field>
								<Form.Field>
									<label>Name</label>
									<Form.Input fluid placeholder="Please enter your name as per Documents" />
								</Form.Field>
								<Form.Field>
									<label>Contact #</label>
									<Form.Input fluid placeholder="+966 - " />
								</Form.Field>
								<p className="warning">
									* Please visit Ministry of Interior for recieving your lisense (after 5 business
									days)
								</p>
								<Button fluid className="download">
									Download Recipt
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

export default connect(mapStateToProps, mapDispatchToProps)(LiscenseIssue);
