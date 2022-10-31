let main = document.getElementsByTagName("main");
console.log(main);

let container = main[0].getElementsByTagName("div");
console.log(container);

// https://japceibal.github.io/emercado-api/products/


function stars (rate) {
   let result = ``;

   for (let i=0; i<5; i++) {
      
      if (i < rate) {
         result += `<span class="fa fa-star checked"></span>`
      }
      
      else {
         result += `<span class="fa fa-star"></span>`
      }
   } 

   return result;
}



function showComments(comments){
   let divComments = document.createElement("div");
   divComments.classList.add("row");

   let comentarios = document.createElement("div");
   comentarios.setAttribute("id","comment-list-container");
   comentarios.classList.add("list-group");

   for (opinion of comments) {

      comentarios.innerHTML += ` 
         <div class="list-group-item list-group-item-action cursor-active">
            <div class="row">
               <p class="comment">
                  <strong>${opinion.user}</strong> | <span class="lead">${opinion.dateTime}</span>
                  &nbsp&nbsp${stars(opinion.score)}<br>
                  <i>${opinion.description}</i>
               </p>
            </div>
         </div>`;

   }

   container[0].appendChild(comentarios);   

   let ul5 = document.createElement("ul");
   ul5.setAttribute("id","productData");
   ul5.innerHTML = `
      <li>
         <br>
         <br>
         <br>
         <p><strong>Comentario nuevo: </strong></p>
      </li>`;

   container[0].appendChild(ul5);

   ul5.innerHTML += `
      <li>
         <br>
            <p class="lead"><i><small><strong>Su opinión:</strong></small></i></p>
            <textarea id="newComment" name="commentArea" rows="10" cols="60" maxlenght="1000">
            </textarea>
         <br>
      </li>
      <li>
         <br>
         <i class="lead"><small><strong>Su puntuación:</strong></small></i>&nbsp
            <select  id="puntuation" name="options">
               <option value="empty">...</option>
               <option value="0">0</option>
               <option value="1">1</option>
               <option value="2">2</option>
               <option value="3">3</option>
               <option value="4">4</option>
               <option value="5">5</option>
            </select>
      </li>
      <li>
         <br>
         <br>
         <button class="btn btn-primary btn-lg" id="sendComment" type="button">Enviar</button>
      </li>
   `
}



const getComments = async() => {
   const response = await fetch(`https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem("productID")}.json`);
   console.log(response);

   if(response.ok) {
      const comments = await response.json();
      console.log(comments);

      showComments(comments);
   }
}


function setRelatedProductID(id){
   localStorage.setItem("productID",id);
   window.location.href = "product-info.html";
}



function showRelatedProducts(relatedProducts) {
   let ul3 = document.createElement("ul");
   ul3.setAttribute("id","productData");
   ul3.innerHTML = `
      <li>
         <br>
         <br>
         <p><strong>Productos relacionados: </strong></p>
      </li>`;

   container[0].appendChild(ul3);

   let divRP = document.createElement("div");
   divRP.classList.add("album","py-5");
   
   let divContainerRP = document.createElement("div");
   divContainerRP.classList.add("container");
   divRP.appendChild(divContainerRP);

   let divRowRP = document.createElement("div");
   divRowRP.classList.add("row");
   divRowRP.setAttribute("id","relatedProducts")
   divContainerRP.appendChild(divRowRP);
   
   for (product of relatedProducts) {
      divRowRP.innerHTML += `
         <div class="col-md-4">
            <div id="${product.name}" class="card mb-4 shadow-sm custom-card cursor-active" 
            onclick="setRelatedProductID(${product.id})">
               <img class="bd-placeholder-img card-img-top" 
               src="${product.image}" alt="Imagen representativa de ${product.name}">
               <h3 class="m-3">${product.name}</h3>
            </div>
         </div>`;
   }
   
   container[0].appendChild(divRP);
}



function showProductImages(productImages) {
   let ul2 = document.createElement("ul");
   ul2.setAttribute("id","productImages");

   for (img of productImages) {
      ul2.innerHTML += `
         <li id="productImg">
            <img src="${img}" class="img-fluid" alt="Responsive image">
         </li>`; 
   }

   container[0].appendChild(ul2);
}

function addToCart(){
   let newArticles = [];
   newArticles.push(JSON.parse(localStorage.getItem("tempArticle")));
   console.log(newArticles);
   let articles = JSON.parse(localStorage.getItem("articles"));
   if(articles != null) {
      console.log(articles);
      articles = articles.concat(newArticles); 
      localStorage.setItem("articles",JSON.stringify(articles));
   }
   else {
      localStorage.setItem("articles",JSON.stringify(newArticles));
   }
}

function showProduct (product) {

   const tempArticle = {
      id: product.id,
      name: product.name,
      count: 1,      
      unitCost: product.cost,
      currency: product.currency,
      image: product.images[0],
   }

   console.log(tempArticle);

   localStorage.setItem("tempArticle",JSON.stringify(tempArticle));

   let ul = document.createElement("ul");
   ul.setAttribute("id","productData");
   ul.innerHTML = `
      <li>
         <div class="d-flex">
            <h2>${product.name}</h2>
            <button id="buyButton" type="button" class="btn btn-outline-success" 
            onclick="addToCart()">Comprar</button>
         </div>
         <hr>
      </li>
      <li>
         <p><strong>Id#: </strong>${product.id}</p>
      </li>
         <p><strong>Descripción: </strong>${product.description}</p>
      <li>
      <li>
         <p><strong>Precio: </strong>${product.currency}${product.cost}</p>
      </li>
      <li>
         <p><strong>Cantidad de vendidos: </strong>${product.soldCount}</p>
      </li>
      <li>
         <p><strong>Categoría: </strong>${product.category}</p>
      </li>
      <li>
         <br>
         <br>
         <p><strong>Imágenes ilustrativas: </strong></p>
      </li>
   `
   console.log(ul);
   container[0].appendChild(ul);

   showProductImages(product.images);
   showRelatedProducts(product.relatedProducts);

   if(product.soldCount > 0) {
      let ul4 = document.createElement("ul");
      ul4.setAttribute("id","productData");
      ul4.innerHTML = `
         <li>
            <br>
            <p><strong>Comentarios sobre el producto: </strong></p>
            <br>
         </li>`;
      container[0].appendChild(ul4);
   }

   getComments();
}



const getData = async() => {
   const response = await fetch(`https://japceibal.github.io/emercado-api/products/${localStorage.getItem("productID")}.json`);
   console.log(response);

   if(response.ok) {

      const product = await response.json()
      console.log(product);

      showProduct(product);
   }

}

getData();

