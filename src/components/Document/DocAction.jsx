import React from 'react'
import "./docaction.css"
const DocAction = () => {
  return (
    <div className="action-cards">
      {/* Upload New Document Card */}
      <div className="card">
        <div className="card-content">
          <h2 className="card-title">Upload New Document</h2>
          <p className="card-description">Add a new document to your collection.</p>
          <button className="card-button">Upload Now →</button>
        </div>
      </div>

      {/* Share All Documents Card */}
      <div className="card">
        <div className="card-content">
          <h2 className="card-title">Share All Documents</h2>
          <p className="card-description">Share all your documents with ease.</p>
          <button className="card-button">Share Now →</button>
        </div>
      </div>
    </div>
  )
}

export default DocAction