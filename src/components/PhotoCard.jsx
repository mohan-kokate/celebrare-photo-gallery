export default function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative overflow-hidden bg-slate-100">
        <img
          src={`https://picsum.photos/id/${photo.id}/600/420`}
          alt={`Photograph by ${photo.author}`}
          loading="lazy"
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          aria-label={isFavourite ? `Remove ${photo.author} from favourites` : `Add ${photo.author} to favourites`}
          aria-pressed={isFavourite}
          title={isFavourite ? "Remove from favourites" : "Add to favourites"}
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full shadow-md transition ${
            isFavourite
              ? "bg-rose-500 text-white"
              : "bg-white/95 text-slate-700 hover:bg-rose-50 hover:text-rose-500"
          }`}
        >
          <svg viewBox="0 0 24 24" fill={isFavourite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
          </svg>
        </button>
      </div>
      <div className="flex items-center justify-between gap-3 px-4 py-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-800">{photo.author}</p>
          <p className="mt-1 text-xs text-slate-500">Photo #{photo.id}</p>
        </div>
        {isFavourite && (
          <span className="shrink-0 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-600">
            Favourite
          </span>
        )}
      </div>
    </article>
  );
}
