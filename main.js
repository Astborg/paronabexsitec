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
        <p class="rubrik">Produkt: ${key}</p>
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
  







    
         

