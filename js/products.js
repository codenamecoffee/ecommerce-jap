
/*Creo la variable -listado- para manipular el elemento <main> de products.html,
Es dentro de ese elemento en donde quiero desplegar la categoría en cuestión*/

let listado = document.getElementsByTagName('main');
// console.log(listado);

/*ACTUALIZACIÓN: Opté por comentar la alerta en el .html, para que nunca se cargue y se muestre ni por un microsegundo en el navegador. */
/*Borro la alerta que dice "Funcionalidad en desarrollo" */

// let alerta = listado[0].getElementsByClassName('container');
// console.log(alerta);

// alerta[0].remove();

/* divT: título de la lista de productos, utilizando el estilo de las categorías. */

let divT = document.createElement("div");
divT.classList.add("text-center", "p-4");
// console.log(divT);

 /* Meto divT en el main de productos.html*/
listado[0].append(divT);

/*divC: contenedor de la información */

let divC = document.createElement("div"); 
divC.classList.add("container");
// console.log(divC);

/* divR: sigo agregando divisiones, respetando el estilo de categories.html*/

let divR = document.createElement("div");
divR.classList.add("row");
// console.log(divR);

/* divF y divP: creo otra división, para los botones que filtran según precio u orden alfabético */

let divF = document.createElement("div"); //división para ordenar por orden alfabético
let divP = document.createElement("div"); //división para ordenar por precio
divF.classList.add("row");
divP.classList.add("row");
divC.append(divF);
divC.append(divP);

divF.innerHTML = `<div class="col text-end">
                     <div class="btn-group btn-group-toggle mb-4" data-bs-toggle="buttons">
                        <input id="sortAsc" class="btn-check" type="radio" name="options">
                        <label class="btn btn-light" for="sortAsc"><!--<i class="fas fa-sort-amount-down mr-1"></i>--> menor precio $</label>
                        <input id="sortDesc" class="btn-check" type="radio" name="options">
                        <label class="btn btn-light" for="sortDesc"><!--<i class="fas fa-sort-amount-down mr-1"></i>--> mayor precio $</label>
                        <input id="sortByRelevance" class="btn-check" type="radio" name="options" checked="">
                        <label class="btn btn-light" for="sortByRelevance">
                           <!--<i class="fas fa-sort-amount-down mr-1"></i>-->Mas vendidos
                        </label>
                     </div>
                  </div>`;

divP.innerHTML =  `<div class="col-lg-6 offset-lg-6 col-md-12 mb-1 container">
                     <div class="row container p-0 m-0">
                        <div class="col">
                           <p class="font-weight-normal text-end my-2">Precio.</p>
                        </div>
                        <div class="col">
                           <input class="form-control" type="number" placeholder="min." id="rangeFilterPriceMin">
                        </div>
                        <div class="col">
                           <input class="form-control" type="number" placeholder="máx." id="rangeFilterPriceMax">
                        </div>
                        <div class="col-3 p-0">
                           <div class="btn-group" role="group">
                              <button class="btn btn-light btn-block" id="rangeFilterPrice">Filtrar</button>
                              <button class="btn btn-link btn-sm" id="clearRangeFilter">Limpiar</button>
                           </div>
                        </div>
                     </div>
                  </div>`;

/* divProdList: el div más profundo, donde se desplegarán realmente los datos*/

let divProdList = document.createElement("div");
divProdList.classList.add("list-group");
divProdList.setAttribute("id","prod-list-container")
// console.log(divProdList);

/* Sigo respetando las anidaciones de divs del estilo que quiero imitar:
div de clase "list-group" dentro de div de clase "row" */

divR.append(divProdList);

/*div de clase "row" dentro de div de clase "container"*/
divC.append(divR);

listado[0].append(divC);
// console.log(listado[0]);

function setProductID(id){
   localStorage.setItem("productID",id);
   window.location.href = "product-info.html";
}

function showProductList(array) {
   
   let htmlContentToAppend = "";

   for(let i=0; i < array.length; i++) { /*Copié la estructura de categories.js con ayuda del inspector del navegador*/

         htmlContentToAppend += `
            <div class="list-group-item list-group-item-action cursor-active" onclick="setProductID(${array[i].id})">
               <div class="row">
                  <div class="col-3">
                     <img class="img-thumbnail" src="${array[i].image}" alt="${array[i].description}">
                  </div>
                  <div class="col">
                     <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${array[i].name}</h4>
                        <small class="text-muted">${array[i].soldCount} vendidos</small>
                     </div>
                     <p class="mb-1">
                        ${array[i].description}
                     </p><br>
                     <h2 class="mb-1">${array[i].currency} ${array[i].cost}</h2>
                  </div>   
               </div>
            </div>`; 
   }

   divProdList.innerHTML = htmlContentToAppend; 
}


const productsArray = [];

async function getProductsList(){
   const result = await getJSONData(`https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem("catID")}.json`);
   console.log(result);

   if (result.status == "ok") {

      divT.innerHTML = `<h2>Productos</h2> <p class="lead">Verás aquí todos los productos de la categoría <strong>${result.data.catName}</strong></p>`

      productsArray.push(...result.data.products);
      console.log(productsArray);

      if (productsArray.length > 0) {
         divT.innerHTML = `<h2 id="productos">Productos</h2> <p class="lead">Verás aquí todos los productos de la categoría <strong>${result.data.catName}</strong></p>`
      }
      else {
         divT.innerHTML = `<h2 id="productos">Productos</h2> <p class="lead">No hay productos disponibles en la categoría <strong>${result.data.catName}</strong></p>`
      }

      showProductList(productsArray);
   }

}

getProductsList();

// console.log(productsArray.length); // ¿Por qué no funciona? (Tiene que ver con la función asíncrona)
/* Preciso poder usar .lenght para poder hacer copias del arreglo principal. Por suerte .filter() devuelve un arreglo, y no modifica el original .*/

let filteredProductList = productsArray;

// console.log(productsArray);
// console.log(filteredProductList);

let sortAscButton = document.getElementById("sortAsc");
let sortDescButton = document.getElementById("sortDesc");
let sortByRelevanceButton = document.getElementById("sortByRelevance");

let filterButton = document.getElementById("rangeFilterPrice");
let cleanButton = document.getElementById("clearRangeFilter");

let minPrice = undefined; 
let maxPrice = undefined; 

// console.log(minPrice);
// console.log(maxPrice);

sortAscButton.addEventListener("click", () => {
   filteredProductList.sort((a,b) => {
      if (a.cost > b.cost) {return 1;}
      if (a.cost < b.cost) {return -1;}
      return 0;
   });
   showProductList(filteredProductList);
})

sortDescButton.addEventListener("click", () => {
   filteredProductList.sort((a,b) => {
      if (a.cost > b.cost) {return -1;}
      if (a.cost < b.cost) {return 1;}
      return 0;
   });
   showProductList(filteredProductList);
})

sortByRelevanceButton.addEventListener("click", () => {
   filteredProductList.sort((a,b) => b.soldCount - a.soldCount);
   showProductList(filteredProductList);
})

filterButton.addEventListener("click", () => {
    minPrice = document.getElementById("rangeFilterPriceMin").value;
    maxPrice = document.getElementById("rangeFilterPriceMax").value;

    if (minPrice > 0 && maxPrice > 0) {
      filteredProductList = filteredProductList.filter((value) => value.cost >= minPrice && value.cost <= maxPrice)

      // console.log(productsArray);
      // console.log(filteredProductList);

      showProductList(filteredProductList);
    }
    else {
      alert("Ingrese números mayores a cero en ambos campos")
    }
})

cleanButton.addEventListener("click", () => {
   document.getElementById("rangeFilterPriceMin").value = "";
   document.getElementById("rangeFilterPriceMax").value = "";
   minPrice = undefined;
   maxPrice = undefined;

   filteredProductList = productsArray;

   // console.log(productsArray);
   // console.log(filteredProductList);

   showProductList(productsArray);
})

