const API_KEY = "412b216f";
function loadFavoriteMovies() {
    const search = document.getElementById("search").value;
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
                        const div = document.createElement("div");
                        div.className = "movie-card";
                        div.innerHTML = `
                            <img src="${full.Poster}" alt="Poster" width="150">
                            <h3>${full.Title}</h3>
                            <p> Rating: ${full.imdbRating}</p>
                            <p> Year: ${full.Year}</p>
                            <button onclick="saveFav('${full.imdbID}')">Save</button>
                        `;
                        container.appendChild(div);
                    })

                })
            })
        }

function saveFav(id) {

    let favs = JSON.parse(localStorage.getItem("favs")) || [];

    if (!favs.includes(id)) {
        favs.push(id);
    }
    localStorage.setItem("favs", JSON.stringify(favs));

    alert("Saved!");
}

function showFavorites() {

    let favs = JSON.parse(localStorage.getItem("favs")) || [];
    let container = document.getElementById("favorite-holder");

    container.innerHTML = "";

    if (favs.length === 0) {
        container.innerHTML = "No favorites yet.";
        return;
    }

    favs.forEach(id => {

        fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`)
            .then(res => res.json())
            .then(movie => {

                container.innerHTML += `
                    <div class="movie-card">
                        <img src="${movie.Poster}" width="150">
                        <h3>${movie.Title}</h3>
                        <p>${movie.Year}</p>
                        <button onclick="removeFav('${id}')">Remove</button>
                    </div>
                `;
            });
    });
}

showFavorites();

function removeFav(id) {

    let favs = JSON.parse(localStorage.getItem("favs")) || [];
    favs = favs.filter(favId => favId !== id);
    localStorage.setItem("favs", JSON.stringify(favs));
    showFavorites();
}