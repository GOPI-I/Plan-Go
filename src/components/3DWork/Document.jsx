import React from 'react'
import PassPort from "./PassPort"
import { OrbitControls, Stage } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
const Document = () => {
  return (
    <Canvas>
    <Stage environment="city" intensity={1.0} >
        <PassPort/>
    </Stage>
    <OrbitControls enableZoom={false} autoRotate={true}/>
</Canvas>
  )
}

export default Document