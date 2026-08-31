import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Suspense, lazy } from "react";

const Searchresults = lazy(() =>
  import("./screens/Searchresult/Searchresults")
);
const Student = lazy(() => import("./screens/Student/Student"));
const Apply = lazy(() => import("./screens/Apply/Apply"));
const Faculty = lazy(() => import("./screens/Faculty/Faculty"));
const Warden = lazy(() => import("./screens/Warden/Warden"));
const Admin = lazy(() => import("./screens/Admin/Admin"));
const QrScanner = lazy(() => import("./components/QrScanner"));
const Login = lazy(() => import("./screens/Login/Login"));
const Security = lazy(() => import("./screens/Security/Security"));
const ViewHistory = lazy(() => import("./components/Viewhistory"));

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <main className="App">
        <Suspense fallback={<div></div>}>
          <Routes>
            <Route path="/" element={<Login />} exact />
            {/* <Route path="/login" element={<Login />} exact /> */}
            <Route path="/faculty" element={<Faculty />} exact />
            <Route path="/warden" element={<Warden />} exact />
            <Route path="/student" element={<Student />} exact />
            <Route path="/admin" element={<Admin />} exact />
            <Route path="/security" element={<Security />} exact />
            <Route path="/searchresult" element={<Searchresults />} exact />
            <Route path="/apply" element={<Apply />} exact />
            <Route path="/qrscan" element={<QrScanner />} exact />
            <Route path="/history" element={<ViewHistory />} exact />
          </Routes>
        </Suspense>
      </main>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
