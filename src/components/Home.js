import Jobs from "./Jobs";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import jobService from "../services/jobService";
import authService from "../services/UserService";

function Home() {
  let user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [jobsData, setJobsData] = useState([]);
  const [filterKeywords, setfilterKeywords] = useState([]);
  const [loading,setLoading] = useState(true)


  const addFilterKeywords = (jobsData) => {
    if (!filterKeywords.includes(jobsData)) {
      setfilterKeywords([...filterKeywords, jobsData]);
    }
  };

  const deleteKeyword = (jobsData) => {
    const newKeywords = filterKeywords.filter((key) => key !== jobsData);
    setfilterKeywords(newKeywords);
  };

  useEffect(() => {
    getTheJobs();
  }, []);
  
  useEffect(() => {
    getTheJobs();
  }, [loading]);

  const handleLogout = () => {
    navigate("/");
    authService.logout();
  };

  const getTheJobs = async () => {
    let JobsList = await jobService.getJobs(user.token);
    setJobsData(JobsList);
    console.log(JobsList);
    if(JobsList.length){
    setLoading(false)
    }
  };

  const clearAll = () => {
    setfilterKeywords([]);
  };

  return (
    <div>
      <div className="header">
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            padding: 1.5,
            color: "white",
            fontWeight: "bold",
          }}
        >
          List of Jobs
          <Button
            sx={{ marginLeft: "50%", color: "white", fontWeight: "bold" }}
            size="large"
            onClick={() => {
              handleLogout();
            }}
          >
            LogOut
          </Button>
        </Typography>
      </div>
      {/* <Search setSearchKeyword={setSearchKeyword} /> */}
      {filterKeywords.length > 0 && (
        <Header
          keywords={filterKeywords}
          removeKeywords={deleteKeyword}
          clearAll={clearAll}
        />
      )}
     { jobsData.length>0 &&
      <Jobs
        keywords={filterKeywords}
        data={jobsData}
        setKeywords={addFilterKeywords}
      />}
    </div>
  );
}

export default Home;
