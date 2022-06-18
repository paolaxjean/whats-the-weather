var searchInput = document.querySelector("#search-text");
var searchForm = document.querySelector("#search-form");
var searchHistory = document.querySelector("#search-history");

var cities = [];

// The following function renders searched cities as <li> elements
function renderCities() {
    searchHistory.innerHTML = "";

    // Render a new li for each saerch
    for (var i = 0; i < cities.length; i++) {
      var city = cities[i];
  
      var cityLi = document.createElement("li");
      cityLi.textContent = city;
      cityLi.setAttribute("data-index", i);

      var deleteButton = document.createElement("button");
      deleteButton.textContent = " DELETE";

      cityLi.appendChild(deleteButton);
      searchHistory.appendChild(cityLi);
    }
  }

// This function is being called below and will run when the page loads.
function initLoad() {
    // Get stored cities from localStorage
    var storedCities = JSON.parse(localStorage.getItem("cities"));
  
    // If cities were retrieved from localStorage, update the cities array to it
    if (storedCities) {
      cities = storedCities;
    }
  
    // This is a helper function that will render cities to the DOM
    renderCities();
  }

  function storeCities() {
    // Stringify and set key in localStorage to cities array
    localStorage.setItem("cities", JSON.stringify(cities));
  }

  // Add submit event to form
  searchForm.addEventListener("submit", function(event) {
    event.preventDefault();
  
    var searchCity = searchInput.value.trim();
  
    // Return from function early if submitted searchCity is blank
    if (searchCity === "") {
      return;
    }
  
    // Add new searchCity to cities array, clear the input
    cities.push(searchCity);
    searchInput.value = "";
  
    // Store updated cities in localStorage, re-render the list
    storeCities();
    renderCities();
  });

  // Add click event to searchHistory element
  searchHistory.addEventListener("click", function(event) {
    var element = event.target;
  
    // Checks if element is a button
    if (element.matches("button") === true) {
      // Get its data-index value and remove city element from the list
      var index = element.parentElement.getAttribute("data-index");
      cities.splice(index, 1);
  
      // Store updated todos in localStorage, re-render the search
      storeCities();
      renderCities();
    }
  });

  initLoad()