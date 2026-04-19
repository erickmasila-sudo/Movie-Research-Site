const API_KEY = "412b216f";
if (typeof window !== "undefined" && window.location) {
const params = new URLSearchParams(window.location.search);
const searchValue = params.get("search");

if (searchValue) {
    document.getElementById("search").value = searchValue;
    loadMoviesByGenre(); 
}
}
async function loadMoviesByGenre() {
    const search = document.getElementById("search").value;
    const genre = document.getElementById("genre").value;
    const container = document.getElementById("Movie-holder");
    container.innerHTML = "";

    const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
    const data= await res.json()
    
            if (!data.Search) {
                container.innerHTML = "No movies found.";
                return;
            }
            const movieDetails = await Promise.all(
            data.Search.map(async (movie) => {
                const fullRes= await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`)
                return fullRes.json()
            })
        )
        movieDetails.forEach((full) => {
                        if (full.Genre && full.Genre.includes(genre)) {
                            const div = document.createElement("div");
                            div.className = "movie-card";
                            div.innerHTML = `
                                <img src="${full.Poster}" alt="Poster" width="150">
                                <h3>${full.Title}</h3>
                                <p> Rating: ${full.imdbRating}</p>
                                <p> Year: ${full.Year}</p>
                            `;
                            container.appendChild(div);
                        }
                    });
            }
if (typeof module !== "undefined") {
    module.exports = { loadMoviesByGenre };
}    
