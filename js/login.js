let listado = document.getElementsByTagName('main');
console.log(listado);

let alerta = listado[0].getElementsByClassName('container');
console.log(alerta);

alerta[0].remove();

let divI = document.createElement("div");
divI.classList.add("text-center", "p-4");
console.log(divI);

divI.innerHTML = `<img src="img/login.png" alt="login" width="500">
                  <br><br>
                  <h2>Inicio de sesión</h2>`;

listado[0].append(divI);

let divC = document.createElement("div"); 
divC.classList.add("container");
divC.innerHTML = 

   `<div class="text-center">
      <p><strong>Email:<br></strong>
         <input class="formulario" id="email" type="text" name="email" placeholder="Email">
         <div id="alerta1"></div>
      </p>
      <p><strong>Contraseña:<br></strong>
         <input class="formulario" id="pass" type="text" name="pass" placeholder="Contraseña">
         <div id="alerta2"></div>
      </p>
      <p>
         <input type="checkbox" name="RememberMe">
         Recordarme
      </p>
         <br>
         <button class="btn btn-primary btn-lg" onclick="checkEmpty()" name="submit">Ingresar</button>
   </div>`;

console.log(divC);

listado[0].append(divC);

let nombre = document.getElementById("email");
let pass = document.getElementById("pass");
let alerta1 = document.getElementById("alerta1");
let alerta2 = document.getElementById("alerta2");

let p1 = document.createElement("p");
p1.style.color = "red";
p1.innerHTML = `Ingrese su email`;
let p2 = document.createElement("p");
p2.style.color = "red";
p2.innerHTML = `Ingrese su contraseña`; 




function checkEmpty () {
   
   if(nombre.value && pass.value) {
      localStorage.setItem("user",nombre.value);
      window.location.href = "ecommerce.html";
   }
   else if (nombre.value && !pass.value){

      if(!pass.classList.contains("error")){
         pass.classList.add("error");
         alerta2.append(p2);
      }

      if(nombre.classList.contains("error")){
         nombre.classList.toggle("error");
         alerta1.removeChild(p1);
      }
   }
   else if (!nombre.value && pass.value){

      if(!nombre.classList.contains("error")){
         nombre.classList.add("error");
         alerta1.append(p1);
      }
      
      if(pass.classList.contains("error")){
         pass.classList.toggle("error");
         alerta2.removeChild(p2);
      }
   }
   else {
      if(!nombre.classList.contains("error")){
         nombre.classList.add("error");
         alerta1.append(p1);
      }
      if(!pass.classList.contains("error")){
         pass.classList.add("error");
         alerta2.append(p2);
      }
   }
}






