//Hämta data från localStorage rendera ut produkten som ska ändras i lagret
let productGrid = document.querySelector(".grid");

let str = localStorage.getItem("myArray");
arr = JSON.parse(str);
console.log(arr);

Object.entries(arr).forEach(
  ([key, value]) =>
    (productGrid.innerHTML += `
      <div class="product">Produkt: ${value.select2}</div>
      <div class="quantity">Antal ta bort: -${value.input1}</div>
      <div class="quantity">Antal lägga till: +${value.input2}</div>
      <div>Stad: ${value.select}</div>`)
);

//knappar med tömningsfunktion och gör ändringar i lagret
productGrid.innerHTML += `<button class="btn1" onclick="emptyCart()">Töm ändringar</button>`;
productGrid.innerHTML += `<button class="btn2" onclick="checkout(id)">Ändra i lagret</button>`;

// Tömma ändringar
function emptyCart() {
  let productGrid = document.querySelector(".grid");
  productGrid.innerHTML = "";
  localStorage.clear();
}

//hämta data från Firebase från localStorage
const getData = localStorage.getItem("getdata");
const parseData = JSON.parse(getData);
console.log(parseData);
const select2 = localStorage.getItem("select2");
const select = localStorage.getItem("select");
const input2 = localStorage.getItem("input2");
const newInput2 = JSON.parse(input2);
const input1 = localStorage.getItem("input1");
const newInput1 = JSON.parse(input1);

//Skicka ändringar till Firebase
function checkout() {
  const paragraf = document.querySelector('.paragraf')
  paragraf.innerText = 'Dina ändringar är nu gjorda! Tryck tillbaka för att se lagerändringarna.'
  async function updateSelectValue() {
    try {
      const baseURL =
        "https://paronab-79d88-default-rtdb.europe-west1.firebasedatabase.app/";
      const url = baseURL + `product/${select2}/${select}.json`;
      const response = await fetch(url);
      let data = await response.json();
      console.log(data);
      data += newInput2;
      data -= newInput1;

      // Send the updated data back to Firebase
      const updateResponse = await fetch(url, {
        method: "PUT", // Use PUT to update the entire data
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (updateResponse.ok) {
        console.log("Data updated successfully in Firebase!");
      } else {
        console.error("Failed to update data in Firebase.");
      }
    } catch (error) {
      console.error("Error while updating data:", error);
    }
  }

  // Usage example: Call the updateSelectValue function to update 'select' based on 'select2'
  updateSelectValue("select2", "select");
  emptyCart();
}
