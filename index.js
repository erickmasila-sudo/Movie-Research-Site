
const API_KEY =  "412b216f";

const topMoviesContainer = document.getElementById("top-movies");
const searchInput = document.getElementById("search");
const resultsDiv = document.getElementById("results");

async function loadTopMovies() {
  try {
    
   const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=movie&y=2025&type=movie`);
    const data = await response.json();

    if (data.Response === "True" && data.Search) {
      displayTopMovies(data.Search.slice(0, 10));
    } else {
      topMoviesContainer.innerHTML = "<p>No movies found.</p>";
    }
  } catch (error) {
    console.error("Error fetching top movies:", error);
    topMoviesContainer.innerHTML = "<p>Error loading movies.</p>";
  }
}

function displayTopMovies(movies) {
  topMoviesContainer.innerHTML = "";

  movies.forEach((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");

    movieDiv.innerHTML = `
      <h3>${movie.Title}</h3>
      <img src="${movie.Poster && movie.Poster !== "N/A" ? movie.Poster : ""}" alt="${movie.Title}" width="150">
      <p>Year: ${movie.Year}</p>
    `;

    topMoviesContainer.appendChild(movieDiv);
  });
}

function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

async function searchMovies(query) {
  if (!query.trim()) {
    resultsDiv.innerHTML = "";
    return;
  }

  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`
    );
    const data = await res.json();

    if (data.Response === "False" || !data.Search) {
      resultsDiv.innerHTML = `<div class="item">No results found</div>`;
      return;
    }

    displaySearchResults(data.Search);
  } catch (error) {
    console.error("Error fetching search results:", error);
    resultsDiv.innerHTML = `<div class="item">Error fetching data</div>`;
  }
}

function displaySearchResults(movies) {
  resultsDiv.innerHTML = "";

  movies.forEach((movie) => {
    const div = document.createElement("div");
    div.className = "item";

    div.innerHTML = `
      <strong>${movie.Title}</strong> (${movie.Year})
    `;

    div.onclick = () => {
      searchInput.value = movie.Title;
      resultsDiv.innerHTML = "";
    };

    resultsDiv.appendChild(div);
  });
}

loadTopMovies();

searchInput.addEventListener(
  "input",
  debounce((e) => searchMovies(e.target.value), 300)
);

function goToFilter() {
    let value = document.getElementById("search").value;
    window.location.href = `filter.html?search=${value}`;
}