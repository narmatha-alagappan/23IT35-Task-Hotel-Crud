import { useDispatch, useSelector } from 'react-redux'
import { setSearchTerm, setPriceRange } from '../store/hotelSlice'

export default function SearchFilter() {
  const dispatch = useDispatch()
  const { searchTerm, minPrice, maxPrice } = useSelector((s) => s.hotels)

  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search by hotel title..."
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        className="input"
      />
      <div className="price-filter">
        <input
          type="number"
          placeholder="Min ₹"
          value={minPrice}
          onChange={(e) =>
            dispatch(setPriceRange({ min: e.target.value, max: maxPrice }))
          }
          className="input input-sm"
        />
        <span>—</span>
        <input
          type="number"
          placeholder="Max ₹"
          value={maxPrice}
          onChange={(e) =>
            dispatch(setPriceRange({ min: minPrice, max: e.target.value }))
          }
          className="input input-sm"
        />
        <button
          className="btn btn-secondary"
          onClick={() => dispatch(setPriceRange({ min: '', max: '' }))}
        >
          Clear
        </button>
      </div>    
    </div>
  )
}