import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Float } from '@react-three/drei'
import { useState } from 'react'

function Cookie() {
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial color="#8B4513" roughness={0.6} />
        {/* Choco chips */}
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2
          const r = 0.7 + Math.random() * 0.3
          return (
            <mesh key={i} position={[Math.cos(angle) * r, Math.sin(angle) * r * 0.6, 0.9]}>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshStandardMaterial color="#3d2314" />
            </mesh>
          )
        })}
      </mesh>
    </Float>
  )
}

export default function App() {
  const [showPay, setShowPay] = useState(false)
  const upiId = 'snigdha03010@oksbi'
  const amount = 250 // example
  const payUrl = `upi://pay?pa=${upiId}&pn=La%20Pate%20Brillante&am=${amount}&tn=Order%20from%20site&cu=INR`

  return (
    <>
      <div className="overlay">
        <h2>La Pâte Brillante</h2>
        <p>Immersive weekend bakes — fly into the treats</p>
        <button onClick={() => setShowPay(true)}>Order now · Pay with UPI</button>
        {showPay && (
          <div style={{marginTop: '1rem'}}>
            <p>Pay ₹{amount} to <b>{upiId}</b></p>
            <a href={payUrl} style={{color: '#e8a87c'}}>Open UPI app</a>
            <p style={{fontSize: '0.8rem', marginTop: '0.5rem'}}>Classic site fallback: <a href="https://manaskhanger.github.io/home-bakery/" style={{color:'#ccc'}}>here</a></p>
          </div>
        )}
      </div>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Cookie />
        <OrbitControls enableZoom enablePan={false} />
        <Environment preset="sunset" />
      </Canvas>
    </>
  )
}