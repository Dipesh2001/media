import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import {
  useCreateArtistMutation,
  useUpdateArtistMutation,
  useGetArtistByIdQuery,
} from "../../features/artistApi";
import { artistSchema } from "../../app/schema";

const ArtistForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [createArtist] = useCreateArtistMutation();
  const [updateArtist] = useUpdateArtistMutation();
  const { data: artistData, isLoading } = useGetArtistByIdQuery(id!, {
    skip: !isEditMode,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    errors,
    setValues,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: artistData?.name || "",
      bio: artistData?.bio || "",
      country: artistData?.country || "",
      socialLinks: {
        youtube: artistData?.socialLinks?.youtube,
        instagram: artistData?.socialLinks?.instagram,
        twitter: artistData?.socialLinks?.twitter,
        facebook: artistData?.socialLinks?.facebook,
      },
      image: artistData?.image || "",
    },
    validationSchema: artistSchema,
    onSubmit: async (values) => {
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if (key === "socialLinks") {
          Object.entries(value).forEach(
            ([platform, link]) =>
              link && formData.append(`socialLinks[${platform}]`, link)
          );
        } else {
          formData.append(key, value as string);
        }
      });

      if (imageFile) {
        formData.append("image", imageFile);
      }

      try {
        if (isEditMode) {
          await updateArtist({ id, formData });
        } else {
          await createArtist(formData);
        }
        navigate("/artists");
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
                {isEditMode ? "Edit Artist" : "Add New Artist"}
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
                  <label>Bio</label>
                  <textarea
                    name="bio"
                    className="form-control"
                    value={values.bio}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                <div className="form-group">
                  <label>Country</label>
                  <input
                    type="text"
                    name="country"
                    className="form-control"
                    value={values.country}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                <div className="form-group">
                  <label>Social Links</label>
                  {["youtube", "instagram", "twitter", "facebook"].map(
                    (platform) => (
                      <input
                        key={platform}
                        type="text"
                        name={`socialLinks.${platform}`}
                        placeholder={
                          platform.charAt(0).toUpperCase() + platform.slice(1)
                        }
                        className="form-control mb-2"
                        value={(values.socialLinks as any)[platform]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    )
                  )}
                </div>

                <div className="form-group">
                  <label>Artist Image</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.currentTarget.files && e.currentTarget.files[0]) {
                        const file = e.currentTarget.files[0];
                        setImageFile(file);
                        setValues({
                          ...values,
                          image: URL.createObjectURL(file),
                        });
                        setImagePreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                  {touched.image && errors.image && (
                    <span className="text-danger">{errors.image}</span>
                  )}
                  {(imagePreview || (id && values.image)) && (
                    <div className="mt-2">
                      <img
                        src={imagePreview || values.image}
                        alt="Artist Preview"
                        style={{
                          width: 120,
                          height: 120,
                          objectFit: "cover",
                          borderRadius: 8,
                          border: "1px solid #ccc",
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="mt-3">
                  <button type="submit" className="btn btn-primary btn-lg">
                    {isEditMode ? "Update Artist" : "Create Artist"}
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

export default ArtistForm;
