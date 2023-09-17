//Hämta data från firebase rendera i DOM

async function products(){
  try{
    const baseURL = 'https://paronab-79d88-default-rtdb.europe-west1.firebasedatabase.app/'
    const url = baseURL + 'product.json'
    const response = await fetch(url)
    let data = await response.json()
    console.log(data)
    
    
    localStorage.setItem("getdata", JSON.stringify(data))
    const lagretidag = document.querySelector('.lagretidag')
    Object.entries(data).forEach(([key, value]) => 
        lagretidag.innerHTML += `
        <div class="produkt-container">
        <p>Produkt: ${key}</p>
        <p> Frankfurt: ${value.Frankfurt}</p>
        <p> Cupertino: ${value.Cupertino}</p> 
        <p> Norrköping: ${value.Norrköping}</p>
        </div>
        <br>
        `
        
    )

   
  }catch(error){
    console.log(error)
  }

  }
products()


//Hämta värden från ifyllda fält och spara i localStorage
const euro = document.querySelectorAll('.euro')
function change1(){
    const input1 = document.querySelector('.input1').value
    const input2 =  document.querySelector('.input2').value
    const select = document.getElementById('select').value
    const select2 = document.getElementById('select2').value
    
    console.log(input1, input2, select)

    const arr = new Array();
    arr.push({input1, input2, select, select2});

    localStorage.setItem("myArray", JSON.stringify(arr));  
    localStorage.setItem('select2', select2)
    localStorage.setItem('select', select)
    localStorage.setItem('input2', input2)
    localStorage.setItem('input1', input1)
}
  







    
         


//   function onLoadCartNumbers(){
//     let productNumbers = localStorage.getItem('cartNumbers')
//     if(productNumbers){
//         lang1.innerHTML = `<div id="cartNr">${cartNr = productNumbers}</div>`
//     }

// }

//   function cartNumbers(product){
//     console.log('the product clicked is', product)
//     let productNumbers = localStorage.getItem('cartNumbers')
//     productNumbers = parseInt(productNumbers)
//     if(productNumbers){
//         localStorage.setItem('cartNumbers', productNumbers + 1)
//         lang1.innerHTML = `<div id="cartNr">${cartNr = productNumbers +1}</div>`
//     }
//     else {
//         localStorage.setItem('cartNumbers', 1 )
//         lang1.innerHTML = `<div id="cartNr">${cartNr = 1}</div>`
//     }
   
//     setItems(product)
    
//   }

  

//   function setItems(product){
//     let cartItems = localStorage.getItem('productsInCart')
//     cartItems = JSON.parse(cartItems)
//     console.log(cartItems) //funkar
//     if(cartItems != null){
//         if(cartItems[product.id] == undefined){
//             cartItems = {
//                 ...cartItems,
//                 [product.id]: product
//             }
//             console.log(cartItems)
//         }else {
//         cartItems[product.id].inCart += 1
       
//         product.inCart++
        
//         console.log(cartItems) //funkar
//         }
//     }
//     else{
//         product.inCart = 1
//         cartItems = {
//             [product.id]: product
//     }
//     console.log(cartItems)//funkar
  
//     }
    
//     localStorage.setItem('productsInCart',JSON.stringify(cartItems))
//     console.log(localStorage.getItem('productsInCart'))
// }

//   function totalAmount(product){
//     let cartCost = localStorage.getItem('totalCost')
//     if(cartCost != null){
//         cartCost = parseInt(cartCost)
//         localStorage.setItem('totalCost', cartCost + product.pris)
//     }
//     else{
//         localStorage.setItem('totalCost', product.pris)
//     }
    
//   }

//   async function patchPost(obj){
//     const baseURL = `https://webstore-22fa4-default-rtdb.europe-west1.firebasedatabase.app/`
//     const url = baseURL + `Products.json`
//         const init = {
//             method: 'PUT',
//             body: JSON.stringify(obj),
//             headers: {
//                 "Content-type": "application/json; charset=UTF-8",
//             }
//         };
    
//         const response = await fetch(url, init)
//         const data = await response.json()
//         console.log(data)
        
//     }
//      let obj = Object.values(products) 
//     patchPost(obj)
//     console.log(obj)

//   onLoadCartNumbers()

  
  