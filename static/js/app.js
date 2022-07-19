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
    const {company, website, color, logo} = data;
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
            </div>
            </div>
            <div>
            <button class="result-btn">Track</button>
            </div>
        </div>
    `;
    searchResultRow.appendChild(div);
    console.log(data);
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


// Listen event for search input submit
// searchForm.addEventListener('submit', e => {
//     e.preventDefault();
//     const searchValue = searchInput.value;

//     fetch(`https://tva.staging.b2brain.com/search/autocomplete_org_all/?q=${searchValue}`)
//     .then(res => res.json())
//     .then(results => {
//         searchResultRow.innerHTML = ``;
//         console.log(results);
//         results.map(result => {
//             displaySearchResult(result);
//         })
//     });
// });

searchInput.addEventListener('keyup', e => {
    const searchValue = e.target.value;

    fetch(`https://tva.staging.b2brain.com/search/autocomplete_org_all/?q=${searchValue}`)
    .then(res => res.json())
    .then(results => {
        searchResultRow.innerHTML = ``;
        if(results.length > 0) {
            results.map(result => {
                displaySearchResult(result);
            })
        }
        else {
            searchResultRow.innerHTML = `<p class="text-danger">Sorry search result not found</p>`;
        }
    });
});

