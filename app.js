/*
    ===LIBRARY APP===
    Created by: Cameron Arnold
*/

//Classes
function Book(title, author, image, readStatus) {
    this.title = title,
    this.author = author,
    this.image = image,
    this.readStatus = readStatus,
    this.rating = 0
}

function Library(){
    this.catalogue = [];

    this.storeLibrary = function(){
        window.localStorage.setItem("catalogue", JSON.stringify(this.catalogue));
    }

    this.refreshLibrary = function(){
        const catalogueObject = JSON.parse(window.localStorage.getItem("catalogue"));
        for(let i in catalogueObject){
            this.catalogue.push(catalogueObject[i]);
        }
        this.catalogue.forEach((book)=>{
            this.renderBook(book);
        })
    }

    this.addToLibrary = function(book){
        this.catalogue.push(book);
        this.renderBook(book);
        this.storeLibrary();
    }

    this.removeFromLibrary = function(bookToRemove){
        console.log(this.catalogue);
        this.catalogue = this.catalogue.filter((book) => book.title != bookToRemove.title);
        
        this.storeLibrary();
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

        const actionWrapper = document.createElement("div");
        actionWrapper.classList.add("action-wrapper");
        cardBottom.appendChild(actionWrapper);
        
        const readToggleWrapper = document.createElement("div");
        readToggleWrapper.classList.add("read-toggle-wrapper");
        actionWrapper.appendChild(readToggleWrapper);

        const readText = document.createElement("h3");
        readText.textContent = "Complete";
        readToggleWrapper.appendChild(readText);

        const readToggle = document.createElement("div");
        readToggle.classList.add("read-toggle");
        readToggleWrapper.appendChild(readToggle);

        const ratingWrapper = document.createElement("div");
        ratingWrapper.classList.add("rating-wrapper");
        actionWrapper.appendChild(ratingWrapper);

        const ratingText = document.createElement("h3");
        ratingText.textContent = "Rating";
        ratingWrapper.appendChild(ratingText);

        const starWrapper = document.createElement("div");
        starWrapper.classList.add("star-wrapper");
        ratingWrapper.appendChild(starWrapper);

        //Create rating component
        const stars = [];
        for(let i=0;i<5;i++){
            const starElement = document.createElement("div");
            starElement.classList.add("star");
            starElement.setAttribute("value", 5-i);
            const star = {
                value: 5-i,
                element: starElement,
                active: false
            }
            starWrapper.appendChild(starElement);
            stars.push(star);

            //EventListener
            starElement.addEventListener("click", ()=>{
                book.rating = star.value;
                stars.forEach((star) => {
                    star.element.classList.remove("active");
                })
                for(let j = 0; j < star.value; j++){
                    stars[4-j].element.classList.add("active");
                }
                book.rating = star.value;
                this.storeLibrary();
            })
        }
    
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
        readToggle.addEventListener("click", ()=>{
            book.readStatus = !book.readStatus;
            book.readStatus ? readToggle.classList.add("active") : readToggle.classList.remove("active");
            this.storeLibrary();
        })

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

        //Render Card Values
        window.addEventListener("load", ()=>{
            book.readStatus ? readToggle.classList.add("active") : readToggle.classList.remove("active");
            //Color Stars
            const starElements = cardBottom.querySelectorAll(".star");
            starElements.forEach(star =>{
                if(star.getAttribute("value") < book.rating){
                    star.classList.add('active');
                }
            })
            
        })

        grid.appendChild(card);
    }
}

//Initialize Library
const library = new Library();
const cardGrid = document.querySelector(".card-grid");
library.refreshLibrary();

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

//Form Controls
formSubmit.addEventListener("click", ()=>{
    const formTitle = formContainer.querySelector("#title");
    const formAuthor = formContainer.querySelector("#author");
    const formImage = formContainer.querySelector("#url");

    //Warnings
    const titleWarning = formContainer.querySelector(".forms > div:first-of-type > div");
    const authorWarning = formContainer.querySelector(".forms > div:nth-child(2) > div");
    const imageWarning = formContainer.querySelector(".forms > div:last-of-type > div");
    const imageRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
    
    if(formTitle.value != "" && formAuthor.value != "" && (imageRegex.test(formImage.value) || formImage.value == "")){
        //Add book to library
        const genericImageUrl = "https://www.kindpng.com/picc/m/430-4308026_harry-potter-book-clipart-hd-png-download.png";
        const title = formTitle.value; 
        const author = formAuthor.value;
        const image = formImage.value == "" ? genericImageUrl : formImage.value;

        const book = new Book(title, author, image, false);
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
        const formImageFilled = imageRegex.test(formImage.value) || formImage.value == "";

        formTitleFilled ? titleWarning.classList.add("hidden") : titleWarning.classList.remove("hidden");
        formAuthorFilled ? authorWarning.classList.add("hidden") : authorWarning.classList.remove("hidden");
        formImageFilled ? imageWarning.classList.add("hidden") : imageWarning.classList.remove("hidden");
    }
})

formCancel.addEventListener("click", ()=>{
    formReset();
    formContainer.classList.toggle("hidden");
})

//Local Storage

// //Testing and Debugging
// const testBook = new Book("JJK", "Me", "https://animetroops.com/wp-content/uploads/2022/01/jjk-171-delayed-scaled.jpg");
// library.addToLibrary(testBook);