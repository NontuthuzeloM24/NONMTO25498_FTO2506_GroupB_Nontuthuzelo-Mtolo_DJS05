import React from "react";
import styles from "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PodcastContextProvider } from "./context/PodcastContext";
import Header from "./components/UI/Header";
import Home from "./pages/Home";
import ShowDetails from "./pages/ShowDetails";

export default function App() {
  return (
    <>
      <Header />
      <PodcastContextProvider>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/show/:id" element={<ShowDetails />} />
          </Routes>
        </div>
      </PodcastContextProvider>
    </>
  );
}
