import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Mainscreen from "../../components/Mainscreen";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import "./Admin.css";
import Navbar from "../../components/Navbar";

const Admin = () => {
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    gender: "",
    email: "",
    password: "",
    number: "",
    dept: "",
    year: 0,
    room: "",
    job: "student", 
  });

  const [alerts, setAlerts] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const showAlert = (message, type = "error") => {
    alert(message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic field validations
    const newErrors = {};
    if (!userData.id.startsWith(userData.job[0].toUpperCase())) {
      newErrors.id = `ID should start with ${userData.job[0].toUpperCase()}`;
    }
    if (!userData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!userData.gender.trim()) {
      newErrors.gender = "Gender is required";
    }
    if (!userData.email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!userData.password.trim()) {
      newErrors.password = "Password is required";
    }
    if (!userData.number.trim()) {
      newErrors.number = "Phone Number is required";
    }

    // Check if there are errors
    if (Object.keys(newErrors).length > 0) {
      Object.keys(newErrors).forEach((field) => {
        showAlert(newErrors[field]);
      });
      return;
    }

    // Clear errors on successful submission
    setAlerts([]);

    // Set ID based on the selected role
    if (userData.job === "student") {
      setUserData((prevData) => ({
        ...prevData,
        id: `S${prevData.id}`,
      }));
    } else if (userData.job === "faculty") {
      setUserData((prevData) => ({
        ...prevData,
        id: `F${prevData.id}`,
      }));
    } else if (userData.job === "warden") {
      setUserData((prevData) => ({
        ...prevData,
        id: `W${prevData.id}`,
      }));
    } else if (userData.job === "security") {
      setUserData((prevData) => ({
        ...prevData,
        id: `T${prevData.id}`,
      }));
    }

    try {
      // Make a request to add a new user
      await axios.post("/api/users", userData);

      // Clear the form after successful submission
      setUserData({
        id: "",
        name: "",
        gender: "",
        email: "",
        password: "",
        number: "",
        dept: "",
        year: 0,
        room: "",
        job: "student",
      });

      // Show success alert
      showAlert("User added successfully", "success");
    } catch (error) {
      // Handle errors
      console.error("Error adding user:", error.message);
      // Show error alert
      showAlert("Error adding user. Please try again.");
    }
  };

  const dispatch = useDispatch();

  // when user logouts, it should go back to the login page
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  const navigate = useNavigate();

  return (
    <>
      <Navbar role="admin" homeLink={"/"} />
      <Mainscreen title={`Hey ${userInfo && userInfo.name}`}>
        <div className="admin-add-user-form">
          <form onSubmit={handleSubmit}>
            <h2>User Registration</h2>
            <fieldset>
              {alerts.map((alert, index) => (
                <div key={index} className={`alert ${alert.type}`}>
                  {alert.message}
                </div>
              ))}
              <label htmlFor="id">ID: * </label>
              <input
                type="text"
                id="id"
                name="id"
                value={userData.id}
                onChange={handleChange}
                required
              />

              <label htmlFor="name">Name: * </label>
              <input
                type="text"
                id="name"
                name="name"
                value={userData.name}
                onChange={handleChange}
                required
              />

              <label htmlFor="gender">Gender: * </label>
              <select
                id="gender"
                name="gender"
                value={userData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <label htmlFor="email">Email: * </label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                required
              />

              <label htmlFor="password">Password: * </label>
              <input
                type="password"
                id="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                required
              />

              <label htmlFor="number">Number: * </label>
              <input
                type="text"
                id="number"
                name="number"
                value={userData.number}
                onChange={handleChange}
                required
              />

              <label htmlFor="dept">Department:</label>
              <input
                type="text"
                id="dept"
                name="dept"
                value={userData.dept}
                onChange={handleChange}
              />

              <label htmlFor="year">Year:</label>
              <input
                type="number"
                id="year"
                name="year"
                value={userData.year}
                onChange={handleChange}
              />

              <label htmlFor="room">Room:</label>
              <input
                type="text"
                id="room"
                name="room"
                value={userData.room}
                onChange={handleChange}
              />

              {/* You might want to adjust this based on your requirements */}
              <label htmlFor="job">Job (Role):</label>
              <select
                id="job"
                name="job"
                value={userData.job}
                onChange={handleChange}
                required
              >
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="warden">Warden</option>
                <option value="security">Security</option>
              </select>

              <button type="submit">Add User</button>
            </fieldset>
          </form>
        </div>
      </Mainscreen>
    </>
  );
};

export default Admin;
