import { Artist } from "../../app/types";
import { useGetAllArtistsQuery } from "../../features/artistApi";
import DataTable, { Column } from "../UI/DataTable";
import usePagination from "../../hooks/usePagination";
import { Link } from "react-router-dom";
import { useState } from "react";
import Pagination from "../UI/Pagination";

const Artists = () => {
  const { page, limit, handlePageChange, handleLimitChange } = usePagination();
  const { data, isLoading } = useGetAllArtistsQuery({ page, size: limit });

  const artists = data?.artists || [];
  const { totalPages } = data?.pagination || {};

  const [showBio, setShowBio] = useState<string | null>(null);

  const columns: Column<Artist>[] = [
    {
      header: "Image",
      accessor: "image",
      cell: (value: string) => (
        <img
          src={value || "/default-avatar.png"}
          alt="Artist"
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      ),
    },
    { header: "Name", accessor: "name" },
    {
      header: "Country",
      accessor: "country",
      cell: (value: string) => value || "N/A",
    },
    { header: "Followers", accessor: "followers" },
    {
      header: "Status",
      accessor: "isActive",
      cell: (value: boolean) => (
        <span className={`badge ${value ? "badge-success" : "badge-danger"}`}>
          {value ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      header: "Actions",
      accessor: "_id",
      cell: (artistId: string, row: Artist) => (
        <div className="d-flex align-items-center gap-2">
          <Link to={`/artists/edit/${artistId}`} title="Edit">
            <i className="fa fa-pencil text-primary" />
          </Link>

          <button
            className="btn btn-link p-0"
            title="Delete"
            onClick={() => {
              // Handle delete
              console.log("Delete artist", artistId);
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
      <div className="row mb-3">
        <div className="col-12 d-flex justify-content-end">
          <Link to="/artists/add" className="btn btn-primary">
            <i className="fa fa-plus mr-1" /> Add Artist
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Artists</h4>

              <DataTable columns={columns} data={artists} loading={isLoading} />

              {/* Pagination UI */}
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

export default Artists;
