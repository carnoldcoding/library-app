/*
    ===LIBRARY APP===
    Created by: Cameron Arnold
*/

//Classes
function Book(title, author, image) {
    this.title = title,
    this.author = author,
    this.image = image
}

function Library(){
    this.catalogue = []

    //Methods
    this.addToLibrary = function(book){
        this.catalogue.push(book);
        this.renderBook(book);
    }

    this.removeFromLibrary = function(bookToRemove){
        this.catalogue = this.catalogue.filter((book) => {
            book.title == bookToRemove.title;
        })
    }

    //Book Component
    this.renderBook = function(book){
        const grid = document.querySelector(".card-grid");

        const card = document.createElement("div");
        card.classList.add("card");
        card.classList.add("hidden");

        const cardTop = document.createElement("div");
        cardTop.classList.add("card-top");
        card.appendChild(cardTop);

        const cardImage = document.createElement("div");
        cardImage.classList.add("image");
        cardImage.style.backgroundImage = `url(${book.image})`
        cardTop.appendChild(cardImage);

        const textContent = document.createElement("div");
        textContent.classList.add("text-content");
        cardTop.appendChild(textContent);

        const text=document.createElement("div");
        text.classList.add("text");
        textContent.appendChild(text);

        const bookTitle = document.createElement("h2");
        const bookAuthor = document.createElement("p");
        bookTitle.textContent = book.title;
        bookAuthor.textContent = book.author;
        text.appendChild(bookTitle);
        text.appendChild(bookAuthor);

        const toggleDiv = document.createElement("div");
        toggleDiv.classList.add("icon");
        textContent.appendChild(toggleDiv);

        const toggleIcon = document.createElement("i");
        toggleIcon.classList.add("fa-solid");
        toggleIcon.classList.add("fa-angle-down");
        toggleDiv.appendChild(toggleIcon);

        const cardBottom = document.createElement("div");
        cardBottom.classList.add("card-bottom");
        cardBottom.classList.add("hidden");
        card.appendChild(cardBottom);

        const buttons = document.createElement("div");
        buttons.classList.add("buttons");
        cardBottom.appendChild(buttons);

        const editButton = document.createElement("div");
        editButton.textContent = "Edit";
        editButton.classList.add("button");
        buttons.appendChild(editButton);

        const deleteButton = document.createElement("div");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("button");
        buttons.appendChild(deleteButton);


        //EventListeners

        deleteButton.addEventListener("click", ()=>{
            this.removeFromLibrary(book);
            card.remove();
        })

        toggleIcon.addEventListener("click", ()=>{
            toggleIcon.classList.toggle("active");
            card.classList.toggle("hidden");

            if(!cardBottom.classList.contains("hidden")){
                cardBottom.style.transition = "all .05s ease";
            }else{
                cardBottom.style.transition = "all .2s ease";
            }
            cardBottom.classList.toggle("hidden");
        })

        grid.appendChild(card);
    }
}

const library = new Library();

/*
    ==Debugging==
    Create card grid
*/

const cardGrid = document.querySelector(".card-grid");

//Add Card Form
const formContainer = document.querySelector(".add-card-form-container");
const formCancel = document.querySelector(".form-buttons > div:last-of-type")
const formSubmit = document.querySelector(".form-buttons > div:first-of-type")
const addButton = document.querySelector(".add-button");

const formReset = function(){
    formContainer.querySelector("#title").value = "";
    formContainer.querySelector("#author").value = "";
    formContainer.querySelector("#url").value = "";
}


addButton.addEventListener("click", ()=>{
    formContainer.classList.toggle("hidden");
})

formSubmit.addEventListener("click", ()=>{
    const formTitle = formContainer.querySelector("#title");
    const formAuthor = formContainer.querySelector("#author");
    const formImage = formContainer.querySelector("#url");

    //Warnings
    const titleWarning = formContainer.querySelector(".forms > div:first-of-type > div");
    const authorWarning = formContainer.querySelector(".forms > div:nth-child(2) > div");
    const imageWarning = formContainer.querySelector(".forms > div:last-of-type > div");
    
    if(formTitle.value != "" && formAuthor.value != "" && formImage.value != ""){
        //Add book to library
        const title = formTitle.value; 
        const author = formAuthor.value;
        const image = formImage.value;
        const book = new Book(title, author, image);
        library.addToLibrary(book);

        //Reset and Submit form
        titleWarning.classList.add("hidden");
        authorWarning.classList.add("hidden");
        imageWarning.classList.add("hidden");
        formReset();
        formContainer.classList.toggle("hidden");
    }else{
        const formTitleFilled = formTitle.value == "" ? false: true;
        const formAuthorFilled = formAuthor.value == "" ? false : true;
        const formImageFilled = formImage.value == "" ? false : true;

        formTitleFilled ? titleWarning.classList.add("hidden") : titleWarning.classList.remove("hidden");
        formAuthorFilled ? authorWarning.classList.add("hidden") : authorWarning.classList.remove("hidden");
        formImageFilled ? imageWarning.classList.add("hidden") : imageWarning.classList.remove("hidden");
    }
})

formCancel.addEventListener("click", ()=>{
    formReset();
    formContainer.classList.toggle("hidden");
})

const testBook = new Book("JJK", "Me", "https://animetroops.com/wp-content/uploads/2022/01/jjk-171-delayed-scaled.jpg");
library.addToLibrary(testBook);