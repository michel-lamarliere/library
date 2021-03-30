// VARIABLES
const main = document.getElementById('main');
// form
let title = document.getElementById('title');
let author = document.getElementById('author');
let pages = document.getElementById('pages');
let read = document.querySelector('.form-checkbox');
let cardReads = document.getElementsByClassName('read-or-not');
let submitBtn = document.getElementById('submit');

// book card
let cardContainer = document.querySelector('.card-container')
let cardDeleteBtns = document.getElementsByClassName('card-delete');
let cardToggles = document.getElementsByClassName('toggle-btn');
let cardToggleBalls = document.getElementsByClassName('toggle-ball');

// book stats
let statsBooks = document.querySelector('#stats-books');
let statsReadBooks = document.querySelector('#stats-books-read');
let statsPages = document.querySelector('#stats-pages');
let statsReadPages = document.querySelector('#stats-pages-read');

//arrays
let myLibrary = [];
let newBook;

// emptyInputs() : checks if inputs are not empty
let add;

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
    if (add === true) {
        console.log('adding to library')
        newBook = new Book(title, author, pages, read);
        index = myLibrary.length;
        myLibrary.push(newBook);
        displayBook();
    } else return false;
}

function setAttribute() {
    console.log('setting attributes')
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
    console.log('displaying books')
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

function emptyInputs() {
    add = true;
    if (title.value == "") {
        add = false;
        title.placeholder = 'Please enter a title';
    }
    if (author.value == "") {
        add = false;
        author.placeholder = 'Please enter an author';
    }
    if (pages.value == "") {
        add = false;
        pages.placeholder = 'Please enter a page number';
    }

    if (add === true) {
        title.placeholder = 'Title';
        author.placeholder = 'Author';
        pages.placeholder = 'Pages';
    }
    return add;
}

// EVENT LISTENERS
// submit button
submitBtn.addEventListener('click', () => {
    emptyInputs();
    addBookToLibrary();
    resetForm();
    displayBook();
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

// LOCAL STORAGE
function saveLocal() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    console.log('saving to local fn');
}

function getLocal() {
    let storage = JSON.parse(localStorage.getItem("myLibrary"));
    console.log('get local fn');

    if (storage) {
        myLibrary.push(...storage);
        console.log('mylib push fn');
    }
}

function displayLocal() {
    console.log('display local fn()')
    getLocal();
    displayBook();
}

displayLocal();

