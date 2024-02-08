import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";
import axios from 'axios';
import "izitoast/dist/css/iziToast.min.css";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchInput = document.querySelector('.input-search');
const searchForm = document.querySelector('.form-search');
const gallery = document.querySelector('.gallery');
const buttonSubmit = document.querySelector('.button-submit');
const buttonLoad = document.querySelector('.button-load');
const loader = document.querySelector('.loader');
const perPage = 40;
let page = 1;
let totalPages = 0;
let currentQuery = ''; 

loader.hidden = true;
buttonLoad.hidden = true;

searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    page = 1; 
    gallery.innerHTML = ''; 
    try {
        const { total, hits } = await fetchPosts(page);
        totalPages = Math.ceil(total / hits.length); 
        renderPosts(hits);
        buttonLoad.hidden = totalPages <= 1;
    } catch (error) {
        showError('Sorry, there was an error loading images.');
    }
});


buttonLoad.addEventListener("click", async (event) => {
    event.preventDefault();
    page++;
    try {
        const { hits } = await fetchPosts(page, currentQuery); 
        renderPosts(hits);
    } catch (error) {
        showError('Sorry, there was an error loading more images.');
        buttonLoad.hidden = true;
    }
});

async function fetchPosts(page, query = searchInput.value) {
    const apiKey = '42111796-9c286351ad531542ab3bfb8be';
    currentQuery = query;
    const response = await axios.get(
        `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`
    );
    return response.data;
}

function renderPosts(posts) {
    const markup = posts.map(({ webformatURL, tags, likes, views, comments, downloads }) => `
        <li class="gallery-item"><a href="${webformatURL}">
        <img class="gallery-image" src="${webformatURL}" alt="${tags}"></a>
        <p>Likes: ${likes}</p>
        <p>Views: ${views}</p>
        <p>Comments: ${comments}</p>
        <p>Downloads: ${downloads}</p>
        </li>`
    ).join('');
    gallery.insertAdjacentHTML('beforeend', markup);
    const lightbox = new SimpleLightbox('.gallery a', {
        captions: true,
        captionSelector: 'img',
        captionsData: 'alt',
        captionPosition: 'bottom',
        animation: 250,
    });
    lightbox.on('show.simplelightbox');
    lightbox.refresh();
    searchForm.reset();
}

function showError(message) {
    iziToast.error({
        message,
        class: 'izi-toast',
        messageColor: '#fafafb',
        messageSize: '16px',
        backgroundColor: '#ef4040',
        maxWidth: '432px',
        position: 'topRight',
    });
}

