document.addEventListener("DOMContentLoaded", () => {
  const bookList = document.getElementById("book-list") as HTMLDivElement;
  const searchDropdown = document.getElementById(
    "search-dropdown"
  ) as HTMLSelectElement;
  const searchInput = document.getElementById("search") as HTMLInputElement;
  const sortSelect = document.getElementById("sort") as HTMLSelectElement;
  const themeToggle = document.getElementById(
    "theme-toggle"
  ) as HTMLButtonElement;
  const cartButton = document.getElementById(
    "cart-button"
  ) as HTMLButtonElement;
  const cartModal = document.getElementById("cart-modal") as HTMLDivElement;
  const closeCart = document.getElementById("close-cart") as HTMLButtonElement;
  const cartItems = document.getElementById("cart-items") as HTMLUListElement;
  const cartCount = document.getElementById("cart-count") as HTMLSpanElement;

  interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    year: number;
    pages: number;
    image: string;
  }

  interface CartItem extends Book {
    quantity: number;
  }

  let books: Book[] = [];
  let cart: CartItem[] = [];

  async function fetchBooks(): Promise<void> {
    try {
      const response = await fetch("http://localhost:3000/Books");
      books = await response.json();
      displayBooks(books);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }

  function displayBooks(bookArray: Book[]): void {
    bookList.innerHTML = "";
    bookArray.forEach((book) => {
      const bookItem = document.createElement("div");
      bookItem.classList.add("book");
      bookItem.innerHTML = `
        <img src="${book.image}" alt="${book.title}">
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Genre:</strong> ${book.genre}</p>
        <p><strong>Year:</strong> ${book.year}</p>
        <p><strong>Pages:</strong> ${book.pages}</p>
        <button class="buy-button" data-id="${book.id}">Buy</button>
      `;
      bookList.appendChild(bookItem);
    });
  }

  searchInput.addEventListener("input", () => {
    const filterType = searchDropdown.value as keyof Book;
    const searchTerm = searchInput.value.toLowerCase();
    if (!filterType) return;

    const filteredBooks = books.filter((book) =>
      book[filterType].toString().toLowerCase().includes(searchTerm)
    );
    displayBooks(filteredBooks);
  });

  sortSelect.addEventListener("change", () => {
    const sortBy = sortSelect.value as keyof Book;
    const sortedBooks = [...books].sort((a, b) =>
      a[sortBy] > b[sortBy] ? 1 : -1
    );
    displayBooks(sortedBooks);
  });

  document.addEventListener("click", (event) => {
    if ((event.target as HTMLElement).classList.contains("buy-button")) {
      const bookId = (event.target as HTMLElement).dataset.id;
      if (bookId) addToCart(parseInt(bookId));
    }
  });

  function addToCart(bookId: number): void {
    const book = books.find((b) => b.id === bookId);
    if (!book) return;

    const existingItem = cart.find((item) => item.id === bookId);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ ...book, quantity: 1 });
    }
    updateCartUI();
  }

  function updateCartUI(): void {
    cartItems.innerHTML = "";
    cart.forEach((item) => {
      const cartItem = document.createElement("li");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        ${item.title} (x${item.quantity})
        <button class="decrease" data-id="${item.id}">-</button>
        <button class="increase" data-id="${item.id}">+</button>
        <button class="remove" data-id="${item.id}">Remove</button>
      `;
      cartItems.appendChild(cartItem);
    });
    cartCount.textContent = cart.length.toString();
  }

  cartItems.addEventListener("click", (event) => {
    const bookId = (event.target as HTMLElement).dataset.id;
    if (!bookId) return;

    if ((event.target as HTMLElement).classList.contains("decrease")) {
      const item = cart.find((i) => i.id === parseInt(bookId));
      if (item) {
        if (item.quantity > 1) item.quantity--;
        else cart = cart.filter((i) => i.id !== parseInt(bookId));
      }
    }

    if ((event.target as HTMLElement).classList.contains("increase")) {
      const item = cart.find((i) => i.id === parseInt(bookId));
      if (item) item.quantity++;
    }

    if ((event.target as HTMLElement).classList.contains("remove")) {
      cart = cart.filter((i) => i.id !== parseInt(bookId));
    }
    updateCartUI();
  });

  cartButton.addEventListener("click", () => {
    cartModal.classList.toggle("hidden");
  });

  closeCart.addEventListener("click", () => {
    cartModal.classList.add("hidden");
  });

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  fetchBooks();
});
