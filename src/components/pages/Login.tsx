import { useFormik } from "formik";
import { adminLoginSchema } from "../../app/schema";
import { Link } from "react-router-dom";
import { useLoginAdminMutation } from "../../features/adminApi";

const Login = () => {
  const [loginAdmin] = useLoginAdminMutation();
  const { values, handleChange, handleBlur, handleSubmit, touched, errors } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: adminLoginSchema,
      onSubmit: async (values) => {
        const { data } = await loginAdmin(values);
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
            <h4>Hello! let's get started</h4>
            <h6 className="font-weight-light">Sign in to continue.</h6>
            <form className="pt-3" onSubmit={handleSubmit}>
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
              <div className="mt-3 d-grid gap-2">
                <button
                  type="submit"
                  className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                >
                  SIGN IN
                </button>
              </div>
              <div className="my-2 d-flex justify-content-between align-items-center">
                <div className="form-check">
                  <label className="form-check-label text-muted">
                    <input type="checkbox" className="form-check-input" /> Keep
                    me signed in <i className="input-helper"></i>
                  </label>
                </div>
                <a href="#" className="auth-link text-black">
                  Forgot password?
                </a>
              </div>
              <div className="text-center mt-4 font-weight-light">
                {" "}
                Don't have an account?{" "}
                <Link to="/register" className="text-primary">
                  Create
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
