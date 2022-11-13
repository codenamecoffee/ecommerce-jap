// Variables y contenedores 
const inputBtn = document.getElementById("inputBtn");
const validation01 = document.getElementById("validation01");
const validation02 = document.getElementById("validation02");
const validation03 = document.getElementById("validation03");
const validation04 = document.getElementById("validation04");
const validation05 = document.getElementById("validation05");
let cardNumber_input = document.getElementsByName("cardNumber")[0];
let expirationDate_input = document.getElementsByName("expirationDate")[0];
let securityCode_input = document.getElementsByName("securityCode")[0];
let accountNumber_input = document.getElementsByName("accountNumber")[0];
const sucessPurchase_button = document.getElementById("finalizarCompra");

// Ejemplo de JavaScript inicial para deshabilitar el envío de formularios si hay campos no válidos
const formController = () => {
   'use strict'
 
   // Obtener todos los formularios a los que queremos aplicar estilos de validación de Bootstrap personalizados
   var forms = document.querySelectorAll('.needs-validation')
 
   // Bucle sobre ellos y evitar el envío
   Array.prototype.slice.call(forms)
     .forEach(function (form) {
       form.addEventListener('submit', function (event) {
         if (!form.checkValidity()) {
           event.preventDefault()
           event.stopPropagation()
         }
          
         if (!validation01.checked && 
            !validation02.checked && 
            !validation03.checked) {
               
            document.getElementById("radioError").innerHTML = `
               &nbsp&nbsp*debe seleccionar al menos&nbsp<u>una opción</u>.*
            `
         }

         if (form.checkValidity()) {
            // document.getElementsByClassName("alert-success")[0].removeAttribute("hidden");
            alert("Compra realizada exitosamente");
         }
 
         form.classList.add('was-validated')
       }, false)
     })
 }

function cleanButtons () {
   validation01.checked = false;
   validation02.checked = false;
   validation03.checked = false;

   localStorage.setItem("iva",0);

   document.getElementById("calle").getElementsByTagName("input")[0].value = "";
   document.getElementById("numero").getElementsByTagName("input")[0].value = "";
   document.getElementById("esquina").getElementsByTagName("input")[0].value = "";
   
   inputBtn.checked = false;

   validation04.checked = false;
   validation05.checked = false;

   cardNumber_input.value ="";
   cardNumber_input.setAttribute("disabled", true);
   expirationDate_input.value ="";
   expirationDate_input.setAttribute("disabled", true);
   securityCode_input.value ="";
   securityCode_input.setAttribute("disabled", true);
   accountNumber_input.value ="";
   accountNumber_input.setAttribute("disabled", true);
}

function calcAllCosts() {
   let spanSubTotal = document.getElementById("sub");
   let spanEnvio = document.getElementById("envio");
   let spanTotal = document.getElementById("total");
   articles = JSON.parse(localStorage.getItem("articles"));
   let subTotal = 0;

   // console.log(articles);
   // console.log(articles!=null);

   if(articles != null) {
      for(article of articles) {
         if (article.currency == "UYU") {
            subTotal += Math.round((article.unitCost/43)*article.count);
         }
         else {
            subTotal += article.unitCost*article.count;
         }
        
      }
   }

   let iva = localStorage.getItem("iva");
   spanSubTotal.innerHTML = `${subTotal}`;
   spanEnvio.innerHTML = `${Math.round(subTotal*iva)}`;
   spanTotal.innerHTML = `${subTotal + Math.round(subTotal*iva)}`;
}


function findIndex (array, id) {
   let i = 0;
   while (array[i].id != id && i < array.length) {
      i++; 
   } 
   return i;
}

function calcUnitSubTotal(id, cost) {
   let tempCant = document.getElementById(`cant-${id}`).value;

   let array = JSON.parse(localStorage.getItem("articles"));
   array[findIndex(array,id)].count = tempCant;
   localStorage.setItem("articles",JSON.stringify(array));

   let tempSpan = document.getElementById(`subTotal-${id}`);
   tempSpan.innerHTML = `${cost*tempCant}`;

   calcAllCosts();
}

function showCart(articles){
   let tbody = document.getElementsByTagName("tbody");
   for(product of articles) {
      tbody[0].innerHTML += `
      <tr>
         <td><img class="cart-thumbnail" src="${product.image}"> &nbsp&nbsp ${product.name}</td>
         <td>${product.currency} ${product.unitCost}</td>
         <td><input id="cant-${product.id}" min="1" oninput="calcUnitSubTotal(${product.id}, ${product.unitCost})" style="width:75px; text-align:center" type="number" name="description" value=${product.count}></td>
         <td><strong>${product.currency} <span id="subTotal-${product.id}">${product.unitCost}</span></strong></td>
      </tr>
   `
   }
   calcAllCosts(); 
}

