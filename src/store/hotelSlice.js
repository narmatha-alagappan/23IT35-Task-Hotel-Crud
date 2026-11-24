import { createSlice } from '@reduxjs/toolkit'
import { getHotels, saveHotels } from '../data/hotels'

const initialState = {
  hotels: getHotels(),
  searchTerm: '',
  minPrice: '',
  maxPrice: '',
  currentPage: 1,
  itemsPerPage: 2,   
}

const hotelSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    addHotel: (state, action) => {
      const newHotel = { ...action.payload, id: Date.now() }
      state.hotels.push(newHotel)
      saveHotels(state.hotels)
    },
    updateHotel: (state, action) => {
      const idx = state.hotels.findIndex((h) => h.id === action.payload.id)
      if (idx !== -1) {
        state.hotels[idx] = action.payload
        saveHotels(state.hotels)
      }
    },
    deleteHotel: (state, action) => {
      state.hotels = state.hotels.filter((h) => h.id !== action.payload)
      saveHotels(state.hotels)
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
      state.currentPage = 1
    },
    setPriceRange: (state, action) => {
      state.minPrice = action.payload.min
      state.maxPrice = action.payload.max
      state.currentPage = 1
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
  },
})

export const {
  addHotel,
  updateHotel,
  deleteHotel,
  setSearchTerm,
  setPriceRange,
  setCurrentPage,
} = hotelSlice.actions

export default hotelSlice.reducer