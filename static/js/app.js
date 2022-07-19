// Dropdown icon toggle
const toggleIcon = (event) => {
    event.classList.toggle("dropdown-open")
}

// Function for search input
const searchInput = document.querySelector('#search-input');
const searchIcon = document.querySelector('#search-icon');
const searchIconWrapper = document.querySelector('#search-icon-wrapper')
const contentArea = document.querySelector("#content-area");

// Function for Close search
const close = () => {
    const closeBtn = document.querySelector('#close-btn');
    closeBtn.remove();
    contentArea.style.display = "block";
    searchIcon.style.display = 'inline';
}

// Listen event for focus search input
searchInput.addEventListener('focus', e => {
    const span = document.createElement('span');
    searchIcon.style.display = 'none';
    span.innerHTML = `<img class='mx-1' src="static/img/close.png" alt="close" onclick='close()'/>`;
    span.setAttribute('id', 'close-btn');
    searchIconWrapper.appendChild(span);
    contentArea.style.display = "none";
});

// Listen event for blur search input
searchInput.addEventListener('blur', close);

