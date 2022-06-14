/*
    ===LIBRARY APP===
    Created by: Cameron Arnold
*/

//Classes
function Book(title, author, pages) {
    this.title = title,
    this.author = author,
    this.pages = pages
}

function Library(){
    this.catalogue = []

    this.addToLibrary = function(){
        const testBook = new Book("Lord of the Rings", "J.R Tolkein", 0);
        this.catalogue.push(testBook);
    }

    this.removeFromLibrary = function(bookToRemove){
        this.catalogue = this.catalogue.filter((book) => {
            book.title == bookToRemove.title;
        })
    }
}

const library = new Library();
library.addToLibrary();
console.log(library.catalogue);

//create cards
const cardGrid = document.querySelector(".card-grid");
for(let i=0; i<20; i++){
    let card = document.createElement("div");
    card.classList.add("card");
    cardGrid.appendChild(card);
}