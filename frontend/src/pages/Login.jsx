import { useState } from "react";
import { loginUser } from "../services/authService.js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate=useNavigate();
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });
  const [error, seterror] = useState("");
  const [success, setsuccess] = useState("");

  const handleChange = (e) => {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    seterror("");
    setsuccess("");

    try {
      await loginUser(formdata);
      setsuccess("Welcome back! Login successful");
      setformdata({ email: "", password: "" });
      setTimeout(()=>{
        navigate("/dashboard");

      },1000);
    } catch (err) {
      seterror(err.message || "Login failed");
    }
  };

  const isDisabled =
    !formdata.email.trim() || !formdata.password.trim();

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
      }}
    >
      <div className="col-md-4">
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-body p-4">
            <h2 className="text-center fw-bold mb-2">Welcome Back</h2>
            <p className="text-center text-muted mb-4">
              Login to continue
            </p>

            {error && (
              <div className="alert alert-danger py-2">{error}</div>
            )}
            {success && (
              <div className="alert alert-success py-2">{success}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control rounded-3"
                  placeholder="Enter your email"
                  value={formdata.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control rounded-3"
                  placeholder="Enter your password"
                  value={formdata.password}
                  onChange={handleChange}
                />
              </div>

              <button
                className="btn btn-primary w-100 py-2 rounded-3 fw-semibold"
                disabled={isDisabled}
              >
                Login
              </button>

              <p className="text-center mt-3 mb-0">
                 Don't have an account?{" "}
                <Link
                  to="/register"
                  className="fw-semibold text-decoration-none"
                >
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
