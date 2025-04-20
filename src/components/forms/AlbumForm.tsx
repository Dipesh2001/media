import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useCreateAlbumMutation,
  useGetAlbumByIdQuery,
  useUpdateAlbumMutation,
} from "../../features/albumApi";
import { useGetArtistBySearchMutation } from "../../features/artistApi";

// import { useGetAllArtistsQuery } from "../../features/artistApi";

const albumSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  genre: Yup.string().required("Genre is required"),
  language: Yup.string().required("Language is required"),
  description: Yup.string(),
  releaseDate: Yup.string().required("Release date is required"),
  artists: Yup.array().of(Yup.string()).min(1, "Select at least one artist"),
});

const AlbumForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchArtist] = useGetArtistBySearchMutation();
  const isEditMode = !!id;

  const [createAlbum] = useCreateAlbumMutation();
  const [updateAlbum] = useUpdateAlbumMutation();
  const { data: albumData, isLoading } = useGetAlbumByIdQuery(id!, {
    skip: !isEditMode,
  });
  // const { data: artistData } = useGetAllArtistsQuery();

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedArtists, setSelectedArtists] = useState<any[]>([]);

  // Optional: preload artist names on edit page
  useEffect(() => {
    const fetchSelected = async () => {
      if (values.artists?.length > 0) {
        const res = await fetch(`/api/artists/byIds`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: values.artists }),
        });
        const data = await res.json();
        setSelectedArtists(data.artists);
      }
    };
    fetchSelected();
  }, []);
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    errors,
    setFieldValue,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: albumData?.name || "",
      genre: albumData?.genre || "",
      language: albumData?.language || "",
      description: albumData?.description || "",
      releaseDate: albumData?.releaseDate || "",
      artists: albumData?.artists?.map((a: any) => a._id) || [],
      coverImage: albumData?.coverImage || "", // this will help with preview
    },
    validationSchema: albumSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      for (const key in values) {
        if (key === "artists") {
          values.artists.forEach((id) => formData.append("artists", id));
        } else {
          formData.append(key, (values as any)[key]);
        }
      }
      // remaining validation for it
      if (coverFile) {
        formData.append("coverImage", coverFile);
      }

      try {
        if (isEditMode) {
          await updateAlbum({ id, formData }).unwrap();
        } else {
          await createAlbum(formData).unwrap();
        }
        navigate("/albums");
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  return (
    <div className="content-wrapper">
      <div className="row">
        <div className="col-lg-8 mx-auto grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                {isEditMode ? "Edit Album" : "Add New Album"}
              </h4>
              <form className="pt-3" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.name && errors.name && (
                    <span className="text-danger">{errors.name}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Genre</label>
                  <input
                    type="text"
                    name="genre"
                    className="form-control"
                    value={values.genre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.genre && errors.genre && (
                    <span className="text-danger">{errors.genre}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Language</label>
                  <input
                    type="text"
                    name="language"
                    className="form-control"
                    value={values.language}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.language && errors.language && (
                    <span className="text-danger">{errors.language}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    className="form-control"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                <div className="form-group">
                  <label>Release Date</label>
                  <input
                    type="date"
                    name="releaseDate"
                    className="form-control"
                    value={
                      values.releaseDate &&
                      new Date(values.releaseDate).toISOString().split("T")[0]
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.releaseDate && errors.releaseDate && (
                    <span className="text-danger">{errors.releaseDate}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Artists</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search artists..."
                    value={search}
                    onChange={async (e) => {
                      const value = e.target.value;
                      setSearch(value);

                      if (value.length > 1) {
                        try {
                          const artists = await searchArtist(value).unwrap();
                          setSearchResults(
                            artists.filter(
                              (a: any) => !values.artists.includes(a._id)
                            )
                          );
                        } catch (err) {
                          console.error("Error searching artists", err);
                        }
                      } else {
                        setSearchResults([]);
                      }
                    }}
                  />
                  {loading && <div className="mt-1">Searching...</div>}

                  {searchResults.length > 0 && (
                    <ul
                      className="list-group position-absolute w-100 z-10"
                      style={{ maxHeight: 200, overflowY: "auto" }}
                    >
                      {searchResults.map((artist: any) => (
                        <li
                          key={artist._id}
                          className="list-group-item list-group-item-action"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setFieldValue("artists", [
                              ...values.artists,
                              artist._id,
                            ]);
                            setSelectedArtists([...selectedArtists, artist]);
                            setSearch("");
                            setSearchResults([]);
                          }}
                        >
                          {artist.name}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Selected Artists */}
                  <div className="mt-2 d-flex flex-wrap gap-2">
                    {selectedArtists.map((artist) => (
                      <span
                        key={artist._id}
                        className="badge badge-pill badge-primary d-flex align-items-center"
                        style={{ padding: "0.5em 1em", marginRight: 5 }}
                      >
                        {artist.name}
                        <span
                          style={{ marginLeft: 10, cursor: "pointer" }}
                          onClick={() => {
                            setFieldValue(
                              "artists",
                              values.artists.filter(
                                (id: string) => id !== artist._id
                              )
                            );
                            setSelectedArtists(
                              selectedArtists.filter(
                                (a) => a._id !== artist._id
                              )
                            );
                          }}
                        >
                          ×
                        </span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Cover Image</label>
                  <input
                    type="file"
                    name="coverImage"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.currentTarget.files && e.currentTarget.files[0]) {
                        const file = e.currentTarget.files[0];
                        setCoverFile(file);
                        setCoverPreview(URL.createObjectURL(file)); // Show preview
                      }
                    }}
                  />
                  {errors.coverImage && (
                    <span className="text-danger">{errors.coverImage}</span>
                  )}

                  {/* Show preview image */}
                  {(coverPreview || (id && values.coverImage)) && (
                    <div className="mt-2">
                      <img
                        src={coverPreview || values.coverImage}
                        alt="Cover Preview"
                        style={{
                          width: 120,
                          height: 120,
                          objectFit: "cover",
                          borderRadius: 8,
                          border: "1px solid #ddd",
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="mt-3">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg font-weight-medium"
                  >
                    {isEditMode ? "Update Album" : "Create Album"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumForm;
