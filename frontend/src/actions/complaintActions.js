import axios from "axios";

// Student - Submit complaint
export const submitComplaint = async (studentId, category, description, image) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  const { data } = await axios.post(
    "http://localhost:5000/api/complaints",
    { studentId, category, description, image },
    config
  );
  return data;
};

// Student - Get own complaints
export const getStudentComplaints = async (objectId) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  const { data } = await axios.get(
    `http://localhost:5000/api/complaints/student?objectId=${objectId}`,
    config
  );
  return data;
};

// Warden - Get all complaints
export const getWardenComplaints = async (objectId) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  const { data } = await axios.get(
    `http://localhost:5000/api/complaints/warden?objectId=${objectId}`,
    config
  );
  return data;
};

// Warden - Resolve complaint
export const resolveComplaint = async (id, wardenComment) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  const { data } = await axios.put(
    `http://localhost:5000/api/complaints/resolve/${id}`,
    { wardenComment },
    config
  );
  return data;
};

// Warden - Reject complaint
export const rejectComplaint = async (id, wardenComment) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  const { data } = await axios.put(
    `http://localhost:5000/api/complaints/reject/${id}`,
    { wardenComment },
    config
  );
  return data;
};