
//  Defining the container for the coountry cards and added class and id 
const countriesContainer = document.createElement("main");
countriesContainer.classList.add("countries-container");
countriesContainer.setAttribute("id","countries-container")
document.body.appendChild(countriesContainer);
console.log(countriesContainer);

// Modal defining

const modal = document.createElement("div");
modal.classList.add("modal");
modal.setAttribute("id","modal");
document.body.appendChild(modal);


const modalContent = document.createElement("div");
modalContent.classList.add("modal-content");
modalContent.setAttribute("id","modal-content");
modal.appendChild(modalContent);

const close = document.createElement("span");
close.classList.add("close");
close.setAttribute("id","close");
close.textContent = "&times;";
modalContent.appendChild(close);

//  lets create a variable to hold the api base url for rest countries and open weather
   const restCountriesApiURL =  "https://restcountries.com/v3.1/all";

// Defining async function for the data fetch from the rest countries and open weather API

    async function restCountries () {
        const res = await fetch(restCountriesApiURL);
        const data = await res.json();
        return data;
    }
    async function openWeather (lat,lon) {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5837fc1034a166900548c04bcdaf8a36&units=metric`);
        const data = await res.json();
        return data;
    }

// Displaying country cards with weather button 

    async function displayCountries (){
        try {
            const countriesData = await restCountries();
            countriesData.forEach((country)=> {
                console.log(`${country.name.common}`);
                const card = document.createElement("div");
                card.classList.add("card");
                const name = document.createElement("h2");
                name.textContent = `${country.name.common}`;
                
                const capital = document.createElement("h3");
                capital.textContent = `Capital: ${country.capital[0]}`;
    
                const flag = document.createElement("img");
                flag.src = country.flags.svg;
                flag.style.width = "200px";
                flag.style.height = "100px";
    
                const weatherBtn = document.createElement("button");
                weatherBtn.textContent = "Weather";
                weatherBtn.onclick = async () => {
                    const weatherData = await openWeather(country.latlng[0], country.latlng[1]);
                    displayModal(country,weatherData);
                    console.log(weatherData);
                }
                card.appendChild(name);
                card.appendChild(flag);
                card.appendChild(capital);
                card.appendChild(weatherBtn);
            countriesContainer.appendChild(card);
            })
        } catch (error) {
            console.error('error occured: ', error.message)
        }
        

    }

    function displayModal (country, weatherData){
        modal.style.display = "block";
        modalContent.innerHTML = `<span class="close" onclick="closeModal()">X</span>
        <div class="lists">
            <ul class="countryDetailsList list">
                <li><span>Country Name:</span> ${country.name.common}</li>
                <li><span>Official Name:</span> ${country.name.official}</li>
                <li><span>Continent Name:</span> ${country.continents[0]}</li>
                <li><span>Capital Name:</span> ${country.capital[0]}</li>
                <li><span>Population:</span> ${country.population}</li>
                <li><span>Un Member:</span> ${country.unMember}</li>
                <li><span>Latitude:</span> ${country.latlng[0]}</li>
                <li><span>Longitude:</span> ${country.latlng[1]}</li>
                <li><span>Languages:</span> ${Object.values(country.languages)}</li>
                <li><span>Independent:</span> ${country.independent}</li>
            </ul>
            <ul class="weatherDetailsList list">
            <li><span>Country code:</span> ${weatherData.sys.country}</li>
            <li><span>Weather Condition:</span> ${weatherData.weather[0].main}</li>
            <li><span>Weather Description:</span> ${weatherData.weather[0].description}</li>
            <li><span>Temperature:</span> ${weatherData.main.temp}&deg;C</li>
            <li><span>Pressure:</span> ${weatherData.main.pressure} hPa</li>
            <li><span>Humidity:</span> ${weatherData.main.humidity}%</li>
            <li><span>Sea level:</span> ${weatherData.main.sea_level} hPa</li>
            <li><span>Ground Level:</span> ${weatherData.main.grnd_level} hPa</li>
            <li><span>Wind Speed:</span> ${weatherData.wind.speed} hPa</li>
            <li><span>Wind degree:</span> ${weatherData.wind.deg} degrees</li>
            <li><span>Wind gust:</span> ${weatherData.wind.gust} m/s</li>
            </ul>
        </div>`;
    }

    function closeModal(){
        const modalEl = document.getElementById("modal");
        modalEl.style.display = "none";
    }

    displayCountries();