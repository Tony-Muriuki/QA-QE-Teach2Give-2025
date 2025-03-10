const user = {
  id: "USER-123456",
  name: {
    first: "Alice",
    last: "Liddell",
  },
  email: "alice@example.com",
  address: {
    shipping: {
      street: "123 Rabbit Hole",
      city: "Wonderland",
      state: "Fantasy",
      postalCode: "12345",
      country: "WL",
    },
    billing: {
      street: "456 Mad Hatter Lane",
      city: "Tea Party",
      state: "Fantasy",
      postalCode: "67890",
      country: "WL",
    },
  },
  payment: {
    total: "100.00",
    currency: "USD",
    details: {
      subtotal: "75.00",
      tax: "15.00",
      shipping: "10.00",
    },
    transactions: [
      { id: "TXN-123", amount: "50.00", description: "Magic Potion" },
      { id: "TXN-456", amount: "50.00", description: "EnchantedSword" },
    ],
  },
};

//Destructured Information.

const {
  id,
  name: { first, last },
  email,
  address: {
    shipping: { street, city, state, postalCode, country },
    billing: {
      street: billingStreet,
      city: billingCity,
      state: billingState,
      postalCode: billingPostalCode,
      country: billingCountry,
    },
  },
  payment: {
    total,
    currency,
    details: { subtotal, tax, shipping },
    transactions: [{ id: id1 }, { id: id2 }],
  },
} = user;

// Function to display user info
function displayUserInfo() {
  // Destructure data
  const {
    id,
    name: { first, last },
    email,
    address: {
      shipping: {
        street: shippingStreet,
        city: shippingCity,
        state: shippingState,
        postalCode: shippingPostalCode,
        country: shippingCountry,
      },
      billing: {
        street: billingStreet,
        city: billingCity,
        state: billingState,
        postalCode: billingPostalCode,
        country: billingCountry,
      },
    },
    payment: { transactions },
  } = user;

  // Populate Personal Info
  document.getElementById("personal-info").innerHTML = `
    <h2>Personal Info</h2>
    <p><strong>ID:</strong> ${id}</p>
    <p><strong>Name:</strong> ${first} ${last}</p>
    <p><strong>Email:</strong> ${email}</p>
  `;

  // Populate Shipping Address
  document.getElementById("shipping-address").innerHTML = `
   <h2>Shipping Address</h2>
   <p>${shippingStreet}, ${shippingCity}, ${shippingState}, ${shippingPostalCode}, ${shippingCountry}</p>
 `;

  // Populate Billing Address
  document.getElementById("billing-address").innerHTML = `
    <h2>Billing Address</h2>
    <p>${billingStreet}, ${billingCity}, ${billingState}, ${billingPostalCode}, ${billingCountry}</p>
  `;

  // Populate Transactions
  const transactionsHTML = `
    <h2>Transactions</h2>
    <ul>
      ${transactions
        .map(
          (tx) =>
            `<li><strong>${tx.description}:</strong> $${tx.amount} (ID: ${tx.id})</li>`
        )
        .join("")} 
    </ul>
  `;

  // Append transactions list to the section
  document.getElementById("transactions").innerHTML = transactionsHTML;
}

// Call the function to display data
displayUserInfo();
