# Celebraré Frontend Intern Assignment — Photo Gallery

A React + Vite photo gallery styled with Tailwind CSS. It follows the seven requirements in the supplied assignment.

## Requirements
- Node.js 18 or newer
- npm
- Internet connection for the Picsum Photos API and images

## 1. Run locally

Open a terminal in this project folder and run:

```bash
npm install
npm run dev
```

Vite prints a local address, usually `http://localhost:5173`. Open it in your browser.

## 2. Verify the requirements

1. **API:** The `useFetchPhotos` hook requests `https://picsum.photos/v2/list?limit=30`.
2. **Loading and error:** A spinner appears while fetching; an error panel appears if the request fails.
3. **Responsive grid:** Tailwind classes provide 1 column on mobile, 2 on tablet, and 4 on desktop.
4. **Search:** Search matches author names immediately without making another API request.
5. **Favourites:** `useReducer` handles `TOGGLE_FAVOURITE`; `localStorage` persists the selected photo IDs.
6. **Custom hook:** `src/hooks/useFetchPhotos.js` returns `{ photos, loading, error }`.
7. **Performance hooks:** `useCallback` memoizes the search handler, and `useMemo` computes filtered photos.

## 3. Production build

```bash
npm run build
npm run preview
```

## 4. Publish to GitHub

Create a **public, empty repository** on GitHub. Then, from this project folder:

```bash
git init
git add .
git commit -m "Build responsive photo gallery assignment"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Replace the remote URL with your own repository URL.

## 5. Five-minute recording outline

- **0:00–1:00:** Show the gallery loading and the responsive cards.
- **1:00–1:45:** Search for part of an author's name and clear the search.
- **1:45–2:20:** Favourite a photo, refresh the page, and show that it remains favourited.
- **2:20–3:05:** Open `src/hooks/useFetchPhotos.js`; explain the returned values and error handling.
- **3:05–3:50:** Open `src/reducers/favouritesReducer.js`; explain the `TOGGLE_FAVOURITE` action.
- **3:50–4:35:** Explain `useCallback` and `useMemo` in `src/App.jsx`.
- **4:35–5:00:** Describe one challenge and how you solved it.

## Concepts to understand before recording

- **`useFetchPhotos`:** Separates API fetching and its loading/error state from the UI.
- **`useReducer`:** Keeps favourite toggling in one reducer function. The state is an array of photo IDs.
- **`localStorage`:** Loads saved IDs on startup and saves the updated IDs when favourites change.
- **`useCallback`:** Keeps the search handler function reference stable between renders.
- **`useMemo`:** Recomputes the filtered list only when `photos` or `searchTerm` changes. These hooks help avoid unnecessary work/reference changes; they are not required for basic correctness in this small gallery.

## Notes
- The assignment asks for no component libraries, no class components, and no extra features.
- The favourite list stores photo IDs, not full photo objects.
- The app requires internet access to load the Picsum API and image URLs.
