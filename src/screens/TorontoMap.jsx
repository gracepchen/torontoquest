import React, { useEffect, useRef } from 'react'

const LOCATIONS = {
  might: [
    { name: 'Hockey Hall of Fame', lat: 43.6472, lng: -79.3787 },
    { name: 'Scotiabank Arena', lat: 43.6435, lng: -79.3791 },
    { name: 'Maple Leaf Gardens', lat: 43.6614, lng: -79.3822 },
  ],
  magic: [
    { name: 'New City Hall', lat: 43.6531, lng: -79.3840 },
    { name: "Queen's Park", lat: 43.6629, lng: -79.3927 },
    { name: 'Toronto Reference Library', lat: 43.6714, lng: -79.3856 },
  ],
  moxie: [
    { name: 'Harbourfront Centre', lat: 43.6387, lng: -79.3820 },
    { name: 'Trinity Bellwoods Park', lat: 43.6469, lng: -79.4158 },
    { name: 'Riverdale Park', lat: 43.6710, lng: -79.3568 },
  ],
}

const STAR_ICON_HTML = `<svg width="40" height="40" viewBox="0 0 24 24">
  <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z"
    fill="#f7c731" stroke="#212121" stroke-width="1" stroke-linejoin="round"/>
</svg>`

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
}

export default function TorontoMap({ pathId, quests = [] }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const L = window.L
    if (!containerRef.current || !L) return

    const locs = LOCATIONS[pathId] || LOCATIONS.might

    const map = L.map(containerRef.current, {
      zoomControl: false,
      attributionControl: false,
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { className: 'tm-tiles' }).addTo(map)

    const icon = L.divIcon({
      className: 'tm-star',
      html: STAR_ICON_HTML,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [0, -18],
    })

    locs.forEach((loc, i) => {
      const item = quests[i]?.name
      const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${loc.name}, Toronto`)}`
      L.marker([loc.lat, loc.lng], { icon })
        .addTo(map)
        .bindPopup(
          `<div class="tm-popup">
            <p class="tm-popup-place">${escapeHtml(loc.name)}</p>
            ${item ? `<p class="tm-popup-item">${escapeHtml(item)}</p>` : ''}
            <a class="tm-popup-link" href="${directions}" target="_blank" rel="noopener noreferrer">Go there →</a>
          </div>`,
          { closeButton: false }
        )
    })

    const fit = () => {
      map.invalidateSize()
      map.fitBounds(L.latLngBounds(locs.map(l => [l.lat, l.lng])), { padding: [40, 40] })
    }
    fit()
    // Container may still be animating in; refit once it has its final size
    const t = setTimeout(fit, 350)

    return () => {
      clearTimeout(t)
      map.remove()
    }
  }, [pathId, quests])

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
}
