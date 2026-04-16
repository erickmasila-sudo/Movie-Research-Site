const API_KEY = "412b216f"
const year = document.getElementById("release-year");

// Loop from 1990 to 2026
for (let i = 1990; i <= 2026; i++) {

    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    year.appendChild(option);
}

const rating = document.getElementById("rating");

// Loop from 0 to 10
for (let i = 0; i <= 10; i += 1) {

    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    rating.appendChild(option);
}

function getMovie() {
    let search = document.getElementById("search").value;
    let genre = document.getElementById("genre").value;
    let year = document.getElementById("release-year").value;
    let rate = document.getElementById("rating").value;
    let Movieholder = document.getElementById("Movie-holder");

    Movieholder.innerHTML = "";

     fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}&y=${year}`)
        .then(res => res.json())
        .then(data => {
            if (!data.Search) {
                Movieholder.innerHTML = "No movies found.";
                return;
            }
            data.Search.forEach(movie => {
                fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`)
                    .then(res => res.json())
                    .then(full => {
                        if (full.Genre.includes(genre) && full.imdbRating >= rate){
                            const div = document.createElement("div");
                            div.className = "movie-card";
                            div.innerHTML = `
                                    <img src="${full.Poster}" alt="Poster" width="150">
                                    <h3>${full.Title}</h3>
                                    <p>Year: ${full.Year}</p>
                                    <p> Rating: ${full.imdbRating}</p>
                                </div>
                            `;
                            Movieholder.appendChild(div);
                        }
                    });
            });
        });
}