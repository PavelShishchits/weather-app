const initApp = () => {
    const form = document.querySelector('#address-form');
    const messageEl = document.querySelector('#message');
    const locationEl = document.querySelector('#location');

    const init = () => {
        setHandlers();
    }

    function setHandlers() {
        form && form.addEventListener('submit', handleFormSubmit)
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        locationEl.textContent = '';
        messageEl.textContent = 'Loading...';
        getWeatherData(formData.get('address'))
    }

    const getData = async (url) => {
        try {
            const response = await fetch(url);
            if (response.ok) {
                return await response.json();
            }
        } catch (e) {
            console.error('Something went wrong');
        }
    }

    const getWeatherData = async (address) => {
        const url = 'http://localhost:3000/weather?address=' + address;
        const weatherData = await getData(url);

        if (weatherData && weatherData.success) {
            messageEl.textContent = weatherData.data.forecast
            locationEl.textContent = weatherData.data.location
        } else if (!weatherData.success) {
            messageEl.textContent = weatherData.error;
        }
    }

    init();
};

document.addEventListener('DOMContentLoaded', initApp);