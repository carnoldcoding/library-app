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
    this.displayLibrary = function(){
    }
}