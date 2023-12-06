"use strict"

/* COCTAIL LIST MENU AND ADD TO CARD*/

const cocktailList = document.getElementById("cocktail-list");
const selectedCoctailList = document.getElementById("selected-cocktail-list");
const selectedCocktailsSection = document.querySelector(".selected-cocktails");
const toggleButton = document.getElementById("toggle-button");


// Fetch cocktail by name from the API and display it
async function fetchAndDisplayCocktailInMenu(cocktailName) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`
  console.log(url);
  try {
    const response = await fetch(url);
    
    const data = await response.json();
    const cocktail = data.drinks ? data.drinks[0] : null;
    
    if (cocktail) {
      const li = document.createElement("li");
      li.textContent = cocktail.strDrink;
     /*  li.addEventListener("click", ()=> moveCoctailToSelectedList(cocktail)); */
     const price = document.createElement("span")
     const min = 7;
     const max = 10;
     const randomPrice =  Math.floor(Math.random() * (max - min + 1)) + min;
      price.textContent = "$"  + randomPrice;
      price.style.float="right";
      price.color="white";
      cocktailList.appendChild(li);
      li.appendChild(price);

      li.addEventListener("click", () => moveCocktailToSelectedList(cocktail, randomPrice));
    
    }
  } catch (error) {
    console.error("Error fetching or displaying cocktail: ", error);
  }
}

//* / Move the clicked cocktail to the selected cocktail list
/* function moveCoctailToSelectedList(cocktail){
  const li = document.createElement("li");
  li.textContent = cocktail.strDrink;
  selectedCoctailList.appendChild(li);
  li.style.backgroundColor = bgChange();
} */
// Initially hide the selected cocktails section


/* cocktailList.addEventListener("click", (event) => {
  const cocktailName = event.target.textContent;
  const li = document.createElement("li");
  li.textContent = cocktailName;
  selectedCoctailList.appendChild(li);
  li.style.backgroundColor = bgChange();
  const price = document.createElement("span");
  const min = 7;
  const max = 10;
  const randomPrice =  Math.floor(Math.random() * (max - min + 1)) + min;

  
  
  price.textContent = randomPrice;
  price.style.float="right";
  price.color="white"; 
  li.appendChild(price);

  // Show the selected cocktails section when an item is clicked
  selectedCocktailsSection.style.display = "block";
});
  */

// Move the clicked cocktail to the selected cocktail list
function moveCocktailToSelectedList(cocktail, price) {
  const li = document.createElement("li");
  li.textContent = cocktail.strDrink;
  selectedCoctailList.appendChild(li);
  li.style.backgroundColor = bgChange();
  
  const priceSpan = document.createElement("span");
  priceSpan.textContent = "$" + price;
  priceSpan.style.float = "right";
  priceSpan.style.color = "white";
  li.appendChild(priceSpan);

  // Show the selected cocktails section when an item is clicked
  selectedCocktailsSection.style.display = "block";
}

// Generates a random background color
function bgChange() {
  const colors = ["#FF5733", "#33FF6D", "#3380FF", "#FF33B5", "#FFD433"];
  return colors[Math.floor(Math.random() * colors.length)];
}


// Call the fetchAndDisplayCocktailInMenu function for each cocktail name
const cocktailNames = ["margarita", "martini", "tequila", "cosmopolitan", "longisland", "negroni", "mojito", "gin", "vodka", "apricot", "g"];
cocktailNames.forEach(async cocktailName => {
  await fetchAndDisplayCocktailInMenu(cocktailName);
});

//TOGGLE BUTTON ON THE SELECTED ITEMS


toggleButton.addEventListener("click", () => {
  console.log("Toggle button clicked");
 /*  selectedCocktailsSection.classList.add("hidden"); */
 selectedCocktailsSection.style.display ="none";
 selectedCoctailList.innerHTML = "";
});

// Initially hide the selected cocktails section
/* selectedCocktailsSection.classList.add("hidden");
 */



const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');
const hero = document.querySelector(".main-content")

navbarToggle.addEventListener('click', () => {
  navbarMenu.classList.toggle('active');
  if (navbarMenu.classList.contains("active")){
    hero.style.marginTop = "45vh"; /* ` ${navbarMenu.offsetHeight}px` */
   }else {hero.style.marginTop = "20vh";}
});

const form = document.querySelector("#form");
form.addEventListener("submit", searchCategory);

// Add this function to remove the "hidden" class from the first card
function showFirstCard() {
  const firstCard = document.querySelector(".card.hidden");
  if (firstCard) {
    firstCard.classList.remove("hidden");
  }
}


function searchCategory(event) {
  event.preventDefault();

  const input = document.querySelector("#coctail-input");

  const coctailName = input.value;
  form.reset();
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${coctailName}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {displayCoctails(data.drinks); showFirstCard(); })  // "drinks" array contains the cocktail data
    .catch((error) => {
      console.log("An error occurred while fetching the data", error);
    });
}

function displayCoctails(coctails) {
  const coctailContainer = document.querySelector(".products");
  coctailContainer.innerHTML = ""; // Clear existing content

  if (coctails === null) {
    const noResult = document.createElement("p");
    noResult.innerText = "No cocktails found";
    noResult.color = "white";
    coctailContainer.appendChild(noResult);
    return;
  }

  coctails.forEach((coctail) => {
    const coctailName = coctail.strDrink;
    const coctailImg = coctail.strDrinkThumb;
    const coctailDesc = coctail.strInstructions;

    const coctailCard = document.createElement("div");
    coctailCard.className = "card";

    const cardImage = document.createElement("img");
    cardImage.src = coctailImg;
    cardImage.className = "card-img-top";
    coctailCard.appendChild(cardImage);

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const cardTitle = document.createElement("h3");
    cardTitle.className = "card-title";
    cardTitle.innerText = coctailName;
    cardBody.appendChild(cardTitle);

    /* const ingridients = coctail.strIngredient[0];
    const cardIngridient = document.createElement("ul");
    ingridients.forEach(ingridient => {
      const listItem = document.createElement("li");
      listItem.textContent = ingridient;
      cardIngridient.appendChild(listItem);
    });

    document.body.appendChild(cardIngridient); */


    if (coctailDesc) {
      const cardText = document.createElement("p");
      cardText.className = "card-text";
      cardText.innerText = coctailDesc;
      cardBody.appendChild(cardText);
    }

    /* const shopLink = document.createElement("a");
    shopLink.href = "#"; // Add the appropriate link here
    shopLink.className = "btn btn-primary";
    shopLink.innerText = "Shop";
    cardBody.appendChild(shopLink); */

    coctailCard.appendChild(cardBody);
    coctailContainer.appendChild(coctailCard);
  });
}
