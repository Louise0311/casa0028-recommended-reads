import { useState } from 'react'
import './tw-styles.css' 
import TitleBar from './components/TitleBar'
import MapDisplay from './components/MapDisplay'
import PlaqueModal from './components/PlaqueModal'

function App() {
  const [selectedPlaque, setSelectedPlaque] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false)


  return (
  <div className="mx-auto max-w-screen-xl bg-gray-50 min-h-screen">
    <TitleBar 
      title="🔵 London's Blue Plaques" 
      subtitle="Exploring historical figures across London"/>
    <MapDisplay longitude={-0.1276} latitude={51.5072} zoom={12}
                onPlaqueClick={(data) => {
                  setSelectedPlaque(data); // 保存点击到的铭牌属性
                  setIsModalOpen(true);    // 打开弹窗
                }} />
    {isModalOpen && selectedPlaque ? (
        <PlaqueModal 
          title={selectedPlaque.title} // 使用真实的标题
          description={selectedPlaque.description} // 使用真实的描述
          setIsModalOpen={setIsModalOpen} 
        />
      ) : null}
    </div>
)
}

export default App
