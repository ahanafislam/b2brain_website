// Dropdown icon toggle
const toggleIcon = (event) => {
    event.classList.toggle("dropdown-open")
}

// Function for search input
const searchInput = document.querySelector('#search-input');
const searchIcon = document.querySelector('#search-icon');
const searchIconWrapper = document.querySelector('#search-icon-wrapper')
const searchResult = document.querySelector('#search-result');
const searchResultRow = document.querySelector('#search-result-row');
// const searchForm = document.querySelector('#search-form');
const contentArea = document.querySelector("#content-area");

// Function for Close search
const close = () => {
    const closeBtn = document.querySelector('#close-btn');
    closeBtn.remove();
    contentArea.style.display = "block";
    searchIcon.style.display = 'inline';
    searchResult.classList.remove('d-md-flex');
    searchResult.classList.add('d-none');
    searchInput.value = ``;
}

// Function for display search result
const displaySearchResult = data => {
    const {company, website, color, logo, slug} = data;
    const div = document.createElement('div');
    const companyInitial = company.charAt(0);

    div.classList.add('col');

    div.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-5 result-card">
            <div class="d-flex">
                ${
                logo ? `<img src="static/img/harrow.png" alt="client-logo"/>`
                    : `<span class="result-logo d-flex justify-content-center align-items-center" style="background: ${color === 'deep-orange' ? 'orange' : color}">${companyInitial}</span>`
                }
                <div class="ms-4">
                    <p class="result-title">${company}</p>
                    <a href="#" class="result-link">${website}</a>
                    <p>${slug}</p>
                </div>
            </div>
            <div>
                <button class="result-btn" onclick='trackInfo(this)'>Track</button>
            </div>
        </div>
    `;
    searchResultRow.appendChild(div);
}

// Function for Track Company info
const trackInfo = e => {
    e.classList.remove("result-link");
    e.classList.add("tracking-btn");
    e.textContent = "Tracking";
    
    const companyName = e.parentElement.previousElementSibling.childNodes[3].childNodes[1].textContent;
    const companySlug = e.parentElement.previousElementSibling.childNodes[3].childNodes[3].textContent;
    const timestamp = new Date();
    console.log(`Organization Name: ${companyName}\nOrganization Slug: ${companySlug}\nTimestamp: ${timestamp}`);
}

// Listen on click for close search
searchIconWrapper.addEventListener('click', close);


// Listen event for focus search input
searchInput.addEventListener('focus', e => {
    const span = document.createElement('span');
    const closeBtn = document.querySelector('#close-btn');

    if(!closeBtn) {
        span.innerHTML = `<img class='mx-1' src="static/img/close.png" alt="close" onclick='close()'/>`;
        span.setAttribute('id', 'close-btn');
        searchIconWrapper.appendChild(span);
    }

    searchIcon.style.display = 'none';
    contentArea.style.display = "none";
    searchResult.classList.remove('d-none');
    searchResult.classList.add('d-md-flex');
});

// Function for fetch data from api
const fetchData = async value => {
    const response = await fetch(`https://tva.staging.b2brain.com/search/autocomplete_org_all/?q=${value}`);
    const results = await response.json();

    if(results) {
        searchResultRow.innerHTML = ``;
        if(results.length > 0) {
            results.map(result => {
                displaySearchResult(result);
            })
        }
        else {
            searchResultRow.innerHTML = `<p class="text-danger">Sorry search result not found</p>`;
        }
    }
}

searchInput.addEventListener('keyup', e => {
    const searchValue = e.target.value;
    searchResultRow.innerHTML = `
        <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    `;
    fetchData(searchValue);
});

