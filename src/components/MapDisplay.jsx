import React, { useState, useEffect } from 'react'; 
import { Map, Source, Layer, Popup } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function MapDisplay(props) {
  // 1. 负责存储全部地图数据（你已经写好了）
  const [plaqueData, setPlaqueData] = useState(null);

  // 2. 负责存储当前选中的那个点（教程第五步要求的）
  const [selectedPlaque, setSelectedPlaque] = useState(null);

  // ---- 加载 public 中的 GeoJSON ----
  useEffect(() => {
    fetch("plaques.json")
      .then((res) => {
        if (!res.ok) throw new Error("File not found");
        return res.json();
      })
      .then((data) => {
        console.log("Data loaded successfully:", data);
        setPlaqueData(data); // 数据加载后更新状态，地图会自动渲染
      })
      .catch((error) => console.error("Failed to load GeoJSON:", error));
  }, []);


  const plaqueLayerStyle = {
       id: 'plaques-layer',
       type: 'circle',
       source: 'plaques-data',
       paint: {
           'circle-radius': 6,
           'circle-color': '#007cbf',
           'circle-stroke-width': 2,
           'circle-stroke-color': '#ffffff'
       },
   }
   const handleMapClick = (event) => {
    const features = event.features;
    if (features && features.length > 0) {
        // 存入整个对象，因为 Popup 需要里面的 geometry (坐标)
        setSelectedPlaque(features[0]); 
        
        // 同时保留你之前的逻辑，确保 App.jsx 里的弹窗也能收到数据
        if (props.onPlaqueClick) {
            props.onPlaqueClick(features[0].properties);
        }
    }
};

  return (
    <Map
      initialViewState={{
        longitude: props.longitude,
        latitude: props.latitude,
        zoom: props.zoom
      }}
      style={{width: '100%', height: '100vh'}}
      mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"

      interactiveLayerIds={['plaques-layer']}
      onClick={handleMapClick}
    
   >
       <Source
           id="plaques-data"
           type="geojson"
           data={plaqueData}
       >
           <Layer {...plaqueLayerStyle} />
       </Source>
       {selectedPlaque && selectedPlaque.geometry && (
        
        <Popup
          anchor="bottom"
          longitude={selectedPlaque.geometry.coordinates[0]}
          latitude={selectedPlaque.geometry.coordinates[1]}
          onClose={() => setSelectedPlaque(null)}
        >
          <div className="max-w-xs">
            {/* 注意：如果报错找不到属性，请确认 JSON 中的键名是否为 lead_subject_name */}
            <h2 className="text-xl font-semibold mb-2">
              {selectedPlaque.properties?.lead_subject_name || selectedPlaque.properties?.title}
            </h2>
            <p className="text-sm text-gray-700">
              {selectedPlaque.properties?.inscription?.slice(0, 150) || selectedPlaque.properties?.description}
            </p>
            <button 
              className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600"
              onClick={() => console.log('Fetch reading for', selectedPlaque.properties?.lead_subject_name)}
            >
              Recommended Reading
            </button>
          </div>
        </Popup>
      )}
    </Map>
  );
}
