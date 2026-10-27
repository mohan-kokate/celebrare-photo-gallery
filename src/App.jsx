import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import useFetchPhotos from "./hooks/useFetchPhotos";
import favouritesReducer, { getInitialFavourites } from "./reducers/favouritesReducer";
import PhotoCard from "./components/PhotoCard";

function LoadingState() {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center gap-4 text-slate-600" role="status">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-100 border-t-violet-600" />
      <p className="text-sm font-medium">Loading beautiful photos…</p>
    </div>
  );
}

function ErrorState({ message }) {
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50 px-6 py-10 text-center" role="alert">
      <p className="font-semibold text-rose-800">We couldn't load the photos</p>
      <p className="mt-2 text-sm text-rose-700">{message}</p>
      <p className="mt-2 text-sm text-rose-700">Check your internet connection and refresh the page.</p>
    </div>
  );
}

export default function App() {
  const { photos, loading, error } = useFetchPhotos();
  const [searchTerm, setSearchTerm] = useState("");
  const [favourites, dispatch] = useReducer(favouritesReducer, undefined, getInitialFavourites);

  useEffect(() => {
    try {
      localStorage.setItem("celebrare-favourites", JSON.stringify(favourites));
    } catch {
      // The app remains usable if browser storage is unavailable.
    }
  }, [favourites]);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const filteredPhotos = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return photos;
    }

    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(normalizedSearch)
    );
  }, [photos, searchTerm]);

  const handleToggleFavourite = useCallback((photoId) => {
    dispatch({ type: "TOGGLE_FAVOURITE", payload: photoId });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-violet-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="4" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 15-5-5L5 21" />
              </svg>
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight text-slate-900">Frame<span className="text-violet-600">ly</span></p>
              <p className="text-xs text-slate-500">A little inspiration, in every frame</p>
            </div>
          </div>
          <div className="rounded-full bg-violet-50 px-3 py-1.5 text-sm font-semibold text-violet-700">
            {favourites.length} {favourites.length === 1 ? "favourite" : "favourites"}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <section className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-violet-600">Discover & collect</p>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Photo gallery</h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                Explore the collection, find your favourite photographers, and save the frames you love.
              </p>
            </div>
            <div className="w-full md:max-w-sm">
              <label htmlFor="photo-search" className="mb-2 block text-sm font-semibold text-slate-700">
                Search by author
              </label>
              <div className="relative">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path strokeLinecap="round" d="m16 16 4 4" />
                </svg>
                <input
                  id="photo-search"
                  type="search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Try an author's name…"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 shadow-sm transition placeholder:text-slate-400 focus:border-violet-400 focus:outline-none focus:ring-4 focus:ring-violet-100"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-600" aria-live="polite">
            {loading ? "Getting the gallery ready…" : error ? "Gallery unavailable" : (
              <>Showing <span className="font-semibold text-slate-900">{filteredPhotos.length}</span> of {photos.length} photos</>
            )}
          </p>
          <p className="text-xs text-slate-500">Photos provided by Picsum</p>
        </div>

        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} />
        ) : filteredPhotos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <p className="text-lg font-semibold text-slate-800">No photos found</p>
            <p className="mt-2 text-sm text-slate-500">Try another author name.</p>
          </div>
        ) : (
          <section aria-label="Photo gallery" className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filteredPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                isFavourite={favourites.includes(photo.id)}
                onToggleFavourite={handleToggleFavourite}
              />
            ))}
          </section>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-slate-500 sm:px-6 lg:px-8">
          Built with React, Vite, and Tailwind CSS
        </div>
      </footer>
    </div>
  );
}
