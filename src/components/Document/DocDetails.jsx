import React from 'react'
import "./docdetails.css"
const DocDetails = () => {
  return (
    <div className="document-details">
      <h3 className="details-title">Document Details</h3>
      <div className="details-list">
        <div className="details-item">
          <h4 className="item-title">Passport</h4>
          <p className="item-description">Manage and view your passport details.</p>
        </div>
        <div className="details-item">
          <h4 className="item-title">Flight Tickets</h4>
          <p className="item-description">Upload and manage your flight tickets.</p>
        </div>
        <div className="details-item">
          <h4 className="item-title">Visa</h4>
          <p className="item-description">Upload and view visa-related documents.</p>
        </div>
      </div>
    </div>
  )
}

export default DocDetails