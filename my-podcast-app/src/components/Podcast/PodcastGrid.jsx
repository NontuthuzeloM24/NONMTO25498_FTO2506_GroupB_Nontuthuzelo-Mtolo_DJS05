import React from "react";
import PodcastCard from "./PodcastCard";

/**
 * PodcastGrid component displays a grid of podcast cards.
 * Props:
 * - shows: array of show objects
 */
export default function PodcastGrid({ shows }) {
  if (!shows.length) {
    return <p className="podcast-grid__empty">No podcasts found.</p>;
  }

  return (
    <div className="podcast-grid">
      {shows.map((show) => (
        <PodcastCard key={show.id} show={show} />
      ))}
    </div>
  );
}
