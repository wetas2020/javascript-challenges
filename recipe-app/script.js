const mealsEl = document.getElementById('meals');
const favMeals = document.getElementById('fav-meals');
const searchTerm = document.getElementById('search-term');
const searchBtn = document.getElementById('search');
const mealPopup = document.getElementById('meal-popup');
const popupCloseBtn = document.getElementById('close-popup');

getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const respData = await resp.json();
    const randomMeal = respData.meals[0];
    console.log(randomMeal);

    addMeal(randomMeal, true);
}

async function getMealById(id) {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id);
    const respData = await resp.json();
    const meal = respData.meals[0];
    return meal;
}

async function getMealsBySearch(term) {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + term);
    const respData = await resp.json();
    const meals = respData.meals;
    console.log(meals);
    return meals;
}

function addMeal(mealData, random = false) {
    const meal = document.createElement('div');
    meal.classList.add('meal');
    meal.innerHTML = `
    <div class="meal-header">
    ${random ? `<span class="random"> Random Recipe </span>` : ''}
        <img
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
        />
    </div>
    <div class="meal-body">
        <h4>${mealData.strMeal}</h4>
        <button class="fav-btn active">
            <i class="far fa-heart" id="fav-unfav"></i>
        </button>
    </div>`;

    //to be fixed, animation heart by id
    meal.querySelector('.meal-body .fav-btn').addEventListener('click', (e) => {
        if (document.getElementById('fav-unfav').classList.value === 'far fa-heart') {
            document.getElementById('fav-unfav').className = 'fa fa-heart';
            addMealToLocalStorage(mealData.idMeal);
        } else {
            document.getElementById('fav-unfav').className = 'far fa-heart';
            removeMealFromLocalStorage(mealData.idMeal);
        }
        fetchFavMeals();
    });

    meals.appendChild(meal);
}

async function fetchFavMeals() {
    // clean the fav meal list
    favMeals.innerHTML = '';

    const mealIds = getMealsFromLS();

    const meals = [];
    for (let i = 0; i < mealIds.length; i++) {
        const mealId = mealIds[i];
        meal = await getMealById(mealId);
        addMealToFav(meal);
    }
    console.log(meals);
    // add them to the screen
}

function addMealToLocalStorage(mealId) {
    const mealIds = getMealsFromLS();
    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));
}

function removeMealFromLocalStorage(mealId) {
    const mealIds = getMealsFromLS();
    localStorage.setItem('mealIds', JSON.stringify(mealIds.filter((id) => id !== mealId)));
}

function getMealsFromLS() {
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));
    return mealIds === null ? [] : mealIds;
}

function addMealToFav(mealData) {
    const favMeal = document.createElement('li');
    favMeal.innerHTML = `
    <li>
        <img src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"/>
        <span>${mealData.strMeal}</span>
        <button class="clear"><i class="fas fa-window-close"></i></button>
    </li>
    `;

    const btn = favMeal.querySelector('.clear');

    btn.addEventListener('click', () => {
        removeMealFromLocalStorage(mealData.idMeal);

        fetchFavMeals();
    });

    favMeals.appendChild(favMeal);
}

searchBtn.addEventListener('click', async () => {
    //clear the search element
    mealsEl.innerHTML = '';
    const search = searchTerm.value;
    const meals = await getMealsBySearch(search);
    if (meals) {
        meals.forEach((meal) => {
            addMeal(meal);
        });
    }
});

popupCloseBtn.addEventListener('click', () => {
    mealPopup.classList.add('hidden');
});
