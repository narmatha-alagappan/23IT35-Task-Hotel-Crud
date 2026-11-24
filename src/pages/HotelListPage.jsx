import { useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet-async'
import HotelCard from '../components/HotelCard'
import SearchFilter from '../components/SearchFilter'
import Pagination from '../components/Pagination'
import Toast from '../components/Toast'
import { deleteHotel, setCurrentPage } from '../store/hotelSlice'
import { useNavigate } from 'react-router-dom'
export default function HotelListPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { hotels, searchTerm, minPrice, maxPrice, currentPage, itemsPerPage } =
    useSelector((s) => s.hotels)
  const [toast, setToast] = useState(null)

  const filtered = useMemo(() => {
    return hotels.filter((h) => {
      const matchTitle = h.title.toLowerCase().includes(searchTerm.toLowerCase())
      const min = minPrice === '' ? 0 : Number(minPrice)
      const max = maxPrice === '' ? Infinity : Number(maxPrice)
      const matchPrice = h.price >= min && h.price <= max
      return matchTitle && matchPrice
    })
  }, [hotels, searchTerm, minPrice, maxPrice])

  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const start = (currentPage - 1) * itemsPerPage
  const paginated = filtered.slice(start, start + itemsPerPage)

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this hotel?')) {
      dispatch(deleteHotel(id))
      setToast({ message: 'Hotel deleted successfully!', type: 'success' })
    }
  }

  return (
    <>
      <Helmet>
        <title>Hotel List | HotelHub</title>
        <meta name="description" content="Browse our curated list of hotels across India with prices and details." />
      </Helmet>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      <h1 className="page-title">Explore Hotels</h1>
      <SearchFilter />

      {filtered.length === 0 ? (
        <p className="empty">No hotels match your search.</p>
      ) : (
        <div className="hotel-grid">
          {paginated.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              onEdit={(h) => navigate(`/edit/${h.id}`)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(p) => dispatch(setCurrentPage(p))}
      />
    </>
  )
}