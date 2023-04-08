import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/login/LoginPage";
import Register from "./components/register/RegisterPage";
import ImageUploader from "./components/imagesViewer/ImageUploader";
import "./App.css";
import LogsTable from "./components/logsTable/LogsTable";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="Signup" element={<Register />} />
      <Route path="ImageUploader" element={<ImageUploader />} />
      <Route path="logs" element={<LogsTable />} />
    </Routes>
  );
}
