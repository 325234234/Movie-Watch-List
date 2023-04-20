import { Movie } from "/JS/Movie.js";

const searchBtn = document.querySelector("button")
const inputField = document.querySelector("input")
const movieList = document.querySelector("main")

let movies = []

document.addEventListener("click", handleClick)

function handleClick(event) {
    if(event.target === searchBtn) {
        fetchMovies()
    } else if(event.target.dataset.title) {
        addToWatchList(event.target.dataset.title)
    }
}

function addToWatchList(title) {
    const titleWithoutSpaces = title.replace(/\s+/g, "")

    localStorage.setItem(titleWithoutSpaces, JSON.stringify(movies.find(movie => movie.Title === title)))
    
    let addDiv = document.getElementById(`add-${titleWithoutSpaces}`)
    addDiv.innerText = "Added!"
    addDiv.style.cursor = "default"
}

function fetchMovies() {
    fetch(`http://www.omdbapi.com/?apikey=e1f6fd51&s=${inputField.value.trim().replaceAll(" ", "+")}&type=movie`)
        .then(response => response.json())
        .then(data => {
            if(data.Response === "False") {
                showNoMoviesFound()
            } else {
                showEmptyMoviesList()
                fetchDetailedMovieData(data)
            }            
        })
}

function showNoMoviesFound() {
    movies = []
    movieList.innerHTML =  `<i class="fa-regular fa-face-dizzy" id="errorIcon"></i>
                            <p id="defaultText">No movies found!</p>`
}

function showEmptyMoviesList() {
    movies = []
    movieList.innerHTML = ""
}

function showDefaultMoviesList() {
    movies = []
    movieList.innerHTML =  `<i class="fa-solid fa-film" id="reelIcon"></i>
                            <p id="defaultText">Start exploring!</p>`
}

function fetchDetailedMovieData(data) {
    const length = data.Search.length < 10 ? data.Search.length : 10
    for(let i=0; i<length; i++) {
        fetch(`http://www.omdbapi.com/?apikey=e1f6fd51&t=${data.Search[i].Title.trim().replaceAll(" ", "+")}&plot=short`)
            .then(response => response.json())
            .then(data => renderMovie(data))        
    }       
}

function renderMovie(data) {
    const newMovie = new Movie(data)
    if(!movies.find(movie => movie.Title === newMovie.Title) && newMovie.Poster !== "N/A") {
        movies.push(newMovie)
        movieList.innerHTML += newMovie.getHtml()

        if(localStorage.getItem(newMovie.getKey()) !== null) {
            let addDiv = document.getElementById(`add-${newMovie.getKey()}`)
            addDiv.innerHTML = "<p>Already saved!</p>"
            addDiv.style.cursor = "default"
        }
    }
}

showDefaultMoviesList()