/**
 * Pagination component
 * Props:
 * - currentPage: number
 * - totalPages: number
 * - onPageChange: function(page)
 */
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <nav className="pagination">
      <ul className="pagination__list">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <li key={page} className="pagination__item">
            <button
              className={`pagination__button ${
                currentPage === page ? "pagination__button--active" : ""
              }`}
              onClick={() => onPageChange(page)}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
