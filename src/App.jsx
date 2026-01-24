import { useState } from 'react'
import './tw-styles.css' 
import TitleBar from './components/TitleBar'
import MapDisplay from './components/MapDisplay'
import PlaqueModal from './components/PlaqueModal'

function App() {
  const [count, setCount] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
  <div className="mx-auto max-w-screen-xl bg-gray-50 min-h-screen">
    <TitleBar title="📚 OpenPlaques Recommended Reading" />
    <MapDisplay longitude={116.3972} latitude={39.9163} zoom={15} />
    {isModalOpen ? <PlaqueModal /> : null}
  </div>
)
}

export default App
