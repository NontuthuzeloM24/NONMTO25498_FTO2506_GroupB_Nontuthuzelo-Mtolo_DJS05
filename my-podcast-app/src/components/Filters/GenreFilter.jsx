import React, { useEffect, useState } from "react";
import { fetchGenreById } from "../../api/fetchData";

/**
 * GenreFilter component
 * Props:
 * - selectedGenreId: selected genre ID from URL
 * - onChange: function(genreId) called when genre changes
 */
export default function GenreFilter({ selectedGenreId, onChange }) {
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);

  const myGenres = [
    { id: "1", name: "Personal Growth" },
    { id: "2", name: "Investigative Journalism" },
    { id: "3", name: "History" },
    { id: "4", name: "Comedy" },
    { id: "5", name: "Entertainment" },
    { id: "6", name: "Business" },
    { id: "7", name: "Fiction" },
    { id: "8", name: "News" },
    { id: "9", name: "Kids and Family" },
  ];

  useEffect(() => {
    setGenres(myGenres);
  }, []);

  return (
    <div className="genre-filter">
      <label htmlFor="genre-select" className="genre-filter__label">
        Genre:
      </label>
      <select
        id="genre-select"
        className="genre-filter__select"
        value={selectedGenreId || ""}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
      {error && <div className="genre-filter__error">{error}</div>}
    </div>
  );
}
