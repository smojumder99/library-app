const myLibrary = [];


function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.id = crypto.randomUUID()

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function () {
        return
    }

}

Book.prototype.toggleReadStatus = function() {
    this.read = !this.read;
};


function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);

    myLibrary.push(newBook);

   
}


function displayBooks() {
    document.querySelector(".books").innerHTML = "";
    for (const book of myLibrary) {


        const bookButton1 = document.createElement("button");
        bookButton1.textContent = "Remove";
        bookButton1.classList.add("book-button", "remove-book");
        bookButton1.setAttribute("data-id", `${book.id}`);

        const bookButton2 = document.createElement("button");
        bookButton2.textContent = (book.read === true ? "Mark as unread":"Mark as read");
        bookButton2.classList.add("book-button", "toggle-read-status");
        bookButton2.setAttribute("data-id", `${book.id}`);

        const buttonDiv = document.createElement("div");
        buttonDiv.appendChild(bookButton1);
        buttonDiv.appendChild(bookButton2);


        const pageCount = document.createElement("p");
        pageCount.textContent = `${book.pages} Pages`;

        const author = document.createElement("p");
        author.textContent = `By ${book.author}`;

        const h2 = document.createElement("h2");
        h2.textContent = `${book.title}`;

        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book-name");

        bookDiv.appendChild(h2);
        bookDiv.appendChild(author);
        bookDiv.appendChild(pageCount);
        bookDiv.appendChild(buttonDiv);

        const displayDiv = document.querySelector(".books");
        displayDiv.insertBefore(bookDiv, displayDiv.firstChild);

    }
}



const form = document.querySelector("#add-book");
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pageCount = document.querySelector("#pagecount").value;

    const readStatus = document.querySelector('input[name="read-status"]:checked').value;

    let readBoolValue;
   if (readStatus === "yes") {
        readBoolValue = true;
    }

    else {
        readBoolValue = false;
    }

    addBookToLibrary(title, author, pageCount, readBoolValue);
    alert(`Added ${title} by ${author}, consisting of ${pageCount} pages, ${readBoolValue === true ? "read" : "not read"}`);

    displayBooks();

    document.querySelector('#add-book').reset();
    document.querySelector('#book-details-dialog').close();

})










const displayDiv = document.querySelector(".books");
displayDiv.addEventListener("click", function (e) {

    //Delete event
    if (e.target.classList.contains("remove-book")) {

        const bookToDelete = e.target.dataset.id;


        const bookIndex = myLibrary.findIndex(book => book.id === bookToDelete);

         

        if (bookIndex !== -1) {
            alert(`Deleted ${myLibrary[bookIndex].title} by ${myLibrary[bookIndex].author}`);
            myLibrary.splice(bookIndex, 1);
        }
        displayBooks();
       
    }


       //Toggle read status event 
    if (e.target.classList.contains("toggle-read-status")) {
       
        const bookToMark = e.target.dataset.id;


        const bookIndex = myLibrary.findIndex(book => book.id === bookToMark);

         

        if (bookIndex !== -1) {
            alert(`Marked ${myLibrary[bookIndex].title} by ${myLibrary[bookIndex].author} as ${myLibrary[bookIndex].read === true ? "not read":"read"}`);
            myLibrary[bookIndex].toggleReadStatus();
            displayBooks();
        }
        

    }

});


























addBookToLibrary("Think and grow rich ","Napoleon Hill",180,true);
addBookToLibrary("Antifragile: Things That Gain From Disorder","Nassim Nicholas Taleb",230,false);


displayBooks();








