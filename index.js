
// Constants for API URLs and key
const API_KEY = 'api_key=2b3393e06ea2b4331e3a46cb3048944b';
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://api.themoviedb.org/3/movie/{movie_id}/images';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;

// DOM elements
const main=document.getElementById('main'); // Main content area
const form=document.getElementById('form'); // Form element
const search=document.getElementById('search'); // Search input field

// Initial call to fetch popular movies
getMovies(API_URL);

// Function to fetch movies from the API
function getMovies(url){
    return fetch(url)
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        showMovies(data.results);
    });
}

// Function to display movies in the DOM
function showMovies(data){
    main.innerHTML=''; // Clear main content area

    // Iterate through each movie and create HTML elements to display them
    data.forEach(movie=>{
        const{title,poster_path,vote_average,overview}=movie;
        const movieEl=document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML=`
            <div class="movie">
                <img src="${IMG_URL+poster_path}" alt="${title}" width="50px" height="50px">
                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="${getcolor(vote_average)}">${vote_average}</span>
                </div>
                <div class="overview">
                    ${overview}
                </div>
            </div>`;
        main.appendChild(movieEl); // Append movie element to the main content area
    });
}

// Function to determine color based on movie rating
function getcolor(vote){
    if(vote>=8){
        return "green";
    }
    if(vote>=5){
        return "orange";
    }
    else{
        return "red";
    }
}

// Event listener for form submission
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const searchName=search.value;

    // If search input is provided, fetch movies based on search query, else fetch popular movies
    if(searchName){
        getMovies(searchURL+'&query='+searchName);
    }else{
        getMovies(API_URL);
    }
});
