import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../src/components/auth/Login'
import JobDetailPage from './components/JobDetailPage';
import SignUp from './components/auth/SignUp';
import Company from './components/dashboards/Company';
import JobPost from './components/JobPost';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/jobs" element={<App/>} />
      <Route path="/" element={<Login/>} />
      <Route path="/jobDetails" element={<JobDetailPage/>} />
      <Route path="/sign-up" element={<SignUp/>} />
      <Route path="/company" element={<Company/>} />
      <Route path="/post-job" element={<JobPost/>} />
      


    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
