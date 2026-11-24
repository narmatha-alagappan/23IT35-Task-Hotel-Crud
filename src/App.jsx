import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HotelListPage from './pages/HotelListPage'
import HotelDetailPage from './pages/HotelDetailPage'
import HotelForm from './components/HotelForm'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

function AddHotelPage() {
  return <HotelForm />
}

function EditHotelPage() {
  const { id } = useParams()
  const hotel = useSelector((s) => s.hotels.hotels.find((h) => h.id === Number(id)))
  if (!hotel) return <p>Hotel not found</p>
  return <HotelForm existingHotel={hotel} />
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HotelListPage />} />
        <Route path="/add" element={<AddHotelPage />} />
        <Route path="/edit/:id" element={<EditHotelPage />} />
        <Route path="/hotel/:id" element={<HotelDetailPage />} />
      </Routes>
    </Layout>
  )
}