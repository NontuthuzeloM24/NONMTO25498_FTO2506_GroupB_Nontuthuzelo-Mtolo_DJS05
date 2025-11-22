import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { fetchShows } from "../api/fetchData";
import GenreFilter from "../components/Filters/GenreFilter";
import SearchBar from "../components/Filters/SearchBar";
import SortSelect from "../components/Filters/SortSelect";
import PodcastGrid from "../components/Podcast/PodcastGrid";
import Loading from "../components/UI/Loading";
import Error from "../components/UI/Error";

const PAGE_SIZE = 10;

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [shows, setShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  // Extract filters/search/sort from URL params
  const searchTerm = searchParams.get("search") || "";
  const selectedGenre = searchParams.get("genre") || "";
  const sortOrder = searchParams.get("sort") || "";

  // Pagination page param
  const pageParam = parseInt(searchParams.get("page") || "1", 10);

  // Load shows once on mount
  useEffect(() => {
    setLoading(true);
    fetchShows()
      .then((data) => {
        setShows(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load shows");
        setLoading(false);
      });
  }, []);

  // Apply filters, search, sort, and pagination whenever shows or params change
  useEffect(() => {
    if (!shows.length) return;

    let filtered = [...shows];

    // Filter by genre if selected
    if (selectedGenre) {
      filtered = filtered.filter(
        (show) => show.genres && show.genres.includes(selectedGenre)
      );
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((show) =>
        show.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    if (sortOrder === "title-asc") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === "title-desc") {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOrder === "updated-desc") {
      filtered.sort(
        (a, b) => new Date(b.last_updated) - new Date(a.last_updated)
      );
    } else if (sortOrder === "updated-asc") {
      filtered.sort(
        (a, b) => new Date(a.last_updated) - new Date(b.last_updated)
      );
    }

    setFilteredShows(filtered);
    setPage(pageParam > 0 ? pageParam : 1);
  }, [shows, searchTerm, selectedGenre, sortOrder, pageParam]);

  // Handler to update URL params on filter/search/sort change
  const updateSearchParams = (params) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]) => {
      if (value) newParams.set(key, value);
      else newParams.delete(key);
    });
    if (!params.page) newParams.delete("page");
    setSearchParams(newParams);
  };

  // Handle pagination clicks
  const goToPage = (newPage) => {
    updateSearchParams({ page: newPage.toString() });
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredShows.length / PAGE_SIZE);
  const pageShows = filteredShows.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <main className="home">
      <section className="home__filters">
        <GenreFilter
          selectedGenreId={selectedGenre}
          onChange={(genreId) => updateSearchParams({ genre: genreId, page: "1" })}
        />
        <SearchBar
          searchTerm={searchTerm}
          onChange={(term) => updateSearchParams({ search: term, page: "1" })}
        />
        <SortSelect
          sortOrder={sortOrder}
          onChange={(order) => updateSearchParams({ sort: order, page: "1" })}
        />
      </section>

      <PodcastGrid shows={pageShows} />

      <section className="home__pagination">
        {totalPages > 1 && (
          <nav className="pagination">
            {[...Array(totalPages).keys()].map((i) => (
              <button
                key={i + 1}
                className={`pagination__button ${
                  page === i + 1 ? "pagination__button--active" : ""
                }`}
                onClick={() => goToPage(i + 1)}
                aria-current={page === i + 1 ? "page" : undefined}
              >
                {i + 1}
              </button>
            ))}
          </nav>
        )}
      </section>
    </main>
  );
}
