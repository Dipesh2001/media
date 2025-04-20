type props = {
  limit: number;
  handleLimitChange: (data: number) => void;
  handlePageChange: (data: number) => void;
  totalPages: number | undefined;
  page: number;
};
const Pagination = ({
  limit,
  handleLimitChange,
  handlePageChange,
  totalPages,
  page,
}: props) => {
  return (
    <div className="d-flex justify-content-between align-items-center mt-3">
      <div>
        <label>
          Show{" "}
          <select
            value={limit}
            onChange={(e) => handleLimitChange(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>{" "}
          entries
        </label>
      </div>
      <div>
        <nav>
          <ul className="pagination">
            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index}
                className={`page-item ${page === index + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
