const searchInput = document.getElementById("search");
const resultsDiv = document.getElementById("results");

const API_KEY = "5cf2d014"

// Debounce function (important!)
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// Fetch movies from API
async function fetchMovies(query) {
  if (!query) {
    resultsDiv.innerHTML = "";
    return;
  }

  const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
  const data = await res.json();

  displayResults(data.Search || []);
}

// Display results
function displayResults(movies) {
  resultsDiv.innerHTML = "";

  movies.forEach(movie => {
    const div = document.createElement("div");
    div.classList.add("item");
    div.textContent = movie.Title;

    div.addEventListener("click", () => {
      searchInput.value = movie.Title;
      resultsDiv.innerHTML = "";
    });

    resultsDiv.appendChild(div);
  });
}

// Add event listener with debounce
searchInput.addEventListener(
  "input",
  debounce((e) => {
    fetchMovies(e.target.value);
  }, 300)
);