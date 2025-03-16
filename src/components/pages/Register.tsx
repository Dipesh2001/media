import { useFormik } from "formik";
import { adminRegisterSchema } from "../../app/schema";
import { Link } from "react-router-dom";
import { useRegisterAdminMutation } from "../../features/adminApi";

const Register = () => {
  const [registerAdmin] = useRegisterAdminMutation();
  const { values, handleChange, handleBlur, handleSubmit, touched, errors } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
      },
      validationSchema: adminRegisterSchema,
      onSubmit: async (values) => {
        const res = await registerAdmin(values);
        console.log("Response", res);
      },
    });

  return (
    <div className="content-wrapper d-flex align-items-center auth px-0">
      <div className="row w-100 mx-0">
        <div className="col-lg-6 mx-auto">
          <div className="auth-form-light text-left py-5 px-4 px-sm-5">
            <div className="brand-logo">
              <img src="../../assets/images/logo.svg" alt="logo" />
            </div>
            <h4>New here?</h4>
            <h6 className="font-weight-light">
              Signing up is easy. It only takes a few steps
            </h6>
            <form className="pt-3" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="name"
                  className="form-control form-control-lg"
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="Username"
                  onBlur={handleBlur}
                />
                {touched.name && errors.name && (
                  <span className="text-danger font-weight-500 d-block my-2">
                    {errors.name}
                  </span>
                )}
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="Email"
                  onBlur={handleBlur}
                />
                {touched.email && errors.email && (
                  <span className="text-danger font-weight-500 d-block my-2">
                    {errors.email}
                  </span>
                )}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  placeholder="Password"
                  onBlur={handleBlur}
                />
                {touched.password && errors.password && (
                  <span className="text-danger font-weight-500 d-block my-2">
                    {errors.password}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <div className="form-check">
                  <label className="form-check-label text-muted">
                    <input type="checkbox" className="form-check-input" /> I
                    agree to all Terms & Conditions{" "}
                  </label>
                </div>
              </div>
              <div className="mt-3 d-grid gap-2">
                <button
                  type="submit"
                  className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                >
                  SIGN UP
                </button>
              </div>
              <div className="text-center mt-4 font-weight-light">
                {" "}
                Already have an account?{" "}
                <Link to={"/login"} className="text-primary">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
