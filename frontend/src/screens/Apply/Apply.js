import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOutpassAction } from "../../actions/outpassActions";
import { useNavigate } from "react-router-dom";
import "./apply.css";
import Navbar from "../../components/Navbar";

function Apply() {
  const [fromtime, setFromtime] = useState("");
  const [totime, setTotime] = useState("");
  const [place, setPlace] = useState("");
  const [reason, setReason] = useState("");

  const dispatch = useDispatch();

  const outpassCreate = useSelector((state) => state.outpassCreate);

  const resetHandler = () => {
    setFromtime("");
    setTotime("");
    setPlace("");
    setReason("");
  };

  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    const adjustedFromTime = new Date(fromtime);

    const adjustedToTime = new Date(totime);

    // Call the createOutpassAction with the adjusted values
    dispatch(
      createOutpassAction(
        userInfo.objectId,
        adjustedFromTime,
        adjustedToTime,
        reason,
        place
      )
    );
    if (!fromtime || !totime || !place || !reason) return;

    resetHandler();
    navigate("/");
  };

  const handleFromTimeChange = (e) => {
    const selectedFromTime = new Date(e.target.value);
    const adjustedFromTime = new Date(
      selectedFromTime.getTime() + 5.5 * 60 * 60 * 1000
    );

    const nextDay = new Date(adjustedFromTime);
    nextDay.setDate(adjustedFromTime.getDate() + 1);
    nextDay.setHours(0, 0, 0, 0);

    const timezoneOffsetMs = nextDay.getTimezoneOffset() * 60 * 1000; // Convert minutes to milliseconds
    const nextDayISOString = new Date(nextDay.getTime() - timezoneOffsetMs)
      .toISOString()
      .slice(0, 16);

    if (totime < nextDayISOString) {
      setTotime(nextDayISOString);
    }

    setFromtime(adjustedFromTime.toISOString().slice(0, 16));
  };

  useEffect(() => {}, []);

  return (
    <>
      <Navbar role="student" homeLink="/" />
      <form name="form1" autoComplete="on" onSubmit={submitHandler}>
        <h1>Outpass</h1>
        <label htmlFor="fromtime">From time:</label>
        <br />
        <input
          type="datetime-local"
          name="fromtime"
          id="fromtime"
          required
          value={fromtime}
          onChange={handleFromTimeChange}
        />
        <br />
        <label htmlFor="totime">To time:</label>
        <br />
        <input
          type="datetime-local"
          name="totime"
          id="totime"
          required
          min={totime}
          value={totime}
          onChange={(e) => setTotime(e.target.value)}
        />
        <br />
        <label htmlFor="place">Place:</label>
        <br />
        <input
          type="text"
          name="place"
          id="place"
          placeholder="Place"
          required
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
        <br />
        <label htmlFor="reason">Reason:</label>
        <br />
        <textarea
          type="text"
          name="reason"
          id="reason"
          rows="5"
          cols="30"
          placeholder="Reason ..."
          required
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        ></textarea>

        <div className="button-container">
          <button type="submit" className="btn btn-submit">
            Submit
          </button>
          <button onClick={resetHandler} className="btn btn-reset">
            Reset
          </button>
        </div>
      </form>
    </>
  );
}

export default Apply;
