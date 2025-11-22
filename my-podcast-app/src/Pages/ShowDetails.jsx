import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { fetchShowById } from "../api/fetchData";
import PodcastDetail from "../components/Podcast/PodcastDetail";
import Loading from "../components/UI/Loading";
import Error from "../components/UI/Error";

export default function ShowDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Preserve homepage filters/search when navigating back
  const handleBackClick = () => {
    if (location.key !== "default") {
      navigate(-1);
    } else {
      navigate("/"); // fallback if direct link opened
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchShowById(id)
      .then((data) => {
        setShow(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load show details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loading />;

  if (error) return <Error message={error} />;

  return (
    <main className="show-details">
      <button className="show-details__back-button" onClick={handleBackClick}>
        ← Back
      </button>

      <PodcastDetail show={show} />
    </main>
  );
}
