const firstName = document.getElementsByName("firstName");
const secondName = document.getElementsByName("secondName");
const lastName = document.getElementsByName("firstLastName");
const secondLastName = document.getElementsByName("secondLastName");
const eMail = document.getElementsByName("profileMail");
const telNumber = document.getElementsByName("profileTel")

const saveButton = document.getElementById("saveProfileData");

function saveData () {
   localStorage.setItem("userFirstName", firstName[0].value);
   localStorage.setItem("userSecondName", secondName[0].value);
   localStorage.setItem("userLastName", lastName[0].value);
   localStorage.setItem("userSecondLastName", secondLastName[0].value)
   localStorage.setItem("userMail", eMail[0].value);
   localStorage.setItem("userTel", telNumber[0].value);
}


document.addEventListener("DOMContentLoaded", () => {

   if(!localStorage.getItem("userMail")) {
      window.location.href = "index.html";
   } 

   firstName[0].value = localStorage.getItem("userFirstName");
   secondName[0].value = localStorage.getItem("userSecondName");   
   lastName[0].value = localStorage.getItem("userLastName");
   secondLastName[0].value = localStorage.getItem("userSecondLastName");  
   eMail[0].value = localStorage.getItem("userMail");
   telNumber[0].value = localStorage.getItem("userTel");

})