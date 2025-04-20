import { Album } from "../../app/types";
import { useGetAllAlbumsQuery } from "../../features/albumApi";
import DataTable, { Column } from "../UI/DataTable";
import usePagination from "../../hooks/usePagination";
import { Link } from "react-router-dom";
import { useState } from "react";
import Pagination from "../UI/Pagination";

const Albums = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");

  const { page, limit, handlePageChange, handleLimitChange } = usePagination();
  const { data, isLoading } = useGetAllAlbumsQuery({
    page,
    size: limit,
    search: searchTerm,
    sortBy,
  });

  const albums = data?.albums || [];
  const { totalPages } = data?.pagination || {};

  const [showDesc, setShowDesc] = useState<string | null>(null);

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
    { header: "Genre", accessor: "genre" },
    { header: "Language", accessor: "language" },
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

    {
      header: "Actions",
      accessor: "_id",
      cell: (albumId: string, row: Album) => (
        <div className="d-flex align-items-center gap-2">
          {row.description && (
            <>
              <i
                className="fa fa-info-circle text-info"
                title="View Description"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  setShowDesc(showDesc === albumId ? null : albumId)
                }
              />
              {showDesc === albumId && (
                <div
                  className="description-popover bg-light p-2 rounded shadow-sm"
                  style={{ maxWidth: 250 }}
                >
                  <p className="mb-0 small">{row.description}</p>
                </div>
              )}
            </>
          )}

          <Link to={`/albums/edit/${albumId}`} title="Edit">
            <i className="fa fa-pencil text-primary" />
          </Link>

          <button
            className="btn btn-link p-0"
            title="Delete"
            onClick={() => {
              // Implement delete handler
              console.log("Delete album", albumId);
            }}
          >
            <i className="fa fa-trash text-danger" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="content-wrapper">
      {/* 🔘 Header row with Add button */}
      <div className="row mb-4 align-items-center">
        <div className="col-md-8">
          <h4 className="mb-0">Albums</h4>
        </div>
        <div className="col-md-4 text-md-right text-start mt-2 mt-md-0">
          <Link to="/albums/add" className="btn btn-primary">
            <i className="fa fa-plus mr-2" /> Add Album
          </Link>
        </div>
      </div>

      {/* 🔍 Filters */}
      <div className="row mb-3 align-items-end">
        {/* 🔍 Search Input */}
        <div className="col-md-6 mb-2 mb-md-0">
          <label className="form-label">Search Albums</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter album name, genre, or language"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* 🔽 Sort Select */}
        <div className="col-md-4">
          <label className="form-label">Sort By</label>
          <select
            className="form-control"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="createdAt">Newest First</option>
            <option value="name">Name (A-Z)</option>
            <option value="likes">Most Liked</option>
          </select>
        </div>
      </div>

      {/* 📦 Album Table */}
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <DataTable columns={columns} data={albums} loading={isLoading} />

              {/* 🔁 Pagination */}
              <Pagination
                limit={limit}
                handleLimitChange={handleLimitChange}
                handlePageChange={handlePageChange}
                totalPages={totalPages}
                page={page}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Albums;
