import axios from 'axios'

const API_URL = 'http://localhost:5000/jobs/'

const postJob = async (jobData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, jobData, config)

  return response.data
}

const getJobs = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}


const jobService = {
  postJob,
  getJobs,
}

export default jobService