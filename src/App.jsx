import { useState } from 'react'
import './tw-styles.css' 
import TitleBar from './components/TitleBar'
import MapDisplay from './components/MapDisplay'
import PlaqueModal from './components/PlaqueModal'

function App() {
  const [count, setCount] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(true)
  const handleClose = () => setIsModalOpen(false)

  return (
  <div className="mx-auto max-w-screen-xl bg-gray-50 min-h-screen">
    <TitleBar 
      title="📚 OpenPlaques Recommended Reading" 
      subtitle="Discover historical plaques and books in Beijing"/>
    <MapDisplay longitude={116.3972} latitude={39.9163} zoom={15} />
    {isModalOpen ? <PlaqueModal 
                     title="Historical Plaque Found!"
                     description="This plaque commemorates the life of a famous Beijinger."
                     onClose={handleClose}/> : null}
  </div>
)
}

export default App
