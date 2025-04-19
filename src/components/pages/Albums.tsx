import { Album } from "../../app/types";
import { useGetAllAlbumsQuery } from "../../features/albumApi";
import DataTable, { Column } from "../UI/DataTable";
import usePagination from "../../hooks/usePagination";

const Albums = () => {
  const { page, limit, handlePageChange, handleLimitChange } = usePagination();

  const { data, isLoading } = useGetAllAlbumsQuery({ page, size: limit });

  const albums = data?.albums || [];
  const { totalPages } = data?.pagination || {};

  const columns: Column<Album>[] = [
    {
      header: "Cover",
      accessor: "coverImage",
      cell: (value: string) => (
        <img
          src={value || "/default-cover.png"}
          alt="Cover"
          style={{
            width: 50,
            height: 50,
            borderRadius: 6,
            objectFit: "cover",
          }}
        />
      ),
    },
    { header: "Name", accessor: "name" },
    {
      header: "Artists",
      accessor: "artists",
      cell: (value: []) => value.length,
    },
    { header: "Genre", accessor: "genre" },
    { header: "Language", accessor: "language" },
    {
      header: "Description",
      accessor: "description",
      cell: (value?: string) =>
        value ? value : <em className="text-muted">No description</em>,
    },
    {
      header: "Release Date",
      accessor: "releaseDate",
      cell: (value: string | Date) =>
        new Date(value).toLocaleDateString("en-IN", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
    },
    {
      header: "Status",
      accessor: "status",
      cell: (value: boolean) => (
        <span className={`badge ${value ? "badge-success" : "badge-danger"}`}>
          {value ? "Published" : "Pending"}
        </span>
      ),
    },
    { header: "Likes", accessor: "likes" },
  ];

  return (
    <div className="content-wrapper">
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Albums</h4>
              <DataTable columns={columns} data={albums} loading={isLoading} />

              {/* Pagination UI */}
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div>
                  <label>
                    Show{" "}
                    <select
                      value={limit}
                      onChange={(e) =>
                        handleLimitChange(Number(e.target.value))
                      }
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
                          className={`page-item ${
                            page === index + 1 ? "active" : ""
                          }`}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Albums;
