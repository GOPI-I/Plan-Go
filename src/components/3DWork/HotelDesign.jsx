import React from 'react'
import Hotel from "./Hotel"
import { OrbitControls, Stage } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

const HotelDesign = () => {
  return (
    <Canvas>
        <Stage environment="city" intensity={0.6} >
            <Hotel/>
        </Stage>
        <OrbitControls enableZoom={false} autoRotate={true}/>
    </Canvas>
  )
}

export default HotelDesign