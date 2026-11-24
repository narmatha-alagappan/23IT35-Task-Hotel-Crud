import { useNavigate } from 'react-router-dom'

export default function HotelCard({ hotel, onEdit, onDelete }) {
  const navigate = useNavigate()

  const handleCardClick = (e) => {
    if (e.target.closest('button')) return
    navigate(`/hotel/${hotel.id}`)
  }

  return (
    <div className="hotel-card" onClick={handleCardClick}>
      <img
        src={hotel.image}
        alt={hotel.title}
        className="hotel-card-img"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/400x300/c8b6e8/4b2e83?text=Hotel'
        }}
      />
      <div className="hotel-card-body">
        <div className="hotel-card-header">
          <h3 className="hotel-title">{hotel.title}</h3>
          <span className="hotel-price">
            ₹{hotel.price.toLocaleString('en-IN')} <small></small>
          </span>
        </div>
        <p className="hotel-desc">
          {hotel.description.length > 140
            ? hotel.description.substring(0, 140) + '...'
            : hotel.description}
        </p>
        <div className="hotel-card-footer">
          <span className="hotel-location">
            📍 {hotel.latitude.toFixed(4)}, {hotel.longitude.toFixed(4)}
          </span>
          <div className="hotel-actions">
            <button className="btn btn-secondary" onClick={() => onEdit(hotel)}>
              Edit
            </button>
            <button className="btn btn-danger" onClick={() => onDelete(hotel.id)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}