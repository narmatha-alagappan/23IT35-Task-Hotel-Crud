import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addHotel, updateHotel } from '../store/hotelSlice'
import { useNavigate } from 'react-router-dom'

const emptyForm = {
  title: '',
  description: '',
  image: '',
  latitude: '',
  longitude: '',
  price: '',
}

export default function HotelForm({ existingHotel }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [preview, setPreview] = useState('')

  useEffect(() => {
    if (existingHotel) {
      setForm(existingHotel)
      setPreview(existingHotel.image)
    } else {
      setForm(emptyForm)
      setPreview('')
    }
  }, [existingHotel])

  const validate = () => {
    const errs = {}
    if (!form.title.trim()) errs.title = 'Title is required'
    if (!form.description.trim()) errs.description = 'Description is required'
    if (!form.image) errs.image = 'Image is required'
    if (form.latitude === '' || isNaN(form.latitude)) errs.latitude = 'Valid latitude required'
    if (form.longitude === '' || isNaN(form.longitude)) errs.longitude = 'Valid longitude required'
    if (form.price === '' || Number(form.price) <= 0) errs.price = 'Price must be greater than 0'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result })
      setPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    const payload = {
      ...form,
      latitude: parseFloat(form.latitude),
      longitude: parseFloat(form.longitude),
      price: Number(form.price),
    }
    if (existingHotel) {
      dispatch(updateHotel({ ...payload, id: existingHotel.id }))
    } else {
      dispatch(addHotel(payload))
    }
    navigate('/')
  }

  return (
    <form className="hotel-form" onSubmit={handleSubmit} noValidate>
      <h2>{existingHotel ? 'Edit Hotel' : 'Add New Hotel'}</h2>

      <div className="form-group">
        <label>Hotel Image</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {preview && (
          <img src={preview} alt="Hotel preview" className="image-preview" />
        )}
        {errors.image && <span className="error">{errors.image}</span>}
      </div>

      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Hotel name"
        />
        {errors.title && <span className="error">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          rows="4"
          value={form.description}
          onChange={handleChange}
          placeholder="Hotel description"
        />
        {errors.description && <span className="error">{errors.description}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Latitude</label>
          <input
            type="number"
            step="any"
            name="latitude"
            value={form.latitude}
            onChange={handleChange}
            placeholder="e.g. 19.0760"
          />
          {errors.latitude && <span className="error">{errors.latitude}</span>}
        </div>
        <div className="form-group">
          <label>Longitude</label>
          <input
            type="number"
            step="any"
            name="longitude"
            value={form.longitude}
            onChange={handleChange}
            placeholder="e.g. 72.8777"
          />
          {errors.longitude && <span className="error">{errors.longitude}</span>}
        </div>
      </div>

      <div className="form-group">
        <label>Price (₹ per night)</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="e.g. 5000"
        />
        {errors.price && <span className="error">{errors.price}</span>}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {existingHotel ? 'Update Hotel' : 'Add Hotel'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
          Cancel
        </button>
      </div>
    </form>
  )
}