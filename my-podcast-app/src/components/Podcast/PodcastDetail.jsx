import React, { useState } from "react";
import { formatDate } from "../../utils/formatDate";

/**
 * PodcastDetail component
 * Props:
 * - show: detailed show object including seasons and episodes
 */
export default function PodcastDetail({ show }) {
  const [expandedSeasons, setExpandedSeasons] = useState({});

  if (!show) {
    return <p className="podcast-detail__not-found">Show not found.</p>;
  }

  const toggleSeason = (seasonNumber) => {
    setExpandedSeasons((prev) => ({
      ...prev,
      [seasonNumber]: !prev[seasonNumber],
    }));
  };

  return (
    <section className="podcast-detail">
      <h2 className="podcast-detail__title">{show.title}</h2>
      <img
        className="podcast-detail__image"
        src={show.image}
        alt={`${show.title} podcast`}
      />
      <p className="podcast-detail__description">{show.description}</p>

      <div className="podcast-detail__genres">
        {show.genres &&
          show.genres.map((genre) => (
            <span key={genre.id} className="podcast-detail__genre-tag">
              {genre.name}
            </span>
          ))}
      </div>

      <p className="podcast-detail__last-updated">
        Last updated: {formatDate(show.last_updated)}
      </p>

      <div className="podcast-detail__seasons">
        {show.seasons.map((season) => (
          <div key={season.id} className="podcast-detail__season">
            <button
              className="podcast-detail__season-toggle"
              onClick={() => toggleSeason(season.season_number)}
              aria-expanded={!!expandedSeasons[season.season_number]}
            >
              {`Season ${season.season_number} (${season.episodes.length} episodes)`}
            </button>
            {expandedSeasons[season.season_number] && (
              <ul className="podcast-detail__episode-list">
                {season.episodes.map((episode) => (
                  <li key={episode.id} className="podcast-detail__episode">
                    <img
                      src={episode.image || season.image || show.image}
                      alt={episode.title}
                      className="podcast-detail__episode-image"
                    />
                    <div className="podcast-detail__episode-info">
                      <p className="podcast-detail__episode-number">
                        Episode {episode.episode_number}
                      </p>
                      <h4 className="podcast-detail__episode-title">
                        {episode.title}
                      </h4>
                      <p className="podcast-detail__episode-description">
                        {episode.description.length > 100
                          ? episode.description.slice(0, 100) + "..."
                          : episode.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
