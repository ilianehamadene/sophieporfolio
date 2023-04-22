// ------------------------------------ log in ---------//

let btnconnection = document.getElementById("connection");
btnconnection.addEventListener("click", function () {
  let passwordInput = document.getElementById("mdp").value;
  let emailInput = document.getElementById("email").value;
  let errorMessage = document.getElementsByClassName("erreur-mdp")[0];
  errorMessage.classList.remove("erreur-mdp_active");

  console.log(emailInput);
  console.log(passwordInput);
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: emailInput,
      password: passwordInput,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Réponse du serveur :", data);
      if (data.token) {
        sessionStorage.setItem("token", data.token);
        window.location.href = "index_edit.html";
      } else {
        errorMessage.classList.add("erreur-mdp_active");
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la requête:", error);
    });
});
