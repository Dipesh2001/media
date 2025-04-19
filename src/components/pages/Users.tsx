import { useGetAllUsersQuery } from "../../features/userApi";
import DataTable from "../UI/DataTable";

const Users = () => {
  const { data: users, isLoading } = useGetAllUsersQuery();

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    {
      header: "Profile Image",
      accessor: "profileImage",
      cell: (value) =>
        value ? (
          <img
            src={value}
            alt="Profile"
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          />
        ) : (
          "N/A"
        ),
    },
    {
      header: "Favorites",
      accessor: "favoriteSongs",
      cell: (value, row) => (
        <span>
          🎵 {row.favoriteSongs.length} / 💿 {row.favoriteAlbums.length} / 📂{" "}
          {row.favoritePlaylists.length}
        </span>
      ),
    },
    {
      header: "Followed Artists",
      accessor: "followedArtists",
      cell: (value) => value?.length ?? 0,
    },
    {
      header: "My Playlists",
      accessor: "myPlaylists",
      cell: (value) => value?.length ?? 0,
    },
    {
      header: "Created At",
      accessor: "createdAt",
      cell: (value) => new Date(value).toLocaleDateString(),
    },
  ];

  return (
    <div className="content-wrapper">
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Users Table</h4>
              <p className="card-description">
                Add class <code>.table</code>
              </p>
              <DataTable
                columns={columns}
                data={users || []}
                loading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
