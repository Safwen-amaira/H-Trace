import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix Leaflet default marker icon
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
})

export default function ThreatMap() {
  const { token } = useAuth()
  const [markers, setMarkers] = useState([])

  useEffect(() => {
    // Fetch IOCs of type IP from threat intel service
    axios.get('/api/threats/iocs?type=ip&limit=100', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      // For each IP, we need geolocation. In production use a real GeoIP service.
      // For demo, we'll use a free API (ip-api.com) for each IP (but that's many requests).
      // Instead, we'll mock positions for demonstration.
      const mockLocations = res.data.map((ioc, idx) => ({
        id: ioc.id,
        value: ioc.value,
        position: [36.8 + Math.random() * 2, 10.1 + Math.random() * 5], // around Tunisia
        threat_level: ioc.threat_level
      }))
      setMarkers(mockLocations)
    }).catch(console.error)
  }, [token])

  return (
    <div className="max-w-full h-[calc(100vh-4rem)]">
      <MapContainer center={[34.0, 9.0]} zoom={6} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map(m => (
          <Marker key={m.id} position={m.position}>
            <Popup>
              <div>
                <strong>{m.value}</strong><br />
                Threat: {m.threat_level}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
