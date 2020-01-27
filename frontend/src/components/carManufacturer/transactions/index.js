import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Header, Grid, Table, Icon, Modal } from "semantic-ui-react";
import {
  getAllManufacturerTransactions,
  getTransactionDetails
} from "../../../redux/actions";
import Loader from "react-loaders";
import JSONTree from 'react-json-tree';

const Transections = props => {
  const [open, setopen] = useState(false);
  useEffect(() => {
    props.getAllManufacturerTransactions();
  }, []);
  const viewDetails = transactionInvoked => {
    props.getTransactionDetails(transactionInvoked);
    setopen(true);
  };
  const { transections, loading, transactionDetails } = props;
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
    <div className="transections">
      <Grid padded>
        <Grid.Row columns="1" divided className="dashboard-main">
          <Grid.Column className="left-section">
            <Header as="h2" content="Transections" dividing />
            {transections && (
              <Table striped>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>
                      <Icon name="arrow up" />#
                    </Table.HeaderCell>
                    <Table.HeaderCell>Transaction ID</Table.HeaderCell>
                    <Table.HeaderCell>Transaction Type</Table.HeaderCell>
                    <Table.HeaderCell>Asset Linked</Table.HeaderCell>
                    <Table.HeaderCell>Time Stamp</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                {transections.map((item, i) => (
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>{i + 1}</Table.Cell>
                      <Table.Cell className="transactionId"onClick={() => viewDetails(item.transactionInvoked)}>
                        
                        {item.transactionId}
                      </Table.Cell>
                      <Table.Cell>{item.transactionType}</Table.Cell>
                      <Table.Cell>{item.assetLinked}</Table.Cell>
                      <Table.Cell>{item.timestamp}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
              </Table>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Modal closeIcon open={open} onClose={() => setopen(false)} size="tiny">
        <Modal.Header>Transaction Details</Modal.Header>
        <Modal.Content>
          {transactionDetails && (
            // <p>{JSON.stringify(transactionDetails)}</p>
            <JSONTree data={transactionDetails} theme={{
              tree: ({ style }) => ({
                style: { ...style, backgroundColor: undefined }, 
              }),
            }} />
            // <List>
            // 	<List.Item>buyer: {transactionDetails.buyer}</List.Item>
            // 	<List.Item>transferStatus: {transactionDetails.transferStatus}</List.Item>
            // 	<List.Item>vehicle: {transactionDetails.vehicle}</List.Item>
            // 	<List.Item>transactionId: {transactionDetails.transactionId}</List.Item>
            // 	<List.Item>timestamp: {transactionDetails.timestamp}</List.Item>
            // </List>
          )}
        </Modal.Content>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => ({
  transections: state.carMenufecturer.allTransactions,
  loading: state.carMenufecturer.allTransactionsLoading,
  transactionDetails: state.vehicleRegisteration.vehicles.transactionDetails
});

export default connect(mapStateToProps, {
  getAllManufacturerTransactions,
  getTransactionDetails
})(Transections);
