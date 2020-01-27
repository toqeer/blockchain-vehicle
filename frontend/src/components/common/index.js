import React from 'react'

export const  customToast = data => {
  return (
    <div>
      <span>{data.message}</span>
      <br />
      <span>TrxID: {data.trxId}</span>
    </div>
  );
};
