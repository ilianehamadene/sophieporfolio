import { createHtmlFromApi, fetchGallery, dataFromApi } from "./fetch-edit.js";

// ------------------------------------ fonctionnement modale ---------//
let messageErreur = document.getElementsByClassName("message-erreur")[0];
let modalContainer = document.getElementsByClassName("modal-container")[0];
let modal1Container = document.getElementsByClassName("container1")[0];
let modal2Container = document.getElementsByClassName("container2")[0];
let modalOpen = document.getElementsByClassName("modal-open")[0];
let modal1Open = document.getElementsByClassName("ajouter-photo")[0];
let modal2Open = document.getElementsByClassName("valider-ajout")[0];
let modalClose = document.getElementsByClassName("modal-close")[0];
let modalClose1 = document.getElementsByClassName("close1")[0];
let modalBack1 = document.getElementsByClassName("back1")[0];
let closeAllFromOverlay = document.getElementsByClassName("overlay")[0];
let closeAllFromOverlay1 = document.getElementsByClassName("overlay1")[0];

modalOpen.addEventListener("click", function () {
  modalContainer.classList.add("modal-container-active");
});

modal1Open.addEventListener("click", function () {
  modal1Container.classList.add("modal-container-active");
  modalContainer.classList.remove("modal-container-active");
});

modalBack1.addEventListener("click", function () {
  modal1Container.classList.remove("modal-container-active");
  modalContainer.classList.add("modal-container-active");
  messageErreur.classList.remove("message-erreur-active");
});

closeAllFromOverlay.addEventListener("click", function () {
  modalContainer.classList.remove("modal-container-active");
  messageErreur.classList.remove("message-erreur-active");
});

closeAllFromOverlay1.addEventListener("click", function () {
  modal1Container.classList.remove("modal-container-active");
  messageErreur.classList.remove("message-erreur-active");
});

modalClose.addEventListener("click", function () {
  modalContainer.classList.remove("modal-container-active");
  messageErreur.classList.remove("message-erreur-active");
});

modalClose1.addEventListener("click", function () {
  modal1Container.classList.remove("modal-container-active");
  messageErreur.classList.remove("message-erreur-active");
});

// ---------upload img----------//

const uploadImg = document.getElementById("upload-img");

uploadImg.addEventListener("change", previewFile);

function previewFile() {
  if (this.files.lenght === 0) {
    return;
  }

  const file = this.files[0];
  displayImage(file);
}

let imageUrl = "";

function displayImage(file) {
  imageUrl = file;
  file = URL.createObjectURL(file);
  const displayImg = document.getElementById("display-image");
  displayImg.innerHTML = `<figure class="displayImg">
    <img class="imgtodisplay"src="${file}" alt="">
    </figure>`;
}

// ---------------------------reinitialiser le formulaire -----------//

function reinitialiseForm() {
  document.getElementsByClassName("add-title")[0].value = "";
  document.getElementsByClassName("selectId")[0].value = "";
  document
    .getElementById("display-image")
    .removeChild(document.getElementById("display-image").lastChild);
}

// ------------------------------------ Post projet ---------//

const token = sessionStorage.getItem("token");
let postProject = document.getElementsByClassName("valider-ajout")[0];
postProject.addEventListener("click", function () {
  let title = document.getElementsByClassName("add-title")[0].value;
  let categoryId = document.getElementsByClassName("selectId")[0].value;
  messageErreur.classList.remove("message-erreur-active");

  const formData = new FormData();

  formData.append("image", imageUrl);
  formData.append("title", title);
  formData.append("category", categoryId);

  console.log(categoryId.length);

  if (imageUrl.length !== 0 && title.length !== 0 && categoryId.length !== 0) {
    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
      .then((response) => {
        console.warn(response);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        fetchGallery();
        createHtmlFromApi(dataFromApi);
        reinitialiseForm();
        return response.json();
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    messageErreur.classList.add("message-erreur-active");
  }
});
