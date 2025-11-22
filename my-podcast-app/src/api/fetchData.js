// src/api/fetchData.js

const BASE_URL = "https://podcast-api.netlify.app";

/**
 * Fetch the list of podcast previews.
 * @returns {Promise<Array>} Array of show preview objects.
 */
export async function fetchShows() {
  const res = await fetch(`${BASE_URL}/`);
  if (!res.ok) throw new Error("Failed to fetch shows");
  return res.json();
}

/**
 * Fetch genre object by genre ID.
 * @param {string|number} genreId
 * @returns {Promise<Object>} Genre object
 */
export async function fetchGenreById(genreId) {
  const res = await fetch(`${BASE_URL}/genre/${genreId}`);
  if (!res.ok) throw new Error("Failed to fetch genre");
  return res.json();
}

/**
 * Fetch detailed show object by show ID.
 * @param {string|number} showId
 * @returns {Promise<Object>} Detailed show object with seasons and episodes
 */
export async function fetchShowById(showId) {
  const res = await fetch(`${BASE_URL}/id/${showId}`);
  if (!res.ok) throw new Error("Failed to fetch show details");
  return res.json();
}