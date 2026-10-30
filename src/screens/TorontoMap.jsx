import React, { useEffect, useRef } from 'react'

const LOCATIONS = {
  might: [
    { name: 'Hockey Hall of Fame', lat: 43.6472, lng: -79.3787 },
    { name: 'Scotiabank Arena', lat: 43.6435, lng: -79.3791 },
    { name: 'Maple Leaf Gardens', lat: 43.6614, lng: -79.3822 },
    { name: 'Stanley Cup Playoffs ★', lat: 43.6432, lng: -79.3790, isFinal: true },
  ],
  magic: [
    { name: 'New City Hall', lat: 43.6531, lng: -79.3840 },
    { name: "Queen's Park", lat: 43.6629, lng: -79.3927 },
    { name: 'Toronto Reference Library', lat: 43.6714, lng: -79.3856 },
    { name: 'Union Station ★', lat: 43.6449, lng: -79.3803, isFinal: true },
  ],
  moxie: [
    { name: 'Harbourfront Centre', lat: 43.6387, lng: -79.3820 },
    { name: 'Trinity Bellwoods Park', lat: 43.6469, lng: -79.4158 },
    { name: 'Riverdale Park', lat: 43.6710, lng: -79.3568 },
    { name: 'Union Station ★', lat: 43.6449, lng: -79.3803, isFinal: true },
  ],
}

function makeIcon(isFinal) {
  const L = window.L
  return L.divIcon({
    className: '',
    html: `<div style="
      width:28px;height:28px;border-radius:50%;
      background:${isFinal ? '#e6b800' : '#274490'};
      border:2.5px solid #fff;
      box-shadow:0 2px 6px rgba(0,0,0,0.35);
      display:flex;align-items:center;justify-content:center;
      font-size:${isFinal ? '14px' : '10px'};
      color:#fff;font-weight:700;line-height:1;
    ">${isFinal ? '★' : '●'}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -16],
  })
}

export default function TorontoMap({ pathId }) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)

  useEffect(() => {
    const L = window.L
    if (!containerRef.current || !L || mapRef.current) return

    const locs = LOCATIONS[pathId] || LOCATIONS.might

    const map = L.map(containerRef.current, {
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

    const bounds = L.latLngBounds(locs.map(l => [l.lat, l.lng]))
    map.fitBounds(bounds, { padding: [28, 28] })

    locs.forEach(loc => {
      L.marker([loc.lat, loc.lng], { icon: makeIcon(loc.isFinal) })
        .addTo(map)
        .bindPopup(`<b>${loc.name}</b>`)
    })

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [pathId])

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
}
