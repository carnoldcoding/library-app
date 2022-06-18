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

/*
    ==Debugging==
    Create card grid
*/

const cardGrid = document.querySelector(".card-grid");
const cardCount = 10;
for(let i=0; i<cardCount; i++){
    let card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("hidden");
    cardGrid.appendChild(card);
}

const cards = document.querySelectorAll(".card");
cards.forEach((card)=>{
    const toggle = card.querySelector(".icon > i");
    const cardBottom = card.querySelector(".card-bottom");

    toggle.addEventListener("click", ()=>{
        toggle.classList.toggle("active");
        card.classList.toggle("hidden");

        //if card is going to shrink, speed up transition to prevent bumping
        if(!cardBottom.classList.contains("hidden")){
            cardBottom.style.transition = "all .05s ease";
        }else{
            cardBottom.style.transition = "all .2s ease";
        }
        cardBottom.classList.toggle("hidden");

    })
})
