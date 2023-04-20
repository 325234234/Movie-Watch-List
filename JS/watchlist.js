import { Movie } from "/JS/Movie.js";

const movieList = document.querySelector("main")

document.addEventListener("click", handleClick)

function handleClick(event) {
    if(event.target.dataset.title) {
        removeMovie(event.target.dataset.title)
        renderMovieList()
    }
}

function renderMovieList() {
    if(localStorage.length === 0) {
        movieList.innerHTML =  `<i class="fa-brands fa-fort-awesome" id="castle-icon"></i>
                                <p id="defaultText">Your movies are in another castle</p>`
    } else {            
        movieList.innerHTML = ""

        Object.keys(localStorage).forEach(key =>  {
            const movie = new Movie(JSON.parse(localStorage.getItem(key)))

            movieList.innerHTML += movie.getHtml()
    
            const div = document.getElementById(`add-${movie.getKey()}`)
            div.innerHTML =    `<i class="fa-regular fa-square-minus" data-title="${movie.getKey()}"></i>
                                <p class="watchlist" data-title="${movie.getKey()}">Watchlist</p>`
            div.style.cursor = "pointer"
        })
    }    
}

function removeMovie(title) {
    for (const key of Object.keys(localStorage)) {
        if(key === title) {            
            localStorage.removeItem(title)
            break
        }
    }
}

renderMovieList()