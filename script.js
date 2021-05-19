// VARIABLES
const main = document.querySelector('#main');
let overlay = document.querySelector('.overlay');
// form
let addBooksTitle = document.querySelector('.add-books-title');
let addBooksContainer = document.querySelector('.add-books-container');
let formContainer = document.querySelector('.form-container')
let title = document.getElementById('title');
let author = document.getElementById('author');
let pages = document.getElementById('pages');
let read = document.querySelector('.form-checkbox');
let cardReads = document.getElementsByClassName('read-or-not');
let submitBtn = document.getElementById('submit');
let quitBtn = document.getElementById('quit');

// book card
let cardContainer = document.querySelector('.card-container')
let cardDeleteBtns = document.getElementsByClassName('card-delete');
let cardToggles = document.getElementsByClassName('toggle-btn');
let cardToggleBalls = document.getElementsByClassName('toggle-ball');
let formPopUp = document.querySelector('.form-pop-up')

// book stats
let statsBooks = document.querySelector('#stats-books');
let statsReadBooks = document.querySelector('#stats-books-read');
let statsPages = document.querySelector('#stats-pages');
let statsReadPages = document.querySelector('#stats-pages-read');

//arrays
let myLibrary = [];

// emptyInputs() : checks if inputs are not empty
let add;

// values 
let index;

// FUNCTIONS

class Book {
    constructor(title, author, pages, read) {
        this.title = title.value; 
        this.author = author.value; 
        this.pages = pages.value; 
        this.read = read.checked;
    }
}

// add book 
function addBookToLibrary() {
    let book = new Book(title, author, pages, read);
    index = myLibrary.length;
    myLibrary.push(book);
    displayBook();
}

function setAttribute() {
    let cards = document.getElementsByClassName('card');
    for (let i = 0; i < myLibrary.length; i++) {
        cards[i].dataset.number = `${i}`;
        cardDeleteBtns[i].dataset.number = `${i}`;
        cardToggles[i].dataset.number = `${i}`;
        cardToggleBalls[i].dataset.number = `${i}`;
    }
}

// display book card
function displayBook() {
    
    while (cardContainer.firstChild) {
        cardContainer.firstChild.remove()
    }
    for (let i = 0; i < myLibrary.length; i++) {
        // creates Book Card
        let card = document.createElement('div');
        card.classList.add('card');

        // creates fields parent div
        let fieldsDiv = document.createElement('div');
        fieldsDiv.classList.add('fields-div');
        
        // creates title div
        let cardTitle = document.createElement('div');
        cardTitle.classList.add('title');
        
        // creates author div
        let cardAuthor = document.createElement('div');
        cardAuthor.classList.add('author');

        // creates pages div
        let cardPages = document.createElement('div');
        cardPages.classList.add('pages');
        
        // creates toggle parent div
        let cardButtons = document.createElement('div');
        cardButtons.classList.add('card-buttons');

        // creates toggle and text parent div
        let toggleDiv = document.createElement('div');
        toggleDiv.classList.add('toggle-div');

        // creates button parent div
        let deleteDiv = document.createElement('div');
        deleteDiv.classList.add('delete-div');

        // creates read or not display 
        let cardRead = document.createElement('div');
        cardRead.classList.add('read-or-not');
        if (myLibrary[i].read === true) {
            cardRead.textContent = 'Read';
        } else {
            cardRead.textContent = 'Not Read';
        }        
        // creates read/not read button 
        let cardToggle = document.createElement('div');
        cardToggle.classList.add('toggle-btn');
        if (myLibrary[i].read === true) {
            cardRead.textContent = 'Read';
            cardToggle.classList.add('toggle-on');
        } else {
            cardRead.textContent = 'Not Read';
            cardToggle.classList.add('toggle-off');
        }

        // creates ball
        let cardToggleBall = document.createElement('div');
        cardToggleBall.classList.add('toggle-ball');
        if (myLibrary[i].read === true) {
            cardToggleBall.classList.add('toggle-on-ball');
        } else {
            cardToggleBall.classList.add('toggle-off-ball');
        }
        // appends ball to toggle
        cardToggle.appendChild(cardToggleBall);
        
        // creates delete button div
        let cardDeleteBtn = document.createElement('div');
        cardDeleteBtn.classList.add('card-delete');
        cardDeleteBtn.textContent = '-';

        // appends divs to Book Card div
        card.appendChild(fieldsDiv);
        fieldsDiv.appendChild(cardTitle);
        fieldsDiv.appendChild(cardAuthor);
        fieldsDiv.appendChild(cardPages);
        card.appendChild(cardButtons);
        toggleDiv.appendChild(cardToggle);
        toggleDiv.appendChild(cardRead)
        deleteDiv.appendChild(cardDeleteBtn);
        cardButtons.appendChild(toggleDiv);
        cardButtons.appendChild(deleteDiv);
        // appends Book Card to container
        cardContainer.appendChild(card);
        // adds content
        cardTitle.textContent = 'Title: ' + myLibrary[i].title;
        cardAuthor.textContent = 'Author: ' + myLibrary[i].author;
        cardPages.textContent = 'Pages: ' + myLibrary[i].pages;

        // toggle event listener
        cardToggle.addEventListener('click', (event) => {
            let number = event.target.dataset.number;
            if (number && myLibrary[number].read === true) {
                cardToggle.classList.remove('toggle-on');
                cardToggle.classList.add('toggle-off');
                cardToggleBall.classList.remove('toggle-on-ball');
                cardToggleBall.classList.add('toggle-off-ball');
                myLibrary[number].read = false;
                cardRead.textContent = 'Not Read';
            } else {
                cardToggle.classList.remove('toggle-off');
                cardToggle.classList.add('toggle-on');
                cardToggleBall.classList.remove('toggle-off-ball');
                cardToggleBall.classList.add('toggle-on-ball');
                myLibrary[number].read = true;
                cardRead.textContent = 'Read';
            }
            displayStats();
            setAttribute();
            saveLocal();
        })

        // delete event listener
        cardDeleteBtn.addEventListener('click', (event) => {
            event.target.parentNode.parentNode.parentNode.remove();
            myLibrary.splice(event.target.dataset.number, 1);
            displayStats();
            setAttribute();
            saveLocal();

        })  
    }
    displayStats();
    setAttribute();
    saveLocal();
}

