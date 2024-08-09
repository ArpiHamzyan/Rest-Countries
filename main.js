import './style.css'

//countries

const countriesElem = document.querySelector(".countries");

async function getCountry(){
    const url = await fetch("https://restcountries.com/v3.1/all");
    const res = await url.json();
    console.log(res);
    res.forEach(element =>{
        showCountry(element);
    })
}
getCountry();

function showCountry(data){
    const country = document.createElement("div");
    country.classList.add("country");
    country.innerHTML= `<div class="country-img">
              <img src="${data.flags.png}">
            </div>
            <div class="country-info">
              <h5 class="countryName">${data.name.common}</h5>
              <p><strong>Population:</strong>  ${data.population}</p>
              <p class="regionName"><strong>Region:</strong>  ${data.region}</p>
              <p><strong>Capital:</strong> ${data.capital}</p>
            </div>`
            countriesElem.appendChild(country);
            country.addEventListener("click",() => {
                showCountryDetail(data);
            });
}

//dark mode

const dark = document.getElementById("dark");
dark.onclick = function(){
    document.body.classList.toggle("dark-theme");
} 

            //filter
//filter open
const filter = document.getElementById("filter");
const dropDown = filter.querySelector('.drop');

filter.addEventListener('click', function() {
  dropDown.classList.toggle('hidden');
  dropDown.classList.toggle('block');
});

//filter choose

const region = document.querySelectorAll(".region");
const regionName = document.getElementsByClassName("regionName");
const filter_country = document.querySelector(".filter_country");

region.forEach(element => {
    element.addEventListener("click",() => {
        Array.from(regionName).forEach(elem => {
            if(elem.innerText.includes(element.innerText) || element.innerText == "All"){
                elem.parentElement.parentElement.style.display = "grid";
                filter_country.textContent = `${element.innerHTML}`;
            }else{
                elem.parentElement.parentElement.style.display = "none"
            }
        });
    })
});

         //search

//searching       

const search = document.querySelector(".search");
const countryName = document.getElementsByClassName("countryName");
const noResults = document.querySelector(".no-results");
const main = document.querySelector(".main");

search.addEventListener("input", () => {
    let found = false;

    Array.from(countryName).forEach(elem => {

        if(elem.innerText.toLowerCase().includes(search.value.toLowerCase())){
            elem.parentElement.parentElement.style.display = "grid";
            found = true;
            
        }else{
            elem.parentElement.parentElement.style.display = "none"
        }
        
    });

    main.style.height = '100vh';
    noResults.textContent = `No Country Match ${search.value}`;
    noResults.style.display = found ? "none" : "block";
});


//back

const oneCountry = document.querySelector(".one-country");
function showCountryDetail(data) {
    oneCountry.classList.remove("hidden");
    countriesElem.style.display = "none";
    document.querySelector(".search_filter").style.display = "none";

    const borderCountries = data.borders ? data.borders.map(border => `<div class="borders border-2 w-24 rounded shadow-md pl-8 mt-8 ml-4">${border}</div>`).join('') : '<div class=" pl-8 mt-8 ml-4 h-1">No Countries</div>';
    const nativeName = data.name.nativeName ? Object.values(data.name.nativeName)[0].official : data.name.common;
    const currencies = data.currencies ? Object.values(data.currencies)[0].name : 'N/A';
    const languages = data.languages ? Object.values(data.languages).join(', ') : 'N/A';
    

    oneCountry.innerHTML = ` 
        <div class="back flex items-center border-2 w-28 rounded shadow-md pl-4 mt-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
            </svg>
            <p class="ml-3">Back</p>
        </div>

        <div class="whole mt-20">
            <div class="separately-img">
                <img src="${data.flags.png}">
            </div>

            <div class="separately-info ">
                <div class="whole filter_region">
                    <div>
                        <h5 class="font-bold text-2xl mb-12">${data.name.common}</h5>
                        <p><strong>Native Name:</strong> ${nativeName}</p>
                        <p><strong>Population:</strong> ${data.population}</p>
                        <p><strong>Region:</strong> ${data.region}</p>
                        <p><strong>Sub Region:</strong> ${data.subregion}</p>
                        <p><strong>Capital:</strong> ${data.capital}</p>
                    </div>
                    <div class="ml-32 right">
                        <p><strong>Top Level Domain:</strong> ${data.tld}</p>
                        <p><strong>Currencies:</strong> ${currencies}</p>
                        <p><strong>Languages:</strong> ${languages}</p>
                    </div>
                </div>

                <div class="whole filter_region">
                    <p class="mt-8 w-40 font-bold text-base">Border Countries:</p>
                   <div class="flex flex-wrap">
                    ${borderCountries}
                    </div>
                </div>
            </div>
        </div> 
    `;
    

    const back = oneCountry.querySelector(".back");
    back.addEventListener("click", () => {
        oneCountry.classList.add("hidden");
        countriesElem.style.display = "grid";
        document.querySelector(".search_filter").style.display = "flex";
    });
}

// Initialize back button listener
const back = document.querySelector(".back");
back.addEventListener("click", () => {
    oneCountry.classList.add("hidden");
    countriesElem.style.display = "grid";
    document.querySelector(".search_filter").style.display = "flex";



});