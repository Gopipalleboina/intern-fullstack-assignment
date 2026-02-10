import { useState } from "react";
import { registerUser } from "../services/authService.js";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formdata, setformdata] = useState({
    name: "",
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

  const validate = () => {
    const { name, email, password } = formdata;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!name.trim() || !email.trim() || !password.trim()) {
      return "All fields are required";
    }

    if (!emailRegex.test(email)) {
      return "Enter a valid email address";
    }

    if (!passwordRegex.test(password)) {
      return "Password must contain letters, numbers & special characters (8+)";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    seterror("");
    setsuccess("");

    const validateerror = validate();
    if (validateerror) {
      seterror(validateerror);
      return;
    }

    try {
      await registerUser(formdata);
      setsuccess("Account created successfully");
      setformdata({ name: "", email: "", password: "" });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      seterror(error.message || "Something went wrong");
    }
  };

  const isDisabled =
    !formdata.name.trim() ||
    !formdata.email.trim() ||
    !formdata.password.trim();

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #7d43ce, #185a9d)",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div
              className="card border-0 shadow-lg"
              style={{ borderRadius: "18px" }}
            >
              <div className="card-body p-4">
                <h3 className="text-center fw-bold mb-1">
                  Create Account
                </h3>
                <p className="text-center text-muted mb-4">
                  Join us and get started
                </p>

                {error && (
                  <div className="alert alert-danger py-2">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="alert alert-success py-2">
                    {success}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control form-control-lg"
                      placeholder="Enter your name"
                      value={formdata.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control form-control-lg"
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
                      className="form-control form-control-lg"
                      placeholder="Create a strong password"
                      value={formdata.password}
                      onChange={handleChange}
                    />
                    <small className="text-muted">
                      8+ characters, letters, numbers & special symbols
                    </small>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100"
                    disabled={isDisabled}
                    style={{
                      borderRadius: "10px",
                      opacity: isDisabled ? 0.7 : 1,
                    }}
                  >
                    Register
                  </button>

                  <p className="text-center mt-3 mb-0">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-decoration-none fw-semibold"
                    >
                      Login
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
