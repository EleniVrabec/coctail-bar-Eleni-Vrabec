/* const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

navbarToggle.addEventListener('click', () => {
  navbarMenu.classList.toggle('active');
});


const form = document.querySelector("#form");
form.addEventListener("submit", searchCategory);

function searchCategory(event){
  event.preventDefault();

  const input = document.querySelector("#coctail");

  const coctailName = input.value;
  form.reset();
  const url = `www.thecocktaildb.com/api/json/v1/1/search.php?s=${coctailName}`;

  fetch(url)
  .then((response) => response.json())
  .then((data) => displayCoctail(data))
  .catch((error) => {
    console.log("An error ocurred while fetching the data", error);
  });
}

function displayCoctail(coctails){
  const coctailContainer = document.querySelector(".card");
  coctailContainer.innerHTML = "";

  if(coctails.lenght === 0){
    const noResult = document.createElement("p");
    noResult.innerText = "No coctails found";
    coctailContainer.appendChild(noResult);
    return;
  }

  coctails.forEach((coctail) => {
    const coctailName = coctail.strDrink;
    const coctailImg = coctail.strDrinkThumb;
    const coctailDesc = coctail.strInstructions;

    const coctailElement = document.querySelector(".card-body");

    const nameElement = document.querySelector(".card-title");
    nameElement.innerText = coctailName;
    coctailElement.appendChild(nameElement);

    if (coctailImg) {
      const imageElement = document.createElement("img");
      imageElement.src = coctailImg;
      coctailElement.appendChild(imageElement);
    }

    if (coctailDesc) {
      const descriptionElement = document.createElement("p");
      descriptionElement.innerText = coctailDesc;
      coctailElement.appendChild(descriptionElement);
    }

    coctailContainer.appendChild(coctailElement);
  })
}


 */



/* const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

navbarToggle.addEventListener('click', () => {
  navbarMenu.classList.toggle('active');
});

const form = document.querySelector("#form");
form.addEventListener("submit", searchCategory);

function searchCategory(event) {
  event.preventDefault();

  const input = document.querySelector("#coctail");

  const coctailName = input.value;
  form.reset();
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${coctailName}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => displayCoctail(data.drinks))  // "drinks" array contains the coctail data
    .catch((error) => {
      console.log("An error occurred while fetching the data", error);
    });
}

function displayCoctail(coctails) {
  const coctailContainer = document.querySelector(".card");
  coctailContainer.innerHTML = "";

  if (coctails === null) {
    const noResult = document.createElement("p");
    noResult.innerText = "No cocktails found";
    coctailContainer.appendChild(noResult);
    return;
  }

  coctails.forEach((coctail) => {
    const coctailName = coctail.strDrink;
    const coctailImg = coctail.strDrinkThumb;
    const coctailDesc = coctail.strInstructions;

    const coctailElement = document.createElement("div");
    coctailElement.className = "card-body";

    const nameElement = document.createElement("h2");
    nameElement.innerText = coctailName;
    coctailElement.appendChild(nameElement);

    if (coctailImg) {
      const imageElement = document.createElement("img");
      imageElement.src = coctailImg;
      coctailElement.appendChild(imageElement);
    }

    if (coctailDesc) {
     /*  const descriptionElement = document.createElement("p"); 
      const descriptionElement = document.querySelector(".card-text");
      descriptionElement.innerText = coctailDesc;
      coctailElement.appendChild(descriptionElement);
    }

    coctailContainer.appendChild(coctailElement);
  });
}
 */


const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

navbarToggle.addEventListener('click', () => {
  navbarMenu.classList.toggle('active');
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
