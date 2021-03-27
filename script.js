// VARIABLES
const main = document.getElementById('main');
// form
let title = document.getElementById('name');
let author = document.getElementById('author');
let pages = document.getElementById('pages');
let read = document.getElementById('read-checkbox');
let submitBtn = document.getElementById('submit');

// book card
let cardContainer = document.querySelector('.card-container')
let cards = document.getElementsByClassName('card');

// book stats
let statsBooks = document.querySelector('.stats-books');
let statsReadBooks = document.querySelector('.stats-books-read');
let statsPages = document.querySelector('.stats-pages');
let statsReadPages = document.querySelector('.stats-pages-read');

//arrays
let myLibrary = [];
let newBook;

// values 
let index;

// FUNCTIONS

function Book(title, author, pages, read) {
    this.title = title.value; 
    this.author = author.value; 
    this.pages = pages.value; 
    this.read = read.checked;
}

// add book 
function addBookToLibrary() {
    newBook = new Book(title, author, pages, read)
    index = myLibrary.length;
    myLibrary.push(newBook);
    displayBook();
    resetForm();
}

// display book card
function displayBook() {
    function setAttribute() {
        for (let y = 0; y < length; y++) {
            cards[y].dataset.number = `${y}`;
            cardDeleteBtn.dataset.number = `${y}`;
        }
    }

    for (let i = myLibrary.length; i <= myLibrary.length; i++) {
        
        // creates Book Card
        let card = document.createElement('div');
        card.classList.add('card');
        
        // creates title div
        let cardTitle = document.createElement('div');
        cardTitle.classList.add('title');
        
        // creates author div
        let cardAuthor = document.createElement('div');
        cardAuthor.classList.add('author');

        // creates pages div
        let cardPages = document.createElement('div');
        cardPages.classList.add('pages');

        // creates read/not read div
        let cardRead = document.createElement('div');
        cardRead.classList.add('read');

        // creates delete button div
        let cardDeleteBtn = document.createElement('button');
        cardDeleteBtn.classList.add('card-delete');
        cardDeleteBtn.textContent = 'Delete';

        // appends divs to Book Card div
        card.appendChild(cardTitle);
        card.appendChild(cardAuthor);
        card.appendChild(cardPages);
        card.appendChild(cardRead);
        card.appendChild(cardDeleteBtn);
        // appends Book Card to container
        cardContainer.appendChild(card);

        // adds content
        cardTitle.textContent = 'Title: ' + newBook.title;
        cardAuthor.textContent = 'Author: ' + newBook.author;
        cardPages.textContent = 'Pages: ' + newBook.pages;

        // adds read/not read
        newBook.read == true ? cardRead.textContent = 'Read' : cardRead.textContent = 'Not Read';

        // delete event listener
        cardDeleteBtn.addEventListener('click', (event) => {
            event.target.parentNode.remove();
            myLibrary.splice(event.target.dataset.number, 1);
            let length = myLibrary.length;
            displayStats();
        })  
    } 
    displayStats();
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
    statsReadBooks.textContent = "ReadBooks: " + readBooks;
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
    statsReadPages.textContent = "Read Pages: " + totalReadPages;

    
}

// reset form
function resetForm() {
    title.value = ""
    author.value = "";
    pages.value = "";
}

// EVENT LISTENERS
// submit button
submitBtn.addEventListener('click', () => {
    addBookToLibrary();
});

 // no letters in pages input
pages.addEventListener('keyup', () => {
    pages.value = pages.value.replace(/[^\d]/,'');
})