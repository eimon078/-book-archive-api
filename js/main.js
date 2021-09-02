
// Load data by search value 
const loadData = () => {

    // Clear Previous Data 
    document.getElementById('total-found').textContent = '';
    document.getElementById('book-card').textContent = '';
    document.getElementById('no-result-field').textContent = '';
    // Get Search Value 
    const search_text = document.getElementById('search-field');
    const searchValue = search_text.value;
    search_text.value = '';
    if (searchValue === '') {
        const noResult = document.getElementById('no-result-field');
        noResult.innerHTML = `<h2 class="text-center text-danger fs-3 ">Please, Enter Book Name.Don't Keep it Blank</h2>`
    }

    else {

        fetch(`https://openlibrary.org/search.json?q=${searchValue}`)
            .then(res => res.json())
            .then(data => displayData(data));
    }

}


// Display Load Data 
const displayData = (books) => {
    // get total field 
    const totalFound = document.getElementById('total-found');
    totalFound.innerHTML = `Total Found Result: <span class="text-danger">${books.num_found}</span>`;

    // if result is found and >= 32
    if (books.num_found >= 32) {
        books.docs.slice(0, 32).forEach(showSingleBook);
    }
    else if (books.num_found) {
        books.docs.forEach(showSingleBook);
    }
    else {
        const noResult = document.getElementById('no-result-field');
        noResult.innerHTML = `<h2 class="text-center text-danger fs-3 ">No Result Found</h2>`
    }
}


// Show Single Book 
const showSingleBook = (book) => {
    const booksContainer = document.getElementById('book-card');

    // card col 
    const colDiv = document.createElement('div');
    colDiv.classList.add('col');

    // Card  
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.classList.add('h-100');
    if (book.cover_i) {
        cardDiv.innerHTML = `<img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top photo" alt="Image Not Found">`
    }
    else {
        cardDiv.innerHTML = `<img src="images/image-not-found.png" class="card-img-top photo" alt="Image Not Found">`
    }

    //Card Body
    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.classList.add('card-body');

    // Check Book Name Have or Not 
    if (book.title) {
        p = pTag();
        p.innerHTML = `<span class="fw-bold">Book Name:</span> ${book.title}`;
        cardBodyDiv.appendChild(p);
    }
    else {
        p = pTag();
        p.innerHTML = `<span class="fw-bold">Book Name:</span> <span class="text-danger fs-5">Not found</span>`;
        cardBodyDiv.appendChild(p);
    }

    // Check Author name Have or Not 

    if (book.author_name) {
        p = pTag();
        p.innerHTML = `<span class="fw-bold">Author:</span> ${book.author_name[0]}`;
        cardBodyDiv.appendChild(p);
    }
    else {
        p = pTag();
        p.innerHTML = `<span class="fw-bold">Author:</span><span class="text-danger fs-5">Name Not found</span>`;
        cardBodyDiv.appendChild(p);
    }

    //publisher 

    if (book.publisher) {
        p = pTag();
        p.innerHTML = `<span class="fw-bold">publisher:</span> ${book.publisher[0]}`;
        cardBodyDiv.appendChild(p);
    }
    else {
        p = pTag();
        p.innerHTML = `<span class="fw-bold">publisher:</span><span class="text-danger fs-5">Name Not found</span>`;
        cardBodyDiv.appendChild(p);
    }

    // Check Published Year Have or Not 
    if (book.first_publish_year) {
        p = pTag();
        p.innerHTML = `<span class="fw-bold">First Published:</span>${book.first_publish_year}`;
        cardBodyDiv.appendChild(p);
    }
    else {
        p = pTag();
        p.innerHTML = `<span class="fw-bold">First Published:</span> <span class="text-danger fs-5"> Year Not Found</span>`;
        cardBodyDiv.appendChild(p);
    }

    cardDiv.appendChild(cardBodyDiv);
    colDiv.appendChild(cardDiv)
    booksContainer.appendChild(colDiv);

}

// create a p tag 
const pTag = () => {
    const p = document.createElement('p');
    p.classList.add('card-title');
    return p;
}
