import React from 'react'
import SideBar from './SideBar'
import Heade from './Heade'
import Content from './Content'
import Action from './Action'

const Creation = () => {
  return (
    <>
    <div className="app d-flex">
      <SideBar/>
      <div className="main-content flex-grow-1">
        <Heade/>
        <Content/>
        <Action/>
      </div>
    </div>
    
    </>
  )
}

export default Creation