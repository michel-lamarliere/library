// VARIABLES
const main = document.getElementById('main');
let books = document.querySelector('.books');
let bookCardContainer = document.querySelector('.book-card-container')
let bookTitle = document.getElementById('name');
let bookAuthor = document.getElementById('author');
let bookPages = document.getElementById('pages');
let bookRead = document.getElementById('read-checkbox');
let submitBtn = document.getElementById('submit');
let bookCards = document.getElementsByClassName('book-card');

let myLibrary = [];
let index;
let bookTitleV;
let bookAuthorV;
let bookPagesV;
let bookReadV;
let bookCardsArr;

// FUNCTIONS

// display book card
function displayBookCard() {
    let bookTitleV = bookTitle.value;
    let bookAuthorV = bookAuthor.value;
    let bookPagesV = bookPages.value;

    for (let i = myLibrary.length; i <= myLibrary.length; i++) {
        // creates Book Card
        let bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        // creates title div
        let bookCardTitle = document.createElement('div');
        bookCardTitle.classList.add('book-title');
        // creates author div
        let bookCardAuthor = document.createElement('div');
        bookCardAuthor.classList.add('book-author');
        // creates pages div
        let bookCardPages = document.createElement('div');
        bookCardPages.classList.add('book-pages');
        // creates read/not read div
        let bookCardRead = document.createElement('div');
        bookCardRead.classList.add('book-read');
        // creates delete button div
        let bookCardDelete = document.createElement('button');
        bookCardDelete.classList.add('book-card-delete');
        bookCardDelete.textContent = 'Delete';
        // appends divs to Book Card div
        bookCard.appendChild(bookCardTitle);
        bookCard.appendChild(bookCardAuthor);
        bookCard.appendChild(bookCardPages);
        bookCard.appendChild(bookCardRead);
        bookCard.appendChild(bookCardDelete);
        // appends Book Card to container
        bookCardContainer.appendChild(bookCard);
        // adds content
        bookCardTitle.textContent = bookTitleV;
        bookCardAuthor.textContent = bookAuthorV;
        bookCardPages.textContent = bookPagesV;
        // adds read/not read
        bookRead.checked ? bookCardRead.textContent = 'Read' : bookCardRead.textContent = 'Not Read'
    }
}

// sets Data Attribute
function setDataAttr() {
    index = myLibrary.length - 1;
    bookCardsArr = Array.from(bookCards);
    deleteBtns1 = document.getElementsByClassName('book-card-delete');
    deleteBtns = Array.from(deleteBtns1);
    let indexArr = bookCardsArr.length - 1;
    for (let i = indexArr; i < bookCardsArr.length; i++) {
        bookCardsArr[i].dataset.number = `${index}`;
        deleteBtns[i].dataset.number = `${index}`;
    }
    // delete card button
    deleteBtns.forEach(deleteBtn => deleteBtn.addEventListener('click', (event) => {
        event.target.parentNode.remove()
    }))

}

// add Book 
function addBookToLibrary(title, author, pages, read) {
    index = myLibrary.length;
    myLibrary.push([]);
    myLibrary[index].push(title);
    myLibrary[index].push(author);
    myLibrary[index].push(pages);
    myLibrary[index].push(read);
}

// EVENT LISTENERS
// submit button
submitBtn.addEventListener('click', () => {
    console.log('submit');
    addBookToLibrary(bookTitleV, bookAuthorV, bookPagesV, bookReadV);
    displayBookCard();
    setDataAttr();
})