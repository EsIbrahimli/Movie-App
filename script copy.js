


const apiKey = 'cdfe7ac';
const loading = document.querySelector('.loading');
const movieContainer = document.querySelector('.movie-container');

function getDataMovie(title) {
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${title}`;
    loading.style.display = 'block';
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        console.log(data);
        if (data.Response === 'False') {
            throw new Error(data.Error || 'Film bulunamadı');
        }
        renderData(data);
    })
    .catch(err => {
        console.error('API Error:', err);
        showError(err.message);
    })
    .finally(() => {
        loading.style.display = 'none';
    });
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
    movieRating.innerHTML = `Rating: ${data.imdbRating}`; // Rating → imdbRating
    movieGenre.innerHTML = `Genre: ${data.Genre}`;
    movieDesc.innerHTML = data.Plot;
}
function showError(message) {
    const container = document.querySelector('.movie-container');
    container.innerHTML = `<div class="error">Hata: ${message}</div>`;
    container.style.display = 'block';
}
const btn = document.querySelector('.btn');
const input = document.querySelector('.input');
btn.addEventListener('click', () => {
    const title = input.value.trim();
    if (title) {
        getDataMovie(title);
        movieContainer.style.display = 'block';
    } else {
        alert('Lütfen bir film adı girin!');
    }
});