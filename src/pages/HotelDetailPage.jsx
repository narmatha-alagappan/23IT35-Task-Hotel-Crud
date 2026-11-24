import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet-async'

export default function HotelDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const hotel = useSelector((s) => s.hotels.hotels.find((h) => h.id === Number(id)))

  if (!hotel) {
    return (
      <div className="not-found">
        <h2>Hotel not found</h2>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Back to list
        </button>
      </div>
    )
  }

  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${
    hotel.longitude - 0.02
  }%2C${hotel.latitude - 0.02}%2C${hotel.longitude + 0.02}%2C${
    hotel.latitude + 0.02
  }&layer=mapnik&marker=${hotel.latitude}%2C${hotel.longitude}`

  return (
    <>
      <Helmet>
        <title>{hotel.title} | HotelHub</title>
        <meta name="description" content={hotel.description.substring(0, 150)} />
        <meta property="og:title" content={hotel.title} />
        <meta property="og:image" content={hotel.image} />
      </Helmet>

      <button className="btn btn-secondary back-btn" onClick={() => navigate('/')}>
        ← Back
      </button>

      <div className="detail-container">
        <img src={hotel.image} alt={hotel.title} className="detail-image" />
        <div className="detail-info">
          <h1>{hotel.title}</h1>
          <p className="detail-price">₹{hotel.price.toLocaleString('en-IN')}</p>
          <p className="detail-desc">{hotel.description}</p>
          <p className="detail-coords">
            Lat: {hotel.latitude}, Lng: {hotel.longitude}
          </p>
          <div className="detail-map">
            <iframe
              title="Hotel Location Map"
              src={mapSrc}
              width="100%"
              height="300"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </>
  )
}