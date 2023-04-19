// ------------------------------------ recuperation projet ---------//



let dataFromApi = [];
fetch("http://localhost:5678/api/works")
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    createHtmlFromApi(response);
    createModalFromApi(response);
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


// ------------------------------------ Filtre projet ---------//


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

// ------------------------------------ creation modale ---------//
function domGenerator(data) {
  const galleryModalElement = document.getElementById("gallery-modal");
    while (galleryModalElement.firstChild) {
      galleryModalElement.removeChild(galleryModalElement.lastChild);
    }

    for (let i = 0; i < data.length; i++) {
      const figureModalElement = document.createElement("figure");
      figureModalElement.classList.add("figure-modal");
      figureModalElement.setAttribute("id", data[i].id);
      const divDeleteModalElement = document.createElement("div");
      divDeleteModalElement.classList.add('delete-icon');
      divDeleteModalElement.setAttribute("id", data[i].id);
      console.log(divDeleteModalElement.attributes);
      const deleteModalElement = document.createElement("i");
      deleteModalElement.classList.add("fa-regular","fa-trash-can",);
      deleteModalElement.createattr = data[i].id;
      const imgModalElement = document.createElement("img");
      imgModalElement.src = data[i].imageUrl;
      imgModalElement.classList.add('img-modal');
      const figcaptionModalElement = document.createElement("figcaption");
      figcaptionModalElement.innerHTML = 'editer' ;
      figcaptionModalElement.classList.add('figcaption-modal');
      galleryModalElement.appendChild(figureModalElement);
      figureModalElement.appendChild(imgModalElement);
      figureModalElement.appendChild(divDeleteModalElement);
      figureModalElement.appendChild(figcaptionModalElement);
      divDeleteModalElement.appendChild(deleteModalElement);
    }
}

function createModalFromApi(data) {
    domGenerator(data)

    const token =sessionStorage.getItem('token');
    console.log(token)

    const deleteProject = document.getElementsByClassName("delete-icon");
    const deleteImage = document.getElementsByClassName("figure-modal");
    const deleteProjectArray = Array.from(deleteProject);
    const deleteImageArray = Array.from(deleteImage);
    console.log(deleteProjectArray)
    console.log(deleteImageArray)
    
    

    // ------------------------------------ supprimer un projet ---------//


    deleteProjectArray.forEach((item) => {
      item.addEventListener("click", function () {
        console.log(item.id);

        fetch("http://localhost:5678/api/works/" + item.id, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}`},
  }) 
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    document.getElementById(item.id).style.display = "none";

  })
})
      });
    };

  






 
  
 
 
  
  
  


