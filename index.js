

let dataFromApi = [];
fetch("http://localhost:5678/api/works")
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    createHtmlFromApi(response);
    dataFromApi = response;
  });

function createHtmlFromApi(data) {
  const galleryElement = document.getElementById("gallery");
  while (galleryElement.firstChild) {
    galleryElement.removeChild(galleryElement.lastChild);
  }
  for (let i = 0; i < data.length; i++) {
    const figureElement = document.createElement("figure");
    const imgElement = document.createElement("img");
    imgElement.classList.add("figureResize");
    imgElement.src = data[i].imageUrl;
    const figcaptionElement = document.createElement("figcaption");
    figcaptionElement.innerHTML = data[i].title;

    galleryElement.appendChild(figureElement);
    figureElement.appendChild(imgElement);
    figureElement.appendChild(figcaptionElement);
  }
}

let filterButtons = document.getElementsByClassName("filters-chip"); //Get all filter buttons
for (let filterButton of filterButtons) {
  //loop inside all filter buttons
  filterButton.addEventListener("click", () => {
    //listen click on filter
    const categoryId = +filterButton.getAttribute("categoryId"); //get categoryId from html attibute
    for (let allFilterButton of filterButtons) {
      allFilterButton.classList.remove("active"); //remove all active classes from filter
    }
    if (categoryId !== 0) {
      //categoryID == 0 is filter 'tous'
      const filteredData = dataFromApi.filter((oneDataFromApi) => {
        return oneDataFromApi.categoryId === categoryId; //filter by categoryId
      });
      createHtmlFromApi(filteredData);
    } else {
      createHtmlFromApi(dataFromApi);
    }
    filterButton.classList.add("active");
  });
}


let btnconnection = document.getElementById("connection");
btnconnection.addEventListener("click", function () {
  let passwordInput = document.getElementById("mdp").value;
  let emailInput = document.getElementById("email").value;
let errorMessage = document.getElementsByClassName("erreur-mdp")[0];
errorMessage.classList.remove('erreur-mdp_active')

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
        if(data.token) {
            sessionStorage.setItem("token", data.token);
            window.location.href="index_edit.html"
        }
        else{errorMessage.classList.add('erreur-mdp_active')}
    })
    .catch((error) => {
      console.error("Erreur lors de la requête:", error);
    });
});
