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
   tbody[0].innerHTML = `
      <tr>
         <td><img class="cart-thumbnail" src="${articles[0].image}"> &nbsp&nbsp ${articles[0].name}</td>
         <td>${articles[0].currency} ${articles[0].unitCost}</td>
         <td><input id="cant-${articles[0].id}" oninput="calcSubTotal(${articles[0].id}, ${articles[0].unitCost})" style="width:75px; text-align:center" type="number" name="description" value=${articles[0].count}></td>
         <td><strong>${articles[0].currency} <span id="subTotal-${articles[0].id}">${articles[0].unitCost}</span></strong></td>
      </tr>
   `
}

const getDefaultCart = async () => {
   const response = await fetch(`https://japceibal.github.io/emercado-api/user_cart/25801.json`);

   if(response.ok) {
      const cartData = await response.json();
      const {
         articles
      } = cartData;
      showCart(articles);
   }
}

document.addEventListener("DOMContentLoaded", () => {
   cleanButtons();
   getDefaultCart();
})