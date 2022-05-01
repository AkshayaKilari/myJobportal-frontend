import React from "react";
import "../../styles/app.scss";
import { Button, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom'


const Company = () => {
  const navigate = useNavigate()

  return (
    <div>
      <div className="header"></div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent:'center',
          flexDirection:'column',
        }}
      >
        <div>
          <Typography variant="h4">Company : abc</Typography>
        </div>
        <div style={{margin:'50px'}}>
          <Button
            variant="contained"
            sx={{
              width: "100%",
            }}
            onClick={()=>navigate("/post-job")}
          >
            Add New Job
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Company;
