import React from 'react';
export default function StatusBadge({ status }) {
  const classes = {
    'Order Placed': 'status-blue',
    'Payment Confirmed': 'status-blue',
    Preparing: 'status-orange',
    'Ready for Pickup': 'status-green',
    Completed: 'status-green',
    Cancelled: 'status-red',
    'Payment Pending': 'status-orange'
  };
  return <span className={`status-badge ${classes[status] || 'status-blue'}`}>{status}</span>;
}