// display the stats
function displayStats() {
    // displays total books
    statsBooks.textContent = "Books: " + myLibrary.length;
    // displays read books
    let readBooks = 0;
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].read == true) {
            readBooks++;
        }
    }
    statsReadBooks.textContent = "Books Read: " + readBooks;
    // displays total pages
    let totalPages = 0;
    for (let i = 0; i < myLibrary.length; i++) {
        totalPages = totalPages + Number(myLibrary[i].pages);
    }
    statsPages.textContent = "Pages: " + totalPages;
    // display total read pages
    let totalReadPages = 0;
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].read == true && myLibrary[i].pages != 0) {
        totalReadPages = totalReadPages + Number(myLibrary[i].pages)
        }
    }
    statsReadPages.textContent = "Pages Read: " + totalReadPages;
}

// reset form
function resetForm() {
    title.value = ""
    author.value = "";
    pages.value = "";
}

const resetPlaceholders = () => {
    title.placeholder = "Title";
    author.placeholder = "Author";
    pages.placeholder = "Pages";
}

function checkInputs() {
    if (title.validity.valueMissing) {
        title.placeholder = 'Please enter a title';
    } if (author.validity.valueMissing) {
        author.placeholder = 'Please enter an author';
    } if (pages.validity.valueMissing) {
        pages.placeholder = 'Please enter a page number';
    } if (pages.validity.rangeOverflow) {
        pages.value = '';
        pages.placeholder = 'Page number is too high';
    } else if (pages.validity.rangeUnderflow) {
        pages.value = '';
        pages.placeholder = 'Page number is too low';
    } else if (pages.validity.typeMismatch) {
        pages.placeholder = 'Page number must be a number';
    }

    if (title.checkValidity() && author.checkValidity() && pages.checkValidity()) {
        addBookToLibrary();
        resetForm();
        resetPlaceholders();
    } else {
        return
    }
}


// EVENT LISTENERS
// submit button
submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    checkInputs();
    displayBook();
    closePopUp()
});

 // no letters in pages input
pages.addEventListener('keyup', () => {
    pages.value = pages.value.replace(/[^\d]/,'');
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        submitBtn.click();
    }
})

formPopUp.addEventListener('click', () => {
    openPopUp();
})

quitBtn.addEventListener('click', () => {
    closePopUp();
})

function openPopUp() {
    formContainer.style.position = 'absolute';
    formContainer.style.display = 'flex';
    addBooksTitle.position = 'absolute';
    addBooksTitle.style.display = 'flex';
    main.appendChild(formContainer);
    main.appendChild(addBooksTitle);
    overlay.style.display = 'block';
}
function closePopUp() {
    formContainer.style.position = 'relative';
    addBooksTitle.position = 'relative';
    addBooksContainer.appendChild(addBooksTitle);
    addBooksContainer.appendChild(formContainer);
    overlay.style.display = 'none';
}

// LOCAL STORAGE
function saveLocal() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function getLocal() {
    let storage = JSON.parse(localStorage.getItem("myLibrary"));

    if (storage) {
        myLibrary.push(...storage);
    }
}

function displayLocal() {
    getLocal();
    displayBook();
}

displayLocal();