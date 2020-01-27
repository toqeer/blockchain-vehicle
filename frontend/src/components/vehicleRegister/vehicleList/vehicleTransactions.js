import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Table, Icon, Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import { getTransactionDetails } from "../../../redux/actions";
import JSONTree from 'react-json-tree';

const VehicleTransactions = props => {
  const [open, setopen] = useState(false);

  const viewDetails = transactionInvoked => {
    props.getTransactionDetails(transactionInvoked);
    setopen(true);
  };
  const { transactions, transactionDetails } = props;
  return (
    <div className="transactions">
      {transactions && transactions.length > 0 && (
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <Icon name="arrow up" />#
              </Table.HeaderCell>
              <Table.HeaderCell>Transaction ID</Table.HeaderCell>
              <Table.HeaderCell>Transaction Type</Table.HeaderCell>
              <Table.HeaderCell>Participant Invoking</Table.HeaderCell>
              <Table.HeaderCell>Time Stamp</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {transactions.map((item, i) => (
            <Table.Body key={i}>
              <Table.Row>
                <Table.Cell>{i + 1}</Table.Cell>
                <Table.Cell
                  className="transactionId"
                  onClick={() => viewDetails(item.transactionInvoked)}
                >
                  {item.transactionId}
                </Table.Cell>
                <Table.Cell>{item.transactionType}</Table.Cell>
                <Table.Cell>{item.participantInvoking}</Table.Cell>
                <Table.Cell>{item.timestamp}</Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
      )}
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
  transactionDetails: state.vehicleRegisteration.vehicles.transactionDetails
});
export default connect(mapStateToProps, {
  getTransactionDetails
})(VehicleTransactions);
