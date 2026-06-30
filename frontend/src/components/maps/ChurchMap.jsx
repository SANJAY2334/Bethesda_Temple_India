import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet'

import L from 'leaflet'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

const churchPosition = [15.887247951220964, 74.51171330305264]

export default function ChurchMap() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] shadow-sm">
      <MapContainer

        center={churchPosition}
        zoom={17}
        scrollWheelZoom={false}
         className="z-0"
        style={{
          height: '350px',
          width: '100%',
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        <Marker position={churchPosition}>
          <Popup>
            <div className="min-w-[180px] text-center">
              <h3 className="font-semibold">
                Bethesda Temple
              </h3>

              <p className="mt-1 text-sm">
                Belagavi, Karnataka
              </p>

              <a
                href="https://maps.app.goo.gl/jAWMUiKF4C8HsJfC6"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block rounded-lg bg-black px-3 py-2 text-sm text-white"
              >
                Get Directions
              </a>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}