const getDefaultCart = async () => {
   const response = await fetch(`https://japceibal.github.io/emercado-api/user_cart/25801.json`);

   if(response.ok) {
      const cartData = await response.json();
      let {
         articles
      } = cartData;
      console.log(articles);

      localStorage.setItem("cart25801","loaded");
      
      if(localStorage.getItem("articles") != null) {
         articles = articles.concat(JSON.parse(localStorage.getItem("articles")));
         localStorage.setItem("articles", JSON.stringify(articles));
      }
      else {
         localStorage.setItem("articles", JSON.stringify(articles));
      }
      showCart(articles);
   }
}


document.addEventListener("DOMContentLoaded", () => {
   cleanButtons();
   formController();

   if (localStorage.getItem("cart25801") == null) {
      getDefaultCart();
   }
   else {
      showCart(JSON.parse(localStorage.getItem("articles")));
   }

   // document.getElementsByClassName("btn-success")[0].addEventListener("click", () => {
   //    document.getElementsByClassName("alert-success")[0].setAttribute("hidden", true);
   // })

   validation01.addEventListener("click", () => {
      validation01.setAttribute("required", true);

      validation02.checked = false;
      validation02.removeAttribute("required");
      validation03.checked = false;
      validation03.removeAttribute("required");

      document.getElementById("radioError").innerHTML = ``;
      localStorage.setItem("iva", validation01.value);
      calcAllCosts()
   })
   
   validation02.addEventListener("click", () => {
      validation02.setAttribute("required", true);

      validation01.checked = false;
      validation01.removeAttribute("required");
      validation03.checked = false;
      validation03.removeAttribute("required");

      document.getElementById("radioError").innerHTML = ``;
      localStorage.setItem("iva", validation02.value);
      calcAllCosts()
   })
   
   validation03.addEventListener("click", () => {
      validation03.setAttribute("required", true);

      validation01.checked = false;
      validation01.removeAttribute("required");
      validation02.checked = false;
      validation02.removeAttribute("required");

      document.getElementById("radioError").innerHTML = ``;
      localStorage.setItem("iva", validation03.value);
      calcAllCosts()
   })

   validation04.addEventListener("click", () => {

      validation04.setAttribute("required", true);

      validation05.checked = false;
      validation05.removeAttribute("required");
      
      cardNumber_input.removeAttribute("disabled");
      expirationDate_input.removeAttribute("disabled");
      securityCode_input.removeAttribute("disabled");

      accountNumber_input.setAttribute("disabled", true);
   })

   validation05.addEventListener("click", () => {

      validation05.setAttribute("required", true);

      validation04.checked = false;
      validation04.removeAttribute("required");

      accountNumber_input.removeAttribute("disabled");

      cardNumber_input.setAttribute("disabled", true);
      expirationDate_input.setAttribute("disabled", true);
      securityCode_input.setAttribute("disabled", true);
   })

   cardNumber_input.addEventListener("input", () => {
      if (cardNumber_input.value &&
         expirationDate_input.value &&
         securityCode_input.value) {
            inputBtn.checked = true;
      }
      else {
         inputBtn.checked = false;
      }
   })

   expirationDate_input.addEventListener("input", () => {
      if (cardNumber_input.value &&
         expirationDate_input.value &&
         securityCode_input.value) {
            inputBtn.checked = true;
      }
      else {
         inputBtn.checked = false;
      }
   })

   securityCode_input.addEventListener("input", () => {
      if (cardNumber_input.value &&
         expirationDate_input.value &&
         securityCode_input.value) {
            inputBtn.checked = true;
      }
      else {
         inputBtn.checked = false;
      }
   })

   accountNumber_input.addEventListener("input", () => {
      if (accountNumber_input.value) {
         inputBtn.checked = true;
      }
      else {
         inputBtn.checked = false;
      }
   })

   // sucessPurchase_button.addEventListener("submit", () => {
   //    document.getElementsByClassName("alert-success")[0].removeAttribute("hidden");
   // })   

   // document.getElementsByClassName("btn-success")[0].addEventListener("click", () => {
   //    document.getElementsByClassName("alert-success")[0].setAttribute("hidden", true);   
   // });

   calcAllCosts();
})



