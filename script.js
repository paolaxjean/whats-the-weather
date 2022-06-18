var searchInput = document.querySelector("#search-text");
var searchForm = document.querySelector("#search-form");
var searchcityHistory = document.querySelector("#search-history");

var weatherApiRootUrl = 'https://api.openweathermap.org';
var apiKey = 'e9caf7bf7cc6e3a16e09ef7d862e9208'
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
var city;

var cities = [];

function renderCities() {
    searchcityHistory.innerHTML = "";

    for (var i = 0; i < cities.length; i++) {
      var city = cities[i];
  
      var cityLi = document.createElement("li");
      cityLi.textContent = city;
      cityLi.setAttribute("data-index", i);

      var deleteButton = document.createElement("button");
      deleteButton.textContent = " DELETE";

      cityLi.appendChild(deleteButton);
      searchcityHistory.appendChild(cityLi);
    }
  }

function initLoad() {
    var storedCities = JSON.parse(localStorage.getItem("cities"));
  
    if (storedCities) {
      cities = storedCities;
    }
  
    renderCities();
  }

  function storeCities() {
    localStorage.setItem("cities", JSON.stringify(cities));
  }

  searchForm.addEventListener("submit", function(event) {
    event.preventDefault();
  
    var searchCity = searchInput.value.trim();
  
    if (searchCity === "") {
      return;
    }
  
    cities.push(searchCity);
    searchInput.value = "";
  
    storeCities();
    renderCities();
  });

  searchcityHistory.addEventListener("click", function(event) {
    var element = event.target;
  
    if (element.matches("button") === true) {

      var index = element.parentElement.getAttribute("data-index");
      cities.splice(index, 1);
  
      storeCities();
      renderCities();
    }
  });


  // function getApi() {
  //   var requestUrl = weatherApiRootUrl + city + apiKey;
    
  //     fetch(requestUrl)
  //       .then(function (response) {
  //         return response.json()
  //       })

  //       for()
  //       .then(function (data) {
  //         var tempValue = data['current']['temp'];
  //         temp.innerHTML = tempValue;
  //      })
  //     }

  initLoad()