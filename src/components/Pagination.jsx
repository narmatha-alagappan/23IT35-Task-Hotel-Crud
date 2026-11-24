export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const getPages = () => {
    if (totalPages <= 5)
      return Array.from({ length: totalPages }, (_, i) => i + 1)

    const pages = new Set([1, totalPages, currentPage])
    if (currentPage > 2) pages.add(currentPage - 1)
    if (currentPage < totalPages - 1) pages.add(currentPage + 1)

    const sorted = [...pages].sort((a, b) => a - b)
    const out = []
    sorted.forEach((p, i) => {
      if (i > 0 && p - sorted[i - 1] > 1) out.push('…')
      out.push(p)
    })
    return out
  }

  return (
    <div className="pagination">
      <button
        className="btn btn-page"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>

      {getPages().map((p, idx) =>
        p === '…' ? (
          <span key={`gap-${idx}`} className="page-gap">…</span>
        ) : (
          <button
            key={p}
            className={`btn btn-page ${p === currentPage ? 'active' : ''}`}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        )
      )}

      <button
        className="btn btn-page"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  )
}