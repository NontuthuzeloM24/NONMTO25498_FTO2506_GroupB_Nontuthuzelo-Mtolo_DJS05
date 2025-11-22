import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";

/**
 * PodcastCard component for each show preview.
 * Props:
 * - show: show object with id, title, image, description, last_updated, genre_ids
 */
export default function PodcastCard({ show }) {
  return (
    <div className="podcast-card">
      <Link to={`/show/${show.id}`} className="podcast-card__link">
        <img
          src={show.image || "/placeholder.png"}
          alt={show.title}
          className="podcast-card__image"
        />
        <div className="podcast-card__content">
          <h3 className="podcast-card__title">{show.title}</h3>
          <p className="podcast-card__date">
            Last updated: {formatDate(show.last_updated)}
          </p>
        </div>
      </Link>
    </div>
  );
}
