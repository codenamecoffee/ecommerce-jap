document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyCoaiZDhFYU6apPS8JVL5b6JfYiCWVd4-g",
//     authDomain: "ecommerce-jap-e3041.firebaseapp.com",
//     projectId: "ecommerce-jap-e3041",
//     storageBucket: "ecommerce-jap-e3041.appspot.com",
//     messagingSenderId: "136136392411",
//     appId: "1:136136392411:web:5ffe3d1bebdb8fbed996fe"
// };
// // Initialize Firebase
// const app = initializeApp(firebaseConfig); 