// Variables y contenedores 

// Ejemplo de JavaScript inicial para deshabilitar el envío de formularios si hay campos no válidos
(function () {
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

         if (document.getElementById("validation01").checked == false && 
         document.getElementById("validation02").checked == false && 
         document.getElementById("validation03").checked == false) {
            document.getElementById("radioError").innerHTML = `&nbsp&nbsp*debe seleccionar al menos una opción.*`
         }
 
         form.classList.add('was-validated')
       }, false)
     })
 })()

function cleanButtons () {
   document.getElementsByName("premium")[0].checked = false;
   document.getElementsByName("express")[0].checked = false;
   document.getElementsByName("standard")[0].checked = false;
   document.getElementById("calle").getElementsByTagName("input")[0].value = "";
   document.getElementById("numero").getElementsByTagName("input")[0].value = "";
   document.getElementById("esquina").getElementsByTagName("input")[0].value = "";
}

function calcAllCosts() {
   let spanSubTotal = document.getElementById("sub");
   let spanEnvio = document.getElementById("envio");
   let spanTotal = document.getElementById("total");
   articles = JSON.parse(localStorage.getItem("articles"));
   let subTotal = 0;

   console.log(articles);
   console.log(articles!=null);

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
         let array = JSON.parse(localStorage.getItem("articles")); 
         console.log(array);
      }
      showCart(articles);
   }
}


document.addEventListener("DOMContentLoaded", () => {
   cleanButtons();
   if (localStorage.getItem("cart25801") == null) {
      getDefaultCart();
   }
   else {
      showCart(JSON.parse(localStorage.getItem("articles")));
   }

   document.getElementById("validation01").addEventListener("click", () => {
      document.getElementById("validation02").checked = false;
      document.getElementById("validation03").checked = false;
      document.getElementById("radioError").innerHTML = ``;
      localStorage.setItem("iva", document.getElementById("validation01").value);
      calcAllCosts()
   })
   
   document.getElementById("validation02").addEventListener("click", () => {
      document.getElementById("validation01").checked = false;
      document.getElementById("validation03").checked = false;
      document.getElementById("radioError").innerHTML = ``;
      localStorage.setItem("iva", document.getElementById("validation02").value);
      calcAllCosts()
   })
   
   document.getElementById("validation03").addEventListener("click", () => {
      document.getElementById("validation01").checked = false;
      document.getElementById("validation02").checked = false;
      document.getElementById("radioError").innerHTML = ``;
      localStorage.setItem("iva", document.getElementById("validation03").value);
      calcAllCosts()
   })
   calcAllCosts();
})



