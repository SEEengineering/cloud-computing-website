// Handles registration and login script

// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
login();
}

function login() {
 var xhttp;
 
 xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function () {
 if(this.readyState == 4 && this.status ==200) {
   if(this.responseText == "true")
    document.getElementById("login").innerHTML.value = "User";
  }
 };
 xhttp.open("GET", "login", true);
 xhttp.send();
}
