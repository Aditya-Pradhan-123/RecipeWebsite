

// Code for navbar

window.addEventListener('scroll',function(){
  const header = document.querySelector('.navbar')
  header.classList.toggle("sticky", window.scrollY > 0)
});

const mobileBtn = document.getElementById('mobile-cta');
              const nav = document.querySelector('nav');
              const mobileBtnExit = document.getElementById('mobile-exit');

        mobileBtn.addEventListener('click', () => {
            nav.classList.add('menu-btn');
        })

        mobileBtnExit.addEventListener('click', () => {
            nav.classList.remove('menu-btn');
        })

const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
let listElement = document.querySelector("#search");
let inputBox = document.querySelector("#textBox")
let searchQuery = "";
const APP_ID = "6b9782af";
const APP_key = "3a8cef0b3798ff6850d3dc59524cc6cd";

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  fetchAPI();
});

// Fetch Code
async function fetchAPI() {
    
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=21`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data);
}

// Code for input box
  inputBox.addEventListener('keypress', function(e){
    if(e.key == 'Enter'){
        listElement.scrollIntoView();
        document.querySelector(".search-header-container").style.display = "flex";
    }
  });

// Code for display data from api to screen

function generateHTML(results) {
  container.classList.remove("initial");
  let generatedHTML = "";
  results.map((result) => {
    generatedHTML += `
     
      <div class="item">
        <img src="${result.recipe.image}" alt="img">
        <div class="flex-container">
          <h1 class="title">${result.recipe.label}</h1>
         
        </div>
        <div class="para">
        <p>Diet label</p>: <span>${
          result.recipe.dietLabels.length > 0
            ? result.recipe.dietLabels
            : "No Data Found"
        }</span>            
        </div>
        
        <div class="para">
            <p>Calories</p>: <span>${result.recipe.calories.toFixed(2)}</span>              
        </div>

        <div class="para">
            <p>Cuisine Type</p>: <span>${result.recipe.cuisineType}</span>            
          </div>
        <div class="btn">  
        <a class="view-btn" target="_blank" href="${
          result.recipe.url
        }">View Recipe</a>
        </div>
        
       
      </div>
     
    
    `;
  });
  searchResultDiv.innerHTML = generatedHTML;
}

