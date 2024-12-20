import React from 'react'
import Pla from "./Pla"
import { OrbitControls, Stage } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

const FlightDesign = () => {
  return (
    <Canvas>
        <Stage environment="city" intensity={0.6}>
            <Pla/>
        </Stage>
        <OrbitControls enableZoom={false} autoRotate={true}/>
    </Canvas>
  )
}

export default FlightDesign