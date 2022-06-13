const container = document.getElementById("container");
let cardValues;

// Keep data in local storage for not losing it after page refresh
const updateStorage = () => {
  const numbers = Array.from(document.querySelectorAll("#container div p")).map(
    (num) => num.innerHTML
  );
  localStorage.removeItem("cardValues");
  localStorage.setItem("cardValues", JSON.stringify(numbers));
};

const createCard = (number) => {
  // Create card's content
  const card = document.createElement("div");
  const paragraph = document.createElement("p");
  paragraph.textContent = number;
  //   Create card's delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.addEventListener("click", (e) => {
    e.target.parentNode.remove();
    updateStorage();
  });
  card.append(paragraph, deleteBtn);
  return card;
};

const addCard = () => {
  // Generate a random number
  const randomNumber = Math.floor(Math.random() * 10000);
  container.appendChild(createCard(randomNumber));
  updateStorage();
};

// Sort numbers

const sortCards = () => {
  const sortedNumbers = Array.from(
    document.querySelectorAll("#container div p")
  )
    .map((card) => card.innerHTML)
    .sort((a, b) => a - b);
  container.innerHTML = "";
  sortedNumbers.forEach((card) => {
    container.appendChild(createCard(card));
  });
};

if (localStorage.getItem("cardValues") == null) {
  cardValues = [];
} else {
  cardValues = JSON.parse(localStorage.getItem("cardValues"));
  console.log(cardValues);
  cardValues.forEach((card) => {
    container.appendChild(createCard(card));
  });
}
