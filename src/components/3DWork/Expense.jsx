import React from 'react'
import ExpenseTracker from "./ExpenseTracker"
import { OrbitControls, Stage } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
const Expense = () => {
  return (
    <Canvas>
            <Stage environment="city" intensity={0.6} >
                <ExpenseTracker/>
            </Stage>
            <OrbitControls enableZoom={false} autoRotate={false}/>
        </Canvas>
  )
}

export default Expense