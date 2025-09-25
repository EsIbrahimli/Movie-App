

const loading = document.querySelector('.loading');
const movieContainer = document.querySelector('.movie-container');

function getDataMovie(title) {

    const apiKey = 'cdfe7ac';

    const url = `http://www.omdbapi.com/?apikey=${apiKey}&t=${title}`;

    let myPromise = fetch(url);


    loading.style.display = 'block';

    myPromise.then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        renderData(data);
    }).catch(err => {
        console.log('It is a error message!');
    }).finally(() => {
        loading.style.display = 'none';
    })
}



function renderData(data) {
    const moviePoster = document.querySelector('.movie-poster');
    const movieTitle = document.querySelector('.movie-title');
    const movieYear = document.querySelector('.movie-year');
    const movieRating = document.querySelector('.movie-rating');
    const movieGenre = document.querySelector('.movie-genre');
    const movieDesc = document.querySelector('.movie-description');

    moviePoster.src = data.Poster;
    movieTitle.innerHTML = data.Title;
    movieYear.innerHTML = `Year of Movie: ${data.Year}`;
    movieRating.innerHTML = `Rating: ${data.Rating}`;
    movieGenre.innerHTML = `Genre: ${data.Genre}`;
    movieDesc.innerHTML = data.Plot;
}


const btn = document.querySelector('.btn');
const input = document.querySelector('.input');

btn.addEventListener('click', () => {
    const title = input.value.trim();
    getDataMovie(title);
    movieContainer.style.display = 'block';
});