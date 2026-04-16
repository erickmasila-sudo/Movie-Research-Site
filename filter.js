const API_KEY = "412b216f";
function loadMoviesByGenre() {
    const search = document.getElementById("search").value;
    const genre = document.getElementById("genre").value;
    const container = document.getElementById("Movie-holder");
    container.innerHTML = "";
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
        .then(res => res.json())
        .then(data => {
            if (!data.Search) {
                container.innerHTML = "No movies found.";
                return;
            }
            data.Search.forEach(movie => {
                fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`)
                    .then(res => res.json())
                    .then(full => {
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
            });
        });
}
    
