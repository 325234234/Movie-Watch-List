export class Movie {
    constructor(data) {
        Object.assign(this, data)
    }

    getHtml() {
        return `<section class="movie">
                    <img class="movieImage" src="${this.Poster}">
                    <div class="movieInfo">
                        <div class="movieHeading">
                            <p class="movieTitle">${this.Title}</p>
                            <p class="movieRating">(<i class="fa-solid fa-star" style="color: #FEC654;"></i>${this.imdbRating})</p>
                        </div>
                        <div class="metaInfo">
                            <p class="movieLength">${this.Runtime}</p>
                            <p class="movieGenre">${this.Genre}</p>
                            <div class="addToList" id="add-${this.getKey()}" data-title="${this.Title}">
                                <i class="fa-regular fa-square-plus" data-title="${this.Title}"></i>
                                <p class="watchlist" data-title="${this.Title}">Watchlist</p>
                            </div>
                        </div>
                        <p class="summary">${this.Plot}</p>
                    </div>
                </section>`
    }

    // return the title without any spaces (required for LocalStorage)
    getKey() {
        return this.Title.replace(/\s+/g, "")
    }
}