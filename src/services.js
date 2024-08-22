let apiBooks = "http://localhost:3000/data";

async function getAllBooks() {
  const response = await fetch(apiBooks, {
    method: "GET", 
    headers: {
      "Content-Type": "application/json",
    },
  });

  const books = await response.json(); // Convierte la respuesta en un objeto JSON
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = ""; // Limpia el contenido previo del tbody

  books.forEach(book => {
    const tr = document.createElement("tr");

    // Crear contenido de las celdas
    tr.innerHTML = `
      <td class="p-4 text-center whitespace-nowrap">
        <p id="title">${book.title}</p>
      </td>
      <td class="p-4 text-center whitespace-nowrap">
        <p id="author">${book.author}</p>
      </td>
      <td class="p-4 text-center whitespace-nowrap">
        <p id="year">${book.year}</p>
      </td>
    `;

    // Crear y añadir botón de eliminar
    const delateBook = document.createElement("td");
    delateBook.classList.add("p-4", "text-center", "whitespace-nowrap");

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("bg-red-500", "text-white", "p-2", "rounded", "delete-btn");
    deleteBtn.textContent = "Eliminar";

    // Agregar evento de clic al botón para eliminar el libro
    deleteBtn.addEventListener("click", () => {
      deleteBook(book.id);
    });

    delateBook.appendChild(deleteBtn); //no entiendo
    tr.appendChild(delateBook); //no entiendo
    
    tbody.appendChild(tr); //no entiendo
  });
}

// Función para eliminar un libro
async function deleteBook(id) {
  const response = await fetch(`${apiBooks}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    getAllBooks(); // Refresca la lista de libros después de eliminar uno
  } else {
    console.error("Error al eliminar el libro.");
  }
}

// Llama a la función para obtener y mostrar los libros al cargar la página
getAllBooks();

// Función para añadir un nuevo libro
async function createNewBook() {
  let title = prompt('Introduce el título del libro que quieres añadir.');
  let author = prompt('Introduce el autor del libro.');
  let year = prompt('Introduce el año de su publicación.');

  let newBook = {
      title: title,
      author: author,
      year: year
  };
  const response = await fetch(apiBooks, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(newBook)
});
if (response.ok) {
  getAllBooks(); // Refresca la lista de libros después de añadir uno nuevo
} else {
  console.error("Error al añadir el libro.");
}
}

// Llama a la función para obtener y mostrar los libros al cargar la página
getAllBooks();
