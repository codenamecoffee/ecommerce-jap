// Variables y contenedores 

function cleanButtons () {
   document.getElementsByName("premium")[0].checked = false;
   document.getElementsByName("express")[0].checked = false;
   document.getElementsByName("standard")[0].checked = false;
   document.getElementById("calle").getElementsByTagName("input")[0].value = "";
   document.getElementById("numero").getElementsByTagName("input")[0].value = "";
   document.getElementById("esquina").getElementsByTagName("input")[0].value = "";
}

function calcSubTotal(id, cost) {
   let tempCant = document.getElementById(`cant-${id}`).value;
   let tempSpan = document.getElementById(`subTotal-${id}`);

   tempSpan.innerHTML = `${cost*tempCant}`;
}

function showCart(articles){
   let tbody = document.getElementsByTagName("tbody");
   for(product of articles) {
      tbody[0].innerHTML += `
      <tr>
         <td><img class="cart-thumbnail" src="${product.image}"> &nbsp&nbsp ${product.name}</td>
         <td>${product.currency} ${product.unitCost}</td>
         <td><input id="cant-${product.id}" oninput="calcSubTotal(${product.id}, ${product.unitCost})" style="width:75px; text-align:center" type="number" name="description" value=${product.count}></td>
         <td><strong>${product.currency} <span id="subTotal-${product.id}">${product.unitCost}</span></strong></td>
      </tr>
   `
   } 
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
      }
      else {
         localStorage.setItem("articles",JSON.stringify(articles));
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
})