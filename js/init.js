const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

function clearUser(){
  localStorage.clear(); 
}

let usuario = localStorage.getItem("user");
console.log(usuario);
let liUser = document.getElementById("userLogged");
liUser.innerHTML = `
  <div class="dropdown">
    <button id="profileBtn" class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
      <a id="profileA"class="nav-link">${usuario}</a>
    </button>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="../cart.html">Mi carrito</a></li>
      <li><a class="dropdown-item" href="../my-profile.html">Mi perfil</a></li>
      <li onclick="clearUser()"><a class="dropdown-item" href="../index.html">Cerrar sesión</a></li>
    </ul>
  </div>
    `;