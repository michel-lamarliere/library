// VARIABLES
const main = document.getElementById('main');
// form
let title = document.getElementById('name');
let author = document.getElementById('author');
let pages = document.getElementById('pages');
let read = document.getElementById('read-checkbox');
let readOrNot = document.querySelector('#read-or-not');
let submitBtn = document.getElementById('submit');

// book card
let cardContainer = document.querySelector('.card-container')
let cards = document.getElementsByClassName('card');
let cardDeleteBtns = document.getElementsByClassName('card-delete');
let cardToggles = document.getElementsByClassName('card-toggle');

// book stats
let statsBooks = document.querySelector('#stats-books');
let statsReadBooks = document.querySelector('#stats-books-read');
let statsPages = document.querySelector('#stats-pages');
let statsReadPages = document.querySelector('#stats-pages-read');

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
        for (let i = 0; i < myLibrary.length; i++) {
            cards[i].dataset.number = `${i}`;
            cardDeleteBtns[i].dataset.number = `${i}`;
            cardToggles[i].dataset.number = `${i}`;
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
        newBook.read == true ? cardRead.textContent = 'Read' : cardRead.textContent = 'Not Read';

        let cardButtons = document.createElement('div');
        cardButtons.classList.add('card-buttons');
        
        // creates read/not read button 
        let cardToggle = document.createElement('button');
        cardToggle.classList.add('card-toggle');
        newBook.read == true ? cardToggle.textContent = 'Not Read Yet' : cardToggle.textContent = 'Read';

        // creates delete button div
        let cardDeleteBtn = document.createElement('button');
        cardDeleteBtn.classList.add('card-delete');
        cardDeleteBtn.textContent = '-';

        // appends divs to Book Card div
        card.appendChild(cardTitle);
        card.appendChild(cardAuthor);
        card.appendChild(cardPages);
        card.appendChild(cardRead);
        card.appendChild(cardButtons);
        cardButtons.appendChild(cardToggle);
        cardButtons.appendChild(cardDeleteBtn);
        // appends Book Card to container
        cardContainer.appendChild(card);
        setAttribute();
        // adds content
        cardTitle.textContent = 'Title: ' + newBook.title;
        cardAuthor.textContent = 'Author: ' + newBook.author;
        cardPages.textContent = 'Pages: ' + newBook.pages;

        // adds read/not read
        newBook.read == true ? cardRead.textContent = 'Read' : cardRead.textContent = 'Not Read';

        // toggle event listener
        cardToggle.addEventListener('click', (event) => {
            let number = event.target.dataset.number;
            if (number && myLibrary[number].read === true) {
                cardToggle.textContent = "Read";
                myLibrary[number].read = false;
                cardRead.textContent = 'Not Read'
            } else {
                cardToggle.textContent = "Not Read Yet";
                myLibrary[number].read = true;
                cardRead.textContent = 'Read';
            }
            displayStats();
        })

        // delete event listener
        cardDeleteBtn.addEventListener('click', (event) => {
            event.target.parentNode.parentNode.remove();
            myLibrary.splice(event.target.dataset.number, 1);
            displayStats();
            setAttribute();
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
    statsReadBooks.textContent = "Read Books: " + readBooks;
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
});

read.addEventListener('click', () => {
    if (read.checked) {
        readOrNot.textContent = "Read";
    } else {
        readOrNot.textContent = "Not Read";
    }
})