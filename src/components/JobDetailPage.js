import { Button, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const JobDetailPage = () => {
  const navigate = useNavigate();
  const navigateback = () => {
    navigate("/jobs");
  };
  const applyJob = () => {
    Swal.fire("Good job!", "You application saved successfully!", "success");
  };
  const data = useLocation();
  return (
    <div style={{ margin: 20, backgroundColor: "#ffffff", height: "90vh" }}>
      <div className="header">
        <Button size="large" sx={{
          color:'white',
          fontWeight:'bold',
          padding:2.5
        }} onClick={() => navigateback()}>
          go back
        </Button>
      </div>
      <div className="jobs">
        <Typography variant="h4">Job Details</Typography>
      </div>
      <div style={{ paddingLeft: 50 }}>
        <div style={{ padding: 10 }}>
          <Typography variant="h3">Company: {data.state.company}</Typography>
        </div>
        <div style={{ padding: 10 }}>
          <Typography variant="h4">Position: {data.state.position}</Typography>
        </div>
        <div style={{ padding: 10 }}>
          <Typography variant="h5">Job Level: {data.state.level}</Typography>
        </div>
        <div style={{ padding: 10 }}>
          <Typography variant="h5">Role: {data.state.role}</Typography>
        </div>
        {data.state.languages.length > 0 ? (
          <div style={{ padding: 10 }}>
            <Typography variant="h5">
              Languages needed:
              <ul style={{ paddingLeft: 100 }}>
                {data.state.languages.map((l) => {
                  return <li>{l}</li>;
                })}
              </ul>
            </Typography>
          </div>
        ) : null}
        {data.state.tools.length > 0 ? (
          <div style={{ padding: 10 }}>
            <Typography variant="h5">
              Tools needed:
              <ul style={{ paddingLeft: 100 }}>
                {data.state.tools.map((l) => {
                  return <li>{l}</li>;
                })}
              </ul>
            </Typography>
          </div>
        ) : null}
        <div style={{ padding: 10 }}>
          <Typography variant="h5">
            Contract Type: {data.state.contract}
          </Typography>
        </div>
        <div style={{ padding: 10 }}>
          <Typography variant="h5">Location: {data.state.location}</Typography>
        </div>
        <div style={{ padding: 10 }}>
          <Typography variant="h5">
            Posted On : {data.state.postedAt}
          </Typography>
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: 30, marginBottom: 10 }}>
        <Button
          variant="contained"
          sx={{
            width: "25%",
          }}
          onClick={() => applyJob()}
        >
          Apply this Job
        </Button>
      </div>
      <div className="header"></div>
    </div>
  );
};

export default JobDetailPage;
