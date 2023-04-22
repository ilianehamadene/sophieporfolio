// ------------------------------------ recuperation projet ---------//

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

//----------------------------------- Filtre projet ---------//
let categorieFromApi = [];

function fetchCategories() {
 fetch("http://localhost:5678/api/categories")
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      CreateFiltersFromApi(response)
      categorieFromApi = response;
      
    });
}
fetchCategories()
CreateFiltersFromApi(categorieFromApi)

function CreateFiltersFromApi(data) {

  
  const list = document.getElementById("filters-list");
  for (let i = 0; i < data.length; i++) {
    console.log(data[i].name)
    const filters = document.createElement("li");
    filters.classList.add("filters-chip");
    filters.setAttribute("categoryId", data[i].id);
    
    filters.innerHTML = (data[i].name)
  
    list.appendChild(filters);
   
    
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
}

