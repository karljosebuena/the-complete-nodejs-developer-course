const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const successMessage = document.querySelector('#successMessage');
const errorMessage = document.querySelector('#errorMessage');

const fetchForecast = (location) => {
    const url = `/weather?address=${encodeURIComponent(location)}`;
    return fetch(url)
        .then(response => response.json())
        .catch(err => err )
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    fetchForecast(location)
        .then(data => {
            if (data.error) {
                errorMessage.textContent = data.error
            } else {
                successMessage.textContent = data.forecast;
            }
        });
});
