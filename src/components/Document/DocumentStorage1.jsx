import React from 'react'
import SideBar from '../itinerary/SideBar'
import Heade from '../itinerary/Heade'
import DocAction from './DocAction'
import DocDetails from './DocDetails'

const DocumentStorage1 = () => {
  return (
    <div className="app d-flex">
      <SideBar/>
      <div className="main-content flex-grow-1">
        <Heade/>
        <DocAction/>
        <DocDetails/>
      </div>
    </div>
  )
}

export default DocumentStorage